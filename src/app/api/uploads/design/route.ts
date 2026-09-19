import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'

const MAX_PDF_SIZE = 10 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('designs/')) {
          throw new Error('Gecersiz yukleme yolu.')
        }

        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: MAX_PDF_SIZE,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 7,
        }
      },
      onUploadCompleted: async () => {
        // Blob URL siparis olusturulurken OrderItem.designUrl alaninda kalici hale gelir.
      },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Dosya yuklenemedi.' },
      { status: 400 },
    )
  }
}

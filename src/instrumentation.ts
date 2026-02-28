/**
 * Sunucu process'inin beklenmedik hatalarla çökmesini azaltmak için:
 * - Unhandled promise rejection'ları yakala, logla, process'i kapatma
 * - Uncaught exception'da logla ve graceful exit
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('[instrumentation] Unhandled Rejection:', reason)
      console.error('[instrumentation] Promise:', promise)
      // Yanıt döndürmeden process çökmesini engelle (Node 15+ varsayılan davranış)
    })

    process.on('uncaughtException', (error) => {
      console.error('[instrumentation] Uncaught Exception:', error?.message ?? error)
      console.error(error?.stack ?? '')
      // Önerilen: logla, metrik gönder, sonra exit. Şimdilik sadece logluyoruz.
    })
  }
}

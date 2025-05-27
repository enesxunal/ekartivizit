'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals metrikleri
    const reportWebVitals = (metric: any) => {
      // Google Analytics'e gönder
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        })
      }

      // Console'a yazdır (development için)
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric)
      }
    }

    // Performance Observer ile Core Web Vitals'ı izle
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        reportWebVitals({
          name: 'LCP',
          value: lastEntry.startTime,
          id: 'lcp-' + Date.now(),
        })
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          reportWebVitals({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: 'fid-' + Date.now(),
          })
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        reportWebVitals({
          name: 'CLS',
          value: clsValue,
          id: 'cls-' + Date.now(),
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          reportWebVitals({
            name: 'TTFB',
            value: entry.responseStart - entry.requestStart,
            id: 'ttfb-' + Date.now(),
          })
        })
      })
      navigationObserver.observe({ entryTypes: ['navigation'] })

      // Cleanup
      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        navigationObserver.disconnect()
      }
    }
  }, [])

  return null // Bu bileşen görsel bir şey render etmez
}

// Sayfa yükleme sürelerini izlemek için yardımcı fonksiyon
export const trackPageLoad = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const loadTime = performance.now()
    window.gtag('event', 'page_load_time', {
      event_category: 'Performance',
      event_label: pageName,
      value: Math.round(loadTime),
    })
  }
}

// Özel performans metrikleri
export const trackCustomMetric = (metricName: string, value: number, category = 'Custom') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metricName, {
      event_category: category,
      value: Math.round(value),
    })
  }
} 
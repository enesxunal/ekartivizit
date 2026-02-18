module.exports = {
  apps: [{
    name: 'ekartvizit',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/ekartvizit',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_SITE_URL: 'https://ekartvizit.co',
      TOSLA_API_USER: 'apiUser3016658',
      TOSLA_API_PASS: 'YN8L293GPY',
      TOSLA_CLIENT_ID: '1000002147',
      TOSLA_BASE_URL: 'https://entegrasyon.tosla.com/api/Payment/'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G', // 512M'den 1G'ye çıkarıldı
    error_file: '/var/log/ekartvizit/err.log',
    out_file: '/var/log/ekartvizit/out.log',
    log_file: '/var/log/ekartvizit/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_restarts: 50, // 10'dan 50'ye çıkarıldı - sürekli restart olmasını engellemek için
    min_uptime: '30s', // 10s'den 30s'ye çıkarıldı - daha stabil başlangıç için
    restart_delay: 5000, // 4s'den 5s'ye çıkarıldı
    kill_timeout: 10000, // Process kill timeout (10 saniye)
    listen_timeout: 30000, // 30 saniye içinde dinlemeye başlamalı
    exp_backoff_restart_delay: 100, // Exponential backoff restart delay
    // Health check için
    health_check_grace_period: 3000, // 3 saniye grace period
    // Process monitoring
    pmx: true,
    // Auto restart on crash
    stop_exit_codes: [0], // Sadece 0 exit code'unda durdur
    // Log rotation
    log_type: 'json',
    // Error handling
    ignore_watch: ['node_modules', '.next', 'logs']
  }]
}

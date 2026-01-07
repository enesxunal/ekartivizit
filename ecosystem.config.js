module.exports = {
  apps: [{
    name: 'ekartvizit',
    script: 'npm',
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
    max_memory_restart: '512M',
    error_file: '/var/log/ekartvizit/err.log',
    out_file: '/var/log/ekartvizit/out.log',
    log_file: '/var/log/ekartvizit/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000
  }]
}

#!/bin/bash
# Sunucuda bir kez çalıştır: sudo ./scripts/setup-logrotate.sh
# Logları günlük keser, disk dolmasını azaltır.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_SRC="$PROJECT_DIR/config/logrotate-ekartvizit"
CONFIG_DST="/etc/logrotate.d/ekartvizit"

if [ ! -f "$CONFIG_SRC" ]; then
  echo "Hata: $CONFIG_SRC bulunamadı."
  exit 1
fi

cp "$CONFIG_SRC" "$CONFIG_DST"
echo "Logrotate ayarı yüklendi: $CONFIG_DST"
logrotate -d "$CONFIG_DST" 2>/dev/null || true
echo "Tamam. Loglar her gün kesilecek, son 7 gün saklanacak."

#!/bin/bash
# Keep-alive script for Render free tier
# Sends a request every 14 minutes to prevent spin-down

URL="https://myung.onrender.com/"
INTERVAL=840  # 14 minutes in seconds

echo "Keep-alive started for $URL"
echo "Pinging every $((INTERVAL / 60)) minutes. Press Ctrl+C to stop."
echo ""

while true; do
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$URL")
  echo "[$TIMESTAMP] Status: $STATUS"
  sleep $INTERVAL
done

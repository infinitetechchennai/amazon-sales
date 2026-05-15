#!/bin/bash
# ── SellerIQ Pro — VPS Deployment Script ──────────────────────
# Run this script on your VPS after cloning/pulling the repo
set -e

echo "🚀 SellerIQ Pro — Starting Deployment..."

# ── Step 1: Check if .env.production exists ──────────────────
if [ ! -f ".env.production" ]; then
    echo "❌ ERROR: .env.production not found!"
    echo "   Copy it from your local machine first:"
    echo "   scp .env.production sparta@your-vps-ip:~/amazon-sales/"
    exit 1
fi

# ── Step 2: Check if Sparta network exists ───────────────────
if ! docker network inspect sparta_mlm_default >/dev/null 2>&1; then
    echo "⚠️  sparta_mlm_default network not found. Creating it..."
    docker network create sparta_mlm_default
fi

# ── Step 3: Build and start containers ───────────────────────
echo "📦 Building Docker images..."
docker compose build --no-cache

echo "🔄 Starting containers..."
docker compose up -d

# ── Step 4: Wait for backend health ──────────────────────────
echo "⏳ Waiting for backend to be ready..."
sleep 10

for i in {1..12}; do
    if curl -s http://localhost:8001/health | grep -q '"status":"ok"'; then
        echo "✅ Backend is healthy!"
        break
    fi
    if [ $i -eq 12 ]; then
        echo "⚠️  Backend health check timed out. Check logs: docker compose logs selleriq-backend"
    fi
    sleep 5
done

# ── Step 5: Copy nginx config to Sparta's nginx ─────────────
echo "🔧 Installing Nginx reverse proxy config..."
docker cp nginx/selleriq.conf sparta_mlm-nginx-1:/etc/nginx/conf.d/selleriq.conf
docker exec sparta_mlm-nginx-1 nginx -t && docker exec sparta_mlm-nginx-1 nginx -s reload

echo ""
echo "══════════════════════════════════════════════════"
echo "  ✅ SellerIQ Pro Deployed Successfully!"
echo "══════════════════════════════════════════════════"
echo ""
echo "  🌐 Frontend:  http://your-domain:3000"
echo "  🔌 Backend:   http://your-domain:8001"
echo "  💊 Health:    http://your-domain:8001/health"
echo ""
echo "  📋 Useful Commands:"
echo "     docker compose logs -f          # Watch all logs"
echo "     docker compose logs selleriq-backend -f   # Backend logs only"
echo "     docker compose ps               # Check status"
echo "     docker compose restart           # Restart all"
echo "══════════════════════════════════════════════════"

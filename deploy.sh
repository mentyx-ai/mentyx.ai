#!/bin/bash

# Mentyx.ai Complete Deployment Script
# For Austin Demo - Friday
# This script automates the entire deployment process

echo "🚀 Mentyx.ai Deployment Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check git repo
if [ ! -d ".git" ]; then
    echo "${RED}❌ Error: Not in a git repository${NC}"
    echo "Please cd to your mentyx.ai project folder first"
    exit 1
fi

echo "${BLUE}📁 Step 1: Creating directory structure...${NC}"
mkdir -p src/components
mkdir -p src/app/demo
mkdir -p src/app/api/analyze-document
echo "${GREEN}✓ Directories created${NC}"
echo ""

echo "${BLUE}📦 Step 2: Installing dependencies...${NC}"
npm install lucide-react @anthropic-ai/sdk
echo "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo "${BLUE}📝 Step 3: Creating demo page (src/app/demo/page.tsx)...${NC}"
cat > src/app/demo/page.tsx << 'EOF'
import MentyxPlatform from '@/components/mentyx-complete-platform';

export default function DemoPage() {
  return <MentyxPlatform />;
}
EOF
echo "${GREEN}✓ Demo page created${NC}"
echo ""

echo "${BLUE}🤖 Step 4: Creating API route (src/app/api/analyze-document/route.ts)...${NC}"
cat > src/app/api/analyze-document/route.ts << 'EOF'
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || ''
    });

    const { documentText } = await req.json();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `You are a loan underwriting AI. Analyze this document and extract:
- Annual Revenue
- Monthly Cash Flow
- Existing Debt
- Risk Score (0-100, where 100 is best)
- Recommendation (APPROVE or REJECT)

Return ONLY valid JSON with these fields: revenue, cash_flow, debt, risk_score, recommendation

Document:
${documentText}`
      }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return NextResponse.json({ analysis: content.text });
    }

    return NextResponse.json({ error: 'Invalid response' }, { status: 500 });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
EOF
echo "${GREEN}✓ API route created${NC}"
echo ""

echo "${BLUE}📌 Step 5: Adding changes to git...${NC}"
git add .
echo "${GREEN}✓ Changes staged${NC}"
echo ""

echo "${BLUE}💾 Step 6: Committing changes...${NC}"
git commit -m "🚀 Deploy complete Mentyx platform for Austin demo

- Added complete platform component
- Created demo page at /demo
- Added Claude AI integration
- Configured API routes for document analysis"
echo "${GREEN}✓ Changes committed${NC}"
echo ""

echo "${BLUE}☁️  Step 7: Pushing to GitHub...${NC}"
git push origin main
echo "${GREEN}✓ Pushed to GitHub - Vercel will auto-deploy${NC}"
echo ""

echo ""
echo "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo "${GREEN}  🎉 Deployment Complete!${NC}"
echo "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo "${YELLOW}⏳ Vercel is now deploying your changes (2-3 minutes)${NC}"
echo ""
echo "${BLUE}📋 Manual Steps Remaining:${NC}"
echo ""
echo "1️⃣  Add Environment Variables in Vercel:"
echo "   → Go to: vercel.com → Your Project → Settings → Environment Variables"
echo "   → Add: ANTHROPIC_API_KEY = your-claude-api-key"
echo "   → Click 'Redeploy' after adding"
echo ""
echo "2️⃣  Configure Custom Domain (Optional):"
echo "   → Vercel: Add domain 'demo.mentyx.ai'"
echo "   → Cloudflare: Add CNAME record: demo → cname.vercel-dns.com"
echo ""
echo "3️⃣  Test Your Deployment:"
echo "   → Visit: https://mentyx-ai.vercel.app/demo"
echo "   → Or: https://demo.mentyx.ai (after domain setup)"
echo ""
echo "${GREEN}✅ You're ready for Friday's demo!${NC}"
echo ""
echo "${BLUE}📚 Need help?${NC}"
echo "   → Check the Deployment Guide document"
echo "   → All files are in /mnt/user-data/outputs/"
echo ""

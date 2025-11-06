import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req) {

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

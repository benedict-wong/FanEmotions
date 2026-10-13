import { NextResponse } from 'next/server'

export async function POST() {
  console.log({
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    hasToken: !!process.env.CLOUDFLARE_API_TOKEN,
  })
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      maxDurationSeconds: 3600,
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    console.error('Cloudflare API error:', data)
    return NextResponse.json({ error: data }, { status: response.status })
  }

  if (!data.success) {
    return NextResponse.json({ error: 'Failed to create direct upload URL' }, { status: 500 })
  }

  return NextResponse.json({
    uploadURL: data.result.uploadURL,
    uid: data.result.uid,
  })
}

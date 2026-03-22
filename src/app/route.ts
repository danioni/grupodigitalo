import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const html = readFileSync(join(process.cwd(), 'public', 'index.html'), 'utf-8')
  return new NextResponse(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

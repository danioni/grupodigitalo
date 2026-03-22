import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const secret = process.env.DASHBOARD_SECRET
  if (!secret) {
    return new NextResponse('DASHBOARD_SECRET no configurado', { status: 500 })
  }

  // Check cookie first
  const cookieAuth = request.cookies.get('dashboard-auth')?.value
  if (cookieAuth === secret) {
    return NextResponse.next()
  }

  // Check query param — if valid, set cookie and redirect
  const paramSecret = request.nextUrl.searchParams.get('secret')
  if (paramSecret === secret) {
    const url = new URL(request.nextUrl.pathname, request.url)
    const response = NextResponse.redirect(url)
    response.cookies.set('dashboard-auth', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: '/dashboard',
    })
    return response
  }

  // No auth — return 401 with simple login form
  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard — Acceso</title>
<style>
  body { font-family: Inter, system-ui, sans-serif; background: #09090b; color: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  form { background: #18181b; padding: 2rem; border-radius: 0.75rem; border: 1px solid #27272a; max-width: 360px; width: 100%; }
  h1 { font-size: 1.25rem; margin: 0 0 1.5rem; }
  input { width: 100%; padding: 0.625rem; border-radius: 0.5rem; border: 1px solid #3f3f46; background: #09090b; color: #fafafa; font-size: 0.875rem; box-sizing: border-box; }
  button { margin-top: 1rem; width: 100%; padding: 0.625rem; border-radius: 0.5rem; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; font-size: 0.875rem; }
  button:hover { background: #2563eb; }
</style>
</head>
<body>
<form method="GET">
  <h1>Dashboard Digitalo</h1>
  <input type="password" name="secret" placeholder="Clave de acceso" required autofocus />
  <button type="submit">Entrar</button>
</form>
</body></html>`

  return new NextResponse(html, {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

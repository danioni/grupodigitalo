/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/privacidad', destination: '/privacidad.html' },
      { source: '/terminos', destination: '/terminos.html' },
    ]
  },
}

module.exports = nextConfig

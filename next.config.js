// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//   images : {
//     domains : ['app.emitrasevakendra.com'] // <== Domain name
//   }
// }

// module.exports = nextConfig



/** @type {import('next').NextConfig} */
//const nextConfig = {}

const withPWA = require("next-pwa")({
  dest: "public",
  register:true,
  skipWaiting:true,
  // disable:process.env.NODE_ENV === "development" 
  // disable is help to disable PWA in deployment mode
});

const nextConfig = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }, 
   images : {
    domains : ['app.emitrasevakendra.com'] // <== Domain name
  }
// write additional configuration here.
});

module.exports = nextConfig;
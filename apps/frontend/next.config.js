module.exports = {
  async rewrites() {
    return [
      {
        source: '/strapi/uploads/:path',
        destination: `${process.env.CMS_BASE_URL}/uploads/:path`
      }
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['s1.static.esor.pzkosz.pl', 'localhost', 'local.zubry.pl', 'zubry.pl']
  },
  eslint: {
    dirs: ['pages', 'common', 'modules']
  }
};

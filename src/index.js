const BLOCKED_PATHS = new Set([
  '/README.md',
  '/wrangler.jsonc',
  '/package.json',
  '/package-lock.json',
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (
      BLOCKED_PATHS.has(pathname) ||
      pathname.startsWith('/.') ||
      pathname.startsWith('/src/')
    ) {
      return new Response('Not Found', { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};

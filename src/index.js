export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const preferredHost = 'websitebuildernish.com';

    // Normalize protocol and hostname so crawlers only see the canonical origin.
    if (url.protocol !== 'https:' || url.hostname === `www.${preferredHost}`) {
      url.protocol = 'https:';
      url.hostname = preferredHost;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

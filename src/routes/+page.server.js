import siteData from '$lib/data/siteData.json';

export async function load() {
  return {
    seo: siteData.seo,
    company: siteData.company,
    destinations: siteData.destinations,
    services: siteData.services,
    vizag: siteData.vizag
  };
}
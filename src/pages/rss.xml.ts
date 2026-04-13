import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const site =
    context.site == null
      ? "https://saitgumus.com"
      : typeof context.site === "string"
        ? context.site
        : context.site.href;

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site,
    items: posts.map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
    })),
  });
};

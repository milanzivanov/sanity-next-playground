import { sanityFetch, client } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";

import { notFound } from "next/navigation";
import { Post } from "@/components/Post";

// Override the default `useCdn` setting to ensure fresh data
// when generating static params
export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);

  // console.log("////////////// slugs", slugs);
  return slugs;
}

//
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  // const { data: post } = await sanityFetch({
  //   query: POST_QUERY,
  //   params: await params
  // });

  const post = await sanityFetch({
    query: POST_QUERY,
    params: await params,
    tags: [`post:${(await params).slug}`, "author", "category"]
    // revalidate: 3600
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}

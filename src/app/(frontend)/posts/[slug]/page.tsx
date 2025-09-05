import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/Post";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug }
  });

  if (!post && !(await draftMode()).isEnabled) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      {(await draftMode()).isEnabled && (
        <div className="rounded bg-yellow-50 text-yellow-800 px-3 py-2">
          Preview mode is ON (showing drafts). Changes in Studio update live.
        </div>
      )}
      {post ? <Post {...post} /> : <div>No draft found for this slug.</div>}
    </main>
  );
}

//
// import { sanityFetch } from "@/sanity/lib/live";
// import { POST_QUERY } from "@/sanity/lib/queries";

// import { notFound } from "next/navigation";
// import { Post } from "@/components/Post";

// export default async function Page({
//   params
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { data: post } = await sanityFetch({
//     query: POST_QUERY,
//     params: await params
//   });

//   if (!post) {
//     notFound();
//   }

//   return (
//     <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
//       <Post {...post} />
//     </main>
//   );
// }

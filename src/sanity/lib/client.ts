import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
  // stega: {
  //   studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
  // }
  // stega: { studioUrl: "/studio" }
  stega: {
    // enabled: true,
    studioUrl: "/studio"
  }
  // stega: {
  //   enabled: process.env.NODE_ENV === "development",
  //   studioUrl:
  //     process.env.NODE_ENV === "production"
  //       ? `https://${process.env.VERCEL_URL}/studio`
  //       : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`
  // }
});

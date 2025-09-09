import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";

import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header";

export default async function FrontendLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <section className="bg-white min-h-screen">
      <Header />
      {children}
      <SanityLive />
      {isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
      {/* {(await draftMode()).isEnabled && <VisualEditing />} */}
    </section>
  );
}

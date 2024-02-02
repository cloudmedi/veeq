"use client";
import PageIllustration from "@/components/page-illustration";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<>Loadng</>}>
      <main className="grow">
        <PageIllustration />

        {children}
      </main>
    </Suspense>
  );
}

"use client";
import Hero from "@/components/hero";
import Zigzag from "@/components/zigzag";
import Pricing from "@/components/pricing";
import Features from "@/components/features";
import SampleMusic from "@/components/sampleMusic";
import PageIllustration from "@/components/page-illustration";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Zigzag />
      <SampleMusic />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}

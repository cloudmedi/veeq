"use client";
import Hero from "@/components/hero";
import Zigzag from "@/components/zigzag";
import Pricing from "@/components/pricing";
import Features from "@/components/features";
import SampleMusic from "@/components/sampleMusic";

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <SampleMusic />
      <Features />
      <Pricing />
    </>
  );
}

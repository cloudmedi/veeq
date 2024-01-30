export const metadata = {
  title: "Hot Mastering",
  description: "Page description",
};
import Hero from "@/components/hero";
import Features from "@/components/features";
import Zigzag from "@/components/zigzag";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <Pricing />
    </>
  );
}

import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import CaseStudies from "@/components/sections/case-studies";
import Services from "@/components/sections/services";
import Process from "@/components/sections/process";
import TechStack from "@/components/sections/tech-stack";
import Testimonials from "@/components/sections/testimonials";
import About from "@/components/sections/about";
import CTA from "@/components/sections/cta";
import Footer from "@/components/sections/footer";
import SmoothScrollProvider from "@/components/animations/smooth-scroll";
import CustomCursor from "@/components/animations/custom-cursor";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <CaseStudies />
        <Services />
        <Process />
        <TechStack />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}

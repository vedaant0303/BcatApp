import React from "react";
import { Globe, Code, Layout, Smartphone, Zap, Search } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const WebDevelopmentPage = () => {
  const features = [
    { icon: <Globe size={28} />, title: "Responsive Design", description: "Pixel-perfect websites that look stunning on all devices and screen sizes." },
    { icon: <Code size={28} />, title: "Modern Tech Stack", description: "Built with React, Next.js, and cutting-edge frameworks for performance." },
    { icon: <Layout size={28} />, title: "Custom CMS", description: "Easy-to-use content management systems tailored to your workflow." },
    { icon: <Smartphone size={28} />, title: "Progressive Web Apps", description: "App-like experiences that work offline and load instantly." },
    { icon: <Zap size={28} />, title: "Performance Optimized", description: "Lightning-fast load times with Core Web Vitals optimization." },
    { icon: <Search size={28} />, title: "SEO Built-In", description: "Search engine optimized from the ground up for maximum visibility." }
  ];

  const stats = [
    { value: "200+", label: "Websites Launched" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "<2s", label: "Avg Load Time" },
    { value: "100+", label: "Happy Clients" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Software & Lab Apps" />
      <PageHero subtitle="Software & Lab Apps" title="Web Development" description="Beautiful, fast, and scalable websites and web applications that drive results and elevate your brand." gradient="from-[#3F51B5] to-[#1a0b1e]" icon={<Globe size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Expertise" title="Full-Stack Web Solutions" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Launch Your Website" description="Let's build a website that converts visitors into customers." buttonText="Start Project" />
    </PageWrapper>
  );
};

export default WebDevelopmentPage;

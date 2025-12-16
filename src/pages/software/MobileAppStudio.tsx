import React from "react";
import { Smartphone, Layers, Palette, Zap, Download, RefreshCw } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const MobileAppStudioPage = () => {
  const features = [
    { icon: <Smartphone size={28} />, title: "Native iOS & Android", description: "High-performance native apps for both major platforms." },
    { icon: <Layers size={28} />, title: "Cross-Platform", description: "React Native and Flutter development for cost-effective multi-platform reach." },
    { icon: <Palette size={28} />, title: "UI/UX Design", description: "Beautiful, intuitive interfaces that users love to interact with." },
    { icon: <Zap size={28} />, title: "Offline Capability", description: "Apps that work seamlessly even without internet connectivity." },
    { icon: <Download size={28} />, title: "App Store Optimization", description: "Strategic ASO to maximize downloads and visibility." },
    { icon: <RefreshCw size={28} />, title: "Ongoing Support", description: "Continuous updates, bug fixes, and feature enhancements." }
  ];

  const stats = [
    { value: "80+", label: "Apps Launched" },
    { value: "5M+", label: "Total Downloads" },
    { value: "4.8★", label: "Avg Rating" },
    { value: "iOS & Android", label: "Platforms" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Software & Lab Apps" />
      <PageHero subtitle="Software & Lab Apps" title="Mobile App Studio" description="Native and cross-platform mobile applications that delight users and drive engagement on iOS and Android." gradient="from-[#4CAF50] to-[#1a0b1e]" icon={<Smartphone size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Complete Mobile Development" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Launch Your App" description="From concept to app store, we'll bring your mobile vision to life." buttonText="Get Started" />
    </PageWrapper>
  );
};

export default MobileAppStudioPage;

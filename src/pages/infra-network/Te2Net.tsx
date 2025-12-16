import React from "react";
import { Network, Wifi, Globe, Signal, Server, Zap } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const Te2NetPage = () => {
  const features = [
    { icon: <Network size={28} />, title: "Enterprise Networking", description: "Scalable network infrastructure designed for growing businesses." },
    { icon: <Wifi size={28} />, title: "Wireless Solutions", description: "High-performance WiFi solutions for offices, campuses, and warehouses." },
    { icon: <Globe size={28} />, title: "WAN Optimization", description: "Optimize your wide area network for speed and reliability." },
    { icon: <Signal size={28} />, title: "Network Monitoring", description: "24/7 network monitoring with proactive issue resolution." },
    { icon: <Server size={28} />, title: "Network Design", description: "Custom network architecture tailored to your business needs." },
    { icon: <Zap size={28} />, title: "High Availability", description: "Redundant systems ensuring 99.99% uptime for critical operations." }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime Guarantee" },
    { value: "500+", label: "Networks Deployed" },
    { value: "10Gbps", label: "Max Throughput" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Infrastructure & Network" />
      <PageHero subtitle="Infrastructure & Network" title="Tez Net" description="Enterprise-grade networking solutions. Build a reliable, high-performance network infrastructure that powers your business operations." gradient="from-[#2196F3] to-[#1a0b1e]" icon={<Network size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Solutions" title="Network Infrastructure" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Ready to Upgrade Your Network?" description="Get a free network assessment and discover optimization opportunities." buttonText="Get Free Assessment" />
    </PageWrapper>
  );
};

export default Te2NetPage;

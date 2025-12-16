import React from "react";
import { Shield, Flame, Globe, Lock, Activity, FileCheck } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const FirewallPage = () => {
  const features = [
    { icon: <Flame size={28} />, title: "Next-Gen Firewall", description: "Advanced threat prevention with deep packet inspection and sandboxing." },
    { icon: <Globe size={28} />, title: "Web Filtering", description: "Block malicious websites and control internet access by category." },
    { icon: <Lock size={28} />, title: "VPN Gateway", description: "Secure remote access with enterprise VPN capabilities built-in." },
    { icon: <Activity size={28} />, title: "Traffic Analysis", description: "Real-time visibility into all network traffic and applications." },
    { icon: <Shield size={28} />, title: "Intrusion Prevention", description: "Automatic detection and blocking of network intrusion attempts." },
    { icon: <FileCheck size={28} />, title: "Policy Management", description: "Granular security policies with role-based access controls." }
  ];

  const stats = [
    { value: "10Gbps", label: "Throughput" },
    { value: "100K+", label: "Rules Supported" },
    { value: "99.99%", label: "Uptime" },
    { value: "24/7", label: "Managed Service" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Infrastructure & Network" />
      <PageHero subtitle="Infrastructure & Network" title="Firewall Solutions" description="Enterprise firewall solutions that protect your network perimeter while enabling secure business connectivity." gradient="from-[#FF5722] to-[#1a0b1e]" icon={<Shield size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Protection" title="Complete Perimeter Security" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Fortify Your Network" description="Deploy enterprise-grade firewall protection with our managed services." buttonText="Get Protected" />
    </PageWrapper>
  );
};

export default FirewallPage;

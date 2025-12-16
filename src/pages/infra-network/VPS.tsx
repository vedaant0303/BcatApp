import React from "react";
import { Server, HardDrive, Cloud, Cpu, Shield, Zap } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const VPSPage = () => {
  const features = [
    { icon: <Server size={28} />, title: "Managed VPS", description: "Fully managed virtual private servers with 24/7 expert support." },
    { icon: <HardDrive size={28} />, title: "SSD Storage", description: "Lightning-fast NVMe SSD storage for optimal performance." },
    { icon: <Cloud size={28} />, title: "Cloud Integration", description: "Seamless integration with major cloud providers." },
    { icon: <Cpu size={28} />, title: "Scalable Resources", description: "Instantly scale CPU, RAM, and storage as you grow." },
    { icon: <Shield size={28} />, title: "DDoS Protection", description: "Enterprise-grade DDoS protection included with every server." },
    { icon: <Zap size={28} />, title: "99.99% Uptime", description: "Industry-leading uptime SLA with guaranteed availability." }
  ];

  const stats = [
    { value: "1000+", label: "Servers Active" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "<10ms", label: "Avg Latency" },
    { value: "24/7", label: "Expert Support" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Infrastructure & Network" />
      <PageHero subtitle="Infrastructure & Network" title="VPS Solutions" description="High-performance virtual private servers. Get dedicated resources, full root access, and enterprise-grade reliability." gradient="from-[#00BCD4] to-[#1a0b1e]" icon={<Server size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Features" title="Enterprise VPS Hosting" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Ready to Deploy?" description="Spin up your VPS in minutes with our instant provisioning." buttonText="Get Started" />
    </PageWrapper>
  );
};

export default VPSPage;

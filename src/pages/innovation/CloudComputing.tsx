import React from "react";
import { Cloud, Server, Database, Lock, Gauge, ArrowUpDown } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const CloudComputingPage = () => {
  const features = [
    { icon: <Cloud size={28} />, title: "Cloud Migration", description: "Seamless transition from on-premises to cloud infrastructure." },
    { icon: <Server size={28} />, title: "Multi-Cloud Strategy", description: "Optimize workloads across AWS, Azure, and Google Cloud." },
    { icon: <Database size={28} />, title: "Cloud-Native Apps", description: "Build applications designed for cloud scalability and resilience." },
    { icon: <Lock size={28} />, title: "Cloud Security", description: "Comprehensive security posture management and compliance." },
    { icon: <Gauge size={28} />, title: "Cost Optimization", description: "Right-size resources and eliminate cloud waste." },
    { icon: <ArrowUpDown size={28} />, title: "Auto Scaling", description: "Automatically adjust capacity based on demand." }
  ];

  const stats = [
    { value: "200+", label: "Cloud Migrations" },
    { value: "40%", label: "Avg Cost Savings" },
    { value: "99.99%", label: "Uptime Achieved" },
    { value: "3", label: "Cloud Partners" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Innovation" />
      <PageHero subtitle="Innovation" title="Cloud Computing" description="Unlock the full potential of cloud technology with expert migration, optimization, and managed cloud services." gradient="from-[#00BCD4] to-[#1a0b1e]" icon={<Cloud size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Cloud" title="Cloud Transformation" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Move to the Cloud" description="Start your cloud journey with a free assessment." buttonText="Free Assessment" />
    </PageWrapper>
  );
};

export default CloudComputingPage;

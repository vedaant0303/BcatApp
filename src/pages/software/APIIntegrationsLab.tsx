import React from "react";
import { Plug, ArrowLeftRight, Database, Cloud, Lock, FileCode } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const APIIntegrationsLabPage = () => {
  const features = [
    { icon: <Plug size={28} />, title: "API Development", description: "RESTful and GraphQL APIs built for performance and scalability." },
    { icon: <ArrowLeftRight size={28} />, title: "System Integration", description: "Connect disparate systems with reliable, secure integrations." },
    { icon: <Database size={28} />, title: "Data Sync", description: "Real-time data synchronization across all your platforms." },
    { icon: <Cloud size={28} />, title: "Third-Party APIs", description: "Integration with popular services like Salesforce, SAP, and more." },
    { icon: <Lock size={28} />, title: "OAuth & Security", description: "Industry-standard authentication and authorization protocols." },
    { icon: <FileCode size={28} />, title: "API Documentation", description: "Clear, interactive documentation for easy adoption." }
  ];

  const stats = [
    { value: "500+", label: "APIs Developed" },
    { value: "1B+", label: "API Calls/Month" },
    { value: "99.9%", label: "Uptime" },
    { value: "50ms", label: "Avg Response" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Software & Lab Apps" />
      <PageHero subtitle="Software & Lab Apps" title="API & Integrations Lab" description="Connect your systems, automate workflows, and unlock the power of your data with custom API solutions." gradient="from-[#FF9800] to-[#1a0b1e]" icon={<Plug size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Capabilities" title="Seamless Connectivity" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Connect Everything" description="Let's map out your integration strategy and streamline your operations." buttonText="Discuss Integration" />
    </PageWrapper>
  );
};

export default APIIntegrationsLabPage;

import React from "react";
import { Network, Wifi, Globe, ArrowRightLeft, Settings, BarChart3 } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const SDVanSolutionPage = () => {
  const features = [
    { icon: <Network size={28} />, title: "Intelligent Routing", description: "AI-powered traffic routing for optimal performance across all locations." },
    { icon: <Wifi size={28} />, title: "Multi-Link WAN", description: "Aggregate multiple internet connections for redundancy and speed." },
    { icon: <Globe size={28} />, title: "Global Connectivity", description: "Connect branch offices worldwide with secure, reliable networking." },
    { icon: <ArrowRightLeft size={28} />, title: "Zero-Touch Deployment", description: "Deploy new sites in minutes with automated provisioning." },
    { icon: <Settings size={28} />, title: "Centralized Management", description: "Single dashboard to manage your entire network infrastructure." },
    { icon: <BarChart3 size={28} />, title: "Real-Time Analytics", description: "Deep visibility into network performance and application usage." }
  ];

  const stats = [
    { value: "500+", label: "Sites Connected" },
    { value: "40%", label: "Cost Reduction" },
    { value: "10x", label: "Faster Deployment" },
    { value: "99.9%", label: "Availability" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Infrastructure & Network" />
      <PageHero subtitle="Infrastructure & Network" title="SD-WAN Solution" description="Next-generation software-defined wide area networking. Simplify connectivity, reduce costs, and boost performance." gradient="from-[#9C27B0] to-[#1a0b1e]" icon={<Network size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Capabilities" title="Transform Your WAN" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Modernize Your Network" description="Get a free SD-WAN assessment and see how much you can save." buttonText="Request Assessment" />
    </PageWrapper>
  );
};

export default SDVanSolutionPage;

import React from "react";
import { FlaskConical, Beaker, Microscope, TestTube, Gauge, FileSpreadsheet } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const CatalystLabAppsPage = () => {
  const features = [
    { icon: <FlaskConical size={28} />, title: "LIMS Integration", description: "Seamless laboratory information management system integration." },
    { icon: <Beaker size={28} />, title: "Sample Tracking", description: "End-to-end sample tracking with barcode and RFID support." },
    { icon: <Microscope size={28} />, title: "Instrument Connect", description: "Direct integration with lab instruments for automated data capture." },
    { icon: <TestTube size={28} />, title: "Quality Control", description: "Built-in QC workflows with automated validation and alerts." },
    { icon: <Gauge size={28} />, title: "Real-Time Dashboards", description: "Live monitoring of lab operations and key performance metrics." },
    { icon: <FileSpreadsheet size={28} />, title: "Regulatory Compliance", description: "21 CFR Part 11 compliant with full audit trails." }
  ];

  const stats = [
    { value: "50+", label: "Labs Equipped" },
    { value: "1M+", label: "Samples Tracked" },
    { value: "40%", label: "Efficiency Gain" },
    { value: "100%", label: "Compliance Rate" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Software & Lab Apps" />
      <PageHero subtitle="Software & Lab Apps" title="Catalyst Lab Apps" description="Purpose-built laboratory applications that streamline workflows, ensure compliance, and accelerate research." gradient="from-[#00BCD4] to-[#1a0b1e]" icon={<FlaskConical size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Solutions" title="Lab Software Excellence" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Transform Your Lab" description="See how Catalyst can modernize your laboratory operations." buttonText="Book Demo" />
    </PageWrapper>
  );
};

export default CatalystLabAppsPage;

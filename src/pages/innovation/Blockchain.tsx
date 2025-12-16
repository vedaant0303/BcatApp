import React from "react";
import { Link2, Shield, FileCheck, Coins, Users, Database } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const BlockchainPage = () => {
  const features = [
    { icon: <Link2 size={28} />, title: "Smart Contracts", description: "Automated, self-executing contracts that reduce intermediaries." },
    { icon: <Shield size={28} />, title: "Secure Transactions", description: "Immutable and transparent transaction records for trust." },
    { icon: <FileCheck size={28} />, title: "Supply Chain Tracking", description: "End-to-end product traceability from origin to consumer." },
    { icon: <Coins size={28} />, title: "Tokenization", description: "Create digital assets and tokens for new business models." },
    { icon: <Users size={28} />, title: "Decentralized Apps", description: "Build dApps that run without centralized control." },
    { icon: <Database size={28} />, title: "Private Blockchains", description: "Enterprise blockchain networks for controlled environments." }
  ];

  const stats = [
    { value: "20+", label: "Blockchain Projects" },
    { value: "5M+", label: "Transactions" },
    { value: "100%", label: "Immutable Records" },
    { value: "3", label: "Chains Supported" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Innovation" />
      <PageHero subtitle="Innovation" title="Blockchain Solutions" description="Leverage distributed ledger technology for transparency, security, and new business models in the decentralized economy." gradient="from-[#FF9800] to-[#1a0b1e]" icon={<Link2 size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Blockchain" title="Decentralized Solutions" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Go Decentralized" description="Explore blockchain opportunities for your business." buttonText="Start Discussion" />
    </PageWrapper>
  );
};

export default BlockchainPage;

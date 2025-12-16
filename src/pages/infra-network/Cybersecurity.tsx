import React from "react";
import { ShieldCheck, Lock, Eye, AlertTriangle, FileSearch, UserCheck } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const CybersecurityPage = () => {
  const features = [
    { icon: <ShieldCheck size={28} />, title: "Threat Detection", description: "AI-powered threat detection that identifies and neutralizes attacks in real-time." },
    { icon: <Lock size={28} />, title: "Data Encryption", description: "End-to-end encryption for all your sensitive business data." },
    { icon: <Eye size={28} />, title: "24/7 Monitoring", description: "Round-the-clock security operations center watching your infrastructure." },
    { icon: <AlertTriangle size={28} />, title: "Incident Response", description: "Rapid response team ready to contain and remediate security breaches." },
    { icon: <FileSearch size={28} />, title: "Vulnerability Assessment", description: "Regular security audits and penetration testing to find weaknesses." },
    { icon: <UserCheck size={28} />, title: "Compliance Management", description: "Stay compliant with GDPR, HIPAA, PCI-DSS, and other regulations." }
  ];

  const stats = [
    { value: "1M+", label: "Threats Blocked" },
    { value: "99.9%", label: "Detection Rate" },
    { value: "<5min", label: "Response Time" },
    { value: "0", label: "Data Breaches" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Infrastructure & Network" />
      <PageHero subtitle="Infrastructure & Network" title="Cybersecurity" description="Comprehensive cybersecurity solutions to protect your business from evolving digital threats and ensure peace of mind." gradient="from-[#E91E63] to-[#1a0b1e]" icon={<ShieldCheck size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Protection" title="Enterprise-Grade Security" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Secure Your Business" description="Get a free security assessment and identify your vulnerabilities today." buttonText="Free Assessment" />
    </PageWrapper>
  );
};

export default CybersecurityPage;

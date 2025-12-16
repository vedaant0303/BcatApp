import React from "react";
import { Building2, Award, FileText, Briefcase, Users, Globe } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const CorporateBrandingPage = () => {
  const features = [
    { icon: <Building2 size={28} />, title: "Corporate Identity", description: "Complete visual identity systems for enterprises and corporations." },
    { icon: <Award size={28} />, title: "Brand Guidelines", description: "Comprehensive brand books ensuring consistency across all touchpoints." },
    { icon: <FileText size={28} />, title: "Collateral Design", description: "Business cards, letterheads, presentations, and corporate materials." },
    { icon: <Briefcase size={28} />, title: "Investor Decks", description: "Compelling pitch decks and investor presentations that close deals." },
    { icon: <Users size={28} />, title: "Internal Branding", description: "Employee engagement materials and internal communication design." },
    { icon: <Globe size={28} />, title: "Global Rollout", description: "Multi-market brand implementation and localization." }
  ];

  const stats = [
    { value: "200+", label: "Enterprises Served" },
    { value: "₹500Cr+", label: "Client Valuation" },
    { value: "15+", label: "Countries Reached" },
    { value: "100%", label: "Consistency Score" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      <PageHero subtitle="Design Studio" title="Corporate Branding" description="Enterprise-grade branding that commands respect. We build corporate identities that reflect your company's stature and vision." gradient="from-[#1a237e] to-[#1a0b1e]" icon={<Building2 size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Enterprise Brand Solutions" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Elevate Your Corporate Brand" description="Partner with us to build a brand that reflects your enterprise vision." buttonText="Schedule Consultation" />
    </PageWrapper>
  );
};

export default CorporateBrandingPage;

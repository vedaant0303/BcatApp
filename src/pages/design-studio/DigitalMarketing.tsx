import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Target, TrendingUp, BarChart3, DollarSign, Users, Search, Mail } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const DigitalMarketingPage = () => {
  const features = [
    { icon: <Search size={28} />, title: "SEO Optimization", description: "Dominate search rankings with data-driven SEO strategies that drive organic traffic." },
    { icon: <Target size={28} />, title: "PPC Advertising", description: "High-converting paid campaigns on Google, Facebook, Instagram, and more." },
    { icon: <Mail size={28} />, title: "Email Marketing", description: "Automated email sequences that nurture leads and drive conversions." },
    { icon: <TrendingUp size={28} />, title: "Growth Hacking", description: "Innovative tactics to accelerate your growth and outpace competitors." },
    { icon: <BarChart3 size={28} />, title: "Analytics & CRO", description: "Data analysis and conversion optimization to maximize your ROI." },
    { icon: <Users size={28} />, title: "Lead Generation", description: "Qualified lead generation strategies that fill your sales pipeline." }
  ];

  const stats = [
    { value: "₹47Cr+", label: "Revenue Generated" },
    { value: "8.5x", label: "Average ROAS" },
    { value: "150+", label: "Campaigns Managed" },
    { value: "35%", label: "Avg Cost Reduction" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      <PageHero
        subtitle="Design Studio"
        title="Digital Marketing"
        description="Data-driven digital marketing that delivers measurable results. We turn clicks into customers and campaigns into growth engines."
        gradient="from-[#FF5722] to-[#1a0b1e]"
        icon={<Megaphone size={40} className="text-white" />}
      />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Full-Funnel Marketing" description="From awareness to conversion, we optimize every step" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />
          ))}
        </div>
      </section>
      <CTASection title="Ready to Scale Your Growth?" description="Let's build a marketing machine that generates predictable revenue." buttonText="Get Your Free Audit" />
    </PageWrapper>
  );
};

export default DigitalMarketingPage;

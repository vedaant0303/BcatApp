import React from "react";
import { ShoppingCart, CreditCard, Package, TrendingUp, Users, Settings } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const ECommercePage = () => {
  const features = [
    { icon: <ShoppingCart size={28} />, title: "Custom Storefronts", description: "Beautiful, conversion-optimized online stores tailored to your brand." },
    { icon: <CreditCard size={28} />, title: "Payment Integration", description: "Secure payment processing with multiple gateways and methods." },
    { icon: <Package size={28} />, title: "Inventory Management", description: "Real-time inventory tracking and automated stock alerts." },
    { icon: <TrendingUp size={28} />, title: "Analytics & Insights", description: "Comprehensive dashboards to track sales and customer behavior." },
    { icon: <Users size={28} />, title: "Customer Management", description: "CRM features to build lasting customer relationships." },
    { icon: <Settings size={28} />, title: "Multi-Channel", description: "Sell on web, mobile, social media, and marketplaces from one platform." }
  ];

  const stats = [
    { value: "₹100Cr+", label: "GMV Processed" },
    { value: "50+", label: "Stores Launched" },
    { value: "35%", label: "Avg Conversion Lift" },
    { value: "24/7", label: "Store Uptime" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Software & Lab Apps" />
      <PageHero subtitle="Software & Lab Apps" title="E-Commerce Solutions" description="End-to-end e-commerce platforms that convert browsers into buyers and drive sustainable online growth." gradient="from-[#E91E63] to-[#1a0b1e]" icon={<ShoppingCart size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Platform" title="Complete E-Commerce Suite" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Start Selling Online" description="Launch your e-commerce store and reach customers worldwide." buttonText="Launch Store" />
    </PageWrapper>
  );
};

export default ECommercePage;

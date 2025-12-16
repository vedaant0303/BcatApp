import React from "react";
import { BarChart3, TrendingUp, PieChart, Target, LineChart, Activity } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const PerformanceAnalysisPage = () => {
  const features = [
    { icon: <BarChart3 size={28} />, title: "Marketing Analytics", description: "Deep dive into campaign performance across all channels." },
    { icon: <TrendingUp size={28} />, title: "Growth Metrics", description: "Track and optimize key growth indicators for your business." },
    { icon: <PieChart size={28} />, title: "Attribution Modeling", description: "Understand which channels drive conversions and revenue." },
    { icon: <Target size={28} />, title: "A/B Testing", description: "Data-driven experimentation to optimize conversion rates." },
    { icon: <LineChart size={28} />, title: "Predictive Analytics", description: "Forecast trends and make informed business decisions." },
    { icon: <Activity size={28} />, title: "Real-time Dashboards", description: "Custom dashboards for instant performance visibility." }
  ];

  const stats = [
    { value: "35%", label: "Avg Performance Lift" },
    { value: "100+", label: "Dashboards Built" },
    { value: "1B+", label: "Data Points Analyzed" },
    { value: "24/7", label: "Monitoring" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      <PageHero subtitle="Design Studio" title="Performance & Analysis" description="Turn data into decisions. We provide actionable insights that drive growth and maximize ROI." gradient="from-[#3F51B5] to-[#1a0b1e]" icon={<BarChart3 size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Data-Driven Insights" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Ready for Data-Driven Growth?" description="Let's unlock insights that transform your business performance." buttonText="Get Your Analysis" />
    </PageWrapper>
  );
};

export default PerformanceAnalysisPage;

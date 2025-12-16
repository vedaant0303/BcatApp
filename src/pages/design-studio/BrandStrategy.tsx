import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Users, Zap, CheckCircle, BarChart3, Award } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, ProcessStep, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const BrandStrategyPage = () => {
  const features = [
    {
      icon: <Target size={28} />,
      title: "Market Positioning",
      description: "Define your unique position in the market that sets you apart from competitors and resonates with your target audience."
    },
    {
      icon: <Lightbulb size={28} />,
      title: "Brand Identity Development",
      description: "Create a cohesive visual and verbal identity that communicates your brand's essence across all touchpoints."
    },
    {
      icon: <Users size={28} />,
      title: "Audience Research",
      description: "Deep dive into your target audience's psyche to understand their needs, desires, and decision-making process."
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Growth Strategy",
      description: "Develop actionable roadmaps that align your brand strategy with business objectives for sustainable growth."
    },
    {
      icon: <Zap size={28} />,
      title: "Brand Messaging",
      description: "Craft compelling narratives and key messages that connect emotionally with your audience."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Competitive Analysis",
      description: "Analyze your competitive landscape to identify opportunities and threats in your market."
    }
  ];

  const process = [
    { number: "01", title: "Discovery Session", description: "We dive deep into your business, goals, and vision through intensive workshops." },
    { number: "02", title: "Research & Analysis", description: "Comprehensive market research, competitor analysis, and audience insights." },
    { number: "03", title: "Strategy Development", description: "Create your unique brand positioning, messaging framework, and visual direction." },
    { number: "04", title: "Implementation Plan", description: "Detailed roadmap for rolling out your brand strategy across all channels." }
  ];

  const stats = [
    { value: "150+", label: "Brands Transformed" },
    { value: "3x", label: "Average ROI Increase" },
    { value: "92%", label: "Client Retention" },
    { value: "45", label: "Days to Launch" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      
      <PageHero
        subtitle="Design Studio"
        title="Brand Strategy"
        description="Transform your business with a powerful brand strategy that connects with your audience and drives measurable results. We don't just create brands—we build market leaders."
        gradient="from-[#8E609B] to-[#1a0b1e]"
        icon={<Target size={40} className="text-white" />}
      />

      <StatsSection stats={stats} />

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader
          label="What We Offer"
          title="Strategic Brand Solutions"
          description="Comprehensive brand strategy services designed to position your business for success"
        />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-black/30">
        <SectionHeader
          label="Our Process"
          title="How We Work"
          description="A proven methodology that delivers consistent results"
        />
        
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          {process.map((step, idx) => (
            <ProcessStep key={idx} number={step.number} title={step.title} description={step.description} index={idx} />
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader
          label="Results"
          title="What You Get"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {[
              "Complete Brand Strategy Document",
              "Visual Identity Guidelines",
              "Messaging Framework",
              "Competitor Analysis Report",
              "Audience Persona Profiles",
              "90-Day Implementation Roadmap",
              "Brand Voice & Tone Guide",
              "Social Media Strategy Blueprint"
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <CheckCircle className="text-[#FF5722] flex-shrink-0 w-5 h-5 md:w-6 md:h-6" />
                <span className="text-white text-sm md:text-base">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Brand?"
        description="Book a free strategy call and discover how we can help you build a brand that dominates your market."
        buttonText="Book Free Strategy Call"
      />
    </PageWrapper>
  );
};

export default BrandStrategyPage;

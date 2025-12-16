import React from "react";
import { Code2, Settings, Database, Workflow, Shield, Rocket } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const CustomSoftwareDevPage = () => {
  const features = [
    { icon: <Code2 size={28} />, title: "Bespoke Solutions", description: "Software built exactly to your specifications and business processes." },
    { icon: <Settings size={28} />, title: "System Integration", description: "Seamlessly connect with your existing tools and infrastructure." },
    { icon: <Database size={28} />, title: "Scalable Architecture", description: "Built to grow with your business using microservices and cloud-native design." },
    { icon: <Workflow size={28} />, title: "Agile Development", description: "Iterative development with regular demos and feedback cycles." },
    { icon: <Shield size={28} />, title: "Enterprise Security", description: "Security-first development with code audits and vulnerability testing." },
    { icon: <Rocket size={28} />, title: "Continuous Delivery", description: "Automated deployments and updates with zero downtime." }
  ];

  const stats = [
    { value: "100+", label: "Custom Apps Built" },
    { value: "15+", label: "Years Experience" },
    { value: "50+", label: "Technologies" },
    { value: "98%", label: "On-Time Delivery" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Software & Lab Apps" />
      <PageHero subtitle="Software & Lab Apps" title="Custom Software Development" description="Tailor-made software solutions designed to solve your unique business challenges and drive competitive advantage." gradient="from-[#673AB7] to-[#1a0b1e]" icon={<Code2 size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Process" title="End-to-End Development" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Build Your Solution" description="Let's discuss your requirements and create something extraordinary." buttonText="Start Conversation" />
    </PageWrapper>
  );
};

export default CustomSoftwareDevPage;

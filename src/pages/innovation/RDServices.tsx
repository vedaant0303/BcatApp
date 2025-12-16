import React from "react";
import { FlaskConical, Lightbulb, Target, Microscope, FileSearch, Rocket } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const RDServicesPage = () => {
  const features = [
    { icon: <FlaskConical size={28} />, title: "Technology Research", description: "Deep research into emerging technologies and their business applications." },
    { icon: <Lightbulb size={28} />, title: "Innovation Consulting", description: "Strategic guidance to foster innovation within your organization." },
    { icon: <Target size={28} />, title: "Proof of Concept", description: "Rapid prototyping to validate ideas before full-scale development." },
    { icon: <Microscope size={28} />, title: "Feasibility Studies", description: "Comprehensive analysis of technical and commercial viability." },
    { icon: <FileSearch size={28} />, title: "Patent Research", description: "IP landscape analysis and patent strategy development." },
    { icon: <Rocket size={28} />, title: "Tech Transfer", description: "Commercializing research outputs into market-ready products." }
  ];

  const stats = [
    { value: "100+", label: "R&D Projects" },
    { value: "15+", label: "Patents Filed" },
    { value: "30+", label: "Industry Partners" },
    { value: "85%", label: "Success Rate" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Innovation" />
      <PageHero subtitle="Innovation" title="R&D Services" description="Cutting-edge research and development services that turn innovative ideas into breakthrough products and solutions." gradient="from-[#9C27B0] to-[#1a0b1e]" icon={<FlaskConical size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Research Excellence" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Start Innovating" description="Partner with us to accelerate your R&D initiatives." buttonText="Explore Partnership" />
    </PageWrapper>
  );
};

export default RDServicesPage;

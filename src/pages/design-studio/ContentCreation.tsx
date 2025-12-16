import React from "react";
import { motion } from "framer-motion";
import { PenTool, FileText, Video, Mic, BookOpen, Edit3 } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const ContentCreationPage = () => {
  const features = [
    { icon: <PenTool size={28} />, title: "Copywriting", description: "Compelling copy that persuades, converts, and builds brand voice." },
    { icon: <FileText size={28} />, title: "Blog & Articles", description: "SEO-optimized content that establishes thought leadership." },
    { icon: <Video size={28} />, title: "Video Scripts", description: "Engaging scripts for ads, explainers, and brand videos." },
    { icon: <Mic size={28} />, title: "Podcast Production", description: "End-to-end podcast creation, editing, and distribution." },
    { icon: <BookOpen size={28} />, title: "E-books & Guides", description: "Long-form content that generates leads and builds authority." },
    { icon: <Edit3 size={28} />, title: "Social Content", description: "Platform-specific content that drives engagement and shares." }
  ];

  const stats = [
    { value: "5M+", label: "Words Written" },
    { value: "300+", label: "Brands Served" },
    { value: "85%", label: "Engagement Rate" },
    { value: "24/7", label: "Content Support" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      <PageHero
        subtitle="Design Studio"
        title="Content Creation"
        description="Words that work. We create compelling content that tells your story, engages your audience, and drives action."
        gradient="from-[#E91E63] to-[#1a0b1e]"
        icon={<PenTool size={40} className="text-white" />}
      />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Content That Converts" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />
          ))}
        </div>
      </section>
      <CTASection title="Need Content That Converts?" description="Let's create content that builds your brand and drives results." buttonText="Start Creating" />
    </PageWrapper>
  );
};

export default ContentCreationPage;

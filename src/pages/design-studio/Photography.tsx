import React from "react";
import { motion } from "framer-motion";
import { Camera, Video, Image, Aperture, Sun, Users } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const PhotographyPage = () => {
  const features = [
    { icon: <Camera size={28} />, title: "Product Photography", description: "Stunning product shots that make your products irresistible online." },
    { icon: <Video size={28} />, title: "Video Production", description: "Cinematic brand videos, commercials, and social media content." },
    { icon: <Users size={28} />, title: "Corporate Shoots", description: "Professional team photos, headshots, and office environment shoots." },
    { icon: <Image size={28} />, title: "Lifestyle Photography", description: "Authentic lifestyle imagery that tells your brand story." },
    { icon: <Aperture size={28} />, title: "Event Coverage", description: "Complete documentation of launches, conferences, and brand events." },
    { icon: <Sun size={28} />, title: "Food & Hospitality", description: "Appetizing food photography and hospitality visual content." }
  ];

  const stats = [
    { value: "10K+", label: "Photos Delivered" },
    { value: "500+", label: "Brands Served" },
    { value: "48hr", label: "Quick Turnaround" },
    { value: "4K", label: "Resolution Standard" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      <PageHero
        subtitle="Design Studio"
        title="Photography"
        description="Visual storytelling that captures your brand essence. Professional photography that elevates your brand and drives engagement."
        gradient="from-[#607D8B] to-[#1a0b1e]"
        icon={<Camera size={40} className="text-white" />}
      />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Professional Visual Content" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />
          ))}
        </div>
      </section>
      <CTASection title="Ready for Your Photoshoot?" description="Book a consultation to discuss your visual content needs." buttonText="Book a Session" />
    </PageWrapper>
  );
};

export default PhotographyPage;

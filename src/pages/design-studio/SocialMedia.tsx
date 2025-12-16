import React from "react";
import { motion } from "framer-motion";
import { Share2, Camera, TrendingUp, Users, Calendar, BarChart3, MessageCircle, Heart, CheckCircle } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, ProcessStep, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const SocialMediaPage = () => {
  const features = [
    {
      icon: <Calendar size={28} />,
      title: "Content Planning",
      description: "Strategic content calendars that keep your brand consistent and engaging across all platforms."
    },
    {
      icon: <Camera size={28} />,
      title: "Creative Production",
      description: "Scroll-stopping visuals, videos, and graphics that capture attention and drive engagement."
    },
    {
      icon: <Users size={28} />,
      title: "Community Management",
      description: "Build and nurture an engaged community that becomes loyal brand advocates."
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Growth Strategy",
      description: "Data-driven strategies to grow your following and increase reach organically."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Analytics & Reporting",
      description: "Comprehensive insights and monthly reports to track performance and ROI."
    },
    {
      icon: <MessageCircle size={28} />,
      title: "Influencer Partnerships",
      description: "Connect with the right influencers to amplify your brand message authentically."
    }
  ];

  const platforms = [
    { name: "Instagram", color: "#E1306C", followers: "Avg 45% Growth" },
    { name: "LinkedIn", color: "#0077B5", followers: "B2B Focus" },
    { name: "Facebook", color: "#1877F2", followers: "Community Building" },
    { name: "Twitter/X", color: "#1DA1F2", followers: "Real-time Engagement" },
    { name: "YouTube", color: "#FF0000", followers: "Video Content" },
    { name: "TikTok", color: "#000000", followers: "Viral Potential" }
  ];

  const stats = [
    { value: "2.5M+", label: "Reach Generated" },
    { value: "45%", label: "Avg Engagement Rate" },
    { value: "200+", label: "Brands Managed" },
    { value: "10x", label: "ROI on Ad Spend" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      
      <PageHero
        subtitle="Design Studio"
        title="Social Media Marketing"
        description="Turn your social media presence into a powerful growth engine. We create thumb-stopping content that builds communities and drives conversions."
        gradient="from-[#E1306C] to-[#1a0b1e]"
        icon={<Share2 size={40} className="text-white" />}
      />

      <StatsSection stats={stats} />

      {/* Platforms Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader
          label="Platforms"
          title="We Master Every Platform"
          description="Strategic presence across all major social platforms"
        />
        
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {platforms.map((platform, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-center group hover:border-white/30 transition-all"
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: platform.color }}
              >
                <Share2 size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
              <p className="text-gray-400 text-sm">{platform.followers}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-black/30">
        <SectionHeader
          label="Services"
          title="Full-Service Social Media"
          description="Everything you need to dominate social media"
        />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />
          ))}
        </div>
      </section>

      {/* Content Types */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader
          label="Content"
          title="Content That Converts"
        />
        
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            "Reels & Stories",
            "Carousels",
            "Video Content",
            "Live Sessions",
            "User Generated",
            "Infographics",
            "Memes & Trends",
            "Educational Posts"
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-[#8E609B]/20 to-transparent border border-white/10 text-center"
            >
              <span className="text-white font-medium text-sm md:text-base">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to Go Viral?"
        description="Let's create a social media strategy that makes your brand impossible to ignore."
        buttonText="Start Growing Today"
      />
    </PageWrapper>
  );
};

export default SocialMediaPage;

import React from "react";
import { motion } from "framer-motion";
import { Layers, MousePointer, Smartphone, Monitor, Palette, Users, Zap, CheckCircle } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, ProcessStep, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const UIUXPage = () => {
  const features = [
    {
      icon: <MousePointer size={28} />,
      title: "User Research",
      description: "Deep understanding of your users through interviews, surveys, and behavioral analysis."
    },
    {
      icon: <Layers size={28} />,
      title: "Wireframing & Prototyping",
      description: "Interactive prototypes that bring your ideas to life before development begins."
    },
    {
      icon: <Palette size={28} />,
      title: "Visual Design",
      description: "Stunning interfaces that balance aesthetics with functionality and brand consistency."
    },
    {
      icon: <Smartphone size={28} />,
      title: "Mobile-First Design",
      description: "Responsive designs that provide seamless experiences across all devices."
    },
    {
      icon: <Monitor size={28} />,
      title: "Design Systems",
      description: "Scalable design systems that ensure consistency as your product grows."
    },
    {
      icon: <Zap size={28} />,
      title: "Usability Testing",
      description: "Real user testing to validate designs and optimize conversion paths."
    }
  ];

  const process = [
    { number: "01", title: "Research & Discovery", description: "Understanding users, business goals, and competitive landscape." },
    { number: "02", title: "Information Architecture", description: "Structuring content and features for intuitive navigation." },
    { number: "03", title: "Wireframes & Prototypes", description: "Low and high-fidelity prototypes for testing and validation." },
    { number: "04", title: "Visual Design", description: "Pixel-perfect designs that delight users and strengthen brand." },
    { number: "05", title: "Handoff & Support", description: "Developer-ready specs and ongoing design support." }
  ];

  const stats = [
    { value: "40%", label: "Avg Conversion Lift" },
    { value: "500+", label: "Screens Designed" },
    { value: "60%", label: "Reduced Bounce Rate" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      
      <PageHero
        subtitle="Design Studio"
        title="UI/UX Design"
        description="Create digital experiences that users love. We design intuitive, beautiful interfaces that convert visitors into customers and customers into advocates."
        gradient="from-[#9C27B0] to-[#1a0b1e]"
        icon={<Layers size={40} className="text-white" />}
      />

      <StatsSection stats={stats} />

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader
          label="Services"
          title="End-to-End Design Services"
          description="From research to pixel-perfect designs, we handle it all"
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
          label="Process"
          title="Our Design Process"
          description="A systematic approach to creating exceptional user experiences"
        />
        
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          {process.map((step, idx) => (
            <ProcessStep key={idx} number={step.number} title={step.title} description={step.description} index={idx} />
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader
          label="Tools"
          title="Industry-Leading Tools"
        />
        
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
          {["Figma", "Sketch", "Adobe XD", "Principle", "Framer", "InVision", "Zeplin", "Maze"].map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to Elevate Your Digital Experience?"
        description="Let's create an interface that your users will love and that drives real business results."
        buttonText="Start Your Project"
      />
    </PageWrapper>
  );
};

export default UIUXPage;

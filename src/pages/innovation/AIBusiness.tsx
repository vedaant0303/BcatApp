import React from "react";
import { Brain, Bot, LineChart, Cog, MessageSquare, Eye } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const AIBusinessPage = () => {
  const features = [
    { icon: <Brain size={28} />, title: "Machine Learning", description: "Custom ML models trained on your data for predictive analytics." },
    { icon: <Bot size={28} />, title: "AI Chatbots", description: "Intelligent conversational agents for customer support and sales." },
    { icon: <LineChart size={28} />, title: "Predictive Analytics", description: "Forecast trends, demand, and business outcomes with AI." },
    { icon: <Cog size={28} />, title: "Process Automation", description: "Automate repetitive tasks with intelligent RPA solutions." },
    { icon: <MessageSquare size={28} />, title: "NLP Solutions", description: "Natural language processing for sentiment analysis and text mining." },
    { icon: <Eye size={28} />, title: "Computer Vision", description: "Image and video analysis for quality control and monitoring." }
  ];

  const stats = [
    { value: "50+", label: "AI Models Deployed" },
    { value: "40%", label: "Avg Efficiency Gain" },
    { value: "1M+", label: "Predictions/Day" },
    { value: "95%+", label: "Model Accuracy" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Innovation" />
      <PageHero subtitle="Innovation" title="AI for Business" description="Harness the power of artificial intelligence to automate processes, gain insights, and drive competitive advantage." gradient="from-[#2196F3] to-[#1a0b1e]" icon={<Brain size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="AI Solutions" title="Intelligence at Scale" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Embrace AI" description="Discover how AI can transform your business operations." buttonText="Get AI Assessment" />
    </PageWrapper>
  );
};

export default AIBusinessPage;

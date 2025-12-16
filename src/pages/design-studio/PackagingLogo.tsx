import React from "react";
import { Package, Palette, Printer, PenTool, Layers, Award } from "lucide-react";
import { PageWrapper, PageHero, SectionHeader, FeatureCard, CTASection, StatsSection, BackNav } from "../components/PageLayout";

const PackagingLogoPage = () => {
  const features = [
    { icon: <PenTool size={28} />, title: "Logo Design", description: "Iconic logos that capture your brand essence and stand the test of time." },
    { icon: <Package size={28} />, title: "Packaging Design", description: "Shelf-stopping packaging that sells your product before customers even touch it." },
    { icon: <Printer size={28} />, title: "Print Collateral", description: "Brochures, flyers, catalogs, and all print materials with premium finish." },
    { icon: <Palette size={28} />, title: "Label Design", description: "Product labels that comply with regulations while maximizing visual impact." },
    { icon: <Layers size={28} />, title: "Brand Extensions", description: "Merchandise, promotional items, and brand experience materials." },
    { icon: <Award size={28} />, title: "Premium Finishes", description: "Foiling, embossing, die-cuts, and special printing techniques." }
  ];

  const stats = [
    { value: "1000+", label: "Logos Created" },
    { value: "5000+", label: "Packages Designed" },
    { value: "50+", label: "Award Nominations" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  return (
    <PageWrapper>
      <BackNav category="Design Studio" />
      <PageHero subtitle="Design Studio" title="Packaging / Logo / Print" description="Tangible brand experiences. From logos to packaging to print, we create physical brand touchpoints that leave lasting impressions." gradient="from-[#E91E63] to-[#1a0b1e]" icon={<Package size={40} className="text-white" />} />
      <StatsSection stats={stats} />
      <section className="py-16 md:py-24 px-4 md:px-20 bg-[#1a0b1e]">
        <SectionHeader label="Services" title="Physical Brand Design" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (<FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} index={idx} />))}
        </div>
      </section>
      <CTASection title="Ready to Stand Out on Shelf?" description="Let's create packaging and print materials that make your brand unforgettable." buttonText="Start Your Project" />
    </PageWrapper>
  );
};

export default PackagingLogoPage;

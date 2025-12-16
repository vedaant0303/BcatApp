import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Glasses, TrendingUp, ArrowRight, Quote, CheckCircle, Sparkles, Eye, Store, Instagram, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

// Animated counter component
const AnimatedStat = ({ value, label, gradient }: { value: string; label: string; gradient: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    // Extract number and suffix from value (e.g., "340%" -> 340, "%")
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    
    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += targetNum / steps;
      if (current >= targetNum) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const displayNum = targetNum >= 100 ? Math.floor(current) : current.toFixed(1);
        setDisplayValue(`${displayNum}${suffix}`);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isInView, value]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        className={`text-4xl md:text-6xl font-bold ${gradient} bg-clip-text text-transparent mb-2`}
        style={{ fontFamily: 'Oswald, sans-serif' }}
      >
        {displayValue}
      </motion.div>
      <p className="text-gray-400 uppercase tracking-widest text-sm">{label}</p>
    </motion.div>
  );
};

const LuminousPage = () => {
  const results = [
    { value: "340%", label: "Revenue Growth" },
    { value: "2.5M+", label: "Social Reach" },
    { value: "150%", label: "Store Footfall" },
    { value: "45K+", label: "Units Sold" }
  ];

  const services = [
    { icon: <Eye size={20} />, name: "Brand Identity Design" },
    { icon: <Instagram size={20} />, name: "Social Media Strategy" },
    { icon: <TrendingUp size={20} />, name: "Influencer Marketing" },
    { icon: <ShoppingBag size={20} />, name: "E-commerce Development" },
    { icon: <Store size={20} />, name: "Retail Experience Design" },
    { icon: <Sparkles size={20} />, name: "Performance Marketing" }
  ];

  const timeline = [
    { phase: "Discovery", description: "Deep dive into Luminous's vision of making premium eyewear accessible to everyone." },
    { phase: "Strategy", description: "Developed a youth-centric brand positioning with focus on style and affordability." },
    { phase: "Execution", description: "Launched multi-channel campaign across Instagram, YouTube, and retail touchpoints." },
    { phase: "Growth", description: "Scaled from 2 stores to 15+ locations with 340% revenue increase in 18 months." }
  ];

  return (
    <div className="min-h-screen bg-[#1a0b1e] text-white overflow-x-hidden">
      {/* Hero Section - Split Design */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#1a0b1e]" />
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[70vh] md:min-h-[80vh]">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-cyan-900/50 px-4 py-2 rounded-full mb-6 border border-white/20"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-medium">Case Study • Eyewear Brand</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-bold mb-4 md:mb-6"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                LUMINOUS
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/70 mb-3 md:mb-4"
              >
                Premium Lens & Glasses Brand
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-white/60 mb-6 md:mb-8 max-w-lg"
              >
                How we transformed a local optical store into a thriving lifestyle eyewear brand with 340% revenue growth in just 18 months.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {["Branding", "Digital Marketing", "Retail Design"].map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/10 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right - Clean Animated Glasses */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative flex justify-center items-center h-[280px] md:h-[500px]"
            >
              {/* Subtle background glow */}
              <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              
              {/* Animated glasses container */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="scale-75 md:scale-100"
              >
                <svg 
                  width="320" 
                  height="140" 
                  viewBox="0 0 320 140" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left Lens */}
                  <motion.rect
                    x="20"
                    y="30"
                    width="110"
                    height="80"
                    rx="15"
                    stroke="white"
                    strokeWidth="4"
                    fill="rgba(6, 182, 212, 0.1)"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  
                  {/* Left lens reflection */}
                  <motion.rect
                    x="35"
                    y="40"
                    width="30"
                    height="8"
                    rx="4"
                    fill="white"
                    opacity="0.3"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Bridge */}
                  <motion.path
                    d="M130 65 C145 50, 175 50, 190 65"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  
                  {/* Right Lens */}
                  <motion.rect
                    x="190"
                    y="30"
                    width="110"
                    height="80"
                    rx="15"
                    stroke="white"
                    strokeWidth="4"
                    fill="rgba(6, 182, 212, 0.1)"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  
                  {/* Right lens reflection */}
                  <motion.rect
                    x="205"
                    y="40"
                    width="30"
                    height="8"
                    rx="4"
                    fill="white"
                    opacity="0.3"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Left Temple */}
                  <motion.path
                    d="M20 60 L-20 55"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                  
                  {/* Right Temple */}
                  <motion.path
                    d="M300 60 L340 55"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-20 bg-black/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {results.map((result, idx) => (
              <div key={idx}>
                <AnimatedStat
                  value={result.value}
                  label={result.label}
                  gradient="bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-transparent rounded-full" />
              <span className="text-red-400 font-bold uppercase tracking-widest text-sm">The Challenge</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-3 md:mt-4 mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                A Great Product, No Brand Story
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Luminous had premium quality eyewear but was perceived as just another optical store. They were losing customers to trendy D2C brands despite having better products. They needed a complete brand overhaul to connect with the younger demographic and stand out in a crowded market.
              </p>
            </motion.div>

            {/* The Solution */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-transparent rounded-full" />
              <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Our Solution</span>
              <h2 className="text-2xl md:text-4xl font-bold mt-3 md:mt-4 mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Lifestyle-First Brand Experience
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                We repositioned Luminous as a lifestyle brand, not an optical store. New visual identity, influencer partnerships, Instagram-worthy store redesigns, and a D2C website that made buying glasses as exciting as buying fashion accessories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Provided */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs md:text-sm">What We Did</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Services Provided
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors text-cyan-400 flex-shrink-0">
                  {service.icon}
                </div>
                <span className="text-base md:text-lg font-medium">{service.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs md:text-sm">The Journey</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              From Vision to Victory
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`relative pl-20 md:pl-0 pb-12 last:pb-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}
              >
                <div className={`absolute left-4 md:left-auto ${idx % 2 === 0 ? 'md:right-[-16px]' : 'md:left-[-16px]'} w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold z-10`}>
                  {idx + 1}
                </div>
                <motion.div 
                  className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10 hover:border-cyan-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">{item.phase}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          {/* Floating indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="w-3 h-3 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl md:rounded-3xl p-6 md:p-16 border border-white/10 overflow-hidden"
            style={{ transformPerspective: 1000 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <Quote size={40} className="text-cyan-500/30 absolute top-4 left-4 md:top-6 md:left-6" />
            
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base md:text-2xl font-light leading-relaxed mb-6 md:mb-8 text-white/90"
              >
                "Branding Catalyst didn't just redesign our brand—they redefined who we are. Our stores are now destinations, and customers come to us because they want to be part of the Luminous lifestyle. The 340% growth speaks for itself."
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-bold"
                >
                  RK
                </motion.div>
                <div>
                  <p className="font-bold text-lg">Rajesh Kumar</p>
                  <p className="text-gray-400">Founder, Luminous Eyewear</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Sparkles className="mx-auto mb-4 md:mb-6 text-cyan-400" size={32} />
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Ready to Transform Your Brand?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
            Let's create a success story like Luminous for your business.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-wider text-sm md:text-base hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Start Your Journey
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default LuminousPage;

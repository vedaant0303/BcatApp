import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gem, TrendingUp, ArrowRight, Quote, Sparkles, Heart, Crown, Star, Instagram, ShoppingBag, Camera } from "lucide-react";
import { Link } from "react-router-dom";

// Animated counter component
const AnimatedStat = ({ value, label, gradient }: { value: string; label: string; gradient: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    // Extract number and suffix from value (e.g., "520%" -> 520, "%")
    const match = value.match(/^([₹]?)([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    
    const prefix = match[1];
    const targetNum = parseFloat(match[2]);
    const suffix = match[3];
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
        setDisplayValue(`${prefix}${displayNum}${suffix}`);
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
        className={`text-4xl md:text-5xl font-bold ${gradient} bg-clip-text text-transparent mb-2`}
        style={{ fontFamily: 'Oswald, sans-serif' }}
      >
        {displayValue}
      </motion.div>
      <p className="text-yellow-200/60 uppercase tracking-widest text-sm">{label}</p>
    </motion.div>
  );
};

const KaafiPage = () => {
  const results = [
    { value: "520%", label: "Online Sales" },
    { value: "1.2M+", label: "Instagram Followers" },
    { value: "85%", label: "Repeat Customers" },
    { value: "₹15Cr", label: "Annual Revenue" }
  ];

  const services = [
    { icon: <Crown size={24} />, name: "Luxury Brand Positioning" },
    { icon: <Camera size={24} />, name: "Product Photography" },
    { icon: <Instagram size={24} />, name: "Social Media Management" },
    { icon: <ShoppingBag size={24} />, name: "E-commerce Platform" },
    { icon: <Heart size={24} />, name: "Influencer Partnerships" },
    { icon: <Sparkles size={24} />, name: "Packaging Design" }
  ];

  const gallery = [
    { title: "Eternal Collection", description: "Wedding jewelry line that became viral" },
    { title: "Minimalist Series", description: "Everyday elegance for modern women" },
    { title: "Heritage Revival", description: "Traditional designs with contemporary twist" }
  ];

  return (
    <div className="min-h-screen bg-[#1a0b1e] text-white overflow-x-hidden">
      {/* Hero Section - Elegant Design */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background with golden accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5A2B] via-[#6B4423] to-[#1a0b1e]" />
        
        {/* Shimmer effect */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(45deg, transparent 40%, rgba(255,215,0,0.1) 50%, transparent 60%)",
            backgroundSize: "200% 200%"
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating diamonds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-yellow-500/30 rotate-45"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: [45, 90, 45]
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[70vh] md:min-h-[80vh]">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-500/20"
              >
                <Gem size={14} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-200">Case Study • Luxury Jewellery</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-bold mb-4 md:mb-6"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  KAAFI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-yellow-200/70 mb-3 md:mb-4 italic"
              >
                "More than enough, it's Kaafi"
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-white/60 mb-6 md:mb-8 max-w-lg"
              >
                How we transformed a traditional jewellery store into India's most loved D2C jewellery brand with 520% growth in online sales.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {["Luxury Branding", "E-commerce", "Social Media"].map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-sm text-yellow-200">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right - Elegant Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative flex justify-center items-center"
            >
              <div className="relative">
                {/* Diamond shape */}
                <motion.div
                  className="w-48 h-48 md:w-72 md:h-72 rotate-45 bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 border border-yellow-500/30"
                  animate={{ rotate: [45, 50, 45] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="absolute inset-4 border border-yellow-500/20" />
                  <div className="absolute inset-8 border border-yellow-500/10" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center -rotate-0">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Gem size={60} className="text-yellow-400 md:w-20 md:h-20" />
                  </motion.div>
                </div>
                
                {/* Sparkles */}
                <motion.div
                  className="absolute -top-8 right-8"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={24} className="text-yellow-400" />
                </motion.div>
                <motion.div
                  className="absolute bottom-8 -left-8"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles size={20} className="text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section - Elegant */}
      <section className="py-12 md:py-20 bg-black/40 border-y border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {results.map((result, idx) => (
              <div key={idx}>
                <AnimatedStat
                  value={result.value}
                  label={result.label}
                  gradient="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Transformation Story */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <Gem className="mx-auto mb-3 md:mb-4 text-yellow-400" size={28} />
            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
              The Transformation
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl p-5 md:p-8 border border-red-500/20"
            >
              <span className="text-red-400 font-bold uppercase tracking-widest text-xs md:text-sm">The Challenge</span>
              <h3 className="text-xl md:text-2xl font-bold mt-3 md:mt-4 mb-3 md:mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Lost in the Crowd
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Kaafi had exquisite craftsmanship but no online presence. Competing against established brands and new-age D2C players, they were invisible to the young, digital-first audience who buys jewellery online. Their traditional marketing wasn't reaching the right people.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl p-5 md:p-8 border border-yellow-500/20"
            >
              <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs md:text-sm">Our Solution</span>
              <h3 className="text-xl md:text-2xl font-bold mt-3 md:mt-4 mb-3 md:mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Digital Luxury Experience
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                We created a complete digital ecosystem—stunning product photography, aspirational Instagram presence, influencer partnerships with fashion icons, and an e-commerce experience that felt as luxurious as walking into a high-end boutique.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services in Elegant Grid */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-yellow-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs md:text-sm">Our Craft</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Services Delivered
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
                whileHover={{ y: -5 }}
                className="group p-4 md:p-6 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 flex items-center justify-center mb-3 md:mb-4 text-yellow-400 group-hover:from-yellow-500/30 transition-all">
                  {service.icon}
                </div>
                <span className="text-base md:text-lg font-medium">{service.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs md:text-sm">The Work</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Collections We Launched
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {gallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-[3/4] bg-gradient-to-br from-yellow-900/30 to-[#1a0b1e] rounded-2xl overflow-hidden border border-yellow-500/10"
              >
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-500/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center">
                  <Gem size={36} className="text-yellow-500/50 mb-4 md:mb-6 md:w-12 md:h-12" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-yellow-950/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          {/* Floating indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl md:rounded-3xl p-6 md:p-16 border border-yellow-500/20 overflow-hidden"
            style={{ transformPerspective: 1000 }}
          >
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <Quote size={40} className="text-yellow-500/20 absolute top-4 left-4 md:top-6 md:left-6" />
            
            {/* Animated Stars */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                  className="mx-1"
                >
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="relative z-10 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-2xl font-light leading-relaxed mb-6 md:mb-8 text-white/90 italic"
              >
                "Branding Catalyst understood our legacy and translated it into a language that resonates with today's generation. Our grandmother's designs are now worn by influencers and celebrities. That's the magic they created."
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-xl font-bold text-black"
                >
                  AM
                </motion.div>
                <div className="text-left">
                  <p className="font-bold text-lg">Ananya Mehta</p>
                  <p className="text-yellow-200/60">Creative Director, Kaafi Jewels</p>
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
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Gem className="mx-auto mb-4 md:mb-6 text-yellow-400" size={32} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Let's Create Something Precious
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
            Your brand deserves to shine. Let's make it happen together.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-wider text-sm md:text-base hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
          >
            Start Your Journey
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default KaafiPage;

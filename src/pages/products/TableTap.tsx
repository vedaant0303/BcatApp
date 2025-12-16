import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UtensilsCrossed, TrendingUp, ArrowRight, Quote, Sparkles, Smartphone, CreditCard, Clock, Users, Star, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

// Animated counter component
const AnimatedStat = ({ value, label, gradient }: { value: string; label: string; gradient: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    // Extract number and suffix from value (e.g., "280%" -> 280, "%")
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

const TableTapPage = () => {
  const results = [
    { value: "280%", label: "Order Increase" },
    { value: "45min", label: "Avg Wait Reduced" },
    { value: "4.8★", label: "Customer Rating" },
    { value: "12", label: "New Locations" }
  ];

  const solutions = [
    { 
      icon: <Smartphone size={32} />, 
      title: "Digital Menu System",
      description: "QR-based interactive menus with real-time updates, dietary filters, and stunning food photography."
    },
    { 
      icon: <CreditCard size={32} />, 
      title: "Seamless Payments",
      description: "Integrated POS system with multiple payment options and split-bill functionality."
    },
    { 
      icon: <Clock size={32} />, 
      title: "Smart Queue Management",
      description: "AI-powered reservation system that reduced wait times by 45 minutes on average."
    },
    { 
      icon: <ChefHat size={32} />, 
      title: "Kitchen Display System",
      description: "Real-time order tracking from table to kitchen, eliminating order errors completely."
    }
  ];

  const beforeAfter = [
    { before: "Long queues", after: "Zero wait time" },
    { before: "Paper menus", after: "Digital experience" },
    { before: "Order mistakes", after: "100% accuracy" },
    { before: "Slow billing", after: "60-sec checkout" }
  ];

  return (
    <div className="min-h-screen bg-[#1a0b1e] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722] via-[#E64A19] to-[#1a0b1e]" />
        
        {/* Animated food pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating elements */}
        <motion.div 
          className="absolute top-40 right-20 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[70vh] md:min-h-[80vh]">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-sm font-medium">Case Study • Restaurant Chain</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-bold mb-4 md:mb-6"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                TABLE TAP
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/70 mb-3 md:mb-4"
              >
                Multi-Cuisine Restaurant Brand
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-white/60 mb-6 md:mb-8 max-w-lg"
              >
                How we revolutionized a traditional restaurant chain with cutting-edge digital solutions, increasing orders by 280% and expanding to 12 new locations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {["Digital Solutions", "UX Design", "Tech Integration"].map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/10 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative flex justify-center items-center"
            >
              <div className="relative">
                {/* Plate visual */}
                <motion.div
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="absolute inset-3 md:inset-4 rounded-full border-4 border-white/20 border-dashed" />
                  <div className="absolute inset-8 md:inset-12 rounded-full bg-white/10" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <UtensilsCrossed size={60} className="text-white md:w-20 md:h-20" />
                </div>
                
                {/* Floating badges */}
                <motion.div
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-yellow-500 text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  280% Growth
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-20 bg-black/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {results.map((result, idx) => (
              <div key={idx}>
                <AnimatedStat
                  value={result.value}
                  label={result.label}
                  gradient="bg-gradient-to-r from-orange-400 to-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-orange-400 font-bold uppercase tracking-widest text-xs md:text-sm">The Story</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              From Chaos to Seamless Dining
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4 md:mb-6">
                Table Tap was a beloved local restaurant struggling with growth. Long wait times, order errors, and outdated systems were hurting customer experience and limiting expansion.
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                We partnered with them to create a complete digital transformation—from QR-based ordering to smart kitchen management. The result? A restaurant experience so smooth that customers became advocates, driving organic growth across the city.
              </p>
            </motion.div>

            {/* Before/After */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              <div className="text-center">
                <p className="text-red-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">Before</p>
                {beforeAfter.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 md:p-4 mb-3"
                  >
                    <span className="text-red-300 text-sm md:text-base">{item.before}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-green-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">After</p>
                {beforeAfter.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 md:p-4 mb-3"
                  >
                    <span className="text-green-300 text-sm md:text-base">{item.after}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-orange-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-orange-400 font-bold uppercase tracking-widest text-xs md:text-sm">What We Built</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              The Complete Solution
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 md:p-8 border border-white/10 group-hover:border-orange-500/50 transition-all h-full">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-4 md:mb-6 text-white">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Floating indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="w-3 h-3 bg-orange-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-orange-500/20 to-yellow-500/10 rounded-2xl md:rounded-3xl p-6 md:p-16 border border-orange-500/20 overflow-hidden"
            style={{ transformPerspective: 1000 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <Quote size={40} className="text-orange-500/30 absolute top-4 left-4 md:top-6 md:left-6" />
            
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
                className="text-base md:text-2xl font-light leading-relaxed mb-6 md:mb-8 text-white/90"
              >
                "The transformation was incredible. What used to take 20 minutes from order to kitchen now happens instantly. Our customers love the new experience, and we've been able to open 12 new locations in just one year!"
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
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-xl font-bold"
                >
                  PS
                </motion.div>
                <div className="text-left">
                  <p className="font-bold text-lg">Priya Sharma</p>
                  <p className="text-gray-400">CEO, Table Tap Restaurants</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-t from-orange-950/30 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <UtensilsCrossed className="mx-auto mb-4 md:mb-6 text-orange-400" size={32} />
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Ready to Revolutionize Your Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
            Whether you're in food, retail, or any industry—we can transform your operations.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-wider text-sm md:text-base hover:shadow-lg hover:shadow-orange-500/25 transition-all"
          >
            Let's Talk
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default TableTapPage;

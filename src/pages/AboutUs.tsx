import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Heart, 
  Zap, 
  Globe, 
  TrendingUp,
  CheckCircle,
  Sparkles,
  Building2,
  Shield
} from "lucide-react";

// Beautiful animated logo component using CSS - smooth animations
const AnimatedLogoVisual = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Outer rotating ring - slower */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border-2 border-dashed border-white/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle rotating ring - opposite direction, slower */}
      <motion.div
        className="absolute w-60 h-60 rounded-full border border-[#8E609B]/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner pulsing ring - gentler */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border-2 border-[#FF5722]/20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Glowing backdrop - smoother pulse */}
      <motion.div
        className="absolute w-44 h-44 rounded-3xl bg-gradient-to-br from-[#8E609B]/30 to-[#FF5722]/20 blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main logo container */}
      <motion.div
        className="relative z-10"
        animate={{ 
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, -3, 0, 3, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* Card with BCPL branding */}
        <div 
          className="relative w-36 h-36 rounded-2xl flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #8E609B 0%, #6B4A75 50%, #5a3d62 100%)",
            boxShadow: "0 25px 50px -12px rgba(142, 96, 155, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset, inset 0 -4px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
          
          {/* Logo image with transparent background */}
          <motion.img 
            src="/bcpltransparent.png" 
            alt="BCPL Logo" 
            className="w-24 h-24 object-contain relative z-10"
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Shine effect - smoother and slower */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            style={{ transform: "skewX(-20deg)" }}
          />
        </div>
        
        {/* 3D shadow layers */}
        <div 
          className="absolute top-2 left-2 w-36 h-36 rounded-2xl bg-[#5a3d62] -z-10"
        />
        <div 
          className="absolute top-4 left-4 w-36 h-36 rounded-2xl bg-[#4a3252] -z-20"
        />
      </motion.div>
      
      {/* Floating accent icons - smoother motion */}
      <motion.div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lightbulb size={20} className="text-yellow-400" />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <TrendingUp size={20} className="text-green-400" />
      </motion.div>
      
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
        animate={{ x: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Heart size={20} className="text-pink-400" />
      </motion.div>
      
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Zap size={20} className="text-blue-400" />
      </motion.div>
      
      {/* Floating particles - smoother */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "#8E609B" : "#FF5722",
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4 + Math.random() * 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

const AboutUs = () => {
  const stats = [
    { value: "150+", label: "Brands Transformed", icon: <Sparkles size={24} /> },
    { value: "8+", label: "Years Experience", icon: <Award size={24} /> },
    { value: "50+", label: "Team Members", icon: <Users size={24} /> },
    { value: "12+", label: "Countries Served", icon: <Globe size={24} /> }
  ];

  const values = [
    {
      icon: <Lightbulb size={28} />,
      title: "Innovation First",
      description: "We push boundaries and embrace new technologies to deliver cutting-edge solutions that keep you ahead of the competition."
    },
    {
      icon: <Heart size={28} />,
      title: "Client-Centric",
      description: "Your success is our success. We build lasting partnerships and treat every project as if it were our own."
    },
    {
      icon: <Target size={28} />,
      title: "Results Driven",
      description: "We focus on measurable outcomes. Every strategy we craft is designed to deliver tangible ROI for your business."
    },
    {
      icon: <Shield size={28} />,
      title: "Integrity Always",
      description: "Transparency and honesty are the foundation of everything we do. No hidden agendas, just honest work."
    }
  ];

  const team = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      description: "Visionary leader with 15+ years in branding & technology"
    },
    {
      name: "Priya Kapoor",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      description: "Award-winning designer shaping brand identities"
    },
    {
      name: "Arjun Mehta",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      description: "Tech architect building scalable digital solutions"
    },
    {
      name: "Neha Gupta",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      description: "Growth strategist driving measurable results"
    }
  ];

  const timeline = [
    { year: "2017", title: "The Beginning", description: "From a campus placement at K.J. Somaiya came a spark, a belief that creativity and technology could build something bigger." },
    { year: "2019", title: "The Leap", description: "We registered our company and turned passion into purpose. No shortcuts. Just vision, work, and consistency." },
    { year: "2021", title: "The Expansion", description: "A new branch in Gujarat and a growing presence across India, USA, Canada, and Dubai  proof that good work travels fast." },
    { year: "2025", title: "The Milestone", description: "1500+ projects completed. 10+ products launched. And a journey that’s only getting stronger." }
  ];

  return (
    <div className="min-h-screen bg-[#1a0b1e] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[80vh] md:min-h-screen relative overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8E609B] via-[#6B4A75] to-[#1a0b1e]" />
        
        {/* Animated elements */}
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#FF5722]/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
              >
                <Building2 size={16} className="text-[#FF5722]" />
                <span className="text-sm font-medium">Our Story</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                WE ARE
                <br />
                <span className="bg-gradient-to-r from-[#FF5722] to-[#FF9800] bg-clip-text text-transparent">
                  BRANDING CATALYST
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl text-white/70 mb-6 md:mb-8 max-w-lg"
              >
                A full-service digital agency transforming businesses into brands that dominate markets. We blend creativity, technology, and strategy to deliver extraordinary results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-[#FF5722] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-[#FF5722]/25 transition-all"
                >
                  Work With Us <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

            {/* Right - Animated Logo Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <AnimatedLogoVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-black/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#8E609B]/20 to-[#FF5722]/20 flex items-center justify-center mx-auto mb-3 text-[#FF5722]">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#8E609B] to-[#FF5722] bg-clip-text text-transparent mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {stat.value}
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#FF5722] font-bold uppercase tracking-widest text-xs md:text-sm">Our Mission</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Catalyzing Growth Through Creative Excellence
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                We exist to transform ambitious businesses into market-leading brands. Our mission is to combine strategic thinking, creative excellence, and technological innovation to deliver results that exceed expectations.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Every project we undertake is an opportunity to create something extraordinary—something that not only looks stunning but drives real business growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10 hover:border-[#8E609B]/50 transition-all"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center mb-3 md:mb-4 text-white">
                      {value.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-[#8E609B]/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-[#FF5722] font-bold uppercase tracking-widest text-xs md:text-sm">Our Journey</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Every story starts somewhere. Ours started here!
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8E609B] via-[#FF5722] to-[#8E609B]" />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative pl-12 md:pl-0 pb-10 md:pb-12 last:pb-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}
              >
                <div className={`absolute left-0 md:left-auto ${idx % 2 === 0 ? 'md:right-[-20px]' : 'md:left-[-20px]'} w-10 h-10 rounded-full bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-sm font-bold z-10 shadow-lg shadow-[#8E609B]/30`}>
                  <CheckCircle size={18} />
                </div>
                <motion.div 
                  className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10 hover:border-[#FF5722]/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-[#FF5722] font-bold text-lg md:text-xl">{item.year}</span>
                  <h3 className="text-lg md:text-xl font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-[#FF5722] font-bold uppercase tracking-widest text-xs md:text-sm">The Team</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Meet the Catalysts
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              A passionate team of strategists, designers, developers, and marketers working together to transform your brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-5 md:p-6 border border-white/10 hover:border-[#8E609B]/50 transition-all overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#8E609B]/0 to-[#8E609B]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mx-auto mb-4 border-2 border-white/20 group-hover:border-[#8E609B] transition-colors">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-center">{member.name}</h3>
                  <p className="text-[#FF5722] text-sm text-center mb-2">{member.role}</p>
                  <p className="text-gray-400 text-xs md:text-sm text-center">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-t from-[#8E609B]/20 to-transparent">
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
            <Sparkles className="mx-auto mb-4 md:mb-6 text-[#FF5722]" size={40} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Ready to Transform Your Brand?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
            Let's create something extraordinary together. Your success story starts here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#8E609B] to-[#FF5722] text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-wider text-sm md:text-base hover:shadow-lg hover:shadow-[#8E609B]/25 transition-all"
          >
            Start Your Journey <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;

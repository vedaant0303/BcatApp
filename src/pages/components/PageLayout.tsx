import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Shared color configuration
export const COLORS = {
  primary: "#8E609B",
  secondary: "#E6D8EB",
  dark: "#1a0b1e",
  white: "#FFFFFF",
  orange: "#FF5722"
};

// Page Hero Section
export const PageHero = ({ 
  title, 
  subtitle, 
  description, 
  gradient = "from-[#8E609B] to-[#1a0b1e]",
  icon
}: { 
  title: string; 
  subtitle: string; 
  description: string; 
  gradient?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <section className={`min-h-[70vh] md:min-h-[80vh] pt-28 md:pt-36 pb-16 md:pb-20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${gradient}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] left-[-10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(255,87,34,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {icon && (
          <div className="mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 flex items-center justify-center mx-auto border border-white/30 shadow-lg">
              {icon}
            </div>
          </div>
        )}
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#FF5722] font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4"
        >
          {subtitle}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#FF5722] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-wider flex items-center gap-2 justify-center text-sm md:text-base"
          >
            Get Started <ArrowRight size={18} className="md:w-5 md:h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white/10 transition-colors text-sm md:text-base"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator - hide on mobile */}
      <motion.div 
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// Feature Card Component Props
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8E609B] to-[#FF5722] rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500 group-hover:duration-200" />
      
      <motion.div 
        className="relative p-5 md:p-8 rounded-2xl bg-gradient-to-br from-[#2a1a2e] to-[#1a0b1e] border border-white/10 group-hover:border-[#8E609B]/50 transition-all duration-300 h-full"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Icon container with animated gradient */}
        <motion.div 
          className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl mb-4 md:mb-6 overflow-hidden"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#8E609B] via-[#a855f7] to-[#FF5722]"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {icon}
          </div>
        </motion.div>

        {/* Title with underline animation */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 relative inline-block" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {title}
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF5722] to-[#8E609B]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
          />
        </h3>
        
        <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {/* Corner accent */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl group-hover:border-[#FF5722]/50 transition-colors duration-300" />
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl group-hover:border-[#8E609B]/50 transition-colors duration-300" />
      </motion.div>
    </motion.div>
  );
};

// Section Header Component
export const SectionHeader = ({ 
  label, 
  title, 
  description 
}: { 
  label?: string; 
  title: string; 
  description?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-20 relative px-4"
    >
      {/* Background decorative element */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #8E609B 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#8E609B]/20 to-[#FF5722]/20 border border-[#8E609B]/30">
            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
            <span className="text-[#8E609B] text-sm font-bold uppercase tracking-widest">{label}</span>
          </span>
        </motion.div>
      )}
      
      <motion.h2 
        className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 relative z-10" 
        style={{ fontFamily: 'Oswald, sans-serif' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
      
      {/* Animated underline */}
      <motion.div 
        className="flex items-center justify-center gap-2 mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-transparent to-[#8E609B]"
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div 
          className="w-3 h-3 rounded-full bg-[#FF5722]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
        />
        <motion.div 
          className="h-0.5 bg-gradient-to-l from-transparent to-[#8E609B]"
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Process Step Component Props
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index?: number;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ 
  number, 
  title, 
  description, 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="flex gap-4 md:gap-6 items-start"
    >
      <motion.div 
        className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white text-xl md:text-2xl font-bold"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: 'Oswald, sans-serif' }}
      >
        {number}
      </motion.div>
      <div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// CTA Section Component
export const CTASection = ({ 
  title, 
  description, 
  buttonText = "Get Started",
  onButtonClick
}: { 
  title: string; 
  description: string; 
  buttonText?: string;
  onButtonClick?: () => void;
}) => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10 bg-gradient-to-br from-[#8E609B]/20 to-[#FF5722]/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-16 border border-white/10"
      >
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{ 
            boxShadow: ["0 0 0 0 rgba(142, 96, 155, 0)", "0 0 60px 20px rgba(142, 96, 155, 0.1)", "0 0 0 0 rgba(142, 96, 155, 0)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {title}
        </h2>
        <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className="bg-[#FF5722] text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-wider text-sm md:text-lg flex items-center gap-2 md:gap-3 mx-auto"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

// Animated Stat Card Component
const AnimatedStatValue = ({ value }: { value: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract number, prefix (like ₹), and suffix (like +, K, M, hr, %)
    const match = value.match(/^([₹$€]?)(\d+\.?\d*)(.*?)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const numericPart = parseFloat(match[2]);
    const suffix = match[3] || "";
    const hasDecimal = match[2].includes(".");
    const decimalPlaces = hasDecimal ? match[2].split(".")[1]?.length || 0 : 0;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericPart * easedProgress;

      if (hasDecimal) {
        setDisplayValue(`${prefix}${currentValue.toFixed(decimalPlaces)}${suffix}`);
      } else {
        setDisplayValue(`${prefix}${Math.floor(currentValue)}${suffix}`);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div 
      ref={ref}
      className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#FF5722] mb-1 md:mb-2"
      style={{ fontFamily: 'Oswald, sans-serif' }}
    >
      {displayValue}
    </div>
  );
};

// Stats Section Component
export const StatsSection = ({ stats }: { stats: { value: string; label: string }[] }) => {
  return (
    <section className="py-10 md:py-16 border-y border-white/10 bg-[#1a0b1e]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center"
          >
            <AnimatedStatValue value={stat.value} />
            <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Back Navigation Component - No longer needed since navbar has home link
export const BackNav = ({ category }: { category: string }) => {
  return null; // Navbar logo now links to home
};

// Page Wrapper Component
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#1a0b1e] text-white">
      {children}
    </div>
  );
};

export default {
  PageHero,
  FeatureCard,
  SectionHeader,
  ProcessStep,
  CTASection,
  StatsSection,
  BackNav,
  PageWrapper,
  COLORS
};

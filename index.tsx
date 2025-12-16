import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowLeft, Menu, X, Star, TrendingUp, Newspaper, CheckCircle, Zap, BarChart3, Target, Calculator, AlertTriangle, ChevronRight, ChevronDown, Check, Play, Download, Ghost, Flame, Ban, ShieldCheck, XCircle, Quote, MoveRight, Globe, Smartphone, Server, Palette, Megaphone, ShoppingCart, Video, Search, Share2, Bot, Briefcase, Users } from "lucide-react";
import "./styles.css";

// Employee Management System
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { SocketProvider } from "./src/context/SocketContext";
import EmployeeLoginModal from "./src/components/EmployeeLoginModal";
import AdminDashboard from "./src/pages/AdminDashboard";
import EmployeeDashboard from "./src/pages/EmployeeDashboard";

// Slack-like Workspace
import { WorkspaceLayout } from "./src/components/slack";

// Import all pages
import BrandStrategy from "./src/pages/design-studio/BrandStrategy";
import SocialMedia from "./src/pages/design-studio/SocialMedia";
import UIUX from "./src/pages/design-studio/UIUX";
import DigitalMarketing from "./src/pages/design-studio/DigitalMarketing";
import Photography from "./src/pages/design-studio/Photography";
import ContentCreation from "./src/pages/design-studio/ContentCreation";
import PerformanceAnalysis from "./src/pages/design-studio/PerformanceAnalysis";
import CorporateBranding from "./src/pages/design-studio/CorporateBranding";
import PackagingLogo from "./src/pages/design-studio/PackagingLogo";

import Te2Net from "./src/pages/infra-network/Te2Net";
import VPS from "./src/pages/infra-network/VPS";
import SDVanSolution from "./src/pages/infra-network/SDVanSolution";
import Cybersecurity from "./src/pages/infra-network/Cybersecurity";
import Firewall from "./src/pages/infra-network/Firewall";

import WebDevelopment from "./src/pages/software/WebDevelopment";
import CatalystLabApps from "./src/pages/software/CatalystLabApps";
import CustomSoftwareDev from "./src/pages/software/CustomSoftwareDev";
import MobileAppStudio from "./src/pages/software/MobileAppStudio";
import APIIntegrationsLab from "./src/pages/software/APIIntegrationsLab";
import ECommerce from "./src/pages/software/ECommerce";

import Luminous from "./src/pages/products/Luminous";
import TableTap from "./src/pages/products/TableTap";
import Kaafi from "./src/pages/products/Kaafi";

import RDServices from "./src/pages/innovation/RDServices";
import AIBusiness from "./src/pages/innovation/AIBusiness";
import Blockchain from "./src/pages/innovation/Blockchain";
import CloudComputing from "./src/pages/innovation/CloudComputing";

import AboutUs from "./src/pages/AboutUs";

// Import blog posts
import DesignCaseStudies from "./src/pages/blogs/DesignCaseStudies";
import BrandGuidelines from "./src/pages/blogs/BrandGuidelines";
import EnterpriseNetwork from "./src/pages/blogs/EnterpriseNetwork";
import CybersecurityAssessment from "./src/pages/blogs/CybersecurityAssessment";
import CatalystLabSuite from "./src/pages/blogs/CatalystLabSuite";
import CustomSoftwareSolutions from "./src/pages/blogs/CustomSoftwareSolutions";
import AIPoweredSolutions from "./src/pages/blogs/AIPoweredSolutions";
import BlockchainWeb3 from "./src/pages/blogs/BlockchainWeb3";
import LuminousProduct from "./src/pages/blogs/LuminousProduct";
import TableTapProduct from "./src/pages/blogs/TableTapProduct";
import CloudComputingBlog from "./src/pages/blogs/CloudComputing";
import RDServicesBlog from "./src/pages/blogs/RDServices";

// --- Configuration ---
const COLORS = {
  primary: "#8E609B", // The Brand Purple
  secondary: "#E6D8EB", // Light Lavender
  dark: "#1a0b1e", // Deep Violet/Black background
  white: "#FFFFFF",
  dot: "#4A4A4A",
  orange: "#FF5722" // Bright Orange for CTA
};

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();

    if (isTouchDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.closest('.hover-trigger')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - (isHovering ? 40 : 10),
        y: mousePosition.y - (isHovering ? 40 : 10),
        scale: isHovering ? 1 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <motion.div 
        className="bg-white rounded-full"
        animate={{
          width: isHovering ? 80 : 20,
          height: isHovering ? 80 : 20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
};

const BrandLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="relative w-9 h-9 flex items-center justify-center">
      <img src="/bcpllogo_clean.svg" alt="BCPL Logo" className="w-9 h-9 object-contain" />
    </div>
    <span className="text-2xl font-bold tracking-tight leading-none text-white">
      Branding<span className="font-normal opacity-90">Catalyst</span>
    </span>
  </div>
);

// Animated Counter Hook
const useCountUp = (end: number, duration: number = 2, decimals: number = 0, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * end;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count: decimals > 0 ? count.toFixed(decimals) : Math.floor(count), ref };
};

// Animated Stat Card Component
const AnimatedStatCard = ({ 
  icon, 
  value, 
  prefix = "", 
  suffix = "", 
  label, 
  color,
  decimals = 0
}: { 
  icon: React.ReactNode; 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  label: string; 
  color: string;
  decimals?: number;
}) => {
  const { count, ref } = useCountUp(value, 2.5, decimals);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`flex items-center gap-2 mb-2 ${color}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.2 }}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          {icon}
        </motion.div>
        <motion.span 
          className="text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {prefix}{count}{suffix}
        </motion.span>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-sm uppercase tracking-widest text-gray-400"
      >
        {label}
      </motion.p>
    </div>
  );
};

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["IGNITING", "YOUR", "BRAND", "POTENTIAL"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0b1e] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 text-center mix-blend-difference">
        <AnimatePresence mode="wait">
          <motion.h1
            key={textIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="text-5xl sm:text-6xl md:text-9xl font-bold brand-font tracking-tighter text-white"
          >
            {words[textIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* The Catalyst Circle Expansion */}
      <motion.div
        initial={{ scale: 0 }}
        animate={textIndex === words.length - 1 ? { scale: 50 } : { scale: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute w-20 h-20 rounded-full"
        style={{ backgroundColor: COLORS.primary }}
      />
    </motion.div>
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Hide navbar on dashboard pages
  if (isDashboard) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubMenu(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    {
      title: "Design Studio",
      hasDropdown: true,
      items: [
        { name: "Brand Strategy", path: "/design-studio/brand-strategy" },
        { name: "Social Media Mark", path: "/design-studio/social-media" },
        { name: "UI/UX", path: "/design-studio/ui-ux" },
        { name: "Digital Marketing", path: "/design-studio/digital-marketing" },
        { name: "Photography", path: "/design-studio/photography" },
        { name: "Content Creation", path: "/design-studio/content-creation" },
        { name: "Performance & Analysis", path: "/design-studio/performance-analysis" },
        { name: "Corporate Branding", path: "/design-studio/corporate-branding" },
        { name: "Packaging / Logo / Print", path: "/design-studio/packaging-logo" }
      ],
      featuredCards: [
        {
          label: "Featured",
          title: "Latest Projects & Case Studies",
          description: "Explore our recent work and success stories",
          gradient: "from-[#8E609B] to-[#1a0b1e]",
          image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80",
          path: "/blog/design-case-studies"
        },
        {
          label: "Resources",
          title: "Brand Guidelines & Templates",
          description: "Download free branding resources",
          gradient: "from-[#FF5722] to-[#E64A19]",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
          path: "/blog/brand-guidelines"
        }
      ]
    },
    {
      title: "Infra & Network",
      hasDropdown: true,
      items: [
        { name: "Tez Net", path: "/infra-network/te2net" },
        { name: "VPS", path: "/infra-network/vps" },
        { name: "SD Van Solution", path: "/infra-network/sd-van-solution" },
        { name: "Cybersecurity", path: "/infra-network/cybersecurity" },
        { name: "Firewall", path: "/infra-network/firewall" }
      ],
      featuredCards: [
        {
          label: "Solutions",
          title: "Enterprise Network Architecture",
          description: "Scalable infrastructure for growing businesses",
          gradient: "from-[#2196F3] to-[#0D47A1]",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
          path: "/blog/enterprise-network"
        },
        {
          label: "Security",
          title: "Cybersecurity Assessment",
          description: "Protect your business from threats",
          gradient: "from-[#4CAF50] to-[#1B5E20]",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
          path: "/blog/cybersecurity-assessment"
        }
      ]
    },
    {
      title: "Software",
      hasDropdown: true,
      items: [
        { name: "Web Development", path: "/software/web-development" },
        { name: "Catalyst Lab Apps", path: "/software/catalyst-lab-apps" },
        { name: "Custom Software Dev", path: "/software/custom-software-dev" },
        { name: "Mobile App Studio", path: "/software/mobile-app-studio" },
        { name: "API & Integrations Lab", path: "/software/api-integrations-lab" },
        { name: "E-Commerce", path: "/software/e-commerce" }
      ],
      featuredCards: [
        {
          label: "Products",
          title: "Catalyst Lab Suite",
          description: "Our flagship laboratory management apps",
          gradient: "from-[#9C27B0] to-[#4A148C]",
          image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
          path: "/blog/catalyst-lab-suite"
        },
        {
          label: "Development",
          title: "Custom Software Solutions",
          description: "Tailored applications for your needs",
          gradient: "from-[#00BCD4] to-[#006064]",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
          path: "/blog/custom-software-solutions"
        }
      ]
    },
    {
      title: "Products",
      hasDropdown: true,
      items: [
        { name: "Luminous", path: "/products/luminous" },
        { name: "Table Tap", path: "/products/table-tap" },
        { name: "Kaafi", path: "/products/kaafi" }
      ],
      featuredCards: [
        {
          label: "Business Growth",
          title: "Digital Transformation Strategy",
          description: "How to modernize your business for 2025",
          gradient: "from-[#00BCD4] to-[#006064]",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
          path: "/blog/digital-transformation"
        },
        {
          label: "Success Stories",
          title: "Startup to Scale: Growth Blueprint",
          description: "Proven strategies for rapid business scaling",
          gradient: "from-[#673AB7] to-[#311B92]",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
          path: "/blog/startup-scaling"
        }
      ]
    },
     {
      title: "Innovation",
      hasDropdown: true,
      items: [
        { name: "R&D Services", path: "/innovation/rd-services" },
        { name: "AI (Business)", path: "/innovation/ai-business" },
        { name: "Blockchain", path: "/innovation/blockchain" },
        { name: "Cloud Computing", path: "/innovation/cloud-computing" }
      ],
      featuredCards: [
        {
          label: "Cloud Infrastructure",
          title: "Cloud Computing Solutions",
          description: "Cut IT costs by 70% with cloud migration",
          gradient: "from-[#03A9F4] to-[#0277BD]",
          image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
          path: "/blog/cloud-computing"
        },
        {
          label: "Research",
          title: "R&D Services",
          description: "Transform ideas into market-ready products",
          gradient: "from-[#9C27B0] to-[#4A148C]",
          image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
          path: "/blog/rd-services"
        }
      ]
    },
     {
      title: "About Us",
      hasDropdown: false,
      path: "/about"
    },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-40 transition-all duration-300 ${
          !isHomePage || scrolled 
            ? 'bg-[#1a0b1e]/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        } text-white`}
      >
        <Link to="/" className="hover-trigger">
          <BrandLogo />
        </Link>
        <div className="hidden md:flex gap-6 text-xs font-semibold tracking-widest uppercase items-center">
          {navItems.map((item) => (
            <div 
              key={item.title}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.hasDropdown ? (
                <button 
                  className="hover-trigger transition-colors hover:text-[#E6D8EB] flex items-center gap-1"
                >
                  {item.title}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                </button>
              ) : item.path ? (
                <Link 
                  to={item.path} 
                  className="hover-trigger transition-colors hover:text-[#E6D8EB]"
                >
                  {item.title}
                </Link>
              ) : (
                <a 
                  href={item.path} 
                  className="hover-trigger transition-colors hover:text-[#E6D8EB]"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>
        <button 
          className="md:hidden hover-trigger p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden bg-[#1a0b1e]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-full overflow-y-auto pt-24 pb-8 px-6"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="border-b border-white/10"
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileSubMenu(mobileSubMenu === item.title ? null : item.title)}
                          className="w-full flex items-center justify-between py-4 text-xl font-bold text-white uppercase tracking-wide"
                        >
                          {item.title}
                          <motion.div
                            animate={{ rotate: mobileSubMenu === item.title ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={20} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileSubMenu === item.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 pl-4 space-y-3">
                                {item.items?.map((subItem, subIdx) => (
                                  <motion.div
                                    key={subIdx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIdx * 0.03 }}
                                  >
                                    <Link
                                      to={subItem.path}
                                      className="flex items-center justify-between py-2 text-base text-[#E6D8EB] hover:text-[#FF5722] transition-colors group"
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileSubMenu(null);
                                      }}
                                    >
                                      <span>{subItem.name}</span>
                                      <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : item.path ? (
                      <Link
                        to={item.path}
                        className="block py-4 text-xl font-bold text-white uppercase tracking-wide"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        href={item.path}
                        className="block py-4 text-xl font-bold text-white uppercase tracking-wide"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal();
                  }}
                  className="w-full bg-[#FF5722] text-white py-4 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Get a Quote <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* Mobile Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <p className="text-gray-500 text-sm mb-2">Get in touch</p>
                <a href="mailto:hello@brandingcatalyst.com" className="text-white text-lg">
                  hello@brandingcatalyst.com
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Width Mega Dropdown */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-20 left-0 w-full bg-white z-50 shadow-2xl"
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
            style={{ mixBlendMode: 'normal' }}
          >
            <div className="max-w-7xl mx-auto px-8 py-12 flex gap-16">
              {/* Left Side - Menu Items in columns */}
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-x-12 gap-y-1" style={{ gridAutoFlow: 'column', gridTemplateRows: `repeat(${Math.ceil((navItems.find(item => item.title === activeDropdown)?.items?.length || 0) / 2)}, auto)` }}>
                  {navItems.find(item => item.title === activeDropdown)?.items?.map((subItem, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        to={subItem.path}
                        onClick={() => setActiveDropdown(null)}
                        className="block py-3 text-xl font-bold text-[#1a0b1e] hover:text-[#8E609B] transition-colors cursor-pointer whitespace-nowrap"
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        {subItem.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Featured Content Cards */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                {navItems.find(item => item.title === activeDropdown)?.featuredCards?.map((card, idx) => (
                  <Link
                    key={idx}
                    to={card.path}
                    onClick={() => setActiveDropdown(null)}
                    className="h-full"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      className="relative group overflow-hidden rounded-xl h-full min-h-[240px] cursor-pointer"
                    >
                      {card.image && (
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} ${card.image ? 'opacity-80' : ''}`}></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <span className="text-white/60 text-xs uppercase tracking-widest mb-2">{card.label}</span>
                        <h3 className="text-white text-xl font-bold line-clamp-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          {card.title}
                        </h3>
                        <p className="text-white/80 text-sm mt-2 line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Border Accent */}
            <div className="h-1 bg-gradient-to-r from-[#8E609B] via-[#FF5722] to-[#8E609B]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AnimatedInput = ({ label, type, placeholder, value, onChange, required = false }: any) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative group hover-trigger pt-6 pb-2">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-bold text-xs
          ${focused || value ? 'top-0 text-[#FF5722] text-[10px]' : 'top-6 text-gray-500'}
        `}
      >
        {label} {required && '*'}
      </label>
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-b border-white/20 py-2 text-xl text-white outline-none placeholder-transparent focus:border-transparent transition-colors font-light"
        placeholder={placeholder}
      />
      {/* Animated Bottom Border */}
      <motion.div 
        className="absolute bottom-2 left-0 h-[2px] bg-[#FF5722] pointer-events-none"
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

const FearSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-20 bg-black relative text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-1 rounded-full mb-4 md:mb-6 border border-red-500/20">
             <AlertTriangle size={16} />
             <span className="text-xs font-bold uppercase tracking-wide">Reality Check</span>
           </div>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold brand-font mb-4">
            93% of Indian Brands Will Stay <span className="text-red-500">Invisible</span> in 2025
          </h2>
          <p className="text-base md:text-xl text-gray-400">Here's why most businesses will fail to scale this year.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20">
          <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-[#111] hover:border-red-500/50 transition-colors group">
            <div className="bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
              <Ghost className="text-gray-400 group-hover:text-red-500 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold brand-font mb-2">No Clear Positioning</h3>
            <p className="text-sm md:text-base text-gray-400">You sound like everyone else. If your customer can't tell why you're different in 3 seconds, they leave.</p>
          </div>
          
          <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-[#111] hover:border-red-500/50 transition-colors group">
            <div className="bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
              <Ban className="text-gray-400 group-hover:text-red-500 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold brand-font mb-2">Generic Canva Logos</h3>
            <p className="text-sm md:text-base text-gray-400">Cheap branding signals a cheap product. Customers have zero trust in templates they've seen 100 times.</p>
          </div>

          <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-[#111] hover:border-red-500/50 transition-colors group">
            <div className="bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
              <XCircle className="text-gray-400 group-hover:text-red-500 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold brand-font mb-2">No Story, No Soul</h3>
            <p className="text-sm md:text-base text-gray-400">People buy stories, not specs. Without a narrative, you're just a commodity fighting a price war.</p>
          </div>

          <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-[#111] hover:border-red-500/50 transition-colors group">
            <div className="bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
              <Flame className="text-gray-400 group-hover:text-red-500" />
            </div>
            <h3 className="text-2xl font-bold brand-font mb-2">Burning Cash on Ads</h3>
            <p className="text-gray-400">Running ads without a brand foundation is like pouring water into a leaky bucket. You're just setting money on fire.</p>
          </div>
        </div>

        {/* The Reversal Guarantee */}
        <div className="relative border-2 border-[#8E609B] rounded-3xl p-8 md:p-12 text-center overflow-hidden">
           <div className="absolute inset-0 bg-[#8E609B]/5 z-0" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="bg-[#8E609B] text-white p-4 rounded-full">
                <ShieldCheck size={40} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl md:text-4xl font-bold brand-font text-white mb-2">
                  We fix all 4 in 45 days. Or you don’t pay.
                </h3>
                <p className="text-[#E6D8EB]">Our iron-clad guarantee. We build brands that convert, or we work for free.</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

const testimonialsData = [
  { id: 1, name: "Arjun Mehta", role: "Founder, Velvet Jewels", type: "Jewellery", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop", quote: "Our ROAS went from 2x to 8x after the rebrand. The team completely transformed our digital presence." },
  { id: 2, name: "Sarah Jenkins", role: "CMO, TechFlow SaaS", type: "SaaS", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop", quote: "Finally, our brand looks as expensive as our software. The positioning strategy was a game changer." },
  { id: 3, name: "Rajesh Kumar", role: "Director, Urban Living", type: "Real Estate", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop", quote: "We sold out 40% of our inventory pre-launch purely on the brand hype they created." },
  { id: 4, name: "Priya Sharma", role: "Founder, Earthly D2C", type: "D2C", img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=200&auto=format&fit=crop", quote: "The best investment we made in 2025. Period. Our conversion rates doubled in 30 days." },
  { id: 5, name: "David Chen", role: "CEO, NexaCorp", type: "Tech", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", quote: "Professional, creative, and data-driven. They don't just design, they understand business." },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && dragRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = dragRef.current.scrollWidth;
        const maxDrag = Math.max(0, contentWidth - containerWidth);
        setDragConstraints({ left: -maxDrag, right: 0 });
      }
    };
    
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <section className="py-16 md:py-32 px-4 md:px-0 bg-[#1a0b1e] overflow-hidden border-t border-white/5">
      <div className="px-0 md:px-20 mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
         >
            <h2 className="text-3xl md:text-6xl font-bold brand-font text-white mb-4">CLIENT LOVE</h2>
            <motion.div 
              className="h-1 bg-[#FF5722]" 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
         </motion.div>
         <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="text-gray-500 font-mono text-xs md:text-sm uppercase"
         >
           <motion.span
             animate={{ x: [0, 5, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="inline-block"
           >
             {window.innerWidth < 768 ? 'Swipe to explore →' : 'Drag to explore →'}
           </motion.span>
         </motion.div>
      </div>

      <motion.div 
        ref={containerRef} 
        className="flex gap-4 md:gap-6 pl-0 md:pl-20 cursor-grab active:cursor-grabbing overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <motion.div 
          ref={dragRef}
          drag="x" 
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          className="flex gap-4 md:gap-6 pr-4 md:pr-20"
        >
          {testimonialsData.map((t) => (
            <div key={t.id} className="min-w-[280px] md:min-w-[400px] bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-[#8E609B] transition-colors relative group flex flex-col justify-between">
              
              <div className="mb-4 md:mb-6">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#FF5722] mb-3 md:mb-4 opacity-50" />
                <p className="text-white/90 text-base md:text-xl font-light leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 md:gap-4 mt-auto pt-4 md:pt-6 border-t border-white/10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide text-sm">{t.name}</h4>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
                <div className="ml-auto">
                   <span className="bg-[#8E609B]/20 text-[#E6D8EB] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-[#8E609B]/30">{t.type}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

const ROICalculator = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    industry: "",
    revenue: "",
    hasAssets: null as boolean | null,
    hasAds: null as boolean | null
  });

  const industries = [
    { name: "Jewellery", icon: "💎", color: "#E91E63" },
    { name: "Fashion", icon: "👗", color: "#9C27B0" },
    { name: "D2C", icon: "📦", color: "#FF5722" },
    { name: "SaaS", icon: "💻", color: "#2196F3" },
    { name: "Real Estate", icon: "🏢", color: "#4CAF50" },
    { name: "Other", icon: "✨", color: "#8E609B" }
  ];

  const handleNext = () => {
    if (step === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const calculateLoss = () => {
    const rev = parseInt(data.revenue.replace(/[^0-9]/g, '')) || 0;
    // Assuming 20% loss annualized for dramatic effect
    const lower = ((rev * 12) * 0.15).toLocaleString('en-IN');
    const upper = ((rev * 12) * 0.30).toLocaleString('en-IN');
    return { lower, upper };
  };

  const loss = calculateLoss();

  return (
    <section className="py-16 md:py-24 px-4 md:px-20 bg-[#140816] relative overflow-hidden flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FF5722] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#FF5722]">
            <Calculator size={20} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Brand ROI Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold brand-font text-white leading-tight">
            Discover How Much Money You’re Leaving on the Table Because of <span className="text-gray-500 line-through decoration-[#FF5722]">Weak Branding</span>
          </h2>
        </div>

        <div className="bg-[#1a0b1e] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-2xl relative min-h-[380px] md:min-h-[500px] flex flex-col justify-center">
          {step < 4 && (
            <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex gap-2">
               {[0, 1, 2, 3].map(i => (
                 <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[#FF5722]' : 'bg-white/10'}`} />
               ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl md:text-3xl font-bold mb-6 md:mb-10 text-white uppercase text-center"
                >
                  What industry are you in?
                </motion.h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                  {industries.map((ind, idx) => (
                    <motion.button
                      key={ind.name}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        boxShadow: `0 20px 40px -15px ${ind.color}40`
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setData({...data, industry: ind.name}); handleNext(); }}
                      className="relative p-4 md:p-8 border border-white/10 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover-trigger text-left group overflow-hidden"
                      style={{ 
                        background: `linear-gradient(135deg, ${ind.color}10 0%, transparent 60%)` 
                      }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ 
                          background: `radial-gradient(circle at 50% 50%, ${ind.color}20 0%, transparent 70%)` 
                        }}
                      />
                      
                      {/* Icon */}
                      <motion.div 
                        className="text-2xl md:text-4xl mb-2 md:mb-4"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {ind.icon}
                      </motion.div>
                      
                      {/* Label */}
                      <span className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors relative z-10">
                        {ind.name}
                      </span>
                      
                      {/* Decorative corner accent */}
                      <div 
                        className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${ind.color} 0%, transparent 70%)`,
                          borderRadius: '0 1rem 0 100%'
                        }}
                      />
                      
                      {/* Bottom border accent on hover */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1 rounded-full"
                        style={{ backgroundColor: ind.color }}
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>
                
                {/* Subtle helper text */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-gray-500 text-sm mt-8"
                >
                  Select your industry to get personalized insights
                </motion.p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white uppercase">Current Monthly Revenue?</h3>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl text-gray-500 font-light">₹</span>
                  <input
                    type="text"
                    placeholder="5,00,000"
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 pl-10 text-4xl md:text-6xl text-white font-bold outline-none focus:border-[#FF5722] transition-colors"
                    value={data.revenue}
                    onChange={(e) => setData({...data, revenue: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && data.revenue && handleNext()}
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!data.revenue}
                  className="mt-12 bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#FF5722] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover-trigger"
                >
                  Next Step
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white uppercase">Do you have a professional logo & website?</h3>
                <div className="flex gap-6">
                  <button 
                    onClick={() => { setData({...data, hasAssets: true}); handleNext(); }}
                    className="flex-1 p-8 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-[#FF5722] transition-all text-center hover-trigger"
                  >
                    <CheckCircle className="mx-auto mb-4 w-12 h-12 text-gray-500" />
                    <span className="text-xl font-bold">Yes, I do</span>
                  </button>
                  <button 
                    onClick={() => { setData({...data, hasAssets: false}); handleNext(); }}
                    className="flex-1 p-8 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-[#FF5722] transition-all text-center hover-trigger"
                  >
                     <X className="mx-auto mb-4 w-12 h-12 text-gray-500" />
                    <span className="text-xl font-bold">No, not yet</span>
                  </button>
                </div>
              </motion.div>
            )}

             {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white uppercase">Are you running paid ads?</h3>
                <div className="flex gap-6">
                  <button 
                    onClick={() => { setData({...data, hasAds: true}); handleNext(); }}
                    className="flex-1 p-8 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-[#FF5722] transition-all text-center hover-trigger"
                  >
                    <CheckCircle className="mx-auto mb-4 w-12 h-12 text-gray-500" />
                    <span className="text-xl font-bold">Yes, running ads</span>
                  </button>
                  <button 
                    onClick={() => { setData({...data, hasAds: false}); handleNext(); }}
                    className="flex-1 p-8 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-[#FF5722] transition-all text-center hover-trigger"
                  >
                     <X className="mx-auto mb-4 w-12 h-12 text-gray-500" />
                    <span className="text-xl font-bold">No ads yet</span>
                  </button>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a0b1e] z-20"
              >
                <div className="w-16 h-16 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin mb-6" />
                <h3 className="text-2xl font-bold uppercase animate-pulse text-white">Calculating Lost Revenue...</h3>
                <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Analyzing {data.industry} Industry Benchmarks</p>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center"
              >
                 <div className="inline-flex items-center gap-2 bg-[#FF5722]/10 text-[#FF5722] px-4 py-1 rounded-full mb-6 border border-[#FF5722]/20">
                   <AlertTriangle size={16} />
                   <span className="text-xs font-bold uppercase tracking-wide">Critical Alert</span>
                 </div>
                 
                 <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                   You’re losing <span className="text-[#FF5722]">₹{loss.lower} – ₹{loss.upper}</span> per year
                 </h3>
                 <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                   Based on your revenue of ₹{data.revenue}/mo in the {data.industry} sector, weak branding is quietly killing your conversions.
                 </p>

                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-md mx-auto">
                    <h4 className="text-lg font-bold text-white mb-4 uppercase text-left">Get Your Custom Fix</h4>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Report Sent!"); }} className="space-y-4">
                      <input 
                        type="email" 
                        placeholder="Enter your work email" 
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#FF5722] transition-colors"
                        required
                      />
                      <button 
                        type="submit"
                        className="w-full bg-[#FF5722] text-white font-bold py-4 rounded-lg uppercase tracking-wider hover:bg-[#FF3D00] transition-colors hover-trigger flex items-center justify-center gap-2 group"
                      >
                        <span>Claim FREE 7-Page Report</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4">+ Includes a free 30-min strategy call</p>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Services data for the quote form
const QUOTE_SERVICES = [
  { id: "web-dev", name: "Website Design & Development", icon: Globe },
  { id: "mobile-app", name: "Mobile App Development", icon: Smartphone },
  { id: "it-infra", name: "IT Infrastructure & Support", icon: Server },
  { id: "branding", name: "Branding & Logo Design", icon: Palette },
  { id: "digital-marketing", name: "Digital Marketing & Lead Generation", icon: Megaphone },
  { id: "ecommerce", name: "E-commerce Website Setup", icon: ShoppingCart },
  { id: "video", name: "Videography & Photography", icon: Video },
  { id: "seo", name: "SEO & Google Ads Management", icon: Search },
  { id: "social-media", name: "Social Media Marketing & Content Creation", icon: Share2 },
  { id: "ai", name: "AI & Automation Solutions", icon: Bot },
  { id: "consulting", name: "Business & Brand Consulting", icon: Briefcase },
];

// EmailJS Configuration - Uses environment variables
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1); // Step 1: Details, Step 2: Services
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    services: [] as string[],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; phone?: string; services?: string; submit?: string}>({});

  const toggleService = (serviceId: string) => {
    setFormState(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
    if (errors.services) setErrors(prev => ({ ...prev, services: undefined }));
  };

  const validateStep1 = () => {
    const newErrors: {name?: string; phone?: string} = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {services?: string} = {};
    if (formState.services.length === 0) newErrors.services = "Please select at least one service";
    setErrors(prev => ({ ...prev, ...newErrors }));
    return formState.services.length > 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors(prev => ({ ...prev, services: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    setErrors(prev => ({ ...prev, submit: undefined }));

    // Get service names from IDs
    const selectedServiceNames = formState.services
      .map(id => QUOTE_SERVICES.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    // Prepare email template parameters
    const templateParams = {
      from_name: formState.name,
      from_email: formState.email || "Not provided",
      company: formState.company || "Not provided",
      phone: formState.phone,
      services: selectedServiceNames,
      message: `Quote request from ${formState.name}\n\nPhone: ${formState.phone}\nEmail: ${formState.email || "Not provided"}\nCompany: ${formState.company || "Not provided"}\n\nServices Requested:\n${selectedServiceNames}`,
    };

    try {
      // Send email using EmailJS
      const emailjs = (window as any).emailjs;
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormState({ name: "", email: "", company: "", phone: "", services: [] });
        setStep(1);
      }, 4000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrors(prev => ({ ...prev, submit: "Failed to send request. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-2xl mx-4 md:mx-0 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] md:max-h-[90vh] flex flex-col"
          >
            {/* Header - Fixed */}
            <div className="bg-gradient-to-r from-[#8E609B] to-[#6B4A75] p-4 md:p-6 text-white relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-10 -right-10" />
                <div className="absolute w-20 h-20 bg-white/5 rounded-full bottom-0 left-10" />
              </div>
              <motion.button 
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 md:top-4 right-3 md:right-4 z-50 text-white/70 hover:text-white transition-colors hover-trigger bg-white/10 p-2 rounded-full backdrop-blur-sm"
              >
                <X size={18} />
              </motion.button>
              <div className="relative z-10">
                <h2 className="text-xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Request a Quote
                </h2>
                <p className="text-white/70 text-xs md:text-sm">We'll get back to you within 24 hours</p>
                
                {/* Step Indicator */}
                {!isSubmitted && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${step === 1 ? 'bg-white text-[#8E609B]' : 'bg-white/20 text-white/70'}`}>
                      <span className="w-4 h-4 rounded-full bg-current flex items-center justify-center text-[10px]">
                        {step > 1 ? <Check size={10} className={step === 1 ? 'text-[#8E609B]' : 'text-white'} /> : '1'}
                      </span>
                      Details
                    </div>
                    <div className="w-6 h-0.5 bg-white/30 rounded" />
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${step === 2 ? 'bg-white text-[#8E609B]' : 'bg-white/20 text-white/70'}`}>
                      <span className="w-4 h-4 rounded-full bg-current flex items-center justify-center text-[10px]">2</span>
                      Services
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isSubmitted ? (
              <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  
                  {/* Step 1: Contact Details */}
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                          <p className="text-sm text-gray-500">Tell us how to reach you</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formState.name}
                              onChange={(e) => {
                                setFormState({...formState, name: e.target.value});
                                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                              }}
                              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-[#8E609B] focus:ring-2 focus:ring-[#8E609B]/20 outline-none transition-all text-gray-900 text-base`}
                              placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formState.phone}
                              onChange={(e) => {
                                setFormState({...formState, phone: e.target.value});
                                if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                              }}
                              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-[#8E609B] focus:ring-2 focus:ring-[#8E609B]/20 outline-none transition-all text-gray-900 text-base`}
                              placeholder="+91 98765 43210"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                            <input
                              type="email"
                              value={formState.email}
                              onChange={(e) => setFormState({...formState, email: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8E609B] focus:ring-2 focus:ring-[#8E609B]/20 outline-none transition-all text-gray-900 text-base"
                              placeholder="john@company.com"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Company</label>
                            <input
                              type="text"
                              value={formState.company}
                              onChange={(e) => setFormState({...formState, company: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8E609B] focus:ring-2 focus:ring-[#8E609B]/20 outline-none transition-all text-gray-900 text-base"
                              placeholder="Your Company"
                            />
                          </div>
                        </div>

                        {/* Next Button */}
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-[#8E609B] to-[#FF5722] text-white hover:shadow-lg hover:shadow-[#8E609B]/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Continue to Services <ArrowRight size={18} />
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: Services Selection */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">Select Services</h3>
                          <p className="text-sm text-gray-500">What can we help you with?</p>
                        </div>

                        {errors.services && <p className="text-red-500 text-xs">{errors.services}</p>}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {QUOTE_SERVICES.map((service) => {
                            const isSelected = formState.services.includes(service.id);
                            const IconComponent = service.icon;
                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => toggleService(service.id)}
                                className={`group flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-left hover-trigger ${
                                  isSelected 
                                    ? 'border-[#8E609B] bg-[#8E609B]/5 shadow-sm' 
                                    : 'border-gray-200 hover:border-[#8E609B]/40 hover:bg-gray-50'
                                }`}
                              >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                  isSelected ? 'bg-[#8E609B] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#8E609B]'
                                }`}>
                                  <IconComponent size={18} />
                                </div>
                                <span className={`text-sm font-medium flex-1 leading-tight ${isSelected ? 'text-[#8E609B]' : 'text-gray-600'}`}>
                                  {service.name}
                                </span>
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  isSelected ? 'border-[#8E609B] bg-[#8E609B]' : 'border-gray-300'
                                }`}>
                                  {isSelected && <Check size={12} className="text-white" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {formState.services.length > 0 && (
                          <div className="bg-[#8E609B]/5 rounded-xl p-3 border border-[#8E609B]/20">
                            <p className="text-xs text-[#8E609B] font-medium">
                              {formState.services.length} service{formState.services.length > 1 ? 's' : ''} selected
                            </p>
                          </div>
                        )}

                        {/* Error Message */}
                        {errors.submit && (
                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                            {errors.submit}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 py-3.5 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ArrowLeft size={18} /> Back
                          </button>
                          <button
                            type="submit"
                            disabled={formState.services.length === 0 || isLoading}
                            className={`flex-[2] py-3.5 rounded-xl font-bold transition-all duration-300 hover-trigger ${
                              formState.services.length > 0 && !isLoading
                                ? 'bg-gradient-to-r from-[#8E609B] to-[#FF5722] text-white hover:shadow-lg hover:shadow-[#8E609B]/25 hover:scale-[1.01] active:scale-[0.99]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {isLoading ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                Submit Request <ArrowRight size={18} />
                              </span>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  Request Sent!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-500 text-sm max-w-sm"
                >
                  Thank you <span className="font-semibold text-[#8E609B]">{formState.name}</span>! We'll contact you at <span className="font-medium">{formState.phone}</span> within 24 hours.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex items-center gap-2 text-xs text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Closing...
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 py-20 md:py-0">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div 
          className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-[128px] animate-pulse" 
          style={{ backgroundColor: COLORS.primary }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-900 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="text-[14vw] sm:text-[12vw] leading-[0.85] font-bold brand-font uppercase text-center tracking-tighter mix-blend-overlay text-[#E6D8EB]"
          >
            We Are The
          </motion.h1>
        </div>
        <div className="overflow-hidden">
           <motion.h1 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="text-[14vw] sm:text-[12vw] leading-[0.85] font-bold brand-font uppercase text-center tracking-tighter"
            style={{ color: COLORS.primary }}
          >
            Catalyst
          </motion.h1>
        </div>
      </div>

      <motion.div style={{ y: y1 }} className="absolute bottom-20 md:bottom-10 left-4 md:left-20 max-w-[200px] md:max-w-xs text-xs md:text-base font-light opacity-70 text-[#E6D8EB]">
        <p>REDEFINING DIGITAL EXPERIENCES THROUGH STRATEGIC INNOVATION AND BOLD CREATIVITY.</p>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-20 md:bottom-10 right-4 md:right-20">
         <ArrowRight className="w-8 h-8 md:w-12 md:h-12 rotate-90 text-white" />
      </motion.div>
    </section>
  );
};

const TrustSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-20 relative z-20 flex flex-col items-center text-center">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold brand-font mb-6 leading-tight text-white"
        >
          100+ Indian brands trust us to turn their vague ideas into <span className="text-[#FF5722]">money-printing machines</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#E6D8EB] opacity-80 text-base md:text-xl mb-10 md:mb-16"
        >
          (Jewellery, Fashion, D2C, SaaS & Real Estate)
        </motion.p>

        {/* Trust Signals Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 border-y border-white/10 py-8 md:py-12 mb-10 md:mb-16"
        >
          <AnimatedStatCard 
            icon={<Star fill="currentColor" className="w-6 h-6" />}
            value={4.9}
            suffix="/5"
            label="from 87+ clients"
            color="text-yellow-400"
            decimals={1}
          />
          
          <div className="flex flex-col items-center justify-center p-4 md:border-l md:border-r border-white/10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex items-center gap-2 mb-2 text-[#E6D8EB]"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <Newspaper className="w-6 h-6" />
              </motion.div>
              <span className="text-xl font-bold">Featured in</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="overflow-hidden"
            >
              <motion.p 
                className="text-xl font-bold text-white"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                YourStory, Inc42
              </motion.p>
            </motion.div>
          </div>
          
          <AnimatedStatCard 
            icon={<TrendingUp className="w-6 h-6" />}
            prefix="₹"
            value={47}
            suffix="Cr+"
            label="revenue generated"
            color="text-green-400"
          />
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0 w-full">
          <motion.button 
            onClick={onOpenModal}
            className="group relative hover-trigger text-left w-full md:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#FF5722]"
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(255, 87, 34, 0.7)", "0 0 0 20px rgba(255, 87, 34, 0)"],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <div className="relative bg-[#FF5722] text-white px-5 py-3 md:px-8 md:py-5 rounded-full flex flex-col items-center md:min-w-[320px]">
              <span className="text-sm md:text-xl font-bold uppercase tracking-wide text-center leading-tight">Book a FREE Brand ROI Audit</span>
              <span className="text-[10px] md:text-sm font-medium bg-black/20 px-2 md:px-3 py-1 rounded-full mt-1.5 md:mt-2 text-center">(Takes 15 mins) • ₹25,000 value, yours FREE</span>
            </div>
          </motion.button>

          <a href="#work" className="group hover-trigger w-full md:w-auto">
            <div className="border border-white/30 text-white px-5 py-3 md:px-8 md:py-5 rounded-full flex items-center justify-center gap-2 md:gap-3 hover:bg-white hover:text-black transition-all duration-300">
              <span className="text-sm md:text-lg font-semibold">See How We 10x’d Revenue</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

const Marquee = ({ text, direction = 1 }: { text: string, direction?: number }) => {
  const textContent = `${text} • ${text} • ${text} • ${text} • `;
  
  return (
    <div className="relative flex overflow-hidden py-6 md:py-10 text-[#1a0b1e] -rotate-1" style={{ backgroundColor: COLORS.secondary }}>
      <motion.div
        className="flex whitespace-nowrap brand-font text-3xl sm:text-5xl md:text-8xl font-bold uppercase"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <span className="px-4">{textContent}</span>
        <span className="px-4">{textContent}</span>
      </motion.div>
    </div>
  );
};

const projects = [
  { id: 1, title: "Nebula Stream", category: "Branding / UI", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Quantum Finance", category: "Fintech App", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Aero Dynamics", category: "Web Experience", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Cyber Pulse", category: "Campaign", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
];

const WorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const listY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="py-16 md:py-32 px-4 md:px-20 relative z-10" 
      style={{ backgroundColor: COLORS.dark }}
      onMouseMove={handleMouseMove} 
      ref={containerRef}
      id="work"
    >
      <motion.div style={{ y: headerY }} className="mb-10 md:mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-6xl font-bold brand-font mb-4 text-white"
        >
          {"SELECTED WORKS".split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div 
          className="h-1 bg-[#3D2B42]" 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div style={{ y: listY }} className="flex flex-col">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="group relative border-b border-[#3D2B42] py-6 md:py-12 flex justify-between items-center hover-trigger cursor-pointer md:cursor-none"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <h3 
              className="text-2xl md:text-6xl font-bold brand-font transition-colors duration-300 group-hover:pl-4 text-white"
            >
              <span className="group-hover:text-[#8E609B] transition-colors">{project.title}</span>
            </h3>
            <span className="text-xs md:text-lg font-light text-gray-400 group-hover:text-white transition-colors text-right">
              {project.category}
            </span>
            <ArrowUpRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#8E609B] w-8 h-8" />
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Image Reveal - Desktop only */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="fixed pointer-events-none z-30 overflow-hidden w-[300px] h-[200px] md:w-[400px] md:h-[300px] rounded-lg hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: mousePos.x - 200, 
              y: mousePos.y - 150,
              rotate: (mousePos.x - window.innerWidth / 2) / 50 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <img 
              src={projects.find(p => p.id === hoveredProject)?.img} 
              alt="Project Preview" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SolutionsAccordion = () => {
  const [activeItem, setActiveItem] = useState<number | null>(2); // Default to third item active like screenshot

  const solutions = [
    { id: 0, title: "Tech", subtitle: "Solution", desc: "Building scalable digital platforms." },
    { id: 1, title: "Media", subtitle: "Solution", desc: "Data-driven performance marketing." },
    { id: 2, title: "Research", subtitle: "Solution", desc: "We provide specialised market research for businesses using qualitative and quantitative methods. We integrate market research with our services to connect research, strategy and implementation." },
    { id: 3, title: "Creative", subtitle: "Solution", desc: "Award-winning campaigns & content." },
  ];

  return (
    <section className="min-h-screen md:h-[80vh] w-full flex flex-col md:flex-row bg-[#E6D8EB]">
      {solutions.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => setActiveItem(item.id)}
            onClick={() => setActiveItem(item.id)}
            initial={false}
            animate={{ 
              flex: isActive ? 3 : 1,
              backgroundColor: isActive ? '#E6D8EB' : '#F5F5F5'
            }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 1
            }}
            className="relative flex flex-col justify-center items-center overflow-hidden border-b md:border-b-0 md:border-r border-white/20 cursor-pointer min-h-[120px] md:min-h-0"
          >
            {/* Content Container */}
            <motion.div 
              initial={false}
              animate={{ 
                opacity: isActive ? 1 : 0.4
              }}
              whileHover={{ opacity: isActive ? 1 : 0.7 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center p-4 md:p-8 w-full"
            >
              <motion.h2 
                initial={false}
                animate={{ 
                  scale: isActive ? 1 : 0.85,
                  color: isActive ? '#8E609B' : '#9CA3AF'
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className={`font-bold brand-font uppercase leading-none mb-1 md:mb-2 ${isActive ? 'text-3xl md:text-7xl' : 'text-2xl md:text-5xl'}`}
              >
                {item.title}
              </motion.h2>
              <motion.h3
                initial={false}
                animate={{ 
                  scale: isActive ? 1 : 0.85,
                  color: isActive ? '#FFFFFF' : '#D1D5DB'
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className={`font-bold brand-font uppercase leading-none mb-4 md:mb-8 ${isActive ? 'text-2xl md:text-6xl' : 'text-xl md:text-4xl'}`}
              >
                 {item.subtitle}
              </motion.h3>

              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ 
                      duration: 0.35,
                      ease: "easeInOut"
                    }}
                    className="max-w-md"
                  >
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="text-white font-medium text-lg leading-relaxed mb-10"
                    >
                      {item.desc}
                    </motion.p>
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25, delay: 0.1 }}
                      className="w-16 h-16 rounded-full border border-white flex items-center justify-center mx-auto hover:bg-white hover:text-[#E6D8EB] transition-colors group"
                    >
                       <MoveRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
};

const GrowthPackages = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const packages = [
    {
      name: "Spark Starter",
      desc: "Perfect for startups <₹5Cr revenue",
      price: "₹1.5L – ₹2.5L",
      features: ["Logo & Visual Identity", "Custom Website", "Basic Ads Setup"],
      delivery: "21 days",
      popular: false,
      color: "#8E609B"
    },
    {
      name: "Growth Catalyst",
      desc: "For scaling brands ready to dominate",
      price: "₹4L – ₹8L",
      features: ["Everything in Spark", "Full Brand Strategy", "High-Converting Funnel", "90-Day Launch Plan"],
      delivery: "45–60 days",
      popular: true,
      color: "#FF5722"
    },
    {
      name: "Empire Builder",
      desc: "12-Month Strategic Partnership",
      price: "₹15L+",
      features: ["Done-With-You Partner", "We become your CMO", "Full Design Team Access"],
      delivery: "Ongoing",
      popular: false,
      color: "#8E609B"
    }
  ];

  return (
    <section id="packages" className="py-16 md:py-32 px-4 md:px-20 bg-[#1a0b1e] relative overflow-hidden">
       {/* Animated background gradient */}
       <motion.div 
         className="absolute inset-0 opacity-30"
         animate={{
           background: [
             "radial-gradient(circle at 20% 50%, rgba(142,96,155,0.3) 0%, transparent 50%)",
             "radial-gradient(circle at 80% 50%, rgba(142,96,155,0.3) 0%, transparent 50%)",
             "radial-gradient(circle at 20% 50%, rgba(142,96,155,0.3) 0%, transparent 50%)"
           ]
         }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* Header */}
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
         className="text-center mb-10 md:mb-20 relative z-10"
       >
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold brand-font text-white mb-6">
            Choose the Fastest Path to{" "}
            <motion.span 
              className="text-[#FF5722] inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              3x–10x Growth
            </motion.span>
          </h2>
       </motion.div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-stretch relative z-10">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: pkg.popular ? -16 : 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ y: pkg.popular ? -24 : -8, transition: { duration: 0.3 } }}
              className={`border ${pkg.popular ? 'border-[#FF5722] order-first md:order-none' : 'border-white/10'} p-6 md:p-8 rounded-2xl ${pkg.popular ? 'bg-[#8E609B]/10 shadow-[0_0_30px_rgba(142,96,155,0.2)]' : 'bg-white/5 hover:border-[#8E609B]'} transition-colors relative group h-full flex flex-col`}
            >
               {pkg.popular && (
                 <motion.div 
                   initial={{ scale: 0, y: 20 }}
                   whileInView={{ scale: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                   className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5722] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg whitespace-nowrap"
                 >
                   <motion.span
                     animate={{ opacity: [1, 0.7, 1] }}
                     transition={{ duration: 1.5, repeat: Infinity }}
                   >
                     Most Popular
                   </motion.span>
                 </motion.div>
               )}
               <h3 className={`${pkg.popular ? 'text-2xl md:text-4xl' : 'text-xl md:text-3xl'} font-bold brand-font text-white mb-2`}>{pkg.name}</h3>
               <p className="text-sm md:text-base text-[#E6D8EB] mb-4 md:mb-6">{pkg.desc}</p>
               <motion.div 
                 className={`${pkg.popular ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold mb-6 md:mb-8`}
                 style={{ color: pkg.color }}
                 whileHover={{ scale: 1.05 }}
               >
                 {pkg.price}
               </motion.div>
               <ul className={`space-y-3 md:space-y-4 mb-6 md:mb-8 ${pkg.popular ? 'text-white' : 'text-gray-300'} flex-grow text-sm md:text-base`}>
                 {pkg.features.map((feature, fIdx) => (
                   <motion.li 
                     key={fIdx}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.2 + fIdx * 0.1 }}
                     className="flex gap-3"
                   >
                     <motion.div
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: idx * 0.2 + fIdx * 0.1 + 0.1, type: "spring" }}
                     >
                       <Check size={20} style={{ color: pkg.color }} />
                     </motion.div>
                     {feature}
                   </motion.li>
                 ))}
               </ul>
               <div className="border-t border-white/10 pt-6 mt-auto">
                 <p className="text-sm text-gray-400">Delivery: <span className="text-white">{pkg.delivery}</span></p>
               </div>
               <motion.button 
                 onClick={onOpenModal} 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className={`w-full mt-8 ${pkg.popular ? 'bg-[#FF5722] text-white hover:bg-[#ff3d00] shadow-lg hover:shadow-orange-500/20' : 'border border-white/20 text-white hover:bg-white hover:text-black'} py-3 rounded-lg transition-colors font-bold uppercase tracking-wider`}
               >
                 {pkg.popular ? 'Get Started' : 'Select Plan'}
               </motion.button>
            </motion.div>
          ))}
       </div>
    </section>
  );
};

const Footer = ({ onOpenEmployeeLogin }: { onOpenEmployeeLogin?: () => void }) => {
  return (
    <footer id="contact" className="bg-[#1a0b1e] text-white pt-16 md:pt-32 pb-10 px-4 md:px-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-[12vw] md:text-[10vw] leading-none font-bold brand-font hover-trigger" 
            style={{ color: COLORS.primary }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {"LET'S TALK".split("").map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="inline-block"
                whileHover={{ y: -10, color: "#FF5722" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-2"
        >
          <motion.a 
            href="mailto:hello@brandingcatalyst.com" 
            className="text-lg md:text-2xl hover:text-[#8E609B] transition-colors hover-trigger break-all"
            whileHover={{ x: -10 }}
          >
            hello@brandingcatalyst.com
          </motion.a>
          <p className="text-sm md:text-base text-gray-500 mb-3">Based in the Cloud • Global Reach</p>
          <motion.button
            onClick={() => onOpenEmployeeLogin && onOpenEmployeeLogin()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8E609B] text-white rounded-lg hover:bg-[#6B4779] hover:shadow-lg transition-all text-sm font-semibold"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users size={16} />
            Employee Login
          </motion.button>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#3D2B42] pt-6 md:pt-10 text-xs md:text-sm text-gray-500"
      >
        <p className="text-center md:text-left">© 2025 Branding Catalyst. All rights reserved.</p>
        <div className="flex gap-4">
          {["Instagram", "LinkedIn", "Twitter"].map((social, idx) => (
            <motion.a 
              key={social}
              href="#" 
              className="hover:text-white transition-colors hover-trigger"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              whileHover={{ y: -3 }}
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}

// Home Page Component
const HomePage = ({ onOpenModal, onOpenEmployeeLogin }: { onOpenModal: () => void; onOpenEmployeeLogin: () => void }) => {
  return (
    <>
      <Hero />
      <Marquee text="STRATEGY • DESIGN • TECHNOLOGY • GROWTH" direction={1} />
      <TrustSection onOpenModal={onOpenModal} />
      <ROICalculator />
      <FearSection />
      <SolutionsAccordion />
      <WorkSection />
      <TestimonialsSection />
      <GrowthPackages onOpenModal={onOpenModal} />
      <Marquee text="CREATIVITY • INNOVATION • IMPACT • FUTURE" direction={-1} />
      <Footer onOpenEmployeeLogin={onOpenEmployeeLogin} />
    </>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If no user, redirect to home immediately using Navigate component
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Dashboard Router
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return user.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
};

// Floating Quote Button (hidden on dashboard)
const FloatingQuoteButton = ({ onClick }: { onClick: () => void }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      onClick={onClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9998] group hover-trigger"
      style={{ position: 'fixed' }}
    >
      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#FF5722]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 bg-gradient-to-r from-[#FF5722] to-[#FF7043] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full font-bold shadow-lg shadow-[#FF5722]/40 hover:shadow-xl hover:shadow-[#FF5722]/50 transition-all"
      >
        <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">Get a Quote</span>
        <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </motion.button>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeLoginOpen, setIsEmployeeLoginOpen] = useState(false);

  // Auto-open quote modal after 5 seconds
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <BrowserRouter>
      <AppContent 
        loading={loading}
        setLoading={setLoading}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEmployeeLoginOpen={isEmployeeLoginOpen}
        setIsEmployeeLoginOpen={setIsEmployeeLoginOpen}
      />
    </BrowserRouter>
  );
};

// Separate component inside BrowserRouter to use router hooks
const AppContent = ({ 
  loading, 
  setLoading, 
  isModalOpen, 
  setIsModalOpen,
  isEmployeeLoginOpen,
  setIsEmployeeLoginOpen 
}: {
  loading: boolean;
  setLoading: (v: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  isEmployeeLoginOpen: boolean;
  setIsEmployeeLoginOpen: (v: boolean) => void;
}) => {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/workspace');

  // Toggle body class for cursor visibility
  useEffect(() => {
    if (isWorkspace) {
      document.body.classList.add('workspace-page');
    } else {
      document.body.classList.remove('workspace-page');
    }
    return () => {
      document.body.classList.remove('workspace-page');
    };
  }, [isWorkspace]);

  return (
    <>
      {/* Hide CustomCursor on workspace pages */}
      {!isWorkspace && <CustomCursor />}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EmployeeLoginModal isOpen={isEmployeeLoginOpen} onClose={() => setIsEmployeeLoginOpen(false)} />
      
      <AnimatePresence>
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
          style={{ backgroundColor: isWorkspace ? '#ffffff' : COLORS.dark }}
        >
          {/* Hide Navbar on workspace pages */}
          {!isWorkspace && (
            <Navbar onOpenModal={() => setIsModalOpen(true)} />
          )}
          
          {/* Floating Get Quote Button - Hide on workspace pages */}
          {!isWorkspace && (
            <FloatingQuoteButton onClick={() => setIsModalOpen(true)} />
          )}
          
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage onOpenModal={() => setIsModalOpen(true)} onOpenEmployeeLogin={() => setIsEmployeeLoginOpen(true)} />} />
            
            {/* Employee Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            } />
            
            {/* Slack-like Workspace */}
            <Route path="/workspace/*" element={
              <ProtectedRoute>
                <WorkspaceLayout />
              </ProtectedRoute>
            } />
            
            {/* Design Studio Pages */}
            <Route path="/design-studio/brand-strategy" element={<BrandStrategy />} />
            <Route path="/design-studio/social-media" element={<SocialMedia />} />
            <Route path="/design-studio/ui-ux" element={<UIUX />} />
            <Route path="/design-studio/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/design-studio/photography" element={<Photography />} />
            <Route path="/design-studio/content-creation" element={<ContentCreation />} />
            <Route path="/design-studio/performance-analysis" element={<PerformanceAnalysis />} />
            <Route path="/design-studio/corporate-branding" element={<CorporateBranding />} />
            <Route path="/design-studio/packaging-logo" element={<PackagingLogo />} />
            
            {/* Infra & Network Pages */}
            <Route path="/infra-network/te2net" element={<Te2Net />} />
            <Route path="/infra-network/vps" element={<VPS />} />
            <Route path="/infra-network/sd-van-solution" element={<SDVanSolution />} />
            <Route path="/infra-network/cybersecurity" element={<Cybersecurity />} />
            <Route path="/infra-network/firewall" element={<Firewall />} />
            
            {/* Software Pages */}
            <Route path="/software/web-development" element={<WebDevelopment />} />
            <Route path="/software/catalyst-lab-apps" element={<CatalystLabApps />} />
            <Route path="/software/custom-software-dev" element={<CustomSoftwareDev />} />
            <Route path="/software/mobile-app-studio" element={<MobileAppStudio />} />
            <Route path="/software/api-integrations-lab" element={<APIIntegrationsLab />} />
            <Route path="/software/e-commerce" element={<ECommerce />} />
            
            {/* Products Pages */}
            <Route path="/products/luminous" element={<Luminous />} />
            <Route path="/products/table-tap" element={<TableTap />} />
            <Route path="/products/kaafi" element={<Kaafi />} />
            
            {/* Innovation Pages */}
            <Route path="/innovation/rd-services" element={<RDServices />} />
            <Route path="/innovation/ai-business" element={<AIBusiness />} />
            <Route path="/innovation/blockchain" element={<Blockchain />} />
            <Route path="/innovation/cloud-computing" element={<CloudComputing />} />
            
            {/* About Page */}
            <Route path="/about" element={<AboutUs />} />
            
            {/* Blog Pages */}
            <Route path="/blog/design-case-studies" element={<DesignCaseStudies />} />
            <Route path="/blog/brand-guidelines" element={<BrandGuidelines />} />
            <Route path="/blog/enterprise-network" element={<EnterpriseNetwork />} />
            <Route path="/blog/cybersecurity-assessment" element={<CybersecurityAssessment />} />
            <Route path="/blog/catalyst-lab-suite" element={<CatalystLabSuite />} />
            <Route path="/blog/custom-software-solutions" element={<CustomSoftwareSolutions />} />
            <Route path="/blog/ai-powered-solutions" element={<AIPoweredSolutions />} />
            <Route path="/blog/blockchain-web3" element={<BlockchainWeb3 />} />
            <Route path="/blog/digital-transformation" element={<LuminousProduct />} />
            <Route path="/blog/startup-scaling" element={<TableTapProduct />} />
            <Route path="/blog/cloud-computing" element={<CloudComputingBlog />} />
            <Route path="/blog/rd-services" element={<RDServicesBlog />} />
          </Routes>
        </motion.div>
      )}
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </AuthProvider>
);
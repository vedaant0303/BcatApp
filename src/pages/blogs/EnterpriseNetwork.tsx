import React from 'react';
import BlogPost from './BlogPost';
import { Server, Shield, Zap, Network } from 'lucide-react';

const EnterpriseNetwork = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" 
          alt="Enterprise network infrastructure"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Enterprise Network Architecture: Building Scalable Infrastructure
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        As your business grows, your network infrastructure becomes the backbone of operations. A poorly designed network leads to downtime, security vulnerabilities, and lost revenue. Here's how we architect enterprise networks that scale seamlessly.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-[#2196F3]" size={28} />
            <h3 className="text-xl font-bold">99.99% Uptime</h3>
          </div>
          <p className="text-gray-400">
            Redundant systems and failover mechanisms ensure uninterrupted operations.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Server className="text-[#2196F3]" size={28} />
            <h3 className="text-xl font-bold">Auto-Scaling</h3>
          </div>
          <p className="text-gray-400">
            Infrastructure that grows with your business demands automatically.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-[#2196F3]" size={28} />
            <h3 className="text-xl font-bold">Military-Grade Security</h3>
          </div>
          <p className="text-gray-400">
            Multi-layer security protocols protecting your critical data.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Why Traditional Networks Fail Growing Businesses
      </h3>

      <div className="space-y-4 mb-8">
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">Single Points of Failure</h4>
          <p className="text-gray-300">
            One server crash = entire business operations halt. Traditional setups lack redundancy, costing companies an average of ₹5.6 lakh per hour of downtime.
          </p>
        </div>
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">No Scalability</h4>
          <p className="text-gray-300">
            You're locked into fixed capacity. Traffic spike? Sales surge? Your infrastructure buckles under pressure, losing customers and revenue.
          </p>
        </div>
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">Security Vulnerabilities</h4>
          <p className="text-gray-300">
            Legacy systems with outdated security expose you to ransomware, data breaches, and compliance violations. The average breach costs ₹17.9 crore.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Our Enterprise Network Architecture Framework
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        We design networks with five core principles that ensure reliability, security, and scalability:
      </p>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#2196F3]">
          <h4 className="text-xl font-bold mb-3">1. Redundancy at Every Layer</h4>
          <p className="text-gray-300">
            Multiple servers, backup power systems, and geographic distribution ensure if one component fails, operations continue seamlessly. Your customers never experience downtime.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#2196F3]">
          <h4 className="text-xl font-bold mb-3">2. Elastic Scalability</h4>
          <p className="text-gray-300">
            Cloud-native architecture with auto-scaling capabilities. During peak traffic, resources expand automatically. During quiet periods, scale down to save costs—paying only for what you use.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#2196F3]">
          <h4 className="text-xl font-bold mb-3">3. Zero-Trust Security Model</h4>
          <p className="text-gray-300">
            Every access request is verified, every connection encrypted. Multi-factor authentication, micro-segmentation, and continuous monitoring prevent unauthorized access.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#2196F3]">
          <h4 className="text-xl font-bold mb-3">4. Performance Optimization</h4>
          <p className="text-gray-300">
            Load balancers distribute traffic efficiently. CDN integration ensures fast content delivery globally. Database caching reduces latency. Users experience blazing-fast performance.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#2196F3]">
          <h4 className="text-xl font-bold mb-3">5. Proactive Monitoring & Maintenance</h4>
          <p className="text-gray-300">
            24/7 automated monitoring detects issues before they impact users. Predictive analytics identify potential failures. Our team responds within minutes, not hours.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#2196F3]/20 to-[#0D47A1]/20 p-8 rounded-xl border border-[#2196F3]/30 my-12">
        <h3 className="text-2xl font-bold mb-4">Real-World Impact: E-Commerce Transformation</h3>
        <p className="text-gray-300 mb-6">
          A mid-sized e-commerce client was experiencing frequent outages during sale events, costing them millions. After implementing our enterprise network architecture:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#2196F3] mb-2">Zero</div>
            <div className="text-gray-300">Downtime incidents in 18 months</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#2196F3] mb-2">60%</div>
            <div className="text-gray-300">Reduction in infrastructure costs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#2196F3] mb-2">3x</div>
            <div className="text-gray-300">Traffic capacity without slowdowns</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Is Your Network Ready for Growth?
      </h3>

      <p className="text-gray-300 leading-relaxed mb-4">
        Ask yourself these questions:
      </p>

      <ul className="space-y-3 text-gray-300 mb-8">
        <li className="flex items-start gap-3">
          <span className="text-[#2196F3] text-xl">→</span>
          <span>Can your infrastructure handle 10x traffic tomorrow?</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#2196F3] text-xl">→</span>
          <span>What happens if your primary server fails right now?</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#2196F3] text-xl">→</span>
          <span>Are you confident your data is secure from ransomware attacks?</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-[#2196F3] text-xl">→</span>
          <span>Is your team spending more time firefighting than innovating?</span>
        </li>
      </ul>

      <p className="text-xl text-gray-300 leading-relaxed mt-8">
        If you answered "no" to any of these, it's time to upgrade your network architecture. Our enterprise solutions are designed for businesses that refuse to let infrastructure limit their growth.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Enterprise Network Architecture: Scalable Infrastructure for Growing Businesses"
      author="Infrastructure Team"
      date="November 25, 2025"
      readTime="10 min read"
      category="Infra & Network"
      gradient="from-[#2196F3] to-[#0D47A1]"
      content={content}
      tags={['Enterprise Network', 'Scalability', 'Infrastructure', 'Cloud Architecture', 'Security']}
    />
  );
};

export default EnterpriseNetwork;

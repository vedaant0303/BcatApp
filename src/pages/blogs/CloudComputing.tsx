import React from 'react';
import BlogPost from './BlogPost';
import { Cloud, Server, Zap, Shield } from 'lucide-react';

const CloudComputing = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80" 
          alt="Cloud computing infrastructure"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Cloud Computing: Scale Your Business Without Infrastructure Headaches
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Traditional IT infrastructure is expensive, inflexible, and requires constant maintenance. Cloud computing eliminates these problems while giving you enterprise-grade capabilities at a fraction of the cost.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-[#FFC107]" size={28} />
            <h3 className="text-xl font-bold">Deploy in Minutes</h3>
          </div>
          <p className="text-gray-400">
            Launch applications instantly instead of waiting weeks for hardware
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Server className="text-[#03A9F4]" size={28} />
            <h3 className="text-xl font-bold">99.99% Uptime</h3>
          </div>
          <p className="text-gray-400">
            Enterprise-grade reliability with automatic failover and redundancy
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-[#4CAF50]" size={28} />
            <h3 className="text-xl font-bold">Bank-Level Security</h3>
          </div>
          <p className="text-gray-400">
            Military-grade encryption and compliance certifications included
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80" 
          alt="Modern data center"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Why Businesses Are Moving to the Cloud
      </h3>

      <p className="text-gray-300 leading-relaxed mb-4">
        The pandemic accelerated cloud adoption by 5 years. Companies that moved to the cloud survived and thrived. Those that didn't struggled with remote work, scaling challenges, and security vulnerabilities.
      </p>

      <div className="bg-[#03A9F4]/10 border border-[#03A9F4]/30 p-8 rounded-xl my-8">
        <h4 className="text-xl font-bold mb-3 text-[#03A9F4]">The Cost Reality</h4>
        <p className="text-gray-300 mb-4">
          Traditional on-premise infrastructure requires massive upfront investment:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#FF5722]">•</span>
            <span>Server hardware: ₹20-50 lakhs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF5722]">•</span>
            <span>Networking equipment: ₹10-30 lakhs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF5722]">•</span>
            <span>Cooling and power systems: ₹15-40 lakhs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF5722]">•</span>
            <span>IT staff salaries: ₹50-80 lakhs annually</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF5722]">•</span>
            <span>Maintenance and upgrades: ₹15-25 lakhs annually</span>
          </li>
        </ul>
        <p className="text-gray-300 mt-4 font-bold">
          Total 3-year cost: ₹2.5-4 crores
        </p>
        <p className="text-[#03A9F4] mt-4 font-bold text-lg">
          Cloud equivalent: ₹30-60 lakhs over 3 years
        </p>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Our Cloud Solutions
      </h3>

      <div className="space-y-6">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#03A9F4]">Cloud Migration</h4>
          <p className="text-gray-300 mb-3">
            Move your existing applications and data to the cloud with zero downtime. We handle planning, execution, testing, and optimization.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#03A9F4]/20 rounded-full text-sm text-[#03A9F4]">Lift & Shift</span>
            <span className="px-3 py-1 bg-[#03A9F4]/20 rounded-full text-sm text-[#03A9F4]">Replatforming</span>
            <span className="px-3 py-1 bg-[#03A9F4]/20 rounded-full text-sm text-[#03A9F4]">Refactoring</span>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#4CAF50]">Cloud Native Development</h4>
          <p className="text-gray-300 mb-3">
            Build applications designed specifically for cloud environments. Microservices, containers, and serverless architectures that scale automatically.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#4CAF50]/20 rounded-full text-sm text-[#4CAF50]">Kubernetes</span>
            <span className="px-3 py-1 bg-[#4CAF50]/20 rounded-full text-sm text-[#4CAF50]">Docker</span>
            <span className="px-3 py-1 bg-[#4CAF50]/20 rounded-full text-sm text-[#4CAF50]">AWS Lambda</span>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#FFC107]">Hybrid Cloud Solutions</h4>
          <p className="text-gray-300 mb-3">
            Keep sensitive data on-premise while leveraging cloud for scalability. Best of both worlds with seamless integration.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#FFC107]/20 rounded-full text-sm text-[#FFC107]">Azure Arc</span>
            <span className="px-3 py-1 bg-[#FFC107]/20 rounded-full text-sm text-[#FFC107]">AWS Outposts</span>
            <span className="px-3 py-1 bg-[#FFC107]/20 rounded-full text-sm text-[#FFC107]">GCP Anthos</span>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#FF5722]">Cloud Optimization</h4>
          <p className="text-gray-300 mb-3">
            Already in the cloud but bills are too high? We analyze usage patterns and optimize architecture to reduce costs by 40-60%.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#FF5722]/20 rounded-full text-sm text-[#FF5722]">Cost Analysis</span>
            <span className="px-3 py-1 bg-[#FF5722]/20 rounded-full text-sm text-[#FF5722]">Right-sizing</span>
            <span className="px-3 py-1 bg-[#FF5722]/20 rounded-full text-sm text-[#FF5722]">Auto-scaling</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" 
          alt="Cloud analytics dashboard"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-[#FF5722]/20 to-[#03A9F4]/20 p-8 rounded-xl border border-[#FF5722]/30 my-8">
        <h4 className="text-2xl font-bold mb-4">Case Study: Manufacturing Company Transformation</h4>
        <p className="text-gray-300 mb-6">
          A 500-employee manufacturing company was struggling with aging servers and limited remote access. After migrating to our cloud solution:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#03A9F4] mb-2">73%</div>
            <div className="text-gray-300">Cost reduction in IT infrastructure</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#03A9F4] mb-2">Zero</div>
            <div className="text-gray-300">Downtime incidents in 18 months</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#03A9F4] mb-2">5 days</div>
            <div className="text-gray-300">Complete migration time</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Cloud Platforms We Support
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#FF9900]">AWS</h4>
          <p className="text-gray-300 text-sm">
            Market leader with the most comprehensive service catalog. Best for startups and enterprises needing flexibility.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#0078D4]">Microsoft Azure</h4>
          <p className="text-gray-300 text-sm">
            Seamless integration with Microsoft tools. Perfect for enterprises using Office 365, Active Directory, or .NET.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#4285F4]">Google Cloud</h4>
          <p className="text-gray-300 text-sm">
            Industry-leading AI/ML tools and data analytics. Best for data-intensive applications and machine learning.
          </p>
        </div>
      </div>

      <div className="bg-[#2a1a2e] p-8 rounded-xl border border-white/10">
        <h4 className="text-xl font-bold mb-4">Our Cloud Migration Process</h4>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#03A9F4] flex items-center justify-center font-bold">1</div>
            <div>
              <h5 className="font-bold mb-1">Assessment (Week 1)</h5>
              <p className="text-gray-300 text-sm">Analyze current infrastructure, identify dependencies, and create migration roadmap.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#03A9F4] flex items-center justify-center font-bold">2</div>
            <div>
              <h5 className="font-bold mb-1">Planning (Week 2)</h5>
              <p className="text-gray-300 text-sm">Design cloud architecture, set up security policies, and prepare migration tools.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#03A9F4] flex items-center justify-center font-bold">3</div>
            <div>
              <h5 className="font-bold mb-1">Migration (Weeks 3-4)</h5>
              <p className="text-gray-300 text-sm">Move applications and data with zero downtime using blue-green deployment strategies.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#03A9F4] flex items-center justify-center font-bold">4</div>
            <div>
              <h5 className="font-bold mb-1">Optimization (Week 5)</h5>
              <p className="text-gray-300 text-sm">Fine-tune performance, implement auto-scaling, and train your team.</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mt-8">
        Ready to modernize your IT infrastructure? Contact us for a free cloud readiness assessment and discover how much you can save.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Cloud Computing: Cut IT Costs by 70% While Improving Performance"
      author="Cloud Solutions Team"
      date="December 2, 2025"
      readTime="9 min read"
      category="Innovation"
      gradient="from-[#03A9F4] to-[#0277BD]"
      heroImage="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80"
      content={content}
      tags={['Cloud Computing', 'AWS', 'Azure', 'Infrastructure', 'DevOps']}
    />
  );
};

export default CloudComputing;

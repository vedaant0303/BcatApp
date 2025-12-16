import React from 'react';
import BlogPost from './BlogPost';
import { Rocket, TrendingUp, Target, Zap } from 'lucide-react';

const DigitalTransformation = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" 
          alt="Digital transformation technology"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Digital Transformation: Your Roadmap to 2025 Success
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Digital transformation isn't just about buying new software. It's about fundamentally rethinking how your business operates, serves customers, and creates value. Companies that embrace this change grow 5x faster than those that don't.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-[#00BCD4]" size={28} />
            <h3 className="text-xl font-bold">5x Faster Growth</h3>
          </div>
          <p className="text-gray-400">
            Digitally transformed companies outpace competitors significantly
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-[#8E609B]" size={28} />
            <h3 className="text-xl font-bold">45% Cost Reduction</h3>
          </div>
          <p className="text-gray-400">
            Automation and optimization slash operational expenses
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#FF5722]" size={28} />
            <h3 className="text-xl font-bold">3x Customer Satisfaction</h3>
          </div>
          <p className="text-gray-400">
            Better experiences through digital channels and personalization
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" 
          alt="Business analytics dashboard"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Why Traditional Businesses Are Struggling
      </h3>

      <p className="text-gray-300 leading-relaxed mb-4">
        The pandemic accelerated digital adoption by 7 years. Customers now expect seamless online experiences, instant responses, and personalized service. Businesses stuck with manual processes, paper records, and disconnected systems can't compete.
      </p>

      <div className="bg-[#00BCD4]/10 border border-[#00BCD4]/30 p-8 rounded-xl my-8">
        <h4 className="text-xl font-bold mb-3 text-[#00BCD4]">The Digital Imperative</h4>
        <p className="text-gray-300 mb-4">
          By 2025, 80% of customer interactions will be digital. Companies without strong digital capabilities will lose market share rapidly. Here's what's at stake:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <Zap size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Revenue Loss:</strong> Competitors steal customers who prefer digital channels</span>
          </li>
          <li className="flex items-start gap-3">
            <Zap size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Operational Inefficiency:</strong> Manual processes cost 10x more than automated ones</span>
          </li>
          <li className="flex items-start gap-3">
            <Zap size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Talent Shortage:</strong> Top talent won't work with outdated technology</span>
          </li>
          <li className="flex items-start gap-3">
            <Zap size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Data Blindness:</strong> Can't make informed decisions without digital insights</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The 5-Stage Digital Transformation Framework
      </h3>

      <div className="space-y-6">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00BCD4] flex items-center justify-center text-xl font-bold">1</div>
            <h4 className="text-xl font-bold">Digital Assessment & Strategy</h4>
          </div>
          <p className="text-gray-300 ml-16">
            Audit current capabilities, identify gaps, and create a prioritized roadmap. Define clear KPIs and success metrics. Timeline: 2-4 weeks.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00BCD4] flex items-center justify-center text-xl font-bold">2</div>
            <h4 className="text-xl font-bold">Foundation Building</h4>
          </div>
          <p className="text-gray-300 ml-16">
            Establish cloud infrastructure, implement core systems (CRM, ERP, analytics), and integrate data sources. Timeline: 8-12 weeks.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00BCD4] flex items-center justify-center text-xl font-bold">3</div>
            <h4 className="text-xl font-bold">Process Automation</h4>
          </div>
          <p className="text-gray-300 ml-16">
            Automate repetitive tasks, eliminate manual data entry, and streamline workflows. Focus on quick wins that show immediate ROI. Timeline: 6-10 weeks.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00BCD4] flex items-center justify-center text-xl font-bold">4</div>
            <h4 className="text-xl font-bold">Customer Experience Enhancement</h4>
          </div>
          <p className="text-gray-300 ml-16">
            Launch digital channels (web, mobile, chatbots), personalize interactions, and enable self-service. Timeline: 8-16 weeks.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00BCD4] flex items-center justify-center text-xl font-bold">5</div>
            <h4 className="text-xl font-bold">Innovation & Optimization</h4>
          </div>
          <p className="text-gray-300 ml-16">
            Use AI for predictive analytics, test new business models, and continuously improve based on data. Ongoing process.
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80" 
          alt="Team collaborating on digital strategy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-[#FF5722]/20 to-[#00BCD4]/20 p-8 rounded-xl border border-[#FF5722]/30 my-8">
        <h4 className="text-2xl font-bold mb-4">Case Study: Manufacturing Company Transformation</h4>
        <p className="text-gray-300 mb-6">
          A 200-employee manufacturing company was losing contracts to more agile competitors. Their processes were 80% manual, quotes took 5 days, and customer data was scattered across Excel sheets. After digital transformation:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#00BCD4] mb-2">92%</div>
            <div className="text-gray-300">Faster quote generation (5 days → 4 hours)</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00BCD4] mb-2">₹2.1Cr</div>
            <div className="text-gray-300">Annual cost savings from automation</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00BCD4] mb-2">47%</div>
            <div className="text-gray-300">Revenue increase in first year</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Common Digital Transformation Mistakes (And How to Avoid Them)
      </h3>

      <div className="space-y-4 mb-8">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#FF5722]/30">
          <h4 className="font-bold text-lg mb-2 text-[#FF5722]">❌ Mistake: Starting Without Strategy</h4>
          <p className="text-gray-300 text-sm mb-2">Buying tools randomly without understanding business needs.</p>
          <p className="text-gray-400 text-sm">✓ <strong>Solution:</strong> Begin with thorough assessment and clear objectives.</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#FF5722]/30">
          <h4 className="font-bold text-lg mb-2 text-[#FF5722]">❌ Mistake: Ignoring Change Management</h4>
          <p className="text-gray-300 text-sm mb-2">Implementing technology without training or preparing employees.</p>
          <p className="text-gray-400 text-sm">✓ <strong>Solution:</strong> Invest heavily in training and communication throughout the process.</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#FF5722]/30">
          <h4 className="font-bold text-lg mb-2 text-[#FF5722]">❌ Mistake: Trying to Transform Everything at Once</h4>
          <p className="text-gray-300 text-sm mb-2">Overwhelming the organization with too many changes simultaneously.</p>
          <p className="text-gray-400 text-sm">✓ <strong>Solution:</strong> Adopt phased approach with quick wins to build momentum.</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#FF5722]/30">
          <h4 className="font-bold text-lg mb-2 text-[#FF5722]">❌ Mistake: Choosing Technology Over Business Outcomes</h4>
          <p className="text-gray-300 text-sm mb-2">Falling in love with flashy tech that doesn't solve real problems.</p>
          <p className="text-gray-400 text-sm">✓ <strong>Solution:</strong> Always start with business goals, then find appropriate technology.</p>
        </div>
      </div>

      <div className="bg-[#2a1a2e] p-8 rounded-xl border border-white/10">
        <h4 className="text-xl font-bold mb-4">Ready to Transform Your Business?</h4>
        <p className="text-gray-300 mb-6">
          We've helped over 150 companies successfully navigate digital transformation. Our proven methodology minimizes risk while maximizing ROI.
        </p>
        <div className="space-y-2 text-gray-300">
          <p>✓ Free digital maturity assessment</p>
          <p>✓ Custom transformation roadmap</p>
          <p>✓ Technology-agnostic recommendations</p>
          <p>✓ Ongoing support and optimization</p>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mt-8">
        The question isn't whether to transform digitally—it's how quickly you can do it before competitors leave you behind. Contact us for a free consultation and discover your digital transformation opportunities.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Digital Transformation Strategy: Your 2025 Roadmap to Success"
      author="Strategy Team"
      date="December 2, 2025"
      readTime="10 min read"
      category="Business Growth"
      gradient="from-[#00BCD4] to-[#006064]"
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
      content={content}
      tags={['Digital Transformation', 'Strategy', 'Business Growth', 'Automation', 'Technology']}
    />
  );
};

export default DigitalTransformation;

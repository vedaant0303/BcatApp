import React from 'react';
import BlogPost from './BlogPost';
import { Rocket, TrendingUp, Users, Zap } from 'lucide-react';

const StartupScaling = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" 
          alt="Startup team planning growth strategy"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Startup to Scale: The Blueprint for Rapid Growth
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Most startups fail not because of bad ideas, but because they can't scale effectively. Growing from 10 to 100 to 1,000 customers requires fundamentally different processes, systems, and strategies. Here's the proven blueprint that works.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-[#673AB7]" size={28} />
            <h3 className="text-xl font-bold">10x Growth Possible</h3>
          </div>
          <p className="text-gray-400">
            With right systems, scale 10x without 10x costs
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-[#FF5722]" size={28} />
            <h3 className="text-xl font-bold">Team Efficiency</h3>
          </div>
          <p className="text-gray-400">
            Automate operations so team focuses on growth
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#4CAF50]" size={28} />
            <h3 className="text-xl font-bold">Faster Fundraising</h3>
          </div>
          <p className="text-gray-400">
            Scalable systems attract serious investors
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" 
          alt="Business growth chart"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The Scaling Trap: Why Good Startups Fail
      </h3>

      <p className="text-gray-300 leading-relaxed mb-4">
        You found product-market fit. Revenue is growing. But suddenly, everything breaks. Customer support is overwhelmed. Operations are chaos. Quality suffers. Founders are drowning in firefighting instead of building.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        This is the "scaling trap"—when success becomes your biggest problem. 70% of startups fail here, not because they ran out of money, but because they couldn't operationalize growth.
      </p>

      <div className="bg-[#673AB7]/10 border border-[#673AB7]/30 p-8 rounded-xl my-8">
        <h4 className="text-xl font-bold mb-3 text-[#673AB7]">The 3 Growth Stages (And What Each Requires)</h4>
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-lg mb-2 text-white">Stage 1: Finding Product-Market Fit (0-10 Customers)</h5>
            <p className="text-gray-300 text-sm mb-2">Manual everything. Talk to every customer. Iterate constantly.</p>
            <p className="text-gray-400 text-sm"><strong>Key Metric:</strong> Customer retention rate</p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-2 text-white">Stage 2: Validating the Model (10-100 Customers)</h5>
            <p className="text-gray-300 text-sm mb-2">Systematize core processes. Build initial team. Prove unit economics work.</p>
            <p className="text-gray-400 text-sm"><strong>Key Metric:</strong> LTV:CAC ratio (should be 3:1 minimum)</p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-2 text-white">Stage 3: Scaling the Engine (100-1000+ Customers)</h5>
            <p className="text-gray-300 text-sm mb-2">Automate operations. Build specialized teams. Create repeatable processes.</p>
            <p className="text-gray-400 text-sm"><strong>Key Metric:</strong> Customer acquisition efficiency</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The 7 Systems Every Scaling Startup Needs
      </h3>

      <div className="space-y-6">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">1. Customer Acquisition System</h4>
          <p className="text-gray-300 mb-3">
            Predictable, repeatable process for generating qualified leads. Includes content marketing, paid ads, partnerships, and referrals.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Relying on founder's network or word-of-mouth alone</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">2. Sales Process & CRM</h4>
          <p className="text-gray-300 mb-3">
            Structured sales methodology with clear stages, conversion metrics, and forecasting. CRM tracks every interaction and opportunity.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Sales data in spreadsheets or founder's head</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">3. Onboarding & Success Framework</h4>
          <p className="text-gray-300 mb-3">
            Automated onboarding that gets customers to value fast. Success team proactively prevents churn and drives expansion.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Customers figuring things out on their own</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">4. Product Development Pipeline</h4>
          <p className="text-gray-300 mb-3">
            Systematic way to prioritize features, ship updates, and gather feedback. Balance innovation with stability.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Building whatever customers request without strategy</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">5. Financial Management & Metrics</h4>
          <p className="text-gray-300 mb-3">
            Real-time dashboards showing runway, burn rate, unit economics, and growth metrics. Monthly financial reviews.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Not knowing exact CAC, LTV, or monthly burn</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">6. Hiring & Team Building Process</h4>
          <p className="text-gray-300 mb-3">
            Structured hiring with clear role definitions, assessment criteria, and onboarding. Build culture intentionally.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Panic hiring or long unfilled positions</p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#673AB7]">7. Operational Efficiency & Automation</h4>
          <p className="text-gray-300 mb-3">
            Automate repetitive tasks. Document core processes. Use tools to eliminate manual work wherever possible.
          </p>
          <p className="text-gray-400 text-sm"><strong>Red Flag:</strong> Team spending time on tasks machines can do</p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80" 
          alt="Team collaboration and planning"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-[#FF5722]/20 to-[#673AB7]/20 p-8 rounded-xl border border-[#FF5722]/30 my-8">
        <h4 className="text-2xl font-bold mb-4">Case Study: SaaS Startup 0 to ₹10Cr ARR in 18 Months</h4>
        <p className="text-gray-300 mb-6">
          A B2B SaaS startup came to us at ₹50 lakhs ARR with 30 customers. They were burning ₹15 lakhs monthly, couldn't onboard fast enough, and support was drowning. We implemented:
        </p>
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>✓ Automated onboarding flow (reduced time-to-value from 2 weeks to 2 days)</li>
          <li>✓ Self-service knowledge base (cut support tickets by 60%)</li>
          <li>✓ Outbound sales process (added predictable growth channel)</li>
          <li>✓ Customer health scoring (prevented 80% of churn proactively)</li>
          <li>✓ Referral program (generated 30% of new customers)</li>
        </ul>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#673AB7] mb-2">₹10Cr</div>
            <div className="text-gray-300">ARR reached in 18 months</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#673AB7] mb-2">340%</div>
            <div className="text-gray-300">Year-over-year growth rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#673AB7] mb-2">92%</div>
            <div className="text-gray-300">Net revenue retention</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The Scaling Checklist: Are You Ready?
      </h3>

      <div className="bg-[#2a1a2e] p-8 rounded-xl border border-white/10 mb-8">
        <p className="text-gray-300 mb-4">Before aggressive scaling, verify these foundations are solid:</p>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-[#673AB7] flex items-center justify-center">✓</div>
            <span><strong>Product-Market Fit Proven:</strong> 40%+ of customers would be "very disappointed" if product disappeared</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-[#673AB7] flex items-center justify-center">✓</div>
            <span><strong>Unit Economics Work:</strong> LTV:CAC ratio of 3:1 or better, payback period under 12 months</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-[#673AB7] flex items-center justify-center">✓</div>
            <span><strong>Retention is Strong:</strong> Net revenue retention above 100%, monthly churn under 5%</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-[#673AB7] flex items-center justify-center">✓</div>
            <span><strong>Repeatable Sales Process:</strong> New sales reps can hit quota within 3 months</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-[#673AB7] flex items-center justify-center">✓</div>
            <span><strong>Sufficient Runway:</strong> 18+ months of cash or clear path to profitability</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-[#673AB7] flex items-center justify-center">✓</div>
            <span><strong>Team Capacity:</strong> Can hire and onboard 10+ people in 6 months if needed</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#673AB7] to-[#FF5722] p-8 rounded-xl">
        <h4 className="text-2xl font-bold mb-4">Ready to Scale Your Startup?</h4>
        <p className="mb-6">
          We've helped 40+ startups successfully scale from seed to Series B and beyond. Our methodology is battle-tested and delivers results fast.
        </p>
        <div className="space-y-2">
          <p>✓ Free scaling readiness assessment</p>
          <p>✓ Custom growth roadmap with prioritized actions</p>
          <p>✓ Hands-on implementation support</p>
          <p>✓ Fractional leadership available</p>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mt-8">
        Scaling is hard, but it doesn't have to be chaotic. With the right systems and strategy, you can grow sustainably while maintaining quality and culture. Let's talk about your scaling journey.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Startup to Scale: The Complete Blueprint for Rapid Growth"
      author="Growth Strategy Team"
      date="December 2, 2025"
      readTime="11 min read"
      category="Business Growth"
      gradient="from-[#673AB7] to-[#311B92]"
      heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
      content={content}
      tags={['Startup', 'Scaling', 'Growth Strategy', 'Operations', 'Fundraising']}
    />
  );
};

export default StartupScaling;

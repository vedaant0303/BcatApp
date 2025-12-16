import React from 'react';
import BlogPost from './BlogPost';
import { Palette, TrendingUp, Target, Sparkles } from 'lucide-react';

const DesignCaseStudies = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80" 
          alt="Creative design workspace"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The Power of Strategic Design
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        In today's hyper-competitive market, your brand's visual identity isn't just about looking good—it's about telling a story that resonates, builds trust, and drives conversions. We've helped over 100 brands transform their presence and achieve remarkable growth.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#FF5722]" size={28} />
            <h3 className="text-xl font-bold">350% ROI Increase</h3>
          </div>
          <p className="text-gray-400">
            Average return on investment for our branding clients within 6 months of launch.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-[#8E609B]" size={28} />
            <h3 className="text-xl font-bold">85% Conversion Boost</h3>
          </div>
          <p className="text-gray-400">
            Improved conversion rates through strategic brand positioning and design.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Case Study: Velvet Jewels Rebrand
      </h3>

      <p className="text-gray-300 leading-relaxed">
        When Velvet Jewels approached us, they were struggling with a generic brand identity that failed to communicate their luxury positioning. Their ROAS was stuck at 2x, and customer engagement was declining.
      </p>

      <div className="bg-[#8E609B]/10 border border-[#8E609B]/30 p-6 rounded-xl my-8">
        <h4 className="text-xl font-bold mb-3 text-[#8E609B]">The Challenge</h4>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <Sparkles size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Stand out in a saturated luxury jewelry market</span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Communicate premium quality without appearing unapproachable</span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Improve digital ad performance and customer trust</span>
          </li>
        </ul>
      </div>

      <h4 className="text-xl font-bold mb-3">Our Strategic Approach</h4>

      <p className="text-gray-300 leading-relaxed mb-4">
        We conducted a comprehensive brand audit, competitor analysis, and customer research. Our team developed a complete visual identity system that balanced elegance with accessibility, featuring:
      </p>

      <ul className="space-y-3 text-gray-300 mb-8">
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8E609B] flex items-center justify-center text-sm font-bold">1</span>
          <span><strong>Custom Typography System:</strong> A unique font pairing that exudes luxury while maintaining readability across all platforms.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8E609B] flex items-center justify-center text-sm font-bold">2</span>
          <span><strong>Refined Color Palette:</strong> Deep jewel tones with metallic accents that photograph beautifully and command attention.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8E609B] flex items-center justify-center text-sm font-bold">3</span>
          <span><strong>Photography Guidelines:</strong> Consistent styling that showcases products in lifestyle contexts, building emotional connections.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8E609B] flex items-center justify-center text-sm font-bold">4</span>
          <span><strong>Digital-First Design System:</strong> Optimized for social media, e-commerce, and paid advertising channels.</span>
        </li>
      </ul>

      <div className="bg-gradient-to-br from-[#FF5722]/20 to-[#8E609B]/20 p-8 rounded-xl border border-[#FF5722]/30 my-8">
        <h4 className="text-2xl font-bold mb-4">The Results</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#FF5722] mb-2">8x</div>
            <div className="text-gray-300">ROAS increase (from 2x to 8x)</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FF5722] mb-2">127%</div>
            <div className="text-gray-300">Instagram engagement growth</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FF5722] mb-2">₹2.4Cr</div>
            <div className="text-gray-300">Additional revenue in Q1</div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" 
          alt="Brand strategy and analytics"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-12" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Key Takeaways for Your Brand
      </h3>

      <p className="text-gray-300 leading-relaxed mb-4">
        The Velvet Jewels transformation demonstrates that strategic branding isn't an expense—it's an investment that compounds over time. Here's what you can learn:
      </p>

      <div className="space-y-4 text-gray-300">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <strong className="text-white">Consistency Builds Trust:</strong> A cohesive brand identity across all touchpoints increases customer confidence and recall.
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <strong className="text-white">Emotion Drives Sales:</strong> People buy from brands they connect with emotionally, not just products they need.
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <strong className="text-white">Digital-First Design Wins:</strong> In 2025, your brand must perform flawlessly on mobile, social, and e-commerce platforms.
        </div>
      </div>

      <p className="text-xl text-gray-300 leading-relaxed mt-8">
        Ready to create your own success story? Our 45-day brand transformation program includes strategy, design, and implementation—all backed by our money-back guarantee.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Latest Projects & Case Studies: How We 8x'd a Jewelry Brand's ROAS"
      author="Branding Catalyst Team"
      date="December 1, 2025"
      readTime="8 min read"
      category="Design Studio"
      gradient="from-[#8E609B] to-[#1a0b1e]"
      heroImage="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80"
      content={content}
      tags={['Branding', 'Case Study', 'ROI', 'Design Strategy', 'E-commerce']}
    />
  );
};

export default DesignCaseStudies;

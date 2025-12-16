import React from 'react';
import BlogPost from './BlogPost';
import { FlaskConical, Lightbulb, Rocket, TrendingUp } from 'lucide-react';

const RDServices = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80" 
          alt="Research and development laboratory"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        R&D Services: Turn Innovative Ideas into Market-Ready Products
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Innovation doesn't happen by accident. It requires systematic research, rapid prototyping, rigorous testing, and iterative refinement. Our R&D services help you develop breakthrough products without the overhead of building an entire research department.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-[#FFC107]" size={28} />
            <h3 className="text-xl font-bold">100+ Patents Filed</h3>
          </div>
          <p className="text-gray-400">
            Our research has generated over 100 patent applications for clients
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-[#FF5722]" size={28} />
            <h3 className="text-xl font-bold">6 Month Average</h3>
          </div>
          <p className="text-gray-400">
            From concept to working prototype in just 6 months
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#4CAF50]" size={28} />
            <h3 className="text-xl font-bold">85% Success Rate</h3>
          </div>
          <p className="text-gray-400">
            Projects that reach market successfully after our R&D phase
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1581093458791-9d42e47b2e2c?w=1200&q=80" 
          alt="Innovation lab workspace"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Why Traditional R&D Fails Most Companies
      </h3>

      <p className="text-gray-300 leading-relaxed mb-4">
        Building an in-house R&D department requires massive investment: PhD-level researchers cost ₹30-50 lakhs annually. Specialized equipment runs into crores. Testing and certification add millions more. Most companies can't afford it.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Even worse, internal R&D teams often become isolated from market realities, developing products nobody wants. By the time you realize the mistake, you've wasted years and crores of rupees.
      </p>

      <div className="bg-[#9C27B0]/10 border border-[#9C27B0]/30 p-8 rounded-xl my-8">
        <h4 className="text-xl font-bold mb-3 text-[#9C27B0]">Our R&D Approach</h4>
        <p className="text-gray-300 mb-4">
          We combine academic rigor with entrepreneurial speed. Our team includes PhD researchers, experienced engineers, and product designers who work together to:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <FlaskConical size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Validate Technical Feasibility:</strong> Test if your idea can actually work before investing heavily</span>
          </li>
          <li className="flex items-start gap-3">
            <FlaskConical size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Prototype Rapidly:</strong> Build working prototypes in weeks instead of months</span>
          </li>
          <li className="flex items-start gap-3">
            <FlaskConical size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Iterate Based on Data:</strong> Use real testing data to improve designs systematically</span>
          </li>
          <li className="flex items-start gap-3">
            <FlaskConical size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Prepare for Market:</strong> Handle certifications, compliance, and manufacturing readiness</span>
          </li>
          <li className="flex items-start gap-3">
            <FlaskConical size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span><strong>Protect Your IP:</strong> Draft patents and ensure your innovations are legally protected</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        R&D Services We Offer
      </h3>

      <div className="space-y-6">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#03A9F4]">Product Feasibility Studies</h4>
          <p className="text-gray-300 mb-3">
            Got an idea but not sure if it's technically possible? We conduct comprehensive feasibility studies covering technical, market, and financial viability.
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Timeline:</strong> 2-4 weeks | <strong>Deliverable:</strong> Detailed feasibility report with recommendations
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#4CAF50]">Rapid Prototyping</h4>
          <p className="text-gray-300 mb-3">
            Transform concepts into working prototypes using 3D printing, CNC machining, and electronic assembly. Test functionality before committing to mass production.
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Timeline:</strong> 4-8 weeks | <strong>Deliverable:</strong> Functional prototype with testing documentation
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#FFC107]">Algorithm Development</h4>
          <p className="text-gray-300 mb-3">
            Develop proprietary algorithms for AI/ML, computer vision, signal processing, or optimization. We handle everything from mathematical modeling to production implementation.
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Timeline:</strong> 8-16 weeks | <strong>Deliverable:</strong> Optimized algorithm with documentation and source code
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#FF5722]">Product Testing & Validation</h4>
          <p className="text-gray-300 mb-3">
            Rigorous testing to ensure your product meets quality standards, regulatory requirements, and customer expectations. Includes stress testing, user testing, and certification prep.
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Timeline:</strong> 4-12 weeks | <strong>Deliverable:</strong> Complete testing report with certification recommendations
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-xl font-bold mb-3 text-[#9C27B0]">Patent Research & Filing</h4>
          <p className="text-gray-300 mb-3">
            Conduct prior art searches, draft patent applications, and file with patent offices. We work with experienced patent attorneys to protect your innovations.
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Timeline:</strong> 6-10 weeks | <strong>Deliverable:</strong> Patent application ready for filing
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-12">
        <img 
          src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80" 
          alt="Research team collaboration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-[#FF5722]/20 to-[#9C27B0]/20 p-8 rounded-xl border border-[#FF5722]/30 my-8">
        <h4 className="text-2xl font-bold mb-4">Success Story: IoT Medical Device</h4>
        <p className="text-gray-300 mb-6">
          A healthcare startup approached us with an idea for a wearable device to monitor chronic conditions. They had no technical team or manufacturing experience. We helped them:
        </p>
        <div className="space-y-3 text-gray-300 mb-6">
          <p>✓ Validated technical feasibility and regulatory pathway (4 weeks)</p>
          <p>✓ Built 3 generations of prototypes with increasing functionality (12 weeks)</p>
          <p>✓ Conducted clinical trials and gathered user feedback (8 weeks)</p>
          <p>✓ Filed 2 patents covering core technology (10 weeks)</p>
          <p>✓ Prepared manufacturing documentation for CE certification (6 weeks)</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div>
            <div className="text-4xl font-bold text-[#9C27B0] mb-2">9 months</div>
            <div className="text-gray-300">Concept to market-ready product</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#9C27B0] mb-2">₹4.5Cr</div>
            <div className="text-gray-300">Seed funding raised on strength of R&D</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#9C27B0] mb-2">2 Patents</div>
            <div className="text-gray-300">Filed and pending approval</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Industries We Serve
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">Healthcare & Medical Devices</h4>
          <p className="text-gray-300 text-sm">
            Diagnostic equipment, wearables, telemedicine platforms, medical imaging software
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">Industrial Automation</h4>
          <p className="text-gray-300 text-sm">
            Robotics, IoT sensors, predictive maintenance systems, quality control automation
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">Consumer Electronics</h4>
          <p className="text-gray-300 text-sm">
            Smart home devices, wearables, audio equipment, gaming peripherals
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">Clean Tech & Sustainability</h4>
          <p className="text-gray-300 text-sm">
            Solar optimization, waste management, water purification, energy storage
          </p>
        </div>
      </div>

      <div className="bg-[#2a1a2e] p-8 rounded-xl border border-white/10">
        <h4 className="text-xl font-bold mb-4">What Makes Our R&D Different</h4>
        <div className="space-y-3 text-gray-300">
          <p>🔬 <strong>World-Class Team:</strong> PhDs from IITs, NITs, and international universities</p>
          <p>⚡ <strong>Fast Iteration:</strong> Weekly progress updates and rapid prototyping cycles</p>
          <p>💰 <strong>Cost-Effective:</strong> 70% cheaper than building in-house R&D department</p>
          <p>🎯 <strong>Market-Focused:</strong> We don't just build cool tech—we build products that sell</p>
          <p>🛡️ <strong>IP Protection:</strong> All work product is 100% owned by you with full rights</p>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mt-8">
        Have an innovative product idea? Let's discuss how our R&D services can bring it to life. Schedule a free consultation to explore technical feasibility and project timeline.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="R&D Services: From Breakthrough Ideas to Market-Ready Products"
      author="R&D Team"
      date="December 2, 2025"
      readTime="10 min read"
      category="Innovation"
      gradient="from-[#9C27B0] to-[#4A148C]"
      heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80"
      content={content}
      tags={['R&D', 'Innovation', 'Product Development', 'Patents', 'Prototyping']}
    />
  );
};

export default RDServices;

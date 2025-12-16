import React from 'react';
import BlogPost from './BlogPost';
import { Download, FileText, Layout, CheckCircle } from 'lucide-react';

const BrandGuidelines = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&q=80" 
          alt="Brand guidelines and templates"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Free Brand Guidelines & Templates to Transform Your Business
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Building a consistent brand identity doesn't have to be expensive or complicated. We've compiled our best resources—completely free—to help you establish a professional brand presence that drives results.
      </p>

      <div className="bg-[#FF5722]/10 border border-[#FF5722]/30 p-8 rounded-xl my-8">
        <h3 className="text-2xl font-bold mb-4 text-[#FF5722]">Why Brand Guidelines Matter</h3>
        <p className="text-gray-300 mb-4">
          Brand guidelines ensure consistency across every customer touchpoint—from your website to social media, packaging to presentations. Consistent branding increases revenue by up to 23%, according to Forbes.
        </p>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        What's Included in Our Free Templates
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="text-[#8E609B]" size={28} />
            <h4 className="text-xl font-bold">Logo Usage Guide</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Complete specifications for logo placement, sizing, clear space, and usage dos and don'ts.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Primary & secondary logo variations
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Minimum size specifications
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Incorrect usage examples
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-[#8E609B] to-[#FF5722]"></div>
            <h4 className="text-xl font-bold">Color System</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Professional color palettes with RGB, HEX, CMYK, and Pantone values for all media.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Primary & secondary colors
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Accent & neutral palettes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Accessibility guidelines
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-[#8E609B]">Aa</span>
            <h4 className="text-xl font-bold">Typography System</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Font pairings, sizing scales, and hierarchy for digital and print applications.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Heading & body font selections
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Type scale & line heights
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Web & print specifications
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-[#8E609B]" size={28} />
            <h4 className="text-xl font-bold">Templates Library</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Ready-to-use templates for social media, presentations, and marketing materials.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Instagram & Facebook templates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              PowerPoint/Keynote decks
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#FF5722]" />
              Business card designs
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#8E609B]/20 to-[#FF5722]/20 p-8 md:p-12 rounded-2xl border border-[#8E609B]/30 my-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Download Your Free Brand Kit</h3>
        <p className="text-gray-300 mb-6">
          Get instant access to all templates and guidelines. No credit card required, just your email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-[#FF5722] transition-colors"
          />
          <button className="flex items-center justify-center gap-2 bg-[#FF5722] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#E64A19] transition-colors">
            <Download size={20} />
            Download Now
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          By downloading, you'll also get our weekly branding tips newsletter. Unsubscribe anytime.
        </p>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-12" style={{ fontFamily: 'Oswald, sans-serif' }}>
        How to Use These Resources Effectively
      </h3>

      <div className="space-y-6">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <h4 className="text-xl font-bold mb-2">1. Start with Your Logo</h4>
          <p className="text-gray-400">
            Use the logo usage guide to ensure your logo is always presented professionally. Maintain proper clear space and avoid distortion.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <h4 className="text-xl font-bold mb-2">2. Establish Color Consistency</h4>
          <p className="text-gray-400">
            Apply your color palette consistently across all materials. Use the primary colors for key elements and accents strategically.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <h4 className="text-xl font-bold mb-2">3. Maintain Typography Hierarchy</h4>
          <p className="text-gray-400">
            Follow the typography guidelines to create clear visual hierarchy. This improves readability and professional appearance.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#8E609B]">
          <h4 className="text-xl font-bold mb-2">4. Customize the Templates</h4>
          <p className="text-gray-400">
            Adapt the provided templates to your specific needs while maintaining brand consistency. Replace placeholder content with your own.
          </p>
        </div>
      </div>

      <div className="bg-[#FF5722]/10 border border-[#FF5722]/30 p-8 rounded-xl my-8">
        <h4 className="text-xl font-bold mb-3">Need Custom Brand Guidelines?</h4>
        <p className="text-gray-300 mb-4">
          While these free resources are a great starting point, a custom brand guideline document tailored to your business provides deeper strategic value. Our professional brand guideline service includes:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Complete brand strategy and positioning documentation</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Custom illustrations and brand elements</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Digital and print specifications</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="mt-1 flex-shrink-0 text-[#FF5722]" />
            <span>Brand voice and messaging guidelines</span>
          </li>
        </ul>
      </div>

      <p className="text-xl text-gray-300 leading-relaxed mt-8">
        Whether you use our free templates or invest in custom guidelines, consistency is key. Start implementing these resources today and watch your brand recognition grow.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Brand Guidelines & Templates: Free Resources to Build a Professional Brand"
      author="Creative Team"
      date="November 28, 2025"
      readTime="6 min read"
      category="Design Studio"
      gradient="from-[#FF5722] to-[#E64A19]"
      heroImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80"
      content={content}
      tags={['Brand Guidelines', 'Templates', 'Free Resources', 'Design', 'Branding']}
    />
  );
};

export default BrandGuidelines;

import React from 'react';
import BlogPost from './BlogPost';
import { Brain, Cpu, TrendingUp, Zap } from 'lucide-react';

const AIPoweredSolutions = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80" 
          alt="AI-powered business solutions"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        AI-Powered Business Solutions: Transform Operations with Intelligence
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Artificial Intelligence isn't science fiction anymore—it's a business necessity. Companies using AI are outperforming competitors by 40% in productivity and cutting operational costs by 30%. The question isn't whether to adopt AI, but how quickly you can implement it.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-[#673AB7]" size={28} />
            <h3 className="text-xl font-bold">10x Faster</h3>
          </div>
          <p className="text-gray-400">
            AI automates tasks that take humans hours, completing them in seconds.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#673AB7]" size={28} />
            <h3 className="text-xl font-bold">95% Accuracy</h3>
          </div>
          <p className="text-gray-400">
            Machine learning models make decisions with superhuman precision.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-[#673AB7]" size={28} />
            <h3 className="text-xl font-bold">24/7 Operation</h3>
          </div>
          <p className="text-gray-400">
            AI systems work continuously without breaks, weekends, or vacations.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        AI Solutions We Implement
      </h3>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#673AB7]">
          <h4 className="text-xl font-bold mb-3">🤖 Intelligent Chatbots & Virtual Assistants</h4>
          <p className="text-gray-400 mb-4">
            Handle customer inquiries 24/7, qualify leads, book appointments, and provide instant support—without hiring more staff.
          </p>
          <div className="bg-[#673AB7]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Real Impact:</strong> A D2C brand we work with handles 1,200+ customer conversations monthly with AI, saving ₹8 lakh in support costs while improving response time from 4 hours to instant.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#673AB7]">
          <h4 className="text-xl font-bold mb-3">📊 Predictive Analytics & Forecasting</h4>
          <p className="text-gray-400 mb-4">
            AI analyzes historical data to predict future trends: sales forecasts, inventory needs, customer churn, equipment failures.
          </p>
          <div className="bg-[#673AB7]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Real Impact:</strong> Retail client reduced stockouts by 62% and overstock by 47% using our AI demand forecasting, improving cash flow by ₹3.2 crore.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#673AB7]">
          <h4 className="text-xl font-bold mb-3">🎯 Personalization Engines</h4>
          <p className="text-gray-400 mb-4">
            Show each customer exactly what they want. AI recommendation systems increase conversion rates by analyzing behavior patterns.
          </p>
          <div className="bg-[#673AB7]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Real Impact:</strong> E-commerce client saw 156% increase in average order value after implementing personalized product recommendations.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#673AB7]">
          <h4 className="text-xl font-bold mb-3">🔍 Computer Vision</h4>
          <p className="text-gray-400 mb-4">
            Quality control automation, document processing, facial recognition, inventory counting—AI sees and understands images like humans.
          </p>
          <div className="bg-[#673AB7]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Real Impact:</strong> Manufacturing client reduced quality defects by 91% using AI vision to inspect products, catching issues humans miss.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#673AB7]">
          <h4 className="text-xl font-bold mb-3">📝 Natural Language Processing</h4>
          <p className="text-gray-400 mb-4">
            Analyze customer feedback, extract insights from documents, translate content, sentiment analysis, contract review.
          </p>
          <div className="bg-[#673AB7]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Real Impact:</strong> Legal firm processes contracts 15x faster with AI document analysis, identifying risk clauses automatically.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#673AB7]">
          <h4 className="text-xl font-bold mb-3">⚙️ Process Automation</h4>
          <p className="text-gray-400 mb-4">
            Robotic Process Automation (RPA) combined with AI handles repetitive tasks: data entry, invoice processing, report generation.
          </p>
          <div className="bg-[#673AB7]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Real Impact:</strong> Accounting firm automated 80% of data entry work, freeing staff to focus on high-value advisory services.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#673AB7]/20 to-[#311B92]/20 p-8 rounded-xl border border-[#673AB7]/30 my-12">
        <h3 className="text-2xl font-bold mb-4">The AI Implementation Roadmap</h3>
        <p className="text-gray-300 mb-6">
          We don't just throw AI at problems. Our proven methodology ensures successful implementation:
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#673AB7] flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h5 className="font-bold text-white mb-1">Opportunity Assessment</h5>
              <p className="text-gray-400 text-sm">Identify processes where AI delivers maximum ROI. Not everything needs AI—we focus on high-impact areas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#673AB7] flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h5 className="font-bold text-white mb-1">Data Preparation</h5>
              <p className="text-gray-400 text-sm">AI needs quality data. We clean, structure, and prepare your data for machine learning.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#673AB7] flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h5 className="font-bold text-white mb-1">Model Development</h5>
              <p className="text-gray-400 text-sm">Build and train AI models using your specific business context and requirements.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#673AB7] flex items-center justify-center text-sm font-bold">4</div>
            <div>
              <h5 className="font-bold text-white mb-1">Integration & Testing</h5>
              <p className="text-gray-400 text-sm">Seamlessly integrate AI into existing workflows. Rigorous testing ensures accuracy before deployment.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#673AB7] flex items-center justify-center text-sm font-bold">5</div>
            <div>
              <h5 className="font-bold text-white mb-1">Monitoring & Optimization</h5>
              <p className="text-gray-400 text-sm">AI models improve over time. We continuously monitor performance and retrain models with new data.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Common AI Myths (That Cost You Money)
      </h3>

      <div className="space-y-4 mb-12">
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">Myth: "AI is Too Expensive for Small Businesses"</h4>
          <p className="text-gray-300">
            <strong>Reality:</strong> Cloud-based AI tools have democratized access. Starting at ₹50k/month, you can implement AI solutions that deliver 10x ROI within 6 months.
          </p>
        </div>

        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">Myth: "We Don't Have Enough Data"</h4>
          <p className="text-gray-300">
            <strong>Reality:</strong> Modern AI works with limited data using transfer learning and pre-trained models. Plus, we can augment your existing data.
          </p>
        </div>

        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">Myth: "AI Will Replace Our Employees"</h4>
          <p className="text-gray-300">
            <strong>Reality:</strong> AI augments humans, not replaces them. Your team focuses on strategic work while AI handles repetitive tasks. Employee satisfaction actually increases.
          </p>
        </div>

        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-xl font-bold text-red-400 mb-2">Myth: "Implementation Takes Forever"</h4>
          <p className="text-gray-300">
            <strong>Reality:</strong> With our proven frameworks, you can have AI solutions in production within 6-12 weeks for most use cases.
          </p>
        </div>
      </div>

      <div className="bg-[#673AB7]/10 border border-[#673AB7]/30 p-8 rounded-xl">
        <h4 className="text-2xl font-bold mb-3">AI Readiness Assessment (Free)</h4>
        <p className="text-gray-300 mb-4">
          Not sure where AI fits in your business? We offer a free 1-hour AI readiness assessment. We'll:
        </p>
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>✓ Identify high-ROI AI opportunities in your operations</li>
          <li>✓ Estimate implementation costs and timelines</li>
          <li>✓ Calculate expected return on investment</li>
          <li>✓ Provide a roadmap for AI adoption</li>
        </ul>
        <p className="text-gray-300">
          Book your free assessment—no strings attached, no sales pressure. Just actionable insights.
        </p>
      </div>
    </div>
  );

  return (
    <BlogPost
      title="AI-Powered Business Solutions: Transform Your Operations with Intelligence"
      author="AI Innovation Team"
      date="November 15, 2025"
      readTime="11 min read"
      category="Innovation"
      gradient="from-[#673AB7] to-[#311B92]"
      heroImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80"
      content={content}
      tags={['Artificial Intelligence', 'Machine Learning', 'Automation', 'Digital Transformation', 'AI Strategy']}
    />
  );
};

export default AIPoweredSolutions;

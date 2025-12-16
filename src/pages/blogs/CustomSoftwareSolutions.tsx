import React from 'react';
import BlogPost from './BlogPost';
import { Code2, Smartphone, Layers, Rocket } from 'lucide-react';

const CustomSoftwareSolutions = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80" 
          alt="Custom software development"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Custom Software Solutions: Built for Your Unique Business Needs
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Off-the-shelf software forces your business to adapt to its limitations. Custom software adapts to your business, giving you competitive advantages that generic solutions can never provide.
      </p>

      <div className="bg-[#00BCD4]/10 border border-[#00BCD4]/30 p-8 rounded-xl my-8">
        <h3 className="text-2xl font-bold mb-4 text-[#00BCD4]">Why Generic Software Fails Your Business</h3>
        <div className="space-y-4">
          <p className="text-gray-300">
            You pay monthly subscriptions for features you'll never use. The features you actually need? Either unavailable or buried behind expensive add-ons.
          </p>
          <p className="text-gray-300">
            Your team spends hours on workarounds because the software wasn't built for your industry. Productivity suffers. Errors increase. Customers notice.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Our Custom Software Development Process
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        We don't just code. We become your technology partner, understanding your business deeply before writing a single line of code.
      </p>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#00BCD4]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Discovery & Strategy</h4>
              <p className="text-gray-400">
                We spend time understanding your workflows, pain points, and goals. What processes are manual? Where do bottlenecks occur? What competitive edge do you need?
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#00BCD4]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Architecture & Design</h4>
              <p className="text-gray-400">
                We design the system architecture for scalability, security, and performance. User experience is prototyped and tested before development begins.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#00BCD4]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Agile Development</h4>
              <p className="text-gray-400">
                We build in sprints, delivering working features every 2 weeks. You see progress, provide feedback, and guide development. No surprises at the end.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#00BCD4]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Testing & Quality Assurance</h4>
              <p className="text-gray-400">
                Rigorous testing across devices, browsers, and use cases. We catch bugs before your users do. Security audits ensure your data is protected.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#00BCD4]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Deployment & Training</h4>
              <p className="text-gray-400">
                Smooth rollout with minimal disruption. We train your team, provide documentation, and ensure everyone is confident using the new system.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#00BCD4]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-sm font-bold">6</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Ongoing Support & Evolution</h4>
              <p className="text-gray-400">
                Software isn't "done"—it evolves with your business. We provide maintenance, bug fixes, and feature additions as your needs change.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        What We Build
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="text-[#00BCD4]" size={32} />
            <h4 className="text-xl font-bold">Enterprise Applications</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Internal tools that streamline operations: CRM systems, inventory management, HR platforms, project management solutions.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Custom CRM & ERP systems</li>
            <li>• Workflow automation tools</li>
            <li>• Document management systems</li>
            <li>• Analytics dashboards</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="text-[#00BCD4]" size={32} />
            <h4 className="text-xl font-bold">Customer-Facing Apps</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Digital experiences that delight customers: mobile apps, web portals, e-commerce platforms, booking systems.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Native iOS & Android apps</li>
            <li>• Progressive web apps</li>
            <li>• E-commerce platforms</li>
            <li>• Customer portals</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-[#00BCD4]" size={32} />
            <h4 className="text-xl font-bold">SaaS Products</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Turn your idea into a subscription business: multi-tenant architecture, billing integration, user management.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Multi-tenant SaaS platforms</li>
            <li>• Subscription & billing systems</li>
            <li>• API development</li>
            <li>• Third-party integrations</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="text-[#00BCD4]" size={32} />
            <h4 className="text-xl font-bold">Legacy Modernization</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Upgrade outdated systems to modern technology: cloud migration, API integration, performance optimization.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Legacy system migration</li>
            <li>• Cloud modernization</li>
            <li>• Performance optimization</li>
            <li>• Security upgrades</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#00BCD4]/20 to-[#006064]/20 p-8 rounded-xl border border-[#00BCD4]/30 my-12">
        <h3 className="text-2xl font-bold mb-4">Case Study: Manufacturing Operations App</h3>
        <p className="text-gray-300 mb-6">
          A manufacturing client was using Excel sheets to manage production schedules, inventory, and quality control. Errors were frequent, visibility was poor.
        </p>
        <p className="text-gray-300 mb-6">
          We built a custom production management system that:
        </p>
        <ul className="space-y-3 text-gray-300 mb-6">
          <li className="flex items-start gap-3">
            <span className="text-[#00BCD4] text-xl">→</span>
            <span>Digitized all production workflows with mobile app for floor workers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00BCD4] text-xl">→</span>
            <span>Real-time dashboard showing production status, bottlenecks, and quality metrics</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00BCD4] text-xl">→</span>
            <span>Automated inventory tracking with supplier integration</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00BCD4] text-xl">→</span>
            <span>Quality control module with photo documentation and traceability</span>
          </li>
        </ul>
        <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="text-4xl font-bold text-[#00BCD4] mb-2">40%</div>
            <div className="text-gray-300">Production efficiency increase</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00BCD4] mb-2">85%</div>
            <div className="text-gray-300">Reduction in quality defects</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00BCD4] mb-2">₹2.1Cr</div>
            <div className="text-gray-300">Annual cost savings</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Technology Stack We Use
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        We choose technologies based on your specific needs, not trends:
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-3">Frontend Development</h4>
          <p className="text-gray-400 text-sm mb-3">React, Vue.js, Angular, Next.js, React Native, Flutter</p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-3">Backend Development</h4>
          <p className="text-gray-400 text-sm mb-3">Node.js, Python, Java, .NET, PHP, Go</p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-3">Databases</h4>
          <p className="text-gray-400 text-sm mb-3">PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch</p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-3">Cloud & DevOps</h4>
          <p className="text-gray-400 text-sm mb-3">AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD</p>
        </div>
      </div>

      <div className="bg-[#00BCD4]/10 border border-[#00BCD4]/30 p-8 rounded-xl">
        <h4 className="text-2xl font-bold mb-3">Start with a Discovery Session</h4>
        <p className="text-gray-300">
          Not sure if custom software is right for you? Book a free discovery session. We'll analyze your current processes, identify opportunities, and provide a clear recommendation—with no obligation.
        </p>
      </div>
    </div>
  );

  return (
    <BlogPost
      title="Custom Software Solutions: Tailored Applications for Your Business"
      author="Development Team"
      date="November 18, 2025"
      readTime="12 min read"
      category="Software"
      gradient="from-[#00BCD4] to-[#006064]"
      heroImage="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80"
      content={content}
      tags={['Custom Software', 'Development', 'Enterprise Apps', 'SaaS', 'Digital Transformation']}
    />
  );
};

export default CustomSoftwareSolutions;

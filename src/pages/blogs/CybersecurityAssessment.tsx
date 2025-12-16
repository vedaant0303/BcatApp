import React from 'react';
import BlogPost from './BlogPost';
import { ShieldCheck, Lock, AlertTriangle, Eye } from 'lucide-react';

const CybersecurityAssessment = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80" 
          alt="Cybersecurity protection"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Cybersecurity Assessment: Protect Your Business from Modern Threats
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Cyber attacks cost Indian businesses over ₹1.25 lakh crore annually. Yet 73% of companies have no comprehensive security strategy. A single breach can destroy years of trust, customer data, and revenue. Here's how to protect your business properly.
      </p>

      <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-xl my-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-400" size={32} />
          <h3 className="text-2xl font-bold text-red-400">The Stakes Are Higher Than Ever</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div>
            <div className="text-3xl font-bold text-red-400 mb-2">₹17.9Cr</div>
            <div className="text-gray-300 text-sm">Average cost of a data breach in India</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400 mb-2">287 days</div>
            <div className="text-gray-300 text-sm">Average time to identify a breach</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400 mb-2">60%</div>
            <div className="text-gray-300 text-sm">Of small businesses close within 6 months of a breach</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        What Makes You Vulnerable?
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        Most businesses unknowingly expose themselves to attacks. These are the most common vulnerabilities we discover during assessments:
      </p>

      <div className="space-y-4 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-red-500/30">
          <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Lock className="text-red-400" size={24} />
            Weak Access Controls
          </h4>
          <p className="text-gray-400">
            Shared passwords, no multi-factor authentication, former employees still having access. It's like leaving your office door wide open at night.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-red-500/30">
          <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
            <AlertTriangle className="text-red-400" size={24} />
            Unpatched Systems
          </h4>
          <p className="text-gray-400">
            Running outdated software is like driving without brakes. Known vulnerabilities are hacker playgrounds. 82% of breaches exploit old, unpatched systems.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-red-500/30">
          <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Eye className="text-red-400" size={24} />
            No Monitoring
          </h4>
          <p className="text-gray-400">
            If you're not actively monitoring your systems, hackers could be inside your network for months without detection. Silent theft of customer data, financial records, and intellectual property.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-red-500/30">
          <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="text-red-400" size={24} />
            Inadequate Backup
          </h4>
          <p className="text-gray-400">
            Ransomware can encrypt all your data in minutes. Without proper, tested backups, you're forced to either pay the ransom or lose everything.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Our Comprehensive Security Assessment Process
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        We conduct a thorough 360-degree security evaluation that identifies every vulnerability in your infrastructure, applications, and processes.
      </p>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#4CAF50]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Infrastructure Audit</h4>
              <p className="text-gray-400">
                We scan your network, servers, databases, and cloud systems for vulnerabilities. Penetration testing identifies weak points before attackers do.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#4CAF50]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Application Security Review</h4>
              <p className="text-gray-400">
                Your customer-facing apps and internal tools are evaluated for common vulnerabilities: SQL injection, cross-site scripting, authentication flaws.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#4CAF50]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Access Control Analysis</h4>
              <p className="text-gray-400">
                We review who has access to what. Often, we find ex-employees still have admin access, or contractors can view sensitive customer data.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#4CAF50]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Policy & Compliance Check</h4>
              <p className="text-gray-400">
                Are you compliant with GDPR, ISO 27001, or industry standards? We identify gaps in policies, employee training, and incident response plans.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#4CAF50]">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Social Engineering Test</h4>
              <p className="text-gray-400">
                Most breaches start with a phishing email. We simulate real-world attacks to see how your team responds. The results are eye-opening.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#1B5E20]/20 p-8 rounded-xl border border-[#4CAF50]/30 my-12">
        <h3 className="text-2xl font-bold mb-4">What You Receive</h3>
        <p className="text-gray-300 mb-6">
          After the assessment, you get a detailed report with:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <ShieldCheck className="flex-shrink-0 text-[#4CAF50] mt-1" size={20} />
            <span><strong>Risk-Ranked Vulnerabilities:</strong> Critical issues highlighted, with severity levels and exploitation likelihood.</span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="flex-shrink-0 text-[#4CAF50] mt-1" size={20} />
            <span><strong>Step-by-Step Remediation Plan:</strong> Exactly what to fix, in what order, with clear timelines.</span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="flex-shrink-0 text-[#4CAF50] mt-1" size={20} />
            <span><strong>Compliance Roadmap:</strong> What you need to achieve certification or regulatory compliance.</span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="flex-shrink-0 text-[#4CAF50] mt-1" size={20} />
            <span><strong>Cost-Benefit Analysis:</strong> ROI of implementing each security measure vs. potential breach costs.</span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="flex-shrink-0 text-[#4CAF50] mt-1" size={20} />
            <span><strong>Executive Summary:</strong> A non-technical overview for leadership decision-making.</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The Cost of Doing Nothing
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        Many businesses delay security assessments, thinking "it won't happen to us." Then it does:
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-gray-300">
            <strong className="text-white">Financial Loss:</strong> Direct costs from ransomware payments, legal fees, regulatory fines, and lost business.
          </p>
        </div>
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-gray-300">
            <strong className="text-white">Reputation Damage:</strong> Customer trust evaporates instantly. News of breaches spreads fast. Recovery takes years, if ever.
          </p>
        </div>
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-gray-300">
            <strong className="text-white">Legal Consequences:</strong> Under GDPR and DPDP Act, businesses face massive fines for data breaches. Directors can be held personally liable.
          </p>
        </div>
      </div>

      <p className="text-xl text-gray-300 leading-relaxed mt-8">
        A cybersecurity assessment isn't an expense—it's insurance. The average cost of our comprehensive assessment is ₹2.5 lakh. The average cost of a breach is ₹17.9 crore. The math is simple.
      </p>

      <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 p-8 rounded-xl mt-12">
        <h4 className="text-2xl font-bold mb-3">Free Security Quick Scan</h4>
        <p className="text-gray-300">
          Not ready for a full assessment? We offer a complimentary basic security scan that checks for the most common vulnerabilities. Takes 30 minutes, gives you immediate insights.
        </p>
      </div>
    </div>
  );

  return (
    <BlogPost
      title="Cybersecurity Assessment: Protect Your Business from Threats"
      author="Security Team"
      date="November 22, 2025"
      readTime="12 min read"
      category="Infra & Network"
      gradient="from-[#4CAF50] to-[#1B5E20]"
      content={content}
      tags={['Cybersecurity', 'Security Assessment', 'Data Protection', 'Risk Management', 'Compliance']}
    />
  );
};

export default CybersecurityAssessment;

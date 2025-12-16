import React from 'react';
import BlogPost from './BlogPost';
import { Beaker, Code, Sparkles, Zap } from 'lucide-react';

const CatalystLabSuite = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=1200&q=80" 
          alt="Laboratory management system"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Catalyst Lab Suite: Revolutionary Laboratory Management
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Managing a modern laboratory shouldn't feel like solving a puzzle blindfolded. Yet most labs struggle with outdated systems, paper trails, and manual processes that waste time and increase errors. Catalyst Lab Suite changes everything.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-[#9C27B0]" size={28} />
            <h3 className="text-xl font-bold">70% Time Saved</h3>
          </div>
          <p className="text-gray-400">
            Automated workflows eliminate repetitive tasks and manual data entry.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Code className="text-[#9C27B0]" size={28} />
            <h3 className="text-xl font-bold">Zero Errors</h3>
          </div>
          <p className="text-gray-400">
            Digital tracking and validation prevent transcription mistakes.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-[#9C27B0]" size={28} />
            <h3 className="text-xl font-bold">Full Compliance</h3>
          </div>
          <p className="text-gray-400">
            Meet ISO, NABL, and regulatory standards automatically.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        The Pain Points We Solve
      </h3>

      <div className="space-y-4 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#9C27B0]/30">
          <h4 className="text-xl font-bold mb-2 text-[#9C27B0]">Sample Chaos</h4>
          <p className="text-gray-400">
            Samples get lost, mislabeled, or mixed up. Test results are delayed. Customers complain. Your lab's reputation suffers. Our system tracks every sample from arrival to final report with QR codes and RFID.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#9C27B0]/30">
          <h4 className="text-xl font-bold mb-2 text-[#9C27B0]">Reporting Nightmares</h4>
          <p className="text-gray-400">
            Generating reports manually takes hours. Formatting errors, missing data, and version confusion are constant headaches. Catalyst Lab auto-generates professional reports in seconds.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#9C27B0]/30">
          <h4 className="text-xl font-bold mb-2 text-[#9C27B0]">Compliance Stress</h4>
          <p className="text-gray-400">
            Audits are terrifying when your records are scattered across registers and Excel sheets. Our system maintains audit trails automatically, making compliance effortless.
          </p>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-[#9C27B0]/30">
          <h4 className="text-xl font-bold mb-2 text-[#9C27B0]">Equipment Downtime</h4>
          <p className="text-gray-400">
            Instruments break unexpectedly because maintenance schedules are forgotten. Calibration certificates expire. Tests halt. We automate equipment management with predictive maintenance alerts.
          </p>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Catalyst Lab Suite: Complete Solution
      </h3>

      <p className="text-gray-300 leading-relaxed mb-6">
        Our flagship laboratory management platform includes everything you need:
      </p>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#9C27B0]">
          <h4 className="text-xl font-bold mb-3">📝 Sample Management</h4>
          <p className="text-gray-400 mb-3">
            Digital sample registration with QR codes. Track location, status, and test progress in real-time. Automated notifications when samples require action.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Barcode/QR code generation and scanning</li>
            <li>• Storage location tracking</li>
            <li>• Expiry date monitoring</li>
            <li>• Chain of custody documentation</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#9C27B0]">
          <h4 className="text-xl font-bold mb-3">🧪 Test Management</h4>
          <p className="text-gray-400 mb-3">
            Configure test methods, parameters, and workflows. Technicians follow digital SOPs, eliminating manual errors.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Standard test templates library</li>
            <li>• Custom test configurations</li>
            <li>• Multi-parameter testing</li>
            <li>• Automatic calculations</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#9C27B0]">
          <h4 className="text-xl font-bold mb-3">📊 Results & Reporting</h4>
          <p className="text-gray-400 mb-3">
            Enter results once, generate unlimited report formats. Automatic pass/fail decisions based on specifications.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Branded PDF reports with digital signatures</li>
            <li>• Email automation to clients</li>
            <li>• Certificate generation</li>
            <li>• Custom report templates</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#9C27B0]">
          <h4 className="text-xl font-bold mb-3">🔧 Equipment Management</h4>
          <p className="text-gray-400 mb-3">
            Maintain equipment master lists, calibration schedules, and service history. Alerts before certificates expire.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Calibration reminders</li>
            <li>• Maintenance scheduling</li>
            <li>• Usage tracking</li>
            <li>• Service history logs</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#9C27B0]">
          <h4 className="text-xl font-bold mb-3">💰 Billing & Invoicing</h4>
          <p className="text-gray-400 mb-3">
            Integrated billing module generates invoices automatically when reports are finalized. Track payments and send reminders.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Automatic invoice generation</li>
            <li>• Payment tracking</li>
            <li>• GST compliance</li>
            <li>• Client account management</li>
          </ul>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#9C27B0]">
          <h4 className="text-xl font-bold mb-3">📈 Analytics Dashboard</h4>
          <p className="text-gray-400 mb-3">
            Real-time insights into lab performance. Identify bottlenecks, track turnaround times, and optimize operations.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Test volume trends</li>
            <li>• Turnaround time analysis</li>
            <li>• Revenue reports</li>
            <li>• Technician productivity metrics</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#9C27B0]/20 to-[#4A148C]/20 p-8 rounded-xl border border-[#9C27B0]/30 my-12">
        <h3 className="text-2xl font-bold mb-4">Real Lab, Real Results</h3>
        <p className="text-gray-300 mb-6">
          When ABC Diagnostics implemented Catalyst Lab Suite, their operations transformed completely:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#9C27B0] mb-2">50%</div>
            <div className="text-gray-300">Faster report turnaround</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#9C27B0] mb-2">100%</div>
            <div className="text-gray-300">Audit compliance rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#9C27B0] mb-2">₹18L</div>
            <div className="text-gray-300">Annual savings from efficiency</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Why Labs Choose Catalyst Lab Suite
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">✓ Cloud-Based, Access Anywhere</h4>
          <p className="text-gray-400 text-sm">
            Work from multiple locations. Remote approvals. No server maintenance headaches.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">✓ Mobile App for Technicians</h4>
          <p className="text-gray-400 text-sm">
            Enter results on tablets or phones. Scan samples with mobile camera. Work faster.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">✓ Client Portal</h4>
          <p className="text-gray-400 text-sm">
            Customers track their samples online, download reports instantly. Reduces support calls.
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border border-white/10">
          <h4 className="text-lg font-bold mb-2">✓ Multi-Branch Support</h4>
          <p className="text-gray-400 text-sm">
            Manage multiple lab locations from one system. Centralized reporting and control.
          </p>
        </div>
      </div>

      <div className="bg-[#9C27B0]/10 border border-[#9C27B0]/30 p-8 rounded-xl">
        <h4 className="text-2xl font-bold mb-3">Free Demo & Consultation</h4>
        <p className="text-gray-300">
          See Catalyst Lab Suite in action with your lab's actual workflows. We'll show you exactly how much time and money you'll save. Book a personalized demo today.
        </p>
      </div>
    </div>
  );

  return (
    <BlogPost
      title="Catalyst Lab Suite: Our Flagship Laboratory Management System"
      author="Product Team"
      date="November 20, 2025"
      readTime="10 min read"
      category="Software"
      gradient="from-[#9C27B0] to-[#4A148C]"
      heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80"
      content={content}
      tags={['Laboratory Management', 'LIMS', 'Software', 'Automation', 'Compliance']}
    />
  );
};

export default CatalystLabSuite;

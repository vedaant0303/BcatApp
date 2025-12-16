import React from 'react';
import BlogPost from './BlogPost';
import { Blocks, Shield, Coins, TrendingUp } from 'lucide-react';

const BlockchainWeb3 = () => {
  const content = (
    <div className="space-y-8">
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1644143379190-08a5f055de1d?w=1200&q=80" 
          alt="Blockchain and Web3 technology"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Blockchain & Web3 Services: Future-Proof Your Business Today
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        Blockchain isn't just cryptocurrency hype. It's a fundamental technology shift that's transforming supply chains, contracts, identity verification, and ownership. Smart businesses are building on Web3 infrastructure now, gaining first-mover advantages before competitors catch up.
      </p>

      <div className="bg-[#FF9800]/10 border border-[#FF9800]/30 p-8 rounded-xl my-8">
        <h3 className="text-2xl font-bold mb-4 text-[#FF9800]">Why Blockchain Matters for Business</h3>
        <p className="text-gray-300 mb-4">
          Blockchain creates trust without intermediaries. Transactions are transparent, tamper-proof, and verified by mathematics, not middlemen. This eliminates fraud, reduces costs, and opens new business models.
        </p>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Blockchain Solutions We Build
      </h3>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
            <Shield className="text-[#FF9800]" size={24} />
            Supply Chain Transparency
          </h4>
          <p className="text-gray-400 mb-4">
            Track products from source to customer with immutable records. Prove authenticity, prevent counterfeiting, and build customer trust.
          </p>
          <div className="bg-[#FF9800]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Use Case:</strong> Luxury goods brands use blockchain to verify authenticity. Each product gets a unique digital identity that customers can verify, eliminating ₹50,000 crore counterfeit market.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
            <Coins className="text-[#FF9800]" size={24} />
            Tokenization & Digital Assets
          </h4>
          <p className="text-gray-400 mb-4">
            Convert real-world assets into digital tokens: real estate, art, intellectual property, loyalty points. Enable fractional ownership and instant trading.
          </p>
          <div className="bg-[#FF9800]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Use Case:</strong> Real estate platform enables fractional property ownership. Investors buy ₹50,000 stakes in premium properties, democratizing access to real estate investment.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
            <TrendingUp className="text-[#FF9800]" size={24} />
            Smart Contracts
          </h4>
          <p className="text-gray-400 mb-4">
            Self-executing agreements that automatically enforce terms. No lawyers, no delays, no disputes. Payments release when conditions are met.
          </p>
          <div className="bg-[#FF9800]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Use Case:</strong> Insurance company uses smart contracts for instant claim settlements. When conditions are verified (flight delayed, package damaged), payment triggers automatically—from days to seconds.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <h4 className="text-xl font-bold mb-3">🎫 NFTs & Digital Collectibles</h4>
          <p className="text-gray-400 mb-4">
            Create unique digital assets for memberships, certificates, tickets, artwork, and brand experiences. Unlock new revenue streams.
          </p>
          <div className="bg-[#FF9800]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Use Case:</strong> Fashion brand launches NFT membership cards. Holders get exclusive access to limited editions, early drops, and virtual fashion shows—creating ₹3 crore additional revenue stream.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <h4 className="text-xl font-bold mb-3">🔐 Decentralized Identity</h4>
          <p className="text-gray-400 mb-4">
            Give customers control of their data. Verify identity without storing sensitive information. Comply with privacy regulations while improving user experience.
          </p>
          <div className="bg-[#FF9800]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Use Case:</strong> Fintech platform uses decentralized identity for KYC. Customers verify once, use everywhere. Reduces onboarding time from days to minutes, 95% cost savings on verification.</p>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <h4 className="text-xl font-bold mb-3">🌐 DAO (Decentralized Organizations)</h4>
          <p className="text-gray-400 mb-4">
            Create transparent, community-governed organizations. Members vote on decisions, treasury is managed collectively, operations are automated.
          </p>
          <div className="bg-[#FF9800]/10 p-4 rounded-lg">
            <p className="text-sm text-gray-300"><strong>Use Case:</strong> Co-working space converts to DAO model. Members stake tokens, vote on amenities, share profits. Occupancy increased 40%, member satisfaction doubled.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FF9800]/20 to-[#E65100]/20 p-8 rounded-xl border border-[#FF9800]/30 my-12">
        <h3 className="text-2xl font-bold mb-4">Web3 Transformation: Real Business Impact</h3>
        <p className="text-gray-300 mb-6">
          A global logistics company implemented our blockchain supply chain solution:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-[#FF9800] mb-2">60%</div>
            <div className="text-gray-300">Reduction in documentation errors</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FF9800] mb-2">35%</div>
            <div className="text-gray-300">Faster customs clearance</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FF9800] mb-2">₹12Cr</div>
            <div className="text-gray-300">Annual cost savings from automation</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        How We Build Blockchain Solutions
      </h3>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-[#2a1a2e] rounded-xl">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Use Case Identification</h4>
              <p className="text-gray-400">
                Not every problem needs blockchain. We identify where decentralization, transparency, or tokenization add real value to your business.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Blockchain Platform Selection</h4>
              <p className="text-gray-400">
                Choose the right chain: Ethereum for DeFi, Polygon for scalability, Solana for speed, Hyperledger for enterprise privacy. We're blockchain-agnostic.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Smart Contract Development</h4>
              <p className="text-gray-400">
                Write secure, audited smart contracts in Solidity, Rust, or Move. Every line is tested—one bug can cost millions in blockchain.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Integration & UX Design</h4>
              <p className="text-gray-400">
                Users don't need to know blockchain exists. We create intuitive interfaces that abstract complexity—no crypto wallets for end users unless needed.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#2a1a2e] rounded-xl">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <h4 className="text-xl font-bold mb-2">Security Audits & Compliance</h4>
              <p className="text-gray-400">
                Third-party security audits, regulatory compliance checks, and penetration testing ensure your blockchain solution is rock-solid.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
        Blockchain Readiness Questions
      </h3>

      <p className="text-gray-300 mb-6">
        Is blockchain right for your business? Ask yourself:
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <p className="text-gray-300">
            <strong className="text-white">✓ Do multiple parties need to trust a shared data source?</strong> (Supply chain, contracts, credentials)
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <p className="text-gray-300">
            <strong className="text-white">✓ Would transparency build trust with customers?</strong> (Authenticity, provenance, carbon footprint)
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <p className="text-gray-300">
            <strong className="text-white">✓ Could you monetize through tokenization?</strong> (Assets, memberships, loyalty programs)
          </p>
        </div>
        <div className="p-6 bg-[#2a1a2e] rounded-xl border-l-4 border-[#FF9800]">
          <p className="text-gray-300">
            <strong className="text-white">✓ Are intermediaries causing delays and costs?</strong> (Payments, verification, reconciliation)
          </p>
        </div>
      </div>

      <p className="text-gray-300 mb-8">
        If you answered "yes" to any of these, blockchain could transform your business model.
      </p>

      <div className="bg-[#FF9800]/10 border border-[#FF9800]/30 p-8 rounded-xl">
        <h4 className="text-2xl font-bold mb-3">Free Blockchain Feasibility Study</h4>
        <p className="text-gray-300 mb-4">
          Curious about blockchain but not sure where to start? We offer a complimentary feasibility assessment:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>• Analyze your business processes for blockchain opportunities</li>
          <li>• Recommend the most suitable blockchain platform</li>
          <li>• Estimate implementation costs and ROI</li>
          <li>• Provide a phased implementation roadmap</li>
        </ul>
      </div>
    </div>
  );

  return (
    <BlogPost
      title="Blockchain & Web3 Services: Future-Proof Your Business Today"
      author="Blockchain Innovation Team"
      date="November 12, 2025"
      readTime="13 min read"
      category="Innovation"
      gradient="from-[#FF9800] to-[#E65100]"
      heroImage="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"
      content={content}
      tags={['Blockchain', 'Web3', 'Smart Contracts', 'NFT', 'Decentralization', 'Tokenization']}
    />
  );
};

export default BlockchainWeb3;

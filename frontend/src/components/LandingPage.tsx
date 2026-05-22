import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import React, { useRef, useState } from 'react';
import { ArrowRight, X, BarChart2, ShieldCheck, TrendingUp, FileText, Cpu, Calculator, PieChart, Search, Zap } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { useGoogleLogin } from '@react-oauth/google';

const avatars = [
   'https://files.peachworlds.com/website/910b4202-5d3e-480f-abeb-7e06818b962b/4.png',
   'https://files.peachworlds.com/website/d2097a74-2a6f-4400-8581-59c4c14e10af/1.png',
   'https://files.peachworlds.com/website/998a0f6b-6a69-4de9-83b2-053d4da10fc6/3.png',
   'https://files.peachworlds.com/website/9ee86a72-2173-442f-b411-546a6630ef37/2.png'
];

const logos = [
   'https://files.peachworlds.com/website/955bda87-77b0-4fb2-ac87-d0e3a166c06c/div-framer-1lv732o-4.svg',
   'https://files.peachworlds.com/website/747063b3-4605-478f-a4cc-37b7937ee00c/div-framer-1lv732o-.svg',
   'https://files.peachworlds.com/website/db2c7d5c-7e53-433b-8c3f-2197cf22730d/prada-logo-1.svg',
   'https://files.peachworlds.com/website/fd9ad756-35fb-4ebc-97a1-fe757cf288d2/div-framer-1lv732o-2.svg',
   'https://files.peachworlds.com/website/1b7d6318-117e-4296-9758-7b490083c24b/disney-wordmark-1.svg',
   'https://files.peachworlds.com/website/3866ece9-b368-4552-bdc5-d50b3c897476/div-framer-1lv732o-3.svg',
   'https://files.peachworlds.com/website/267a3959-7ece-4cbb-888b-005fc2da3598/div-framer-1lv732o-5.svg',
];

const featureCards = [
   {
      idx: '01',
      label: 'DATA INGESTION',
      title: 'Automated CSV Parsing',
      desc: 'Automatically parse CSV uploads from Amazon MTR, Shopify, and custom ERP workflows with 99.9% accuracy.',
      img: 'https://files.peachworlds.com/website/ef1af829-2926-4bfa-adf1-bc4ed3653130/frame-1707479969.jpg'
   },
   {
      idx: '02',
      label: 'RISK SCRUBBING',
      title: 'Advanced AI Fraud Analysis',
      desc: 'An advanced AI-powered fraud and risk analysis engine designed to protect your revenue streams from suspicious activity.',
      img: 'https://files.peachworlds.com/website/6c5b9dbc-a5cf-4d7e-ba61-86826215523b/frame-1707479970.jpg'
   },
   {
      idx: '03',
      label: 'TAX COMPLIANCE',
      title: 'Multi-Channel Tax Reporting',
      desc: 'Automated GST and tax breakdowns for multi-channel operations, fully prepared for filing.',
      img: 'https://files.peachworlds.com/website/c8f984e9-3162-431c-ab7e-96f2e5fa2e88/frame-1707479971.jpg'
   }
];

const solutions = [
   {
      icon: 'https://files.peachworlds.com/website/78e021bd-adca-4fa4-8f3e-488c34dfc5de/saas-vector-1-1.png',
      title: 'D2C Brands',
      desc: 'Consolidate Shopify and Amazon data to understand your true customer acquisition cost and LTV.'
   },
   {
      icon: 'https://files.peachworlds.com/website/391c0325-43ef-4481-8be3-2ff5ac827054/group.png',
      title: 'Marketplace Aggregators',
      desc: 'Manage hundreds of brands from a single dashboard with unified reporting and automated audit workflows.'
   },
   {
      icon: '',
      title: 'Tax Professionals',
      desc: 'Automate the heavy lifting of marketplace tax reconciliation while delivering accurate client-ready reports.'
   },
   {
      icon: 'https://files.peachworlds.com/website/33d7700e-d89e-4c5e-9b6a-5059ec89ac5e/frame.png',
      title: 'Scale Effectively',
      desc: 'Scale globally with robust API integrations, real-time data synchronization, and advanced risk monitoring.'
   }
];

function SolutionItem({ sol, i }: { sol: any; i: number }) {
   const ref = useRef(null);
   const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: isInView ? 1 : 0.5, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.95 }}
         transition={{ duration: 0.7, ease: "easeOut" }}
         className="relative overflow-hidden rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-12 min-h-[400px] flex flex-col justify-between transition-all duration-500 hover:bg-white/10 group"
      >
         <h3 className="font-display text-[32px] md:text-[40px] font-medium text-white mb-6 tracking-tight drop-shadow-sm z-10">
            {sol.title}
         </h3>

         {/* Decorative Visuals based on index */}
         <div className="absolute inset-y-0 right-0 w-[60%] pointer-events-none overflow-hidden origin-right transition-transform duration-700 ease-out group-hover:scale-105">
            {i === 0 && (
               <div className="absolute right-[-10%] top-[10%] grid grid-cols-3 gap-4 opacity-40">
                  {[...Array(9)].map((_, j) => (
                     <div key={j} className={`w-32 h-32 rounded-3xl border-2 ${j === 4 ? 'border-white bg-white/20' : 'border-white/30'} flex items-center justify-center relative`}>
                        {j === 4 && (
                           <>
                              <div className="w-4 h-4 text-white/80">+</div>
                              <svg className="absolute -bottom-6 -right-6 w-10 h-10 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4-4.4 4.5z" />
                              </svg>
                           </>
                        )}
                     </div>
                  ))}
               </div>
            )}
            {i === 1 && (
               <div className="absolute right-[5%] bottom-[-10%] w-64 h-48 rounded-t-3xl border-2 border-white/30 flex p-6 opacity-40">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-white/50" />
                     <div className="w-3 h-3 rounded-full bg-white/50" />
                     <div className="w-3 h-3 rounded-full bg-white/50" />
                  </div>
               </div>
            )}
            {i === 2 && (
               <div className="absolute right-[10%] top-[20%] w-48 h-48 rounded-full border border-white/20 opacity-40 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-white/30 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full border border-white/40" />
                  </div>
               </div>
            )}
            {i === 3 && (
               <div className="absolute right-[-5%] top-[20%] flex flex-col gap-6 opacity-40">
                  <div className="w-48 h-12 rounded-full border-2 border-white/30" />
                  <div className="w-64 h-12 rounded-full border-2 border-white/30 -ml-8" />
                  <div className="w-40 h-12 rounded-full border-2 border-white/30 ml-4" />
               </div>
            )}
         </div>

         <div className="max-w-[480px] z-10 mt-32">
            <p className="text-white/80 text-[18px] md:text-[20px] leading-relaxed drop-shadow-sm">
               {sol.desc}
            </p>
         </div>
      </motion.div>
   );
}

function AdvantageItem({ item, i }: { item: any, i: number }) {
   const ref = useRef(null);
   const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: isInView ? 1 : 0.5, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.95 }}
         transition={{ duration: 0.7, ease: "easeOut" }}
         className="relative overflow-hidden rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-12 min-h-[300px] flex flex-col justify-between transition-all duration-500 hover:bg-white/10 group"
      >
         <h3 className="font-display text-[56px] md:text-[72px] font-medium text-white mb-6 leading-none tracking-tight drop-shadow-sm z-10">
            {item.stat}
         </h3>

         <div className="absolute inset-0 pointer-events-none overflow-hidden origin-right transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            {i === 0 && (
               <div className="absolute right-0 bottom-0 flex items-end gap-3 opacity-40 translate-x-[15%] translate-y-[15%]">
                  <div className="w-12 h-20 bg-white/30 rounded-t-xl" />
                  <div className="w-12 h-32 bg-white/50 rounded-t-xl" />
                  <div className="w-12 h-44 bg-white/80 rounded-t-xl relative">
                     <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                  </div>
               </div>
            )}
            {i === 1 && (
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] w-48 h-48 rounded-full border-[16px] border-white/10 border-t-white/50 opacity-80" />
            )}
            {i === 2 && (
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[10%] flex -space-x-6 opacity-60">
                  <div className="w-20 h-20 rounded-full border border-white/30 bg-white/5" />
                  <div className="w-20 h-20 rounded-full border border-white/30 bg-white/10" />
                  <div className="w-20 h-20 rounded-full border border-white/30 bg-white/20 flex items-center justify-center backdrop-blur-sm">
                     <div className="text-white font-medium text-xl leading-none">+</div>
                  </div>
               </div>
            )}
            {i === 3 && (
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[15%] opacity-50 p-6 border-2 border-white/20 rounded-3xl w-48 h-32 rotate-[-10deg]">
                  <div className="w-full h-3 bg-white/30 rounded-full mb-4" />
                  <div className="w-3/4 h-3 bg-white/30 rounded-full mb-4" />
                  <div className="w-2/3 h-3 bg-white/30 rounded-full" />
               </div>
            )}
         </div>

         <div className="z-10 mt-16">
            <p className="text-[20px] md:text-[24px] font-medium text-white/90 drop-shadow-sm">
               {item.text}
            </p>
         </div>
      </motion.div>
   );
}

interface LandingPageProps {
   onGetStarted: () => void;
   onTryFree: () => void;
   onLogin: () => void;
   onGoogleSuccess?: (response: any) => void;
}

export default function LandingPage({ onGetStarted, onTryFree, onLogin, onGoogleSuccess }: LandingPageProps) {
   const googleLogin = useGoogleLogin({
      onSuccess: (codeResponse) => {
         if (onGoogleSuccess) onGoogleSuccess(codeResponse);
      },
      onError: (error) => console.log('Login Failed:', error)
   });

   const [activeFooterPage, setActiveFooterPage] = useState<string | null>(null);

   const footerContent: Record<string, React.ReactNode> = {
      "About Us": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">SellerIQ Pro is a premier data analytics engine developed exclusively to bridge the gap between massive eCommerce datasets and actionable enterprise decision-making. Our mission is to equip brands with the fastest, most secure, and most intelligent toolkit for analyzing their marketplace and B2B pipelines.</p>

            <h3 className="text-2xl text-white font-display mt-10 mb-4">Our Vision</h3>
            <p>To become the undisputed global standard in AI-driven unified commerce intelligence by replacing manual spreadsheets with automated, intelligence-driven systems. We process data at planetary scale.</p>

            <h3 className="text-2xl text-white font-display mt-10 mb-4">Security First</h3>
            <p>Our SaaS platform processes analytical datasets seamlessly and at scale . We enforce robust encryption pipelines and SOC 2 compliance protocols to ensure that your sensitive financial data remains completely secure.</p>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mt-8">
               <h4 className="text-white font-medium mb-2">High-Speed Stateless Processing</h4>
               <p className="text-sm">We ensure zero-latency data operations with industry-leading stateless architecture.</p>
            </div>
         </div>
      ),
      "Careers": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">Join the intelligence revolution. We are looking for world-class talent to help us build planetary-scale data engines.</p>
            <p>Current openings are available in San Francisco, London, and Remote. Contact us at <a href="mailto:careers@selleriq.pro" className="text-white underline">careers@selleriq.pro</a>.</p>
         </div>
      ),
      "Security": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">Enterprise-grade security is our foundational layer.</p>
            <p>SellerIQ Pro operates on a zero-trust network architecture. Our platform processes analytical datasets seamlessly and at scale while enforcing robust encryption pipelines and SOC 2 Type II compliance.</p>
         </div>
      ),
      "Legal": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">SellerIQ Pro Enterprise Legal Hub</p>
            <p>Please refer to our standard terms of service, privacy policy, and cookie policies for information regarding your rights and our obligations as a data processor.</p>
         </div>
      ),
      "Privacy": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">Your privacy is our primary concern.</p>
            <p>SellerIQ Pro employs state-of-the-art security measures to ensure all your marketplace intelligence and client data remains strictly confidential and secure. All data flows through AES-256 encrypted channels.</p>
         </div>
      ),
      "Terms": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">Enterprise Service Agreement</p>
            <p>By using SellerIQ Pro, you agree to our enterprise service agreement. Our terms are designed to protect both your business and our infrastructure while we deliver planetary-scale data processing.</p>
         </div>
      ),
      "Cookies": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">Cookie Policy</p>
            <p>We use essential cookies to provide secure access to your intelligence dashboard. We do not use third-party tracking cookies on the SellerIQ Pro platform.</p>
         </div>
      ),
      "Documentation": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">SellerIQ Pro Documentation</p>
            <p>Access our comprehensive guides on Amazon MTR sync, Shopify integration, ERP connectivity, and advanced risk scrubbing workflows.</p>
         </div>
      ),
      "Help Center": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">24/7 Priority Support</p>
            <p>Our enterprise support team is available around the clock to assist you with integration, reconciliation, and any technical queries. Contact support@selleriq.pro.</p>
         </div>
      ),
      "API Reference": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">Developer API</p>
            <p>Enterprise clients have full access to our robust GraphQL and REST APIs for custom data pipeline integration. API keys can be generated from your dashboard settings.</p>
         </div>
      ),
      "Community": (
         <div className="space-y-6 text-white/80 leading-relaxed">
            <p className="text-xl text-white font-medium mb-8">SellerIQ Innovators Community</p>
            <p>Join hundreds of leading D2C brands, marketplace aggregators, and tax professionals in our private Slack community for exclusive eCommerce insights.</p>
         </div>
      )
   };
   React.useEffect(() => {
      let animationFrameId: number;

      const playVideos = () => {
         const top = document.getElementById('bg-video-top') as HTMLVideoElement;
         const mid = document.getElementById('bg-video-middle') as HTMLVideoElement;
         const bot = document.getElementById('bg-video-bottom') as HTMLVideoElement;

         [top, mid, bot].forEach(vid => {
            if (vid && vid.paused) {
               vid.play().catch(e => console.log('Autoplay prevented:', e));
            }
         });
      };

      playVideos();
      window.addEventListener('click', playVideos, { once: true });
      window.addEventListener('scroll', playVideos, { once: true });
      window.addEventListener('touchstart', playVideos, { once: true });

      const renderLoop = () => {
         const scrollY = window.scrollY;
         const vh = window.innerHeight || 1;
         const maxScroll = Math.max(1, document.body.scrollHeight - vh);

         const scrollVH = scrollY / vh;
         const scrollFromBottomVH = (maxScroll - scrollY) / vh;

         let topOpacity = 0;
         let middleOpacity = 0;
         let bottomOpacity = 0;

         if (scrollVH < 1.2) {
            const progress = Math.max(0, (scrollVH - 0.2) / 1.0);
            topOpacity = 1 - progress;
            middleOpacity = progress;
         } else if (scrollFromBottomVH < 2.0) {
            const progress = 1 - Math.max(0, (scrollFromBottomVH - 0.5) / 1.5);
            middleOpacity = 1 - Math.min(1, Math.max(0, progress));
            bottomOpacity = Math.min(1, Math.max(0, progress));
         } else {
            middleOpacity = 1;
         }

         const top = document.getElementById('bg-video-top');
         const mid = document.getElementById('bg-video-middle');
         const bot = document.getElementById('bg-video-bottom');

         if (top) top.style.opacity = topOpacity.toString();
         if (mid) mid.style.opacity = middleOpacity.toString();
         if (bot) bot.style.opacity = bottomOpacity.toString();

         animationFrameId = requestAnimationFrame(renderLoop);
      };

      animationFrameId = requestAnimationFrame(renderLoop);

      return () => {
         cancelAnimationFrame(animationFrameId);
         window.removeEventListener('click', playVideos);
         window.removeEventListener('scroll', playVideos);
         window.removeEventListener('touchstart', playVideos);
      };
   }, []);

   return (
      <div className="min-h-screen text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900 relative">

         {/* Background Videos placed directly in DOM with z-0 to guarantee order without going behind body */}
         <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* 3. Bottom Video */}
            <video
               id="bg-video-bottom"
               autoPlay
               loop
               muted
               playsInline
               className="absolute inset-0 object-cover scale-110 origin-center transition-opacity duration-300"
               style={{ opacity: 0, width: '100vw', height: '100vh' }}
               src="/background_bottom.mp4"
            />

            {/* 2. Middle Video */}
            <video
               id="bg-video-middle"
               autoPlay
               loop
               muted
               playsInline
               className="absolute inset-0 object-cover scale-110 origin-center transition-opacity duration-300"
               style={{ opacity: 0, width: '100vw', height: '100vh' }}
               src="/background_middle.mp4"
            />

            {/* 1. Top Video */}
            <video
               id="bg-video-top"
               autoPlay
               loop
               muted
               playsInline
               className="absolute inset-0 object-cover scale-110 origin-center transition-opacity duration-300"
               style={{ opacity: 1, width: '100vw', height: '100vh' }}
               src="/background_top.mp4"
            />

            {/* Subtle Noise */}
            <div
               className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
               style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
               }}
            />
         </div>

         <div className="relative z-10 flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="absolute top-0 left-0 right-0 z-50 py-8">
               <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className="font-display text-[20px] font-medium tracking-tight text-white">
                        SellerIQ Pro
                     </span>
                  </div>

                  <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-white/90">
                     <a href="#features" className="hover:text-white transition-colors">Features</a>
                     <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
                     <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                  </nav>

                  <div className="flex items-center gap-4">
                     <button onClick={onLogin} className="text-white text-[13px] font-semibold hover:text-white/80 transition-colors">Sign In</button>
                     <button onClick={onGetStarted} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all bg-black text-white hover:bg-black/80">
                        Get Started <span className="bg-white text-black rounded-full p-[2px]"><ArrowRight className="w-3 h-3" /></span>
                     </button>
                  </div>
               </div>
            </header>

            <AnimatePresence>
               {activeFooterPage && (
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 50 }}
                     className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-3xl flex flex-col pt-32 pb-24 px-6 overflow-y-auto"
                  >
                     <div className="max-w-3xl w-full mx-auto relative">
                        <button
                           onClick={() => setActiveFooterPage(null)}
                           className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 transition-colors"
                        >
                           <X size={20} />
                        </button>

                        <h2 className="text-4xl md:text-5xl font-display text-white mb-10 tracking-tight">
                           {activeFooterPage}
                        </h2>

                        <div className="prose prose-invert max-w-none">
                           {footerContent[activeFooterPage] || (
                              <div className="text-white/80">Content for {activeFooterPage} is currently being updated. Please check back later.</div>
                           )}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col w-full h-full">
               {/* 1. Hero Section (Transparent) */}
               <section className="relative px-6 pt-32 pb-24 md:pt-[22vh] md:pb-[15vh] max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10 pointer-events-none">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="max-w-4xl"
                  >
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)] animate-pulse" />
                        <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">Core Intelligence Active</span>
                     </div>

                     <h1 className="font-display text-6xl md:text-[90px] font-medium tracking-tight text-white leading-[1.05] mb-8 drop-shadow-lg mix-blend-overlay">
                        Unify Your Commerce<br />Intelligence.
                     </h1>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                     className="max-w-2xl flex flex-col items-center"
                  >
                     <p className="text-[18px] text-white/80 mb-10 leading-relaxed font-medium">
                        The enterprise standard for marketplace data. Transform complex Amazon, Shopify, and ERP data into actionable intelligence, automated compliance workflows, and predictive growth insights.
                     </p>
                     <div className="flex items-center gap-4 pointer-events-auto">
                        <button onClick={onGetStarted} className="flex items-center gap-2 bg-white text-black px-[28px] py-[16px] rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-white/20">
                           Deploy Your Intelligence <span className="bg-black text-white rounded-full p-[4px] ml-1"><ArrowRight className="w-3 h-3" /></span>
                        </button>
                        <button onClick={onTryFree} className="text-white text-sm font-semibold hover:text-white/80 transition-colors px-[28px] py-[16px] border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10">
                           Demo
                        </button>
                     </div>

                     <div className="flex items-center gap-3 text-white mt-12 opacity-80">
                        <div className="flex -space-x-3">
                           {avatars.map((url, i) => (
                              <img key={i} src={url} alt="avatar" className="w-9 h-9 rounded-full border-2 border-[#bca1e0]/50 object-cover shadow-sm" />
                           ))}
                        </div>
                        <span className="text-sm font-medium ml-2 text-white/90">500+ global brands scaling with SellerIQ Pro</span>
                     </div>

                     <div className="grid grid-cols-3 gap-6 mt-12 border-t border-white/20 pt-8 w-full pointer-events-auto">
                        <div className="flex flex-col items-center">
                           <div className="text-2xl font-display font-medium text-white mb-1">₹84.2L</div>
                           <div className="text-xs text-white/60 tracking-wider uppercase">Global Revenue</div>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="text-2xl font-display font-medium text-white mb-1">98.4%</div>
                           <div className="text-xs text-white/60 tracking-wider uppercase">Risk Score (AI)</div>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="text-2xl font-display font-medium text-white mb-1">12</div>
                           <div className="text-xs text-white/60 tracking-wider uppercase">Active Flows</div>
                        </div>
                     </div>
                  </motion.div>
               </section>

               {/* 2. Platform Section (Transparent) */}
               <section className="px-6 py-24 max-w-7xl mx-auto w-full z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="flex flex-col md:flex-row gap-12 items-end mb-20"
                  >
                     <div className="md:w-1/2">
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase mb-5">Native MTR Integration</h4>
                        <h2 className="font-display text-[56px] md:text-[64px] font-medium text-white leading-[1.1] tracking-tight drop-shadow-sm">
                           Architected<br />for Amazon.
                        </h2>
                        <div className="flex items-center gap-6 mt-12">
                           <button onClick={onGetStarted} className="flex items-center justify-center gap-2 bg-white text-black px-[22px] py-[12px] rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300">
                              Get Started <span className="bg-black text-white rounded-full p-[2px]"><ArrowRight className="w-3 h-3" /></span>
                           </button>
                           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-white text-xs font-medium">Live Amazon MTR Sync Active</span>
                           </div>
                        </div>
                     </div>
                     <div className="md:w-1/2 pb-4">
                        <p className="text-white/80 text-[18px] leading-relaxed max-w-[420px] drop-shadow-sm">
                           SellerIQ Pro is built from the ground up to handle the unique complexities of Amazon Merchant Tax Reports. Our engine delivers 100% reconciliation accuracy with zero manual effort.
                        </p>
                     </div>
                  </motion.div>
                  <TiltDashboard />
               </section>

               {/* 3. Clients Section (Transparent) */}
               <section className="py-20 w-full text-center z-10 overflow-hidden">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.8 }}
                     className="w-full"
                  >
                     <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase mb-4">OUR CLIENTS</h4>
                     <h2 className="font-display text-[40px] font-medium text-white mb-16 tracking-tight drop-shadow-sm px-6">
                        Trusted by leading e-<br className="hidden sm:block" />commerce businesses.
                     </h2>
                     <Marquee gradient={true} gradientColor="#bca1e0" speed={40} className="w-full">
                        {logos.map((url, i) => (
                           <img
                              key={i}
                              src={url}
                              alt="Logo"
                              className="h-8 md:h-10 mx-8 md:mx-16 object-contain text-white brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                           />
                        ))}
                        {logos.map((url, i) => (
                           <img
                              key={`dup-${i}`}
                              src={url}
                              alt="Logo"
                              className="h-8 md:h-10 mx-8 md:mx-16 object-contain text-white brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                           />
                        ))}
                     </Marquee>
                  </motion.div>
               </section>

               <div className="backdrop-blur-[80px] bg-black/40 relative">
                  {/* 4. Solutions Section (Transparent) */}
                  <section className="px-6 py-32 max-w-7xl mx-auto w-full z-10">
                     <div className="flex flex-col lg:flex-row gap-16 items-start relative">
                        <div className="lg:w-[40%] lg:sticky top-32 lg:backdrop-blur-xl lg:bg-white/5 p-8 -ml-8 rounded-[32px] border border-transparent lg:border-white/10 transition-all duration-300">
                           <motion.h4
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase mb-5"
                           >
                              USE CASES
                           </motion.h4>
                           <motion.h2
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="font-display text-[48px] md:text-[56px] font-medium text-white leading-[1.1] mb-8 tracking-tight drop-shadow-sm"
                           >
                              Built for Businesses of<br />Every Scale.
                           </motion.h2>
                           <motion.p
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="text-white/80 text-[18px] leading-relaxed max-w-[380px] drop-shadow-sm"
                           >
                              Tailored solutions for diverse business needs.
                           </motion.p>
                        </div>

                        <div className="lg:w-[60%] flex flex-col gap-12 pb-16 pt-16 lg:pt-0">
                           {solutions.map((sol, i) => (
                              <SolutionItem key={i} sol={sol} i={i} />
                           ))}
                        </div>
                     </div>
                  </section>

                  {/* 5. Analytics Section (Transparent) */}
                  <section id="analytics" className="px-6 py-32 max-w-7xl mx-auto w-full z-10">
                     <div className="flex flex-col lg:flex-row gap-16 items-start relative">
                        <div className="lg:w-[40%] lg:sticky top-32 lg:backdrop-blur-xl lg:bg-white/5 p-8 -ml-8 rounded-[32px] border border-transparent lg:border-white/10 transition-all duration-300">
                           <motion.h4
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase mb-5"
                           >
                              ANALYTICS ENGINE
                           </motion.h4>
                           <motion.h2
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="font-display text-[48px] md:text-[56px] font-medium text-white leading-[1.1] tracking-tight drop-shadow-sm mb-6"
                           >
                              Analytical Precision<br />by Design.
                           </motion.h2>
                           <motion.p
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="text-[18px] text-white/80 leading-relaxed mb-6"
                           >
                              Stop relying on spreadsheets. Our intelligence engine delivers enterprise-grade reconciliation accuracy for marketplace operations.
                           </motion.p>
                           <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded border border-white/20 bg-white/5"
                           >
                              <span className="w-2 h-2 rounded-full bg-green-400" />
                              <span className="text-sm font-semibold text-white/90">Enterprise SOC2 Certified</span>
                           </motion.div>
                        </div>

                        <div className="lg:w-[60%] flex flex-col gap-12 pb-16 pt-16 lg:pt-0">
                           {[
                              { stat: '₹24.8L', text: 'Unified Cross-Channel Revenue Intelligence' },
                              { stat: '100.0%', text: 'No transaction gaps found.' },
                              { stat: 'Tier 3', text: 'Advanced MTR Risk Scrubbing' },
                              { stat: '₹4.2L', text: 'GSTR filing ready' }
                           ].map((item, i) => (
                              <AdvantageItem key={i} item={item} i={i} />
                           ))}
                        </div>
                     </div>
                  </section>
               </div>

               {/* Wrapping White Background Sections */}
               <div className="bg-white w-full z-20 relative pt-32 pb-32">
                  {/* Features Detailed Cards */}
                  <section id="features" className="px-6 max-w-[1400px] mx-auto w-full mb-32">
                     <div className="flex flex-col gap-12">
                        {featureCards.map((card, i) => (
                           <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              key={i}
                              className={`bg-[#F5F5F5] rounded-[32px] overflow-hidden flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} group`}
                           >
                              <div className="p-12 md:p-20 lg:w-[55%] flex flex-col justify-center">
                                 <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#6b6770] uppercase mb-6">{card.label}</h4>
                                 <h3 className="font-display text-[40px] md:text-[48px] font-medium text-black leading-[1.1] mb-6 tracking-tight max-w-[400px]">
                                    {card.title}
                                 </h3>
                                 <p className="text-[#6b6770] text-[17px] leading-relaxed max-w-[420px] mb-12">
                                    {card.desc}
                                 </p>
                                 <button onClick={onGetStarted} className="self-start flex items-center justify-center gap-2 bg-black text-white px-[22px] py-[12px] rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300">
                                    Get Started <span className="bg-white text-black rounded-full p-[2px]"><ArrowRight className="w-3 h-3" /></span>
                                 </button>
                              </div>
                              <div className="lg:w-[45%] relative min-h-[400px] overflow-hidden">
                                 <div className="absolute top-12 left-12 text-[#6b6770] text-[16px] font-medium z-10">{card.idx}</div>
                                 <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </section>

                  {/* 8. Pricing Section */}
                  <section id="pricing" className="px-6 max-w-7xl mx-auto w-full text-center mb-32">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                     >
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#6b6770] uppercase mb-4">PRICING</h4>
                        <h2 className="font-display text-[48px] md:text-[56px] font-medium text-black mb-4 tracking-tight">
                           Simple, Scalable Pricing
                        </h2>
                        <p className="text-[#6b6770] text-[18px] mb-20">Choose the plan that fits your business stage</p>
                     </motion.div>

                     <div className="grid md:grid-cols-3 gap-8 items-stretch text-left">
                        {/* Starter */}
                        <motion.div
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.1 }}
                           className="bg-[#F5F5F5] rounded-[24px] p-10 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <h3 className="font-display text-[28px] font-medium text-black mb-3">Starter</h3>
                           <p className="text-[#6b6770] text-[15px] mb-8 min-h-[44px]">Perfect for early-stage sellers and small businesses.</p>
                           <div className="w-full h-[1px] bg-black/10 mb-8"></div>
                           <div className="mb-10">
                              <span className="font-display text-[50px] font-medium text-black leading-none">₹3,060</span>
                              <span className="text-[#6b6770] text-[20px]">/year</span>
                           </div>
                           <ul className="space-y-5 mb-12 flex-1">
                              {['3 files per month', 'Up to 5,000 orders', 'Email support', 'Basic analytics'].map((feat, i) => (
                                 <li key={i} className="flex items-center gap-4 text-black text-[15px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                                    {feat}
                                 </li>
                              ))}
                           </ul>
                           <button onClick={onLogin} className="w-full py-4 rounded-full font-medium bg-black text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-sm">
                              Sign Up <span className="bg-white text-black rounded-full p-[2px]"><ArrowRight className="w-3 h-3" /></span>
                           </button>
                        </motion.div>

                        {/* Professional */}
                        <motion.div
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.2 }}
                           className="bg-black text-white rounded-[24px] p-10 flex flex-col transform md:-translate-y-4 shadow-2xl relative"
                        >
                           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-t-[24px]"></div>
                           <h3 className="font-display text-[28px] font-medium mb-3 mt-2">Pro <span className="text-sm font-normal text-white/50 ml-2">— Most Popular</span></h3>
                           <p className="text-[#A1A1A1] text-[15px] mb-8 min-h-[44px]">Ideal for growing brands that need AI-powered automation.</p>
                           <div className="w-full h-[1px] bg-white/20 mb-8"></div>
                           <div className="mb-10">
                              <span className="font-display text-[50px] font-medium leading-none">₹15,300</span>
                              <span className="text-[#A1A1A1] text-[20px]">/year</span>
                           </div>
                           <ul className="space-y-5 mb-12 flex-1">
                              {['10 files per month', 'Up to 25,000 orders', '24/7 priority support', 'AI fraud detection', 'Predictive forecasting'].map((feat, i) => (
                                 <li key={i} className="flex items-center gap-4 text-white text-[15px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                                    {feat}
                                 </li>
                              ))}
                           </ul>
                           <button onClick={onGetStarted} className="w-full py-4 rounded-full font-medium bg-white text-black hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-sm">
                              Get Started <span className="bg-black text-white rounded-full p-[2px]"><ArrowRight className="w-3 h-3" /></span>
                           </button>
                        </motion.div>

                        {/* Enterprise */}
                        <motion.div
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.3 }}
                           className="bg-[#F5F5F5] rounded-[24px] p-10 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <h3 className="font-display text-[28px] font-medium text-black mb-3">Enterprise</h3>
                           <p className="text-[#6b6770] text-[15px] mb-8 min-h-[44px]">Built for high-volume operations and custom enterprise integrations.</p>
                           <div className="w-full h-[1px] bg-black/10 mb-8"></div>
                           <div className="mb-10">
                              <span className="font-display text-[50px] font-medium text-black leading-none">₹50,989</span>
                              <span className="text-[#6b6770] text-[20px]">/year</span>
                           </div>
                           <ul className="space-y-5 mb-12 flex-1">
                              {['30 files per month', 'Unlimited orders', '24/7 call support', 'Full API access', 'Custom integrations'].map((feat, i) => (
                                 <li key={i} className="flex items-center gap-4 text-black text-[15px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                                    {feat}
                                 </li>
                              ))}
                           </ul>
                           <button onClick={onLogin} className="w-full py-4 rounded-full font-medium bg-black text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-sm">
                              Contact Sales <span className="bg-white text-black rounded-full p-[2px]"><ArrowRight className="w-3 h-3" /></span>
                           </button>
                        </motion.div>
                     </div>
                  </section>

                  {/* Intelligence Platform Widgets Section */}
                  <section className="px-6 max-w-7xl mx-auto w-full text-center mb-32">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                     >
                        <h2 className="font-display text-[32px] md:text-[40px] font-medium text-black mb-16 tracking-tight max-w-3xl mx-auto">
                           The definitive intelligence platform that gives e-commerce brands absolute clarity over sales, risk, and growth.
                        </h2>
                     </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {/* Widget 1 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.1 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                              <BarChart2 className="text-blue-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Real-time Intelligence</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Deep insights into overall sales performance.</p>
                        </motion.div>

                        {/* Widget 2 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.15 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-5">
                              <ShieldCheck className="text-amber-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Predictive Fraud Defense</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Instantly identify high-risk return offenders.</p>
                        </motion.div>

                        {/* Widget 3 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.2 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-5">
                              <TrendingUp className="text-green-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Algorithmic Forecasting</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Data-driven revenue forecasting and growth trajectory modeling.</p>
                        </motion.div>

                        {/* Widget 4 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.25 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                              <FileText className="text-indigo-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Automated CSV Parsing</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Automatically parse CSV uploads from Amazon MTR, Shopify, and custom ERP workflows with 99.9% accuracy.</p>
                        </motion.div>

                        {/* Widget 5 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.3 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-5">
                              <Cpu className="text-red-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Advanced AI Fraud Analysis</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">An advanced AI-powered fraud and risk analysis engine designed to protect your revenue streams from suspicious activity.</p>
                        </motion.div>

                        {/* Widget 6 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.35 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                              <Calculator className="text-purple-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Multi-Channel Tax Reporting</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Automated GST and tax breakdowns for multi-channel operations, fully prepared for filing.</p>
                        </motion.div>

                        {/* Widget 7 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.4 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mb-5">
                              <PieChart className="text-cyan-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Unified Revenue Intelligence</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Stop relying on spreadsheets. Our intelligence engine delivers enterprise-grade reconciliation accuracy for marketplace operations.</p>
                        </motion.div>

                        {/* Widget 8 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.45 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-5">
                              <Search className="text-orange-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">Advanced MTR Risk Scrubbing</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Built from the ground up to handle the unique complexities of Amazon Merchant Tax Reports with zero manual effort.</p>
                        </motion.div>

                        {/* Widget 9 */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.6, delay: 0.5 }}
                           className="bg-[#F5F5F5] rounded-[20px] p-6 flex flex-col hover:shadow-xl transition-shadow duration-500"
                        >
                           <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mb-5">
                              <Zap className="text-teal-500 w-5 h-5" />
                           </div>
                           <h3 className="font-display text-[18px] font-medium text-black mb-2">High-Speed Stateless Processing</h3>
                           <p className="text-[#6b6770] text-[14px] leading-relaxed">Process analytical datasets seamlessly and at scale. We ensure zero-latency data operations with industry-leading architecture.</p>
                        </motion.div>
                     </div>
                  </section>

                  {/* 9. Testimonials Section */}
                  <section className="px-6 max-w-7xl mx-auto w-full text-center">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                     >
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#6b6770] uppercase mb-4">TESTIMONIALS</h4>
                        <h2 className="font-display text-[48px] md:text-[56px] font-medium text-black mb-20 tracking-tight">
                           Trusted by 500+ Enterprise Sellers.
                        </h2>
                     </motion.div>

                     <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                           { name: 'Rahul Sharma', role: 'CEO, TechGadgets India', quote: 'SellerIQ Pro saved us over 40 hours a month in tax reconciliation. The Amazon MTR sync is flawless.', img: 'https://files.peachworlds.com/website/75c5be76-066b-440f-b9fd-d171d58b5ecc/image-1927.png' },
                           { name: 'Sarah Jenkins', role: 'Operations Head, GlobalTrade', quote: 'The risk scrubbing feature identified ₹12L in suspicious transactions within the first week. Essential tool.', img: 'https://files.peachworlds.com/website/6f436d36-874b-4f4e-9606-2f2b293f483f/image-1928.png' },
                           { name: 'Amit Patel', role: 'Founder, HomeDecor Pro', quote: 'Predictive forecasting has completely changed how we manage inventory. No more stockouts during peak season.', img: 'https://files.peachworlds.com/website/3e5e307a-0d19-42cf-a655-039b2f946fd4/image-1929.png' }
                        ].map((t, i) => (
                           <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.6, delay: i * 0.15 }}
                              key={i}
                              className="bg-[#F5F5F5] rounded-[24px] p-10 flex flex-col hover:shadow-xl transition-shadow duration-500 cursor-default"
                           >
                              <div className="flex items-center gap-4 mb-8">
                                 <img src={t.img} alt={t.name} className="w-[50px] h-[50px] rounded-full object-cover shadow-sm" />
                                 <div>
                                    <div className="font-medium text-black">{t.name}</div>
                                    <div className="text-[11px] font-bold tracking-widest text-[#6b6770] mt-1">{t.role}</div>
                                 </div>
                              </div>
                              <p className="text-black text-[18px] leading-relaxed">"{t.quote}"</p>
                           </motion.div>
                        ))}
                     </div>
                  </section>
               </div>

               {/* 10. CTA / Footer Section (Transparent) */}
               <section className="px-6 pt-32 pb-24 max-w-7xl mx-auto w-full z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.8 }}
                     className="flex flex-col items-start max-w-3xl mb-32"
                  >
                     <h2 className="font-display text-[64px] md:text-[80px] font-medium text-white leading-[1.05] tracking-tight drop-shadow-sm mb-12">
                        Ready to Scale?
                     </h2>
                     <p className="text-[20px] text-white/80 mb-10 leading-relaxed font-medium">
                        Need help with enterprise integrations? Our support team is available 24/7 to assist you with priority support.
                     </p>
                     <div className="flex items-center gap-6">
                        <button onClick={onGetStarted} className="flex items-center gap-2 bg-white text-black px-[28px] py-[16px] rounded-full font-medium text-base hover:scale-105 transition-transform duration-300">
                           Contact Sales Team <span className="bg-black text-white rounded-full p-[2px]"><ArrowRight className="w-4 h-4" /></span>
                        </button>
                     </div>
                  </motion.div>

                  <div className="flex flex-col md:flex-row justify-between items-start border-t border-white/20 pt-16 mt-16 text-white/80">
                     <div className="max-w-[320px] mb-12 md:mb-0">
                        <div className="text-[24px] font-display font-medium text-white mb-4">SellerIQ Pro</div>
                        <p className="text-[15px] leading-relaxed mb-6">The enterprise standard for marketplace intelligence and automated tax compliance.</p>
                        <a href="mailto:support@selleriq.pro" className="hover:text-white transition-colors block mb-12">support@selleriq.pro</a>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                           <div className="text-white text-sm font-medium mb-1">Stay Updated.</div>
                           <div className="text-xs text-white/60 mb-4">Get the latest eCommerce insights delivered to your inbox.</div>
                           <div className="flex gap-2">
                              <input type="email" placeholder="Your email address" className="bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50 w-full" />
                              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 whitespace-nowrap">Subscribe</button>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-[14px]">
                        <div className="flex flex-col gap-4">
                           <div className="font-medium mb-2 uppercase tracking-widest text-[11px] text-white/60">Product</div>
                           <a href="#features" className="hover:text-white transition-colors">Features</a>
                           <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
                           <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                           <a href="#" className="hover:text-white transition-colors">How it Works</a>
                        </div>
                        <div className="flex flex-col gap-4">
                           <div className="font-medium mb-2 uppercase tracking-widest text-[11px] text-white/60">Company</div>
                           <button onClick={() => setActiveFooterPage("About Us")} className="hover:text-white transition-colors text-left">About Us</button>
                           <button onClick={() => setActiveFooterPage("Careers")} className="hover:text-white transition-colors text-left">Careers</button>
                           <button onClick={() => setActiveFooterPage("Security")} className="hover:text-white transition-colors text-left">Security</button>
                           <button onClick={() => setActiveFooterPage("Legal")} className="hover:text-white transition-colors text-left">Legal</button>
                        </div>
                        <div className="flex flex-col gap-4">
                           <div className="font-medium mb-2 uppercase tracking-widest text-[11px] text-white/60">Resources</div>
                           <button onClick={() => setActiveFooterPage("Documentation")} className="hover:text-white transition-colors text-left">Documentation</button>
                           <button onClick={() => setActiveFooterPage("Help Center")} className="hover:text-white transition-colors text-left">Help Center</button>
                           <button onClick={() => setActiveFooterPage("API Reference")} className="hover:text-white transition-colors text-left">API Reference</button>
                           <button onClick={() => setActiveFooterPage("Community")} className="hover:text-white transition-colors text-left">Community</button>
                        </div>
                        <div className="flex flex-col gap-4">
                           <div className="font-medium mb-2 uppercase tracking-widest text-[11px] text-white/60">Legal</div>
                           <button onClick={() => setActiveFooterPage("Privacy")} className="hover:text-white transition-colors text-left">Privacy</button>
                           <button onClick={() => setActiveFooterPage("Terms")} className="hover:text-white transition-colors text-left">Terms</button>
                           <button onClick={() => setActiveFooterPage("Cookies")} className="hover:text-white transition-colors text-left">Cookies</button>
                        </div>
                     </div>
                  </div>
                  <div className="border-t border-white/10 mt-16 pt-8 text-center text-[13px] text-white/50">
                     © 2026 SellerIQ Pro. All rights reserved.
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
}

function TiltDashboard() {
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
   const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
   const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
   const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
   };

   const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
   };

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
         className="w-full relative group cursor-crosshair"
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{ perspective: 1500 }}
      >
         <motion.div
            className="w-full relative"
            style={{
               rotateX,
               rotateY,
               transformStyle: "preserve-3d"
            }}
         >
            <div
               className="absolute inset-0 bg-primary/20 rounded-[24px] blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50 group-hover:opacity-100"
               style={{ transform: "translateZ(-30px)" }}
            />

            <div className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-2xl z-10" style={{ transform: "translateZ(10px)" }}>
               <video
                  src="/Dashboard_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
               />
               {/* Badge to cover bottom-right watermark without zooming */}
               <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-md shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase">Live Dashboard</span>
               </div>
               {/* Glare effect */}
               <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                     background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
                     backgroundPosition: useTransform(() => `${glareX.get()} ${glareY.get()}`)
                  }}
               />
            </div>
         </motion.div>
      </motion.div>
   );
}

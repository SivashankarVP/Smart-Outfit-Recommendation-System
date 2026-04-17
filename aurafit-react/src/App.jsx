import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, BarChart3, Menu, MapPin, ChevronDown, Search, ShoppingBag } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import VirtualStylist from './components/VirtualStylist';
import useStore from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Checkout from './components/Checkout';
import HomeFeatureGrid from './components/HomeFeatureGrid';

function App() {
  const [stylistOpen, setStylistOpen] = useState(false);
  const { aiResult, darkMode, sidebarOpen, setSidebarOpen, view } = useStore();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <CartDrawer />
      
      {stylistOpen && <VirtualStylist onClose={() => setStylistOpen(false)} />}
      <Sidebar />

      <main className="flex-1 pb-20">
        {view === 'checkout' ? (
          <div className="container py-10">
            <Checkout />
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Amazon Hero Carousel */}
            <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden">
                <img 
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/IFA/GW/Desktop/PCQC/AC_2x._SY232_CB562214695_.jpg" 
                    className="absolute w-full h-full object-cover blur-3xl opacity-20"
                    alt="bg-blur"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#eaeded]" />
                <div className="max-w-[1500px] mx-auto relative h-full">
                    <img 
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Sports/October/GW/Hero/Regular/3000x1200_1._CB544465490_.jpg" 
                        className="w-full h-full object-cover"
                        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
                        alt="Amazon Hero"
                    />
                </div>
            </div>

            {/* Feature Grid Overlapping Hero */}
            <div className="max-w-[1500px] mx-auto w-full">
                <HomeFeatureGrid />
                
                {/* AI & Main Product Content */}
                <div className="px-4 lg:px-6 mt-10 space-y-10">
                    {/* AI Profile Status (Professional Version) */}
                    {aiResult && (
                    <motion.section 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-white border border-indigo-100 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Personalized Storefront Ready</h2>
                                <p className="text-slate-500 text-xs mt-1 uppercase font-black tracking-widest">
                                    Optimized for {aiResult.season} palette & {aiResult.size} fit.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                        <button 
                            onClick={() => setStylistOpen(true)}
                            className="px-6 py-2 rounded-md border border-slate-300 hover:bg-slate-50 text-xs font-bold transition-all shadow-sm"
                        >
                            Update AI Bio-Scan
                        </button>
                        <button 
                            onClick={() => useStore.getState().setAIResult(null)}
                            className="px-6 py-2 rounded-md text-xs font-bold text-indigo-600 hover:underline transition-all"
                        >
                            Clear Personalization
                        </button>
                        </div>
                    </motion.section>
                    )}

                    {/* Product Selection */}
                    <div className="bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                            <h2 className="text-2xl font-bold">Today's Recommendations for You</h2>
                            <button className="text-[#007185] text-sm font-medium hover:underline">See all deals</button>
                        </div>
                        <ProductGrid />
                    </div>

                    {/* AuraFit Virtual Stylist Trigger Banner */}
                    {!aiResult && (
                        <div className="bg-[#131921] rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.5),transparent_70%)]" />
                            <div className="relative z-10 max-w-xl">
                                <h3 className="text-2xl font-black mb-3">Not sure about your fit?</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">Use our advanced AI Optical Analysis to find your perfect size and color palette in seconds. Just like an in-store personal shopper.</p>
                            </div>
                            <button 
                                onClick={() => setStylistOpen(true)}
                                className="bg-[#febd69] text-black px-10 py-4 rounded-md font-bold text-sm shadow-xl active:scale-95 transition-all hover:bg-[#f3a847] whitespace-nowrap"
                            >
                                Start Virtual Scanning
                            </button>
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}
      </main>

      <footer className="glass py-12 mt-auto border-t border-white/5">
        <div className="container text-center text-slate-500 text-sm">
            <p>© 2026 AuraFit AI. A Revolution in Personal Fashion. Design by Antigravity.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

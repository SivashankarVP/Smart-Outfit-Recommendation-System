import React from 'react';
import { X, SlidersHorizontal, ChevronRight, Star } from 'lucide-react';
import useStore from '../store/useStore';
import { SEASONS, TYPES, PRICE_RANGES, SPECIAL_TAGS, SIZES } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { filters, setFilter, resetFilters, sidebarOpen, setSidebarOpen } = useStore();

  const handleToggleSize = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    setFilter('sizes', newSizes);
  };

  const handleToggleSpecial = (tag) => {
    const newSpecial = filters.special.includes(tag)
      ? filters.special.filter(t => t !== tag)
      : [...filters.special, tag];
    setFilter('special', newSpecial);
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Global Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[#000000a0] z-[100]"
          />

          {/* Amazon Sidebar Menu */}
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 left-0 w-full max-w-[365px] bg-white z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#232f3e] px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#232f3e] fill-current" />
                </div>
                <h2 className="text-lg font-black text-white">Hello, Sign In</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 transition-transform hover:rotate-90">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-4">
              {/* Seasonal Filtering (Amazon Categories Style) */}
              <section className="mb-2 border-b border-[#ddd]">
                <h3 className="px-8 py-3 text-[18px] font-bold text-[#0f1111]">Trending</h3>
                <div className="flex flex-col mb-4">
                  {SEASONS.map(season => (
                    <button
                      key={season}
                      onClick={() => setFilter('season', season)}
                      className={`px-8 py-3 text-[14px] text-left hover:bg-[#eaeded] flex items-center justify-between group ${filters.season === season ? 'font-bold bg-[#eaeded]' : 'text-[#0f1111]'}`}
                    >
                      {season} Collection
                      <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0f1111]" />
                    </button>
                  ))}
                </div>
              </section>

              {/* Main Categories */}
              <section className="mb-2 border-b border-[#ddd]">
                <h3 className="px-8 py-3 text-[18px] font-bold text-[#0f1111]">Shop By Category</h3>
                <div className="flex flex-col mb-4">
                  {TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setFilter('type', type)}
                      className={`px-8 py-3 text-[14px] text-left hover:bg-[#eaeded] flex items-center justify-between group ${filters.type === type ? 'font-bold bg-[#eaeded]' : 'text-[#0f1111]'}`}
                    >
                      {type}
                      <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0f1111]" />
                    </button>
                  ))}
                </div>
              </section>

              {/* Programs and Features */}
              <section className="mb-2">
                <h3 className="px-8 py-3 text-[18px] font-bold text-[#0f1111]">Programs & Features</h3>
                <div className="flex flex-col mb-4">
                  <button className="px-8 py-3 text-[14px] text-[#0f1111] text-left hover:bg-[#eaeded] flex items-center justify-between group">
                    Gift Cards <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0f1111]" />
                  </button>
                  <button className="px-8 py-3 text-[14px] text-[#0f1111] text-left hover:bg-[#eaeded] flex items-center justify-between group">
                    Amazon Prime <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0f1111]" />
                  </button>
                  <button className="px-8 py-3 text-[14px] text-[#0f1111] text-left hover:bg-[#eaeded] flex items-center justify-between group">
                    Amazon Pay <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0f1111]" />
                  </button>
                </div>
              </section>

              {/* Help & Settings */}
              <section className="mt-4 pt-4 border-t border-[#ddd]">
                <h3 className="px-8 py-3 text-[18px] font-bold text-[#0f1111]">Help & Settings</h3>
                <div className="flex flex-col mb-10">
                    <button className="px-8 py-3 text-[14px] text-[#0f1111] text-left hover:bg-[#eaeded]">Your Account</button>
                    <button className="px-8 py-3 text-[14px] text-[#0f1111] text-left hover:bg-[#eaeded]">Customer Service</button>
                    <button className="px-8 py-3 text-[14px] text-[#0f1111] text-left hover:bg-[#eaeded]">Sign In</button>
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

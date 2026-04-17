import React from 'react';
import { ShoppingBag, Heart, User, Search, Menu, Sun, Moon } from 'lucide-react';
import useStore from '../store/useStore';

const Navbar = () => {
  const { cartCount, setCartOpen, setSidebarOpen, darkMode, toggleDarkMode } = useStore();

  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 md:px-10 border-b">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tighter cursor-pointer">
            AURAFIT<span className="text-current ml-px">AI</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 max-w-2xl mx-12 relative">
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 rounded-2xl py-3 px-12 focus:outline-none transition-all font-medium text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
          
          <button className="hidden sm:p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
            <Heart className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 group font-bold"
          >
            <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-sm">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

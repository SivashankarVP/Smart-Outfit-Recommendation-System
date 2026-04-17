import React from 'react';
import { ShoppingBag, Search, Menu, MapPin, ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';
const Navbar = () => {
  const { cartCount, setCartOpen, setSidebarOpen, darkMode, toggleDarkMode } = useStore();

  return (
    <>
      <nav className="bg-[#131921] px-4 py-2 flex items-center justify-between gap-4 sticky top-0 z-50 h-[60px]">
        {/* Logo & Deliver */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center justify-center cursor-pointer hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm transition-all h-[50px]">
            <div className="text-2xl font-black text-white leading-none">
              amazon<span className="text-[#febd69]">.in</span>
            </div>
          </div>
          
          <div className="hidden xl:flex items-center gap-1 cursor-pointer hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm transition-all h-[50px]">
            <MapPin className="text-white w-5 h-5 mt-2" />
            <div className="flex flex-col">
              <span className="text-[11px] text-[#ccc] leading-none">Delivering to Salem</span>
              <span className="text-sm font-bold text-white">Update location</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-stretch h-10 rounded-lg overflow-hidden max-w-4xl shadow-md border border-transparent focus-within:border-[#e77600] focus-within:ring-2 focus-within:ring-[#e77600]/30 transition-all">
          <button className="bg-[#f3f3f3] hover:bg-[#dadada] border-r border-[#ccc] px-4 text-xs font-medium text-[#555] flex items-center gap-1">
            All <ChevronDown className="w-3 h-3" />
          </button>
          <input 
            type="text" 
            placeholder="Search Amazon.in" 
            className="flex-1 px-4 text-sm focus:outline-none text-black"
          />
          <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center transition-colors">
            <Search className="w-6 h-6 text-[#131921]" />
          </button>
        </div>

        {/* Right Nav Items */}
        <div className="flex items-center gap-1">
          <div className="hidden md:flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm transition-all h-[50px] justify-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-white">EN</span>
              <ChevronDown className="w-3 h-3 text-[#ccc]" />
            </div>
          </div>

          <div className="hidden lg:flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm transition-all h-[50px] justify-center min-w-[120px]">
            <span className="text-[11px] text-white leading-none">Hello, Sivashankar</span>
            <div className="flex items-center gap-px">
              <span className="text-sm font-bold text-white">Account & Lists</span>
              <ChevronDown className="w-3 h-3 text-[#ccc]" />
            </div>
          </div>

          <div className="hidden lg:flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm transition-all h-[50px] justify-center">
            <span className="text-[11px] text-white leading-none">Returns</span>
            <span className="text-sm font-bold text-white">& Orders</span>
          </div>

          <div 
            onClick={() => setCartOpen(true)}
            className="flex items-end cursor-pointer hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm transition-all h-[50px] relative pr-6"
          >
            <div className="relative">
              <ShoppingBag className="w-9 h-9 text-white" />
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#f08804] font-bold text-lg leading-none">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-bold text-white pb-1">Cart</span>
          </div>
        </div>
      </nav>
      
      {/* Amazon Sub-Bar */}
      <div className="bg-[#232f3e] text-white px-4 h-10 flex items-center gap-4 text-sm whitespace-nowrap overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-1 font-bold hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm"
        >
          <Menu className="w-5 h-5" /> All
        </button>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Fresh</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">MX Player</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Sell</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Best Sellers</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Mobiles</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Today's Deals</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Prime</span>
        <span className="cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Customer Service</span>
        <span className="hidden xl:inline cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded-sm">Home & Kitchen</span>
      </div>
    </>
  );
};

export default Navbar;

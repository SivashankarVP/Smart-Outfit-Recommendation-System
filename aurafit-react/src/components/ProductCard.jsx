import React from 'react';
import { Star, Heart, ShoppingCart, Info } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, aiResult, setSelectedProduct } = useStore();

  const isAIMatch = aiResult && product.skinTone.includes(aiResult.season);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-[#e7e7e7] rounded-sm overflow-hidden flex flex-col group h-full hover:shadow-lg transition-shadow cursor-pointer p-3"
      onClick={() => setSelectedProduct(product)}
    >
      <div className="relative aspect-square overflow-hidden mb-3">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />
        
        {isAIMatch && (
          <div className="absolute top-0 left-0 bg-[#e67a00] text-white text-[10px] font-black px-2 py-0.5 rounded-sm">
            AI CHOICE
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <h4 className="text-[14px] text-[#0f1111] mb-1 line-clamp-2 leading-tight hover:text-[#c45500]">
            {product.name}
        </h4>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
            <div className="flex text-[#ffa41c]">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#ccc]'}`} />
                ))}
            </div>
            <span className="text-[#007185] text-xs font-medium">{product.ratingsCount || '1,240'}</span>
        </div>

        {/* Price */}
        <div className="flex items-start gap-px mt-auto">
          <span className="text-xs font-bold mt-1">₹</span>
          <span className="text-2xl font-medium leading-none">{product.price}</span>
          {product.originalPrice && (
            <div className="flex items-center gap-1 ml-2">
                <span className="text-xs text-slate-500 line-through font-light">M.R.P: ₹{product.originalPrice}</span>
                <span className="text-xs font-bold text-[#cc0c39]">({product.discount}% off)</span>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="mt-2 space-y-0.5">
            <p className="text-[12px] text-[#0f1111]">Get it by <span className="font-bold">Tomorrow, Oct 18</span></p>
            <p className="text-[12px] text-[#565959]">FREE Delivery by Amazon</p>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes[0]); }}
          className="mt-4 w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] py-1.5 rounded-full text-xs font-medium border border-[#fcd200] shadow-sm active:scale-95 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

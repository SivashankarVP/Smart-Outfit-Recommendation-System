import React from 'react';

const Card = ({ title, items, link }) => (
    <div className="bg-white p-5 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-3 text-[#0f1111]">{title}</h3>
        <div className="grid grid-cols-2 gap-3 flex-1">
            {items.map((item, idx) => (
                <div key={idx} className="flex flex-col cursor-pointer group">
                    <div className="aspect-square bg-slate-100 overflow-hidden mb-1">
                        <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[12px] text-[#0f1111] leading-tight">{item.label}</span>
                </div>
            ))}
        </div>
        <button className="text-[#007185] text-sm hover:text-[#c45500] hover:underline text-left mt-4 font-medium">
            {link || 'See all'}
        </button>
    </div>
);

const HomeFeatureGrid = () => {
    const categories = [
        {
            title: "Revamp your home in style",
            items: [
                { label: "Cushion covers", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/Cushion_covers_2x._SY232_CB562214695_.jpg" },
                { label: "Figurines", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/Figurines_2x._SY232_CB562214695_.jpg" },
                { label: "Home storage", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/Home_storage_2x._SY232_CB562214695_.jpg" },
                { label: "Lighting solutions", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/Lighting_solutions_2x._SY232_CB562214695_.jpg" }
            ]
        },
        {
            title: "Up to 55% off | Appliances",
            items: [
                { label: "Air conditioners", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/IFA/GW/Desktop/PCQC/AC_2x._SY232_CB562214695_.jpg" },
                { label: "Refrigerators", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/IFA/GW/Desktop/PCQC/Ref_2x._SY232_CB562214695_.jpg" },
                { label: "Microwaves", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/IFA/GW/Desktop/PCQC/Micro_2x._SY232_CB562214695_.jpg" },
                { label: "Washing machines", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/IFA/GW/Desktop/PCQC/WM_2x._SY232_CB562214695_.jpg" }
            ]
        },
        {
            title: "Bulk order discounts | Up to 18%",
            items: [
                { label: "Laptops", image: "https://m.media-amazon.com/images/I/61gR5DkR6PL._AC_SY200_.jpg" },
                { label: "Kitchen appliances", image: "https://m.media-amazon.com/images/I/51pI-E-l29L._AC_SY200_.jpg" },
                { label: "Office chairs", image: "https://m.media-amazon.com/images/I/61g+K8K5-DL._AC_SY200_.jpg" },
                { label: "Business supplies", image: "https://m.media-amazon.com/images/I/51N-xW6f4XL._AC_SY200_.jpg" }
            ]
        },
        {
            title: "Up to 50% off | Baby care",
            items: [
                { label: "Diapers & wipes", image: "https://m.media-amazon.com/images/I/71uV8gH+ZEL._AC_SY200_.jpg" },
                { label: "Ride ons", image: "https://m.media-amazon.com/images/I/61r5fM98f+L._AC_SY200_.jpg" },
                { label: "Baby care", image: "https://m.media-amazon.com/images/I/61l6eG8sA-L._AC_SY200_.jpg" },
                { label: "Diapers", image: "https://m.media-amazon.com/images/I/71uV8gH+ZEL._AC_SY200_.jpg" }
            ]
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 -mt-40 relative z-10 lg:px-6">
            {categories.map((cat, idx) => (
                <Card key={idx} {...cat} />
            ))}
        </div>
    );
};

export default HomeFeatureGrid;

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { services } from '@/data/services';
import { FiArrowRight } from 'react-icons/fi';

export default function ServicesPage() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  
  // Ref array for GSAP
  const cardsRef = useRef([]);
  // Error Fix: Removed cardsRef.current = [] from render body. We use index assignment.

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Reveal (Smoother stagger)
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1
      });

      // 2. 3-Column Grid Cards Reveal
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Background slightly darker gray so pure white cards pop out beautifully
    <div ref={containerRef} className="min-h-screen bg-[#F4F5F7] pt-32 pb-24">
      
      {/* 1. EDITORIAL HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              {/* FIXED: Changed h-[2px] to h-0.5 */}
              <span className="w-10 h-0.5 bg-accent"></span>
              <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
                Our Capabilities
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-syne uppercase tracking-tighter text-dark leading-[0.95]">
              Build Without <br />
              <span className="text-accent">Limits.</span>
            </h1>
          </div>

          <div className="lg:col-span-7 lg:pb-2">
            <p className="text-dark/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              From visionary architectural designs to robust industrial builds, we provide end-to-end construction solutions engineered for modern excellence. We turn blueprints into breathtaking realities.
            </p>
          </div>

        </div>
      </div>

      {/* 2. THE PERFECT 3-COLUMN GRID */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        {/* CHANGED TO grid-cols-3: 6 items will perfectly fill 2 rows! */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => {
            return (
              <div 
                key={service.id} 
                ref={(el) => { cardsRef.current[index] = el; }} // 🟢 INDEX ASSIGNMENT FIX
                className="group relative flex flex-col bg-white border border-dark/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full"
              >
                <Link href="/projects" className="flex flex-col h-full z-10 relative">
                  
                  {/* TOP HALF: Expanded Image Box for premium feel */}
                  {/* FIXED: Changed h-[300px] to h-75 */}
                  <div className="relative h-75 w-full bg-dark overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-95 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* BOTTOM HALF: Spacious Text Content */}
                  {/* FIXED: Changed flex-grow to grow */}
                  <div className="p-8 md:p-10 flex flex-col grow relative overflow-hidden bg-white">
                    
                    {/* Fake Watermark Number in background */}
                    {/* FIXED: Changed text-dark/[0.03] to text-dark/3 and group-hover:text-accent/[0.08] to group-hover:text-accent/8 (approx) */}
                    <div className="absolute -top-6 -right-2 text-[8rem] font-syne font-black text-dark/5 group-hover:text-accent/10 transition-colors duration-500 pointer-events-none select-none">
                      0{index + 1}
                    </div>

                    <h2 className="text-2xl font-syne font-bold text-dark uppercase tracking-tight mb-4 relative z-10 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h2>

                    {/* FIXED: Changed flex-grow to grow */}
                    <p className="text-dark/60 text-sm leading-relaxed mb-10 grow relative z-10">
                      {service.description}
                    </p>

                    {/* Elegant Text Link */}
                    <div className="mt-auto pt-6 border-t border-dark/10 relative z-10 flex items-center justify-between">
                      <span className="text-dark font-bold uppercase tracking-widest text-xs group-hover:text-accent transition-colors duration-300">
                        Explore Service
                      </span>
                      <FiArrowRight className="text-dark group-hover:text-accent transform group-hover:translate-x-2 transition-all duration-300" size={16} />
                    </div>
                  </div>

                  {/* Animated Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 ease-out z-20" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BRUTALIST CTA BANNER */}
      <div className="container mx-auto px-6 md:px-12 mt-20 relative z-20">
        <div className="bg-dark p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center border-l-8 border-accent shadow-2xl">
          {/* FIXED: Replaced arbitrary bg size with canonical equivalent if exists, or kept inline style cleaner */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }} />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-black uppercase tracking-tighter text-white mb-6 leading-tight">
              Ready to break <br /> <span className="text-accent">ground?</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 font-medium">
              Every legacy project begins with a conversation. Let our engineering team craft a tailored approach for your structural vision.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-dark px-10 py-5 uppercase font-black tracking-wider text-sm hover:bg-accent hover:text-dark transition-colors duration-300 group">
              Start The Conversation <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={18} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
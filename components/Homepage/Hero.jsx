'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
      );

      gsap.from(textContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-svh w-full overflow-hidden bg-black flex items-center pt-24 md:pt-0">
      
      {/* 1. THE FULL BACKGROUND IMAGE AREA */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div ref={imageRef} className="relative w-full h-full transform-gpu">
          <Image
            src="/hero.png"
            alt="Modern Construction Engineering"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* 2. THE RESPONSIVE GRADIENT OVERLAYS */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/20 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent md:hidden z-10" />
      </div>

      {/* 3. CONTENT AREA */}
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div ref={textContentRef} className="max-w-3xl w-full text-white">
          
          <div className="w-10 md:w-12 h-1 bg-accent mb-6 md:mb-8"></div>

          <p className="text-white/70 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 md:mb-6">
            EST. 2010 • AHMEDABAD
          </p>

          <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl xl:text-[5rem] font-black uppercase tracking-tight leading-[1.05] mb-6 md:mb-8 wrap-break-word">
            Shaping <br />
            <span className="text-accent inline-block">Architectural</span> <br />
            Legacies.
          </h1>

          <p className="text-white/80 text-base md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl font-medium">
            From heavy-duty industrial facilities to premium commercial spaces. We deliver uncompromising quality, on time, and within budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
            <Link 
              href="/projects" 
              className="group flex items-center justify-center gap-3 bg-accent text-dark px-8 py-4 md:px-10 md:py-5 uppercase font-bold tracking-wider text-xs md:text-sm hover:bg-white hover:text-dark transition-all duration-300 w-full sm:w-auto text-center"
            >
              Our Portfolio <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            
            <Link 
              href="/contact" 
              className="flex items-center justify-center bg-transparent border border-white/30 text-white px-8 py-4 md:px-10 md:py-5 uppercase font-bold tracking-wider text-xs md:text-sm hover:bg-white hover:text-dark transition-all duration-300 w-full sm:w-auto text-center"
            >
              Get A Quote
            </Link>
          </div>
        </div>
      </div>

    </section> 
  );
}

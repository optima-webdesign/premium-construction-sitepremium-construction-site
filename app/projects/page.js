'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/projects';
import { FiArrowRight } from 'react-icons/fi';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map((item) => item.category))];

  // Filter logic
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter((project) => project.category === activeCategory);

  // Initial Page Load Animation (GSAP)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1 
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-light pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* 1. EDITORIAL HEADER */}
        <div ref={headerRef} className="max-w-4xl mb-16 md:mb-24 flex flex-col items-start">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-0.5 bg-accent"></span>
            <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
              Our Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black font-syne uppercase tracking-tighter text-dark mb-8 leading-[0.95]">
            Selected <br />
            <span className="text-accent">Works.</span>
          </h1>
          <p className="text-dark/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Explore our collection of meticulously crafted spaces. Each project is a testament to our engineering excellence and architectural vision.
          </p>
        </div>

        {/* 2. PREMIUM HORIZONTAL SCROLL FILTERS (Fixes the "App" look on mobile) */}
        <div className="relative mb-16 border-b border-dark/10 pb-2">
          {/* Hide scrollbar completely using Tailwind arbitrary variants */}
          <div className="flex overflow-x-auto gap-8 sm:gap-10 pb-4 w-full snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`relative shrink-0 snap-start text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 pb-2 ${
                  activeCategory === category
                    ? 'text-dark'
                    : 'text-dark/40 hover:text-dark/80'
                }`}
              >
                {category}
                
                {/* Active Indicator Line */}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. ASYMMETRIC GALLERY GRID (Magazine Style) */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-16 lg:gap-y-32"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              
              // Apply a top margin to every odd index (2nd, 4th item) to create a staggered masonry effect on desktop
              const isOdd = index % 2 !== 0;
              const staggeredClass = isOdd ? 'md:mt-24 lg:mt-32' : '';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  key={project.id}
                  className={`group cursor-pointer ${staggeredClass}`}
                >
                  <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                    
                    {/* Minimalist Image Box (Taller for cinematic feel) */}
                    <div className="relative h-112.5 md:h-137.5 lg:h-175 w-full overflow-hidden bg-dark mb-6">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2} // Preload first 2 images
                      />
                      {/* Very subtle overlay on hover to make it feel tactile */}
                      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500" />
                    </div>
                    
                    {/* Clean External Typography */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-3">
                          {project.category}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-syne font-bold text-dark uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>

                      {/* Minimalist Arrow Button (Hidden on very small mobile, shows on tablet/desktop) */}
                      <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full border border-dark/20 items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                        <FiArrowRight size={20} className="-rotate-45" /> 
                      </div>
                    </div>

                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-32 text-dark/40 font-syne text-xl uppercase tracking-widest">
            No projects found in this category.
          </div>
        )}

      </div>
    </div>
  );
}
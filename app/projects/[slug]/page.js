'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/projects';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function ProjectDetail() {
  const params = useParams();
  const { slug } = params;

  // Find the exact project
  const project = projects.find((p) => p.slug === slug);

  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  
  // Ref array for robust GSAP gallery animations
  const galleryRefs = useRef([]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text & Image Load Animation
      gsap.fromTo(".hero-image", 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
      );

      gsap.from(heroTextRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5
      });

      // 2. Parallax effect on Hero Image
      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        ease: "none"
      });

      // 3. Project Data Grid Reveal
      gsap.from(".data-item", {
        scrollTrigger: {
          trigger: ".data-grid",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 4. Editorial Gallery Reveal
      galleryRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light">
        <h1 className="text-[10rem] font-syne font-black text-dark/10 mb-4 leading-none">404</h1>
        <p className="text-dark/60 mb-8 uppercase tracking-widest font-bold">Project Not Found</p>
        <Link href="/projects" className="inline-flex items-center gap-3 text-dark font-bold uppercase tracking-widest text-sm hover:text-accent transition-colors group">
          <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Gallery Images (Excluding the first one used in Hero)
  const galleryImages = project.images.slice(1);

  return (
    <article ref={containerRef} className="min-h-screen bg-light pb-32">
      
      {/* 1. CINEMATIC FULL-SCREEN HERO */}
      <section className="hero-section relative h-screen w-full overflow-hidden bg-dark">
        {/* Parallax Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="hero-image object-cover object-center opacity-80"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Soft Dark Gradient from bottom for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/40 to-transparent" />
        
        {/* Top Back Button */}
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <Link href="/projects" className="inline-flex items-center gap-3 text-white/70 hover:text-white uppercase font-bold tracking-widest text-xs transition-colors group">
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all">
              <FiArrowLeft size={14} />
            </span>
            Back to Works
          </Link>
        </div>

        {/* Bottom Left Aligned Typography */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 text-white">
          <div ref={heroTextRef} className="max-w-5xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-0.5 bg-accent"></span>
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs">
                {project.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black font-syne uppercase tracking-tighter leading-[0.9]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL PROJECT BRIEF */}
      <section className="container mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: The Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl font-syne font-bold text-dark uppercase tracking-tight mb-8">
              The Vision
            </h2>
            <p className="text-dark/80 text-lg md:text-xl leading-relaxed mb-6 font-medium">
              {project.description}
            </p>
            {/* Dummy extra text to make it look like a real case study */}
            <p className="text-dark/60 text-base leading-relaxed">
              Every detail of this development was meticulously planned to balance aesthetic brilliance with structural integrity. We utilized cutting-edge engineering techniques, sustainable materials, and rigorous safety protocols to ensure that this structure stands as a timeless landmark in {project.location}.
            </p>
          </div>

          {/* Right: The Data Grid (No boxes, just clean lines) */}
          <div className="lg:col-span-5 data-grid border-t border-dark/10">
            
            <div className="data-item flex flex-col sm:flex-row justify-between py-6 border-b border-dark/10">
              <span className="text-dark/50 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-0">Location</span>
              <span className="text-dark font-syne font-bold text-lg text-right">{project.location}</span>
            </div>
            
            <div className="data-item flex flex-col sm:flex-row justify-between py-6 border-b border-dark/10">
              <span className="text-dark/50 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-0">Total Area</span>
              <span className="text-dark font-syne font-bold text-lg text-right">{project.area}</span>
            </div>
            
            <div className="data-item flex flex-col sm:flex-row justify-between py-6 border-b border-dark/10">
              <span className="text-dark/50 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-0">Timeline</span>
              <span className="text-dark font-syne font-bold text-lg text-right">{project.timeline}</span>
            </div>
            
            <div className="data-item flex flex-col sm:flex-row justify-between py-6 border-b border-dark/10">
              <span className="text-dark/50 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-0">Client</span>
              <span className="text-dark font-syne font-bold text-lg text-right">{project.client}</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ASYMMETRIC GALLERY (High-End Magazine Layout) */}
      {galleryImages.length > 0 && (
        <section className="container mx-auto px-6 md:px-12 mb-32">
          <div className="flex flex-col gap-6 md:gap-12">
            {galleryImages.map((imgUrl, index) => {
              
              // Layout Logic:
              // If there are exactly 2 images left, make them side-by-side (50-50)
              const isSideBySide = galleryImages.length === 2;

              if (isSideBySide) {
                // If it's the first of the two, open a grid container
                if (index === 0) {
                  return (
                    <div key="grid-container" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                      <div ref={(el) => { galleryRefs.current[0] = el; }} className="relative h-100 md:h-150 w-full overflow-hidden bg-dark shadow-lg">
                        <Image src={galleryImages[0]} alt={`${project.title} Detail 1`} fill className="object-cover object-center hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                      <div ref={(el) => { galleryRefs.current[1] = el; }} className="relative h-100 md:h-150 w-full overflow-hidden bg-dark shadow-lg md:mt-16">
                        <Image src={galleryImages[1]} alt={`${project.title} Detail 2`} fill className="object-cover object-center hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    </div>
                  );
                }
                return null; // Handled in index 0
              }

              // Fallback for odd number of images: Full width panorama
              return (
                <div key={index} ref={(el) => { galleryRefs.current[index] = el; }} className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden bg-dark shadow-lg">
                  <Image
                    src={imgUrl}
                    alt={`${project.title} Gallery Image ${index + 1}`}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    sizes="100vw"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. EDITORIAL NEXT PROJECT CTA */}
      <section className="container mx-auto px-6 md:px-12 mt-20">
        <div className="bg-dark p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center border-l-8 border-accent shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }} />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-black uppercase tracking-tighter text-white mb-6 leading-tight">
              Ready to start <br /> <span className="text-accent">yours?</span>
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-dark px-10 py-5 uppercase font-black tracking-wider text-sm hover:bg-accent hover:text-dark transition-colors duration-300 group">
              Request A Quote <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={18} />
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
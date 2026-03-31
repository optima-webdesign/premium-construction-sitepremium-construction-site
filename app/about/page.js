'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { FiTarget, FiEye, FiAward, FiShield, FiCpu, FiUsers, FiClock } from 'react-icons/fi';

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-text > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.fromTo(".hero-image",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );

      // Section Reveals
      gsap.utils.toArray('.reveal-section').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { icon: FiShield, title: "Uncompromising Integrity", desc: "Honesty and transparency in every contract and every brick laid." },
    { icon: FiCpu, title: "Smart Engineering", desc: "Using latest BIM and AI tools to optimize structural efficiency." },
    { icon: FiUsers, title: "Client Centricity", desc: "Your vision is our blueprint. We build what matters to you." },
    { icon: FiClock, title: "Timely Handover", desc: "Adhering to strict schedules to ensure your project is ready on time." }
  ];

  const timeline = [
    { year: "2010", title: "The Foundation", desc: "Started as a small consultancy in Ahmedabad with a big dream." },
    { year: "2015", title: "Going National", desc: "Completed our first major commercial high-rise in Mumbai." },
    { year: "2020", title: "Tech Revolution", desc: "Adopted fully sustainable and LEED-certified building practices." },
    { year: "2026", title: "Apex Today", desc: "Leading the industry with 250+ iconic projects across India." }
  ];

  const team = [
    { name: "Vikram Mehta", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" },
    { name: "Ananya Patel", role: "Chief Architect", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" },
    { name: "Rohan Desai", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-light pt-32 pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-6 md:px-12 mb-24 lg:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="hero-text order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-0.5 bg-accent"></span>
              <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">Since 2010</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-syne uppercase tracking-tight text-dark leading-[1.05] mb-8">
              Shaping India&apos;s <br /> <span className="text-accent">Architectural</span> <br /> Future.
            </h1>
            <p className="text-dark/70 text-lg md:text-xl leading-relaxed font-medium mb-8">
              ApexBuild is a multi-disciplinary construction firm dedicated to high-performance buildings and innovative urban infrastructure.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-dark/10 pt-8">
              <div>
                <p className="text-3xl font-black text-dark font-syne">15+</p>
                <p className="text-xs font-bold uppercase text-dark/40 tracking-widest">Years of Excellence</p>
              </div>
              <div>
                <p className="text-3xl font-black text-dark font-syne">250+</p>
                <p className="text-xs font-bold uppercase text-dark/40 tracking-widest">Projects Completed</p>
              </div>
            </div>
          </div>
          <div className="hero-image order-1 lg:order-2 relative h-112.5 md:h-162.5 w-full bg-dark overflow-hidden shadow-2xl">
            <Image
              src="/construction-site.png"
              alt="Engineering" fill className="object-cover object-center" priority
            />
          </div>
        </div>
      </div>

      {/* 2. CORE PHILOSOPHY (Mission/Vision + Values) */}
      <div className="bg-white py-24 md:py-32 mb-24 reveal-section">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold font-syne uppercase tracking-tight text-dark mb-6">Our Core <br/> Philosophy.</h2>
              <p className="text-dark/60 leading-relaxed mb-8">Building is more than just assembly; it&apos;s the meticulous fusion of technology, safety, and human-centric design.</p>
              <div className="space-y-6">
                <div className="p-6 bg-light border-l-4 border-accent">
                  <h4 className="font-bold text-dark mb-2 uppercase text-sm tracking-widest">The Mission</h4>
                  <p className="text-dark/70 text-sm">To provide engineering solutions that stand the test of time through absolute transparency.</p>
                </div>
                <div className="p-6 bg-light border-l-4 border-dark">
                  <h4 className="font-bold text-dark mb-2 uppercase text-sm tracking-widest">The Vision</h4>
                  <p className="text-dark/70 text-sm">To be the catalyst for sustainable and intelligent urban environments across the globe.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-8 border border-dark/5 hover:bg-light transition-colors duration-300">
                  <v.icon className="text-accent mb-6" size={32} />
                  <h4 className="text-xl font-bold font-syne text-dark mb-3 uppercase tracking-wide">{v.title}</h4>
                  <p className="text-dark/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE JOURNEY (Timeline) */}
      <div className="container mx-auto px-6 md:px-12 mb-32 reveal-section">
        <h2 className="text-center text-3xl font-bold font-syne uppercase mb-16 tracking-widest text-dark/30">The Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-dark/10 z-0"></div>
          {timeline.map((item, i) => (
            <div key={i} className="relative z-10 group">
              <div className="w-12 h-12 bg-white border-2 border-accent text-dark font-bold flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                {item.year.slice(2)}
              </div>
              <h4 className="text-lg font-bold text-dark mb-2 uppercase">{item.title}</h4>
              <p className="text-dark/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LEADERSHIP */}
      <div className="container mx-auto px-6 md:px-12 reveal-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-syne uppercase tracking-tight text-dark">Meet Our <span className="text-accent">Leaders.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group bg-white border border-dark/5 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative h-112.5 w-full overflow-hidden">
                <Image src={member.image} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold font-syne text-dark uppercase mb-1">{member.name}</h3>
                <p className="text-accent text-xs font-bold uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function ContactPage() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  
  // Form States (Frontend logic only)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Residential',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      gsap.from(".contact-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2,
        ease: "power4.out"
      });

      // 2. Left Column (Info) Reveal
      gsap.from(leftColRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      });

      // 3. Right Column (Form) Reveal
      gsap.fromTo(rightColRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fake Form Submit Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form Submitted Successfully (Dummy Data):", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'Residential',
        message: ''
      });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-light pt-32 pb-24">
      
      {/* 1. EDITORIAL HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6 contact-title">
            <span className="w-10 h-0.5 bg-accent"></span>
            <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
              Let&apos;s Talk
            </span>
          </div>
          <h1 className="contact-title text-5xl md:text-7xl lg:text-[6rem] font-black font-syne uppercase tracking-tighter text-dark leading-[0.95] mb-8">
            Build Your <br />
            <span className="text-accent">Vision.</span>
          </h1>
          <p className="contact-title text-dark/70 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Whether you have a clear blueprint or need expert architectural guidance, our engineering team is ready to turn your ideas into a concrete reality.
          </p>
        </div>
      </div>

      {/* 2. CONTACT LAYOUT (Split Screen) */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Contact Details & Image */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Headquarters Card */}
            <div>
              <h3 className="text-2xl font-syne font-bold text-dark uppercase tracking-tight mb-6 flex items-center gap-4">
                <FiMapPin className="text-accent" /> Headquarters
              </h3>
              <p className="text-dark/70 text-lg leading-relaxed mb-6 font-medium">
                123 Apex Boulevard,<br />
                SG Highway, Ahmedabad,<br />
                Gujarat 380015, India
              </p>
              
              {/* Premium HQ Image instead of bulky iframe map */}
              <div className="relative w-full h-50 bg-dark overflow-hidden mb-6 border border-dark/5 shadow-sm">
                 {/* FIXED: Replaced raw <img> with Next.js <Image /> */}
                 <Image 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
                    alt="ApexBuild Headquarters"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                 />
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-dark font-bold uppercase tracking-widest text-xs hover:text-accent transition-colors group">
                Get Directions <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            <div className="w-full h-px bg-dark/10" />

            {/* Direct Contact */}
            <div>
              <h3 className="text-2xl font-syne font-bold text-dark uppercase tracking-tight mb-6 flex items-center gap-4">
                <FiPhone className="text-accent" /> Connect
              </h3>
              <div className="flex flex-col gap-4">
                <p className="text-dark text-lg font-bold">
                  <span className="text-dark/50 text-sm tracking-widest block mb-1">PHONE</span>
                  +91 98765 43210
                </p>
                <p className="text-dark text-lg font-bold">
                  <span className="text-dark/50 text-sm tracking-widest block mb-1">EMAIL</span>
                  hello@apexbuild.com
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-dark/10" />

            {/* Timings */}
            <div>
              <p className="text-dark/60 text-sm font-medium">
                Mon - Sat: 9:00 AM - 6:00 PM <br/>
                Sunday: Closed
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: The Editorial Form */}
          <div className="lg:col-span-7">
            <div ref={rightColRef} className="bg-white p-10 md:p-16 lg:p-20 border border-dark/5 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative">
              
              {/* Subtle background numbering */}
              <div className="absolute top-10 right-10 text-[6rem] font-syne font-black text-dark/2 select-none pointer-events-none">
                01
              </div>

              <h2 className="text-3xl md:text-4xl font-syne font-bold text-dark uppercase tracking-tight mb-10">
                Request A Quote
              </h2>

              {isSuccess ? (
                <div className="h-full min-h-100 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-light border border-dark/10 flex items-center justify-center mb-6">
                    <FiCheckCircle className="text-accent text-4xl" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-syne font-bold text-dark mb-4 uppercase">Message Received.</h4>
                  <p className="text-dark/70 text-lg">
                    Thank you for reaching out. Our engineering team will review your requirements and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  
                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col relative group">
                      <label className="text-dark/50 text-xs font-bold uppercase tracking-[0.2em] mb-2 transition-colors group-focus-within:text-accent">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-transparent border-b border-dark/20 py-3 text-dark text-lg focus:outline-none focus:border-accent transition-colors rounded-none placeholder-dark/20"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="flex flex-col relative group">
                      <label className="text-dark/50 text-xs font-bold uppercase tracking-[0.2em] mb-2 transition-colors group-focus-within:text-accent">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-transparent border-b border-dark/20 py-3 text-dark text-lg focus:outline-none focus:border-accent transition-colors rounded-none placeholder-dark/20"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Email & Project Type Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col relative group">
                      <label className="text-dark/50 text-xs font-bold uppercase tracking-[0.2em] mb-2 transition-colors group-focus-within:text-accent">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent border-b border-dark/20 py-3 text-dark text-lg focus:outline-none focus:border-accent transition-colors rounded-none placeholder-dark/20"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="flex flex-col relative group">
                      <label className="text-dark/50 text-xs font-bold uppercase tracking-[0.2em] mb-2 transition-colors group-focus-within:text-accent">Project Category</label>
                      <select 
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="bg-transparent border-b border-dark/20 py-3 text-dark text-lg focus:outline-none focus:border-accent transition-colors rounded-none cursor-pointer appearance-none"
                      >
                        <option value="Residential">Luxury Residential</option>
                        <option value="Commercial">Commercial & Corporate</option>
                        <option value="Industrial">Industrial Facilities</option>
                        <option value="Renovation">Renovation & Restoration</option>
                        
                      </select>
                    </div>
                  </div>

                  {/* Message Area */}
                  <div className="flex flex-col relative group">
                    <label className="text-dark/50 text-xs font-bold uppercase tracking-[0.2em] mb-2 transition-colors group-focus-within:text-accent">Project Details *</label>
                    <textarea 
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-transparent border-b border-dark/20 py-3 text-dark text-lg focus:outline-none focus:border-accent transition-colors rounded-none resize-none placeholder-dark/20"
                      placeholder="Tell us about your vision, location, and timeline..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`group relative flex items-center justify-center gap-4 bg-dark text-white px-10 py-5 uppercase font-bold tracking-wider text-sm transition-all duration-300 w-full md:w-auto overflow-hidden ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-dark'
                      }`}
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Transmitting Data...' : 'Submit Inquiry'}
                      </span>
                      {!isSubmitting && (
                        <FiArrowRight size={18} className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";

import Image from "next/image";

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center py-3 px-4 md:px-10 bg-blue-600 shadow-xl border-b-4 md:border-b-8 border-blue-800" style={{ borderStyle: 'solid' }}>
      
      {/* Left side: Logo */}
      <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
        <Image 
            src="/logo.jpg"
            alt="BedHed Matcha Logo"
            width={40}
            height={40}
            className="md:w-12 md:h-12 rounded-full shadow-lg border-3 md:border-4 border-yellow-400"
        />
        <span className="text-xl md:text-3xl font-bold text-yellow-300 font-[family-name:var(--font-permanent-marker)] drop-shadow-lg" style={{ letterSpacing: '0.05em' }}>BED HED</span>
      </div>

      {/* Right side: Links */}
      <div className="flex gap-1 md:gap-3 text-sm md:text-lg">
        <button onClick={() => scrollToSection('home')} className="px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl">Home</button>
        <button onClick={() => scrollToSection('about')} className="px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl hidden sm:block">About</button>
        <button onClick={() => scrollToSection('menu')} className="px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl">Menu</button>
        <button onClick={() => scrollToSection('contact')} className="px-2 md:px-5 py-1 md:py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-md border-2 md:border-3 border-blue-900 font-[family-name:var(--font-indie-flower)] text-sm md:text-xl hidden sm:block">Contact</button>
      </div>
    </nav>
  );
}

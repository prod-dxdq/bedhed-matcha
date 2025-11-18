"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchMenu, fetchLocations } from '@/lib/api';

interface MenuItem {
  id: number;
  name: string;
  ingredients: string[];
  price: number;
  image?: string;
}

interface Location {
  id: number;
  date: string;
  venue: string;
  address: string;
  time: string;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [menuData, locationsData] = await Promise.all([
          fetchMenu(),
          fetchLocations()
        ]);
        setMenuItems(menuData);
        setLocations(locationsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-yellow-100 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Hand-drawn style stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 text-blue-400 text-7xl opacity-60">★</div>
          <div className="absolute top-40 right-32 text-blue-500 text-6xl opacity-50">★</div>
          <div className="absolute bottom-32 left-1/4 text-blue-400 text-5xl opacity-60">★</div>
          <div className="absolute bottom-40 right-1/4 text-blue-500 text-7xl opacity-50">★</div>
        </div>
        
        <div className="relative text-center px-6 md:px-12 py-8 md:py-16 bg-yellow-400 rounded-2xl md:rounded-3xl border-4 md:border-8 border-blue-600 shadow-2xl max-w-4xl mx-4" style={{ borderStyle: 'solid' }}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-blue-600 tracking-tight font-[family-name:var(--font-permanent-marker)] mb-4" style={{ letterSpacing: '0.1em', textShadow: '3px 3px 0 rgba(0,0,0,0.1)' }}>
            BED HED
          </h1>
          <p className="mt-4 md:mt-6 text-lg sm:text-2xl md:text-3xl text-blue-700 font-bold font-[family-name:var(--font-indie-flower)]">
            Artisanal Matcha Pop-Up • Dallas, TX
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-yellow-300 font-black text-lg md:text-xl rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all shadow-xl border-3 md:border-4 border-blue-800 font-[family-name:var(--font-indie-flower)]"
            >
              View Menu
            </button>
            <button 
              onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 md:px-10 py-4 md:py-5 bg-white text-blue-600 font-black text-lg md:text-xl rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all shadow-xl border-3 md:border-4 border-blue-600 font-[family-name:var(--font-indie-flower)]"
            >
              Find Us
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="min-h-screen bg-yellow-100 py-24 px-8 flex items-center relative overflow-hidden">
        {/* Hand-drawn stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 text-blue-600 text-6xl opacity-60">★</div>
          <div className="absolute top-40 right-32 text-blue-500 text-5xl opacity-50">★</div>
          <div className="absolute bottom-20 left-1/4 text-blue-600 text-4xl opacity-60">★</div>
          <div className="absolute bottom-40 right-1/4 text-blue-500 text-6xl opacity-50">★</div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-600 mb-4 font-[family-name:var(--font-permanent-marker)]" style={{ letterSpacing: '0.05em' }}>
              OUR MENU
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-700 font-bold font-[family-name:var(--font-indie-flower)]">
              Handcrafted with premium matcha
            </p>
          </div>
          {loading ? (
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-8 border-yellow-400 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-blue-700 font-bold text-xl font-[family-name:var(--font-indie-flower)]">Loading menu...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {menuItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-6 border-blue-600 relative"
                >
                  <div className="relative">
                    {item.image && (
                      <div className="mb-4 flex justify-center">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={150}
                          height={150}
                          className="rounded-2xl w-full max-w-[200px] h-auto"
                        />
                      </div>
                    )}
                    <div className="mb-3 inline-block px-4 py-2 bg-yellow-300 rounded-full border-3 border-blue-600">
                      <span className="text-blue-700 font-black text-sm font-[family-name:var(--font-indie-flower)]">Featured</span>
                    </div>
                    <h3 className="text-2xl font-black text-blue-600 mb-4 font-[family-name:var(--font-permanent-marker)]" style={{ letterSpacing: '0.02em' }}>
                      {item.name}
                    </h3>
                    <div className="space-y-2 mb-5">
                      {item.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-blue-700">
                          <span className="text-blue-600 text-xl">☆</span>
                          <p className="text-base font-bold font-[family-name:var(--font-indie-flower)]">{ingredient}</p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t-4 border-yellow-300 flex items-center justify-center">
                      <div className="bg-yellow-300 rounded-full px-4 py-2 border-3 border-blue-600">
                        <p className="text-3xl font-black text-blue-600 font-[family-name:var(--font-permanent-marker)]">
                          ${item.price.toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-yellow-100 py-24 px-8 flex items-center relative overflow-hidden">
        {/* Hand-drawn stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-20 left-10 text-blue-400 text-8xl rotate-12">★</div>
          <div className="absolute bottom-40 right-20 text-blue-400 text-9xl -rotate-12">★</div>
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-600 mb-6 font-[family-name:var(--font-permanent-marker)]" style={{ letterSpacing: '0.05em' }}>
              ABOUT US
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border-4 md:border-6 border-blue-800 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-black text-blue-700 mb-4 md:mb-6 font-[family-name:var(--font-permanent-marker)]">Our Story</h3>
              <p className="text-base md:text-lg text-blue-900 leading-relaxed font-bold font-[family-name:var(--font-indie-flower)]">
                BedHed Matcha is Dallas&apos;s premier artisanal matcha pop-up, bringing you the finest quality 
                ceremonial-grade matcha sourced directly from Japan.
              </p>
            </div>
            
            <div className="bg-yellow-400 p-6 md:p-10 rounded-2xl md:rounded-3xl border-4 md:border-6 border-blue-800 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-black text-blue-700 mb-4 md:mb-6 font-[family-name:var(--font-permanent-marker)]">Our Mission</h3>
              <p className="text-base md:text-lg text-blue-900 leading-relaxed font-bold font-[family-name:var(--font-indie-flower)]">
                We believe in quality, sustainability, and creating memorable experiences one cup at a time. 
                Crafting the perfect cup that combines tradition with modern flavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-yellow-100 py-24 px-8 flex items-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-32 right-20 text-yellow-400 text-9xl">★</div>
          <div className="absolute bottom-20 left-32 text-yellow-400 text-8xl rotate-12">★</div>
        </div>

        <div className="max-w-4xl mx-auto text-center w-full relative z-10">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-600 mb-4 md:mb-6 font-[family-name:var(--font-permanent-marker)]" style={{ letterSpacing: '0.05em' }}>
              GET IN TOUCH
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-700 font-bold font-[family-name:var(--font-indie-flower)]">Follow us for pop-up updates</p>
          </div>
          
          <div className="bg-white p-8 md:p-16 rounded-2xl md:rounded-3xl shadow-2xl border-4 md:border-8 border-blue-600">
            <div className="flex flex-col items-center gap-8">
              <div className="group">
                <a 
                  href="https://instagram.com/bedhed.popup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 bg-blue-600 text-yellow-300 font-black text-xl md:text-3xl rounded-full hover:scale-105 transform transition-all shadow-xl border-4 md:border-6 border-blue-800 font-[family-name:var(--font-indie-flower)]"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @bedhed
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="min-h-screen bg-yellow-100 py-24 px-8 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 text-blue-400 text-7xl opacity-50">★</div>
          <div className="absolute top-40 right-40 text-blue-500 text-6xl opacity-60">★</div>
          <div className="absolute bottom-32 left-1/3 text-blue-400 text-5xl opacity-50">★</div>
          <div className="absolute bottom-20 right-1/4 text-blue-500 text-7xl opacity-60">★</div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-600 mb-4 md:mb-6 font-[family-name:var(--font-permanent-marker)]" style={{ letterSpacing: '0.05em' }}>
              FIND US
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-700 font-bold max-w-3xl mx-auto font-[family-name:var(--font-indie-flower)]">
              We&apos;re a pop-up! Follow us to find where we&apos;ll be next
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-8 border-yellow-400 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-blue-700 font-bold text-xl font-[family-name:var(--font-indie-flower)]">Loading locations...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {locations.map((location) => (
                <div 
                  key={location.id} 
                  className="group bg-yellow-400 p-6 md:p-8 rounded-2xl md:rounded-3xl border-4 md:border-6 border-blue-800 hover:border-blue-900 transition-all duration-300 hover:-translate-y-2 shadow-2xl"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-3 md:border-4 border-blue-800">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-blue-700 mb-2 md:mb-3 font-[family-name:var(--font-permanent-marker)]">
                        {location.venue}
                      </h3>
                      <div className="space-y-1 md:space-y-2 text-sm md:text-base text-blue-900 font-bold font-[family-name:var(--font-indie-flower)]">
                        <p className="flex items-center gap-2">
                          <span className="text-blue-700 font-black">•</span>
                          {location.address}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-blue-700 font-black">•</span>
                          {location.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-blue-700 font-black">•</span>
                          {new Date(location.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

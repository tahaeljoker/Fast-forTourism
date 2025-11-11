'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Data for destinations can be moved to a separate file or fetched from an API
const featuredDestinations = [
  { id: 1, name: 'Egypt', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1000', description: 'Explore the pyramids and the rich history of ancient Egyptian civilization' },
  { id: 2, name: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000', description: 'Enjoy modern tourist attractions and shopping in Dubai' },
  { id: 3, name: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1000', description: 'Discover the beauty of nature and enchanting beaches' },
  { id: 4, name: 'Europe', image: 'https://images.unsplash.com/photo-1501594907352-048cd002896c?q=80&w=1000', description: 'Tour the most beautiful European cities and historical landmarks' },
];

const services = [
    { icon: 'fa-globe', title: 'Global Tourism', description: 'We offer comprehensive tourism packages to the best global destinations at competitive prices' },
    { icon: 'fa-passport', title: 'Visa Services', description: 'We help you obtain travel visas to all countries easily and quickly' },
    { icon: 'fa-hotel', title: 'Hotel Bookings', description: 'We provide reservations at the best international hotels at competitive prices and premium services' },
];

const specialOfferItems = [
    'Discounts up to 25% on tourism packages',
    'Special offers for groups and families',
    'Honeymoon packages at special prices',
    'VIP services for premium customers',
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // A helper function for dynamic transition styles
  const getTransitionStyle = (isVisible: boolean, delay = 0, duration = 800, transform = 20) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${transform}px)`,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  });

  return (
    <main>
      {/* Main Welcome Section */}
      <section 
        className="py-20 text-center text-white relative overflow-hidden shadow-lg"
        style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
            ...getTransitionStyle(isMounted, 0, 800)
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000)' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Welcome to Fast Tourism</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl mb-8">Explore the best offers and tourist destinations around the world at competitive prices and premium services</p>
          <div className="flex justify-center items-center gap-4">
            <Link href="/tours" className="hero-btn bg-white text-gray-800 font-bold py-3 px-6 rounded-full shadow-md hover:-translate-y-1 transition-all duration-300">
              <i className="fas fa-globe-americas me-2"></i>Explore Destinations
            </Link>
            <Link href="/contact" className="hero-btn bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full shadow-md hover:-translate-y-1 transition-all duration-300">
              <i className="fas fa-envelope me-2"></i>Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold section-title inline-block relative">Our Premium Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
                style={getTransitionStyle(isMounted, index * 200)}
              >
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:scale-110">
                  <i className={`fas ${service.icon} text-3xl text-[var(--primary-color)]`}></i>
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="destinations-section bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold section-title inline-block relative">Featured Tourist Destinations</h2>
            <p className="text-gray-500 mt-4">Discover our most popular destinations with exclusive offers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination, index) => (
              <div 
                key={destination.id}
                className="destination-card-new h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
                style={getTransitionStyle(isMounted, 150 * index, 600, 30)}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={destination.image} 
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 p-4">
                    <h4 className="text-white text-xl font-bold">{destination.name}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  <Link href={`/tours/${destination.name.toLowerCase()}`} className="w-full text-center block btn-explore rounded-full font-medium py-2 bg-[var(--primary-color)] text-white border-2 border-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-color)] transition-all duration-300">
                    <i className="fas fa-plane-departure me-2"></i>
                    Explore Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tours" className="py-3 px-8 rounded-full text-lg border-2 border-[var(--primary-color)] text-[var(--primary-color)] bg-transparent hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-[10%] end-[5%] w-36 h-36 rounded-full bg-blue-500/5 -z-10"></div>
        <div className="absolute bottom-[15%] start-[8%] w-24 h-24 rounded-full bg-blue-500/5 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={getTransitionStyle(isMounted, 800, 600, -20)}>
              <h2 className="text-3xl font-bold mb-4 relative inline-block pb-2">
                <span className="bg-gradient-to-r from-[var(--primary-color)] to-[#4f46e5] bg-clip-text text-transparent font-extrabold">Special and Premium Offers</span>
                <span className="absolute bottom-0 start-0 h-1 w-16 bg-[var(--primary-color)]"></span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">Enjoy our special offers on tours and comprehensive packages to the best global destinations</p>
              <ul className="space-y-3 mb-8">
                {specialOfferItems.map((item, index) => (
                  <li key={index} className="flex items-center" style={getTransitionStyle(isMounted, 1000 + index * 100, 300, 10)}>
                    <span className="w-6 h-6 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center me-3 flex-shrink-0">
                      <i className="fas fa-check text-xs"></i>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/offers" className="inline-block rounded-full py-3 px-8 text-lg font-bold text-white bg-gradient-to-r from-[var(--primary-color)] to-[#4f46e5] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={getTransitionStyle(isMounted, 1000, 300, 10)}>
                <i className="fas fa-tag me-2"></i>
                Browse Offers
              </Link>
            </div>
            <div className="mt-8 lg:mt-0" style={getTransitionStyle(isMounted, 900, 600, 20)}>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80" 
                  alt="Special Offers"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const quickLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About Us' },
    { href: '/tours', text: 'Destinations' },
    { href: '/offers', text: 'Offers' },
    { href: '/visa', text: 'Visas' },
    { href: '/contact', text: 'Contact Us' },
  ];

  const socialLinks = [
    { href: '#', icon: 'fab fa-facebook-f' },
    { href: '#', icon: 'fab fa-twitter' },
    { href: '#', icon: 'fab fa-instagram' },
    { href: '#', icon: 'fab fa-whatsapp' },
  ];

  return (
    <footer className="bg-gradient-to-bl from-[var(--primary-color-dark)] to-[var(--primary-color)] text-white pt-12 pb-6 mt-16 relative overflow-hidden text-center lg:text-left">
      {/* Decorative background pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-5"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Company Info */}
          <div className="lg:col-span-1 mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start mb-3">
              <Image src="/globe.svg" alt="Logo" width={40} height={40} className="mr-2" />
              <h5 className="mb-0 font-bold text-xl">Fast for Tourism</h5>
            </div>
            <p className="text-white/80 text-sm">
              We are committed to providing the best tourism experiences for our customers. Contact us to explore the world with competitive prices and premium services.
            </p>
            <div className="flex gap-3 justify-center lg:justify-start mt-4">
              {socialLinks.map(link => (
                <a key={link.icon} href={link.href} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h5 className="uppercase font-bold mb-4 text-white">Quick Links</h5>
            <ul className="list-unstyled space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-white/80 hover:text-white transition-colors duration-300 block py-1">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h5 className="uppercase font-bold mb-4 text-white">Contact Us</h5>
            <ul className="list-unstyled space-y-3 text-sm">
              <li className="flex items-start hover:text-white transition-colors duration-300">
                <i className="fas fa-map-marker-alt text-white/80 w-5 text-center mt-1 mr-2"></i>
                <span className="text-white">6th of October City, 10th District - City Stars Towers, Tower 6, Above Emirates NBD Bank, Giza, Egypt</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-white/80 w-5 text-center mt-1 mr-2"></i>
                <span className="text-white">info@fastfortourism.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-white/80 w-5 text-center mt-1 mr-2"></i>
                <span className="text-white">+201111899963</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock text-white/80 w-5 text-center mt-1 mr-2"></i>
                <span className="text-white">Working Hours: 9 AM - 6 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="text-center p-3 mt-8 border-t border-white/10 text-sm text-white/60">
        <span className="text-white">© {new Date().getFullYear()} Copyright:</span>
        <a href="#" className="text-white hover:text-white"> FastforTourism.com</a>
      </div>
    </footer>
  );
};

export default Footer;

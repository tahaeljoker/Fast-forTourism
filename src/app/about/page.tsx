'use client';

import Image from 'next/image';

export default function AboutPage() {
  const features = [
    { icon: 'fa-globe', title: 'Global Reach', description: 'We provide tourism services to destinations around the world' },
    { icon: 'fa-users', title: 'Expert Team', description: 'Our team consists of experienced tourism professionals' },
    { icon: 'fa-star', title: 'Premium Services', description: 'We offer high-quality services at competitive prices' },
    { icon: 'fa-clock', title: '24/7 Support', description: 'We are available around the clock to serve you' },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Destinations' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>من نحن</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl">نحن شركة رائدة في مجال السياحة والسفر، نقدم أفضل الخدمات لعملائنا</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Fast for Tourism</h2>
              <p className="text-gray-600 mb-4 text-lg">
                نحن شركة متخصصة في تقديم خدمات السياحة والسفر على مستوى عالمي. نتمتع بخبرة طويلة في مجال السياحة ونقدم لعملائنا أفضل العروض والخدمات بأفضل الأسعار.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                نسعى جاهدين لتقديم تجربة سياحية فريدة ومميزة لعملائنا من خلال فريق متخصص من الخبراء في مجال السياحة والسفر، وشراكات قوية مع أفضل الفنادق والخطوط الجوية حول العالم.
              </p>
              <p className="text-gray-600 text-lg">
                نقدم خدمات شاملة تشمل حجز الفنادق، تذاكر الطيران، الجولات السياحية، التأشيرات، والكثير من الخدمات الأخرى التي تجعل رحلتك مثالية.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000"
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-2">{stat.number}</div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold section-title inline-block relative mb-4">لماذا نحن؟</h2>
            <p className="text-gray-600 text-lg">نقدم لك أفضل الخدمات والسياحة في العالم</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${feature.icon} text-2xl text-[var(--primary-color)]`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 rounded-lg shadow-lg bg-white">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-2xl text-[var(--primary-color)]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
              <p className="text-gray-600 text-lg">
                أن نكون الشركة الرائدة في مجال السياحة والسفر في المنطقة، وأن نوفر لعملائنا أفضل التجارب السياحية التي تبقى في ذاكرتهم للأبد.
              </p>
            </div>
            <div className="p-8 rounded-lg shadow-lg bg-white">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <i className="fas fa-rocket text-2xl text-[var(--primary-color)]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">مهمتنا</h3>
              <p className="text-gray-600 text-lg">
                تقديم خدمات سياحية عالية الجودة بأسعار منافسة، مع ضمان رضا العملاء من خلال فريق متخصص وخدمة عملاء متميزة على مدار الساعة.
              </p>
            </div>
          </div>
      </div>
      </section>
    </div>
  );
}

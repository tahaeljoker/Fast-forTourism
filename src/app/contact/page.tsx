'use client';

const ContactPage = () => {

  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Address',
      details: ['مدينة 6 أكتوبر، الحي العاشر – أبراج سيتي ستار، برج 6، أعلى بنك الإمارات دبي الوطني، الجيزة، مصر']
    },
    {
      icon: 'fa-envelope',
      title: 'Email',
      details: ['info@fastfortourism.com']
    },
    {
      icon: 'fa-phone',
      title: 'Phone',
      details: [' +201111899963']
    },
    {
      icon: 'fa-clock',
      title: 'Working Hours',
      details: ['Sunday - Thursday: 9 AM - 6 PM', 'Friday - Saturday: 10 AM - 2 PM']
    },
  ];

  return (
    <div>
      {/* Main Title Section */}
      <section className="py-20 text-center text-white" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg md:text-xl">We&apos;re here to answer all your inquiries and help you plan your next trip</p>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center me-4 flex-shrink-0">
                        <i className={`fas ${item.icon} text-xl text-[var(--primary-color)]`}></i>
                      </div>
                      <div>
                        <h5 className="font-bold text-lg">{item.title}</h5>
                        {item.details.map((line, i) => (
                            <p key={i} className="text-gray-600">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                <h3 className="text-2xl font-bold mb-4">Send Us a Message</h3>
                <p className="text-gray-500 mb-6">Please fill out the form below and we will respond to you as soon as possible</p>
                
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" id="fullName" placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" id="phone" placeholder="Enter your phone number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input type="text" id="subject" placeholder="Message subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" rows={5} placeholder="Write your message here" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-full text-lg font-bold text-white bg-gradient-to-r from-[var(--primary-color)] to-[#4f46e5] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="h-96 mb-5 bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-map-marked-alt text-5xl text-[var(--primary-color)]"></i>
          <h4 className="mt-4 text-xl font-bold">Our Location on the Map</h4>
          <p className="text-gray-500">Here will be an interactive map of the company location</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
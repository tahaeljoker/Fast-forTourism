'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { getWhatsAppLink } from '@/config/contact';

const UaePage = () => {
  const highlights = [
    { icon: 'fa-building', title: 'Burj Khalifa', description: 'The tallest building in the world' },
    { icon: 'fa-shopping-bag', title: 'Dubai Mall', description: 'The world\'s largest shopping destination' },
    { icon: 'fa-umbrella-beach', title: 'Jumeirah Beach', description: 'Luxurious golden beaches' },
    { icon: 'fa-camera', title: 'Palm Jumeirah', description: 'Unique man-made island' },
  ];

  const packages = [
    { name: 'Classic Dubai Tour', duration: '4 Days', price: '$600', description: 'Visit Burj Khalifa, Dubai Mall, and Burj Al Arab', image: 'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Abu Dhabi Cultural', duration: '3 Days', price: '$550', description: 'Sheikh Zayed Mosque and Louvre Abu Dhabi', image: 'https://images.pexels.com/photos/1266296/pexels-photo-1266296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Desert Adventures', duration: '2 Days', price: '$350', description: 'Desert safari and camel riding', image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Complete UAE Experience', duration: '7 Days', price: '$1200', description: 'Full experience of all UAE emirates', image: 'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1' },
  ];

  return (
    <div>
      {/* Carousel Section - Styled like Language Switcher */}
      <section className="py-8">
        <Container>
          <div className="country-carousel-container">
            <Carousel interval={5000} controls indicators fade className="country-carousel">
              {packages.map((pkg, index) => (
                <Carousel.Item key={index}>
                  <div style={{ position: 'relative', height: 400 }}>
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.6) 0%, rgba(96, 165, 250, 0.6) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white',
                        padding: '2rem',
                      }}
                    >
                      <h3 className="text-white fw-bold mb-3" style={{ fontSize: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        {pkg.name}
                      </h3>
                      <p className="text-white mb-4" style={{ fontSize: '1.1rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        {pkg.description}
                      </p>
                      <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <span className="badge bg-white text-primary fw-bold" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                          {pkg.duration}
                        </span>
                        <span className="badge bg-white text-primary fw-bold" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Container>
      </section>

      {/* Hero Section */}
      <section className="py-20 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 scale-110" style={{ backgroundImage: 'url(https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>United Arab Emirates</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl">Experience luxury and modernity in the heart of the desert</p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 className="text-3xl font-bold mb-4">Discover the UAE</h2>
              <p className="text-gray-600 mb-4 text-lg">
                The United Arab Emirates, where modernity meets authentic heritage. From the towering skyscrapers of Dubai to the magnificent palaces of Abu Dhabi, a unique tourist experience.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Enjoy shopping in the finest malls, relax on golden beaches, or experience amazing desert adventures. The UAE offers you everything you&apos;re looking for.
              </p>
              <p className="text-gray-600 text-lg">
                Book your trip now and enjoy the best offers and services with us.
              </p>
            </Col>
            <Col lg={6}>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="UAE"
                  fill
                  className="object-cover"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Highlights</h2>
            <p className="text-gray-600 text-lg">Discover the best that UAE has to offer</p>
          </div>
          <Row className="g-4">
            {highlights.map((highlight, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-lg text-center p-4 hover-shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <i className={`fas ${highlight.icon} text-2xl text-[var(--primary-color)]`}></i>
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{highlight.title}</Card.Title>
                    <Card.Text className="text-muted">{highlight.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tour Packages</h2>
            <p className="text-gray-600 text-lg">Choose the package that suits you</p>
          </div>
          <Row className="g-4">
            {packages.map((pkg, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-lg overflow-hidden">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-2">{pkg.name}</Card.Title>
                    <Card.Text className="text-muted mb-3">{pkg.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary">{pkg.duration}</span>
                      <span className="fw-bold text-primary fs-5">{pkg.price}</span>
                    </div>
                    <Button variant="primary" className="w-100" onClick={() => window.open(getWhatsAppLink(`I'm interested in: ${pkg.name}`), '_blank')}>Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-color)] to-[#4f46e5] text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-4">Ready for an Unforgettable Journey?</h2>
          <p className="text-lg mb-5 opacity-90">Contact us now and get the best offers</p>
          <Link href="/contact">
            <Button variant="light" size="lg" className="me-3">Contact Us</Button>
          </Link>
          <Link href="/tours">
            <Button variant="outline-light" size="lg">Back to Tours</Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default UaePage;

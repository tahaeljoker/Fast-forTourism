'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const EuropePage = () => {
  const highlights = [
    { icon: 'fa-city', title: 'Paris', description: 'City of light and romance' },
    { icon: 'fa-monument', title: 'Rome', description: 'Capital of history and culture' },
    { icon: 'fa-landmark', title: 'London', description: 'Elegant royal capital' },
    { icon: 'fa-mountain', title: 'Riviera', description: 'Mediterranean beauty' },
  ];

  const packages = [
    { name: 'Classic Europe Tour', duration: '10 Days', price: '$2000', description: 'Paris, Rome, Florence, and Venice', image: 'https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'European Capitals', duration: '8 Days', price: '$1800', description: 'London, Paris, Brussels, and Amsterdam', image: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Mediterranean Tour', duration: '7 Days', price: '$1500', description: 'Spain, Italy, and Greece', image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Northern Europe', duration: '6 Days', price: '$1700', description: 'Sweden, Denmark, and Norway', image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];

  return (
    <div>
      <section className="py-20 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 scale-110" style={{ backgroundImage: 'url(https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Europe</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl">Discover beautiful cities and rich history</p>
        </div>
      </section>

      <section className="py-20">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 className="text-3xl font-bold mb-4">Explore Europe</h2>
              <p className="text-gray-600 mb-4 text-lg">
                Europe, the ancient continent that combines rich history and diverse culture. From the Eiffel Tower in Paris to the Colosseum in Rome, an unforgettable journey.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Enjoy art and culture, savor delicious cuisine, or experience stunning natural beauty. Europe offers you a complete tourist experience.
              </p>
              <p className="text-gray-600 text-lg">Book your trip now and enjoy the best offers.</p>
            </Col>
            <Col lg={6}>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image src="https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Europe" fill className="object-cover" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Highlights</h2>
          </div>
          <Row className="g-4">
            {highlights.map((highlight, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-lg text-center p-4">
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

      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tour Packages</h2>
          </div>
          <Row className="g-4">
            {packages.map((pkg, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-lg overflow-hidden">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-2">{pkg.name}</Card.Title>
                    <Card.Text className="text-muted mb-3">{pkg.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary">{pkg.duration}</span>
                      <span className="fw-bold text-primary fs-5">{pkg.price}</span>
                    </div>
                    <Button variant="primary" className="w-100">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-20 bg-gradient-to-r from-[var(--primary-color)] to-[#4f46e5] text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-4">Ready for an Unforgettable Journey?</h2>
          <Link href="/contact"><Button variant="light" size="lg" className="me-3">Contact Us</Button></Link>
          <Link href="/tours"><Button variant="outline-light" size="lg">Back to Tours</Button></Link>
        </Container>
      </section>
    </div>
  );
};

export default EuropePage;

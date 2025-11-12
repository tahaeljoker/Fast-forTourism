'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ChinaPage = () => {
  const highlights = [
    { icon: 'fa-mountain', title: 'Great Wall', description: 'Wonder of the ancient world' },
    { icon: 'fa-city', title: 'Beijing', description: 'Imperial capital' },
    { icon: 'fa-building', title: 'Shanghai', description: 'Modern mega city' },
    { icon: 'fa-monument', title: 'Terracotta Warriors', description: 'Terracotta Army' },
  ];

  const packages = [
    { name: 'Classic Beijing Tour', duration: '5 Days', price: '$800', description: 'Great Wall and Imperial Palace', image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Modern Shanghai', duration: '4 Days', price: '$700', description: 'City and shopping', image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Historic Xi\'an', duration: '3 Days', price: '$600', description: 'Terracotta Army', image: 'https://images.pexels.com/photos/755726/pexels-photo-755726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Complete China Experience', duration: '12 Days', price: '$2000', description: 'Full experience', image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1' },
  ];

  return (
    <div>
      <section className="py-20 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 scale-110" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>China</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl">Rich history and great civilization</p>
        </div>
      </section>

      <section className="py-20">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 className="text-3xl font-bold mb-4">Discover China</h2>
              <p className="text-gray-600 mb-4 text-lg">
                China, land of great civilization and rich history. From the Great Wall to modern mega cities.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Enjoy authentic Chinese culture, explore historical sites, or experience modern cities.
              </p>
              <p className="text-gray-600 text-lg">Book your trip now.</p>
            </Col>
            <Col lg={6}>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image src="https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="China" fill className="object-cover" />
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
            {highlights.map((h, i) => (
              <Col md={6} lg={3} key={i}>
                <Card className="h-100 border-0 shadow-lg text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <i className={`fas ${h.icon} text-2xl text-[var(--primary-color)]`}></i>
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{h.title}</Card.Title>
                    <Card.Text className="text-muted">{h.description}</Card.Text>
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
            {packages.map((pkg, i) => (
              <Col md={6} lg={3} key={i}>
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

export default ChinaPage;


"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useEffect } from 'react';

const tours = [
  { name: 'Egypt', href: '/tours/egypt', img: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1000', description: 'Explore ancient pyramids and the Nile River' },
  { name: 'Europe', href: '/tours/europe', img: 'https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=1000', description: 'Discover beautiful cities and rich history' },
  { name: 'Lebanon', href: '/tours/lebanon', img: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1000', description: 'Experience Mediterranean culture and cuisine' },
  { name: 'Indonesia', href: '/tours/indonesia', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1000', description: 'Visit tropical paradise islands and temples' },
  { name: 'Malaysia', href: '/tours/malaysia', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1000', description: 'Explore modern cities and lush rainforests' },
  { name: 'UAE', href: '/tours/uae', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000', description: 'Experience luxury and desert adventures' },
  { name: 'Saudi Arabia', href: '/tours/saudi', img: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1000', description: 'Discover rich culture and modern marvels' },
  { name: 'China', href: '/tours/china', img: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000', description: 'Explore ancient history and breathtaking landscapes' },
];

const ToursPage = () => {
  // Animation effect when component mounts
  useEffect(() => {
    // Add animation class to cards with a staggered delay
    const cards = document.querySelectorAll('.tour-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 100 * index);
    });
  }, []);

  return (
    <div>
      {/* Tours Slider */}
      <section className="bg-light">
        <Container className="py-4">
          <h2 className="h3 fw-bold text-center mb-4">Featured Tours</h2>
        </Container>
        <div className="py-2">
          <Carousel interval={4000} controls indicators fade>
            {tours.slice(0, 6).map((tour) => (
              <Carousel.Item key={tour.href}>
                <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
                  <Image
                    src={tour.img}
                    alt={tour.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)' }}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 p-4 text-white">
                    <Container>
                      <Row>
                        <Col md={8}>
                          <h3 className="fw-bold mb-2">{tour.name}</h3>
                          <p className="mb-3" style={{ maxWidth: 640 }}>{tour.description}</p>
                        </Col>
                        <Col md={4} className="d-flex align-items-end justify-content-md-end">
                          <Link href={tour.href} className="text-decoration-none">
                            <Button variant="primary">Explore Tour</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Tours Grid Section */}
      <Container className="py-5">
        <Row className="g-4">
          {tours.map((tour) => (
            <Col lg={3} md={6} key={tour.href} className="mb-4">
              <div className="tour-card" style={{ 
                opacity: 0, 
                transform: 'translateY(20px)',
                transition: 'all 0.5s ease-out'
              }}>
                <Card className="h-100 shadow-sm border-0 overflow-hidden" style={{ borderRadius: 'var(--border-radius)' }}>
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={tour.img} 
                      alt={tour.name} 
                      style={{ 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }} 
                      className="tour-image"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold mb-2">{tour.name}</Card.Title>
                    <Card.Text className="text-muted mb-3">{tour.description}</Card.Text>
                    <div className="mt-auto">
                      <Link href={tour.href}>
                        <Button variant="primary" className="w-100">Explore Tour</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        .tour-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .tour-card:hover .tour-image {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ToursPage;

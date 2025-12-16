
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface Tour {
  id: string;
  name: string;
  country?: string;
  description?: string;
  price: number;
  image?: string;
}

const ToursPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch('/api/tours');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.tour-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 100 * index);
    });
  }, [tours]);

  return (
    <div>
      {loading && (
        <Container className="py-5 text-center">
          <p>Loading tours...</p>
        </Container>
      )}

      {error && (
        <Container className="py-5">
          <div className="alert alert-danger">Error: {error}</div>
        </Container>
      )}

      {!loading && tours.length > 0 && (
        <>
          {/* Tours Slider */}
          <section className="bg-light">
            <Container className="py-4">
              <h2 className="h3 fw-bold text-center mb-4">Featured Tours</h2>
            </Container>
            <div className="py-2">
              <Carousel interval={4000} controls indicators fade>
                {tours.slice(0, 6).map((tour) => (
                  <Carousel.Item key={tour.id}>
                    <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
                      <Image
                        src={tour.image || 'https://via.placeholder.com/800x400'}
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
                              <p className="h4 text-warning fw-bold">${tour.price}</p>
                            </Col>
                            <Col md={4} className="d-flex align-items-end justify-content-md-end">
                              <Button variant="primary">Book Now</Button>
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
                <Col lg={3} md={6} key={tour.id} className="mb-4">
                  <div className="tour-card" style={{ 
                    opacity: 0, 
                    transform: 'translateY(20px)',
                    transition: 'all 0.5s ease-out'
                  }}>
                    <Card className="h-100 shadow-sm border-0 overflow-hidden" style={{ borderRadius: 'var(--border-radius)' }}>
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <Card.Img 
                          variant="top" 
                          src={tour.image || 'https://via.placeholder.com/400x200'} 
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
                        <Card.Text className="text-muted mb-2">{tour.description}</Card.Text>
                        <Card.Text className="text-warning fw-bold mb-3">${tour.price}</Card.Text>
                        <div className="mt-auto">
                          <Button variant="primary" className="w-100">Book Now</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}

      {!loading && tours.length === 0 && !error && (
        <Container className="py-5 text-center">
          <p>No tours available.</p>
        </Container>
      )}

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
}

export default ToursPage;

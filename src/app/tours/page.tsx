'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const tours = [
  { key: 'egypt', descKey: 'egyptDesc', href: '/tours/egypt', img: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1000' },
  { key: 'europe', descKey: 'europeDesc', href: '/tours/europe', img: 'https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=1000' },
  { key: 'lebanon', descKey: 'lebanonDesc', href: '/tours/lebanon', img: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1000' },
  { key: 'indonesia', descKey: 'indonesiaDesc', href: '/tours/indonesia', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1000' },
  { key: 'malaysia', descKey: 'malaysiaDesc', href: '/tours/malaysia', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1000' },
  { key: 'uae', descKey: 'uaeDesc', href: '/tours/uae', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000' },
  { key: 'saudi', descKey: 'saudiDesc', href: '/tours/saudi', img: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1000' },
  { key: 'china', descKey: 'chinaDesc', href: '/tours/china', img: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000' },
];

const ToursPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const cards = document.querySelectorAll('.tour-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 100 * index);
    });
  }, []);

  return (
    <div>
      <section className="bg-light">
        <Container className="py-4">
          <h2 className="h3 fw-bold text-center mb-4">{t('featuredTours')}</h2>
        </Container>
        <div className="py-2">
          <Carousel interval={4000} controls indicators fade>
            {tours.slice(0, 6).map((tour) => (
              <Carousel.Item key={tour.href}>
                <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
                  <Image
                    src={tour.img}
                    alt={t(tour.key)}
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
                          <h3 className="fw-bold mb-2">{t(tour.key)}</h3>
                          <p className="mb-3" style={{ maxWidth: 640 }}>{t(tour.descKey)}</p>
                        </Col>
                        <Col md={4} className="d-flex align-items-end justify-content-md-end">
                          <Link href={tour.href} className="text-decoration-none">
                            <Button variant="primary">{t('exploreTour')}</Button>
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
                      alt={t(tour.key)} 
                      style={{ 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }} 
                      className="tour-image"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold mb-2">{t(tour.key)}</Card.Title>
                    <Card.Text className="text-muted mb-3">{t(tour.descKey)}</Card.Text>
                    <div className="mt-auto">
                      <Link href={tour.href}>
                        <Button variant="primary" className="w-100">{t('exploreTour')}</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

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

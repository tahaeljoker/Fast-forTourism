"use client";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getWhatsAppLink } from '@/config/contact';

interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  tourId: string;
}

const OffersPage = () => {
  const { t } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch('/api/offers');
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }
        const data = await response.json();
        setOffers(data);
      } catch (err: unknown) {
        console.error('Error fetching offers:', err);
      }
    }

    fetchOffers();
  }, []);
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">{t('offers') || 'Special Offers'}</h1>
          <p className="lead text-muted">
            {t('specialOffers') || 'Check out our latest offers and book your dream vacation today.'}
          </p>
        </div>
        <Row>
          {offers.map((offer) => (
            <Col md={4} key={offer.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0 offer-card" style={{ borderRadius: 'var(--border-radius)' }}>
                <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {offer.discountPercentage}% OFF
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">{offer.title}</Card.Title>
                  <Card.Text className="text-muted">{offer.description}</Card.Text>
                  <p className="text-success fw-bold mb-3">Save {offer.discountPercentage}% now!</p>
                  <Button 
                    variant="primary" 
                    className="w-100"
                    onClick={() => window.open(getWhatsAppLink(`I'm interested in: ${offer.title}`), '_blank')}
                  >
                    {t('contact') || 'Book Offer'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx global>{`
        .offer-card {
          transition: all 0.3s ease;
        }
        .offer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default OffersPage;
"use client";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';

const offers = [
  {
    title: 'Summer in Europe',
    description: 'Enjoy a 20% discount on all Europe trips this summer.',
    img: '/images/europe.jpg'
  },
  {
    title: 'Family Adventure in Malaysia',
    description: 'A special package for families including flights and accommodation.',
    img: '/images/malaysia.jpg'
  },
  {
    title: 'Explore the Treasures of Egypt',
    description: 'A luxury Nile cruise with visits to the most important archaeological sites.',
    img: '/images/egypt.jpg'
  },
];

const OffersPage = () => {
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Special Offers</h1>
          <p className="lead text-muted">
            Check out our latest offers and book your dream vacation today.
          </p>
        </div>
        <Row>
          {offers.map((offer, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="h-100">
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image
                    src={offer.img}
                    alt={offer.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{offer.title}</Card.Title>
                  <Card.Text>{offer.description}</Card.Text>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default OffersPage;
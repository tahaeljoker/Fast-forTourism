"use client";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLanguage } from '@/context/LanguageContext';
import { getWhatsAppLink } from '@/config/contact';

const visaServices = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Schengen Area', flag: '🇪🇺' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Japan', flag: '🇯🇵' },
];

const VisaPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">{t('visas') || 'Visa Services'}</h1>
          <p className="lead text-muted">
            {t('visaServicesDesc') || 'We provide expert assistance for tourist visa applications to various countries worldwide.'}
          </p>
        </div>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 text-center p-4">
              <i className="fas fa-file-alt fa-3x text-primary mb-3"></i>
              <Card.Body>
                <Card.Title>Application Assistance</Card.Title>
                <Card.Text>
                  We help you complete your visa application forms accurately and efficiently.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center p-4">
              <i className="fas fa-check-circle fa-3x text-primary mb-3"></i>
              <Card.Body>
                <Card.Title>Document Review</Card.Title>
                <Card.Text>
                  Our experts review your documents to ensure they meet the embassy requirements.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center p-4">
              <i className="fas fa-calendar-alt fa-3x text-primary mb-3"></i>
              <Card.Body>
                <Card.Title>Appointment Scheduling</Card.Title>
                <Card.Text>
                  We schedule your visa appointment at the embassy or visa application center.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mb-5">
          <h2 className="fw-bold">Countries We Serve</h2>
          <p className="text-muted">
            We specialize in visa services for the following countries and regions:
          </p>
        </div>

        <Row className="g-4">
          {visaServices.map((visa, index) => (
            <Col md={4} key={index}>
              <Card className="text-center h-100">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <div className="display-4 mb-3">{visa.flag}</div>
                  <Card.Title className="fw-bold">{visa.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <p className="lead">Ready to start your visa application?</p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => window.open(getWhatsAppLink('I need visa assistance'), '_blank')}
          >
            {t('contact') || 'Contact Us'}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default VisaPage;

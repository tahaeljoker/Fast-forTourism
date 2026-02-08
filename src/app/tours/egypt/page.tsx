'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { getWhatsAppLink } from '@/config/contact';
import { useLanguage } from '@/context/LanguageContext';

const EgyptPage = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: 'fa-monument', title: 'The Pyramids', description: 'Explore the ancient wonders of the world' },
    { icon: 'fa-water', title: 'Nile River', description: 'Romantic cruise along the Nile' },
    { icon: 'fa-landmark', title: 'Luxor & Aswan', description: 'Capital of Pharaonic civilization' },
    { icon: 'fa-sun', title: 'Red Sea', description: 'Diving and relaxation on beautiful beaches' },
  ];

  const packages = [
    { nameKey: 'egyptPackage1', descKey: 'egyptPackage1Desc', duration: '3 Days', price: '$450', image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { nameKey: 'egyptPackage2', descKey: 'egyptPackage2Desc', duration: '5 Days', price: '$750', image: 'https://images.pexels.com/photos/755726/pexels-photo-755726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { nameKey: 'egyptPackage3', descKey: 'egyptPackage3Desc', duration: '4 Days', price: '$650', image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { nameKey: 'egyptPackage4', descKey: 'egyptPackage4Desc', duration: '10 Days', price: '$1500', image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1' },
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
                      alt={t(pkg.nameKey)}
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
                        {t(pkg.nameKey)}
                      </h3>
                      <p className="text-white mb-4" style={{ fontSize: '1.1rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        {t(pkg.descKey)}
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
      <section className="py-20 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 scale-110" style={{ backgroundImage: 'url(https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{t('egypt')}</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl">{t('egyptDesc')}</p>
        </div>
      </section>

      <section className="py-20">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 className="text-3xl font-bold mb-4">{t('discoverEgypt')}</h2>
              <p className="text-gray-600 mb-4 text-lg">{t('egyptAbout1')}</p>
              <p className="text-gray-600 mb-4 text-lg">{t('egyptAbout2')}</p>
              <p className="text-gray-600 text-lg">{t('egyptAbout3')}</p>
            </Col>
            <Col lg={6}>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/755726/pexels-photo-755726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt={t('egypt')}
                  fill
                  className="object-cover"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('keyHighlights')}</h2>
            <p className="text-gray-600 text-lg">{t('keyHighlightsDesc')}</p>
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

      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('tourPackages')}</h2>
            <p className="text-gray-600 text-lg">{t('choosePackage')}</p>
          </div>
          <Row className="g-4">
            {packages.map((pkg, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-lg overflow-hidden">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <Image
                      src={pkg.image}
                      alt={t(pkg.nameKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-2">{t(pkg.nameKey)}</Card.Title>
                    <Card.Text className="text-muted mb-3">{t(pkg.descKey)}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary">{pkg.duration}</span>
                      <span className="fw-bold text-primary fs-5">{pkg.price}</span>
                    </div>
                    <Button variant="primary" className="w-100" onClick={() => window.open(getWhatsAppLink(`I'm interested in: ${t(pkg.nameKey)}`), '_blank')}>{t('bookNow')}</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-20 bg-gradient-to-r from-[var(--primary-color)] to-[#4f46e5] text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-4">{t('readyForTrip')}</h2>
          <p className="text-lg mb-5 opacity-90">{t('contactUsNow')}</p>
          <Link href="/contact">
            <Button variant="light" size="lg" className="me-3">{t('contact')}</Button>
          </Link>
          <Link href="/tours">
            <Button variant="outline-light" size="lg">{t('backToTours')}</Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default EgyptPage;

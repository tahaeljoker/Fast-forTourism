'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Container, Row, Col, Card } from 'react-bootstrap';

/**
 * مثال على كيفية استخدام نظام الترجمة في الصفحات
 * 
 * للحصول على ترجمة، استخدم:
 * const { t } = useLanguage();
 * const translatedText = t('key');
 */

export default function TranslationExample() {
  const { t, currentLanguage, isRTL } = useLanguage();

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h2 className="mb-4">
                <i className="fas fa-language me-2"></i>
                {t('selectLanguage')}
              </h2>

              <div className="alert alert-info mb-4">
                <strong>اللغة الحالية:</strong> {currentLanguage.toUpperCase()}
                <br />
                <strong>اتجاه النص:</strong> {isRTL ? 'RTL (من اليمين إلى اليسار)' : 'LTR (من اليسار إلى اليمين)'}
              </div>

              <h5 className="mb-3">الترجمات المتاحة:</h5>

              <Row className="g-3 mb-4">
                <Col md={6}>
                  <div className="p-3 bg-light rounded">
                    <strong>Home:</strong> {t('home')}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded">
                    <strong>About Us:</strong> {t('aboutUs')}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded">
                    <strong>Tours:</strong> {t('tours')}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded">
                    <strong>Offers:</strong> {t('offers')}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded">
                    <strong>Visas:</strong> {t('visas')}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded">
                    <strong>Contact:</strong> {t('contact')}
                  </div>
                </Col>
              </Row>

              <div className="p-4 bg-warning bg-opacity-10 rounded">
                <h6 className="mb-2">📝 كيفية الاستخدام:</h6>
                <code className="text-danger">
                  const {'{t}'} = useLanguage();
                  <br />
                  {'<span>'}{t('home')}{'</span>'}
                </code>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

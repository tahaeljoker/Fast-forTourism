'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'الفرس الأول للسياحة',
    siteLogo: '/images/logo.png',
    maintenanceMode: false,

    // Contact Information
    phoneNumber: '+966501234567',
    emailAddress: 'info@alfaris.com',
    physicalAddress: '123 شارع الملك فهد، الرياض، المملكة العربية السعودية',

    // Social Media
    facebookUrl: 'https://facebook.com/alfaris',
    twitterUrl: 'https://twitter.com/alfaris',
    instagramUrl: 'https://instagram.com/alfaris',
    linkedinUrl: 'https://linkedin.com/company/alfaris',

    // SEO Settings
    metaTitle: 'الفرس الأول للسياحة | الرئيسية',
    metaDescription: 'أفضل خدمات السياحة والسفر في المملكة العربية السعودية.',
    metaKeywords: 'سياحة, سفر, حجوزات, فنادق, طيران',

    // Advanced Settings
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    webhookUrl: 'https://api.example.com/webhook'
  });

  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log('Saving settings:', settings);
    setAlert({ type: 'success', message: 'تم حفظ الإعدادات بنجاح!' });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          siteLogo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container fluid>
      <h1 className="h3 mb-4">إعدادات الموقع</h1>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleFormSubmit}>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'general')}
          className="mb-4"
        >
          <Tab eventKey="general" title="إعدادات عامة">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">الإعدادات العامة</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>اسم الموقع</Form.Label>
                      <Form.Control
                        type="text"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>شعار الموقع</Form.Label>
                      <div className="d-flex align-items-center">
                        <img src={settings.siteLogo} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px', background: '#f1f1f1' }} />
                        <Form.Control
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="maintenance-mode-switch"
                    label="تفعيل وضع الصيانة"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    عند تفعيل هذا الخيار، سيتم عرض صفحة صيانة لجميع الزوار.
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="contact" title="معلومات التواصل">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">معلومات التواصل</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>رقم الهاتف</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={settings.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>البريد الإلكتروني</Form.Label>
                      <Form.Control
                        type="email"
                        name="emailAddress"
                        value={settings.emailAddress}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>العنوان الفعلي</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="physicalAddress"
                    value={settings.physicalAddress}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="social" title="وسائل التواصل الاجتماعي">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">روابط التواصل الاجتماعي</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>رابط فيسبوك</Form.Label>
                      <Form.Control
                        type="url"
                        name="facebookUrl"
                        value={settings.facebookUrl}
                        onChange={handleInputChange}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>رابط تويتر</Form.Label>
                      <Form.Control
                        type="url"
                        name="twitterUrl"
                        value={settings.twitterUrl}
                        onChange={handleInputChange}
                        placeholder="https://twitter.com/yourprofile"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>رابط انستغرام</Form.Label>
                      <Form.Control
                        type="url"
                        name="instagramUrl"
                        value={settings.instagramUrl}
                        onChange={handleInputChange}
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>رابط لينكدإن</Form.Label>
                      <Form.Control
                        type="url"
                        name="linkedinUrl"
                        value={settings.linkedinUrl}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="seo" title="تحسين محركات البحث (SEO)">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">إعدادات SEO</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>العنوان التعريفي الافتراضي (Meta Title)</Form.Label>
                  <Form.Control
                    type="text"
                    name="metaTitle"
                    value={settings.metaTitle}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>الوصف التعريفي الافتراضي (Meta Description)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="metaDescription"
                    value={settings.metaDescription}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>الكلمات المفتاحية الافتراضية (Meta Keywords)</Form.Label>
                  <Form.Control
                    type="text"
                    name="metaKeywords"
                    value={settings.metaKeywords}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    افصل بين الكلمات بفاصلة (e.g., سياحة, سفر, فنادق).
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="advanced" title="إعدادات متقدمة">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">إعدادات متقدمة</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>مفتاح Google Maps API</Form.Label>
                  <Form.Control
                    type="password"
                    name="googleMapsApiKey"
                    value={settings.googleMapsApiKey}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    يستخدم لعرض الخرائط في الموقع.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>رابط Webhook</Form.Label>
                  <Form.Control
                    type="url"
                    name="webhookUrl"
                    value={settings.webhookUrl}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    يستخدم لإرسال إشعارات للأحداث الهامة (مثل الحجوزات الجديدة).
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        <div className="mt-4 d-flex justify-content-end">
          <Button variant="primary" type="submit" size="lg">
            <i className="fas fa-save me-2"></i>
            حفظ التغييرات
          </Button>
        </div>
      </Form>
    </Container>
  );
}
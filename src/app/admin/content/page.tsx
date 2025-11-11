'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form, Alert, Tabs, Tab } from 'react-bootstrap';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
}

interface Setting {
  id: number;
  key: string;
  value: string;
  type: 'text' | 'textarea' | 'image' | 'number' | 'boolean';
  description: string;
  category: string;
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('pages');
  const [pages, setPages] = useState<Page[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [showPageModal, setShowPageModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [pageFormData, setPageFormData] = useState({
    title: '',
    slug: '',
    content: '',
    metaDescription: '',
    status: 'draft'
  });
  const [settingFormData, setSettingFormData] = useState({
    key: '',
    value: '',
    type: 'text',
    description: '',
    category: 'general'
  });
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const settingCategories = [
    'general',
    'seo',
    'contact',
    'social',
    'appearance'
  ];

  const settingTypes = [
    { value: 'text', label: 'نص' },
    { value: 'textarea', label: 'نص طويل' },
    { value: 'image', label: 'صورة' },
    { value: 'number', label: 'رقم' },
    { value: 'boolean', label: 'نعم/لا' }
  ];

  useEffect(() => {
    // محاكاة تحميل البيانات
    setPages([
      {
        id: 1,
        title: 'الصفحة الرئيسية',
        slug: 'home',
        content: 'محتوى الصفحة الرئيسية...',
        metaDescription: 'الفرس الأول للسياحة - أفضل خدمات السياحة والسفر',
        status: 'published',
        lastModified: '2024-01-15',
        author: 'مدير النظام'
      },
      {
        id: 2,
        title: 'من نحن',
        slug: 'about',
        content: 'محتوى صفحة من نحن...',
        metaDescription: 'تعرف على شركة الفرس الأول للسياحة',
        status: 'published',
        lastModified: '2024-01-10',
        author: 'مدير النظام'
      },
      {
        id: 3,
        title: 'اتصل بنا',
        slug: 'contact',
        content: 'محتوى صفحة اتصل بنا...',
        metaDescription: 'تواصل معنا للحصول على أفضل خدمات السياحة',
        status: 'published',
        lastModified: '2024-01-08',
        author: 'مدير النظام'
      },
      {
        id: 4,
        title: 'سياسة الخصوصية',
        slug: 'privacy-policy',
        content: 'محتوى سياسة الخصوصية...',
        metaDescription: 'سياسة الخصوصية لشركة الفرس الأول للسياحة',
        status: 'draft',
        lastModified: '2024-01-12',
        author: 'مدير النظام'
      }
    ]);

    setSettings([
      {
        id: 1,
        key: 'site_name',
        value: 'الفرس الأول للسياحة',
        type: 'text',
        description: 'اسم الموقع',
        category: 'general'
      },
      {
        id: 2,
        key: 'site_description',
        value: 'أفضل خدمات السياحة والسفر في المملكة العربية السعودية',
        type: 'textarea',
        description: 'وصف الموقع',
        category: 'general'
      },
      {
        id: 3,
        key: 'contact_email',
        value: 'info@alfaris.com',
        type: 'text',
        description: 'البريد الإلكتروني للتواصل',
        category: 'contact'
      },
      {
        id: 4,
        key: 'contact_phone',
        value: '+966501234567',
        type: 'text',
        description: 'رقم الهاتف',
        category: 'contact'
      },
      {
        id: 5,
        key: 'facebook_url',
        value: 'https://facebook.com/alfaris',
        type: 'text',
        description: 'رابط فيسبوك',
        category: 'social'
      },
      {
        id: 6,
        key: 'instagram_url',
        value: 'https://instagram.com/alfaris',
        type: 'text',
        description: 'رابط إنستغرام',
        category: 'social'
      },
      {
        id: 7,
        key: 'main_color',
        value: '#3B82F6',
        type: 'text',
        description: 'اللون الرئيسي للموقع',
        category: 'appearance'
      }
    ]);
  }, []);

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPage) {
      setPages(pages.map(page => 
        page.id === editingPage.id 
          ? { 
              ...pageFormData, 
              id: editingPage.id,
              lastModified: new Date().toISOString().split('T')[0],
              author: 'مدير النظام',
              status: pageFormData.status as 'published' | 'draft' | 'archived'
            }
          : page
      ));
      setAlert({ type: 'success', message: 'تم تحديث الصفحة بنجاح' });
    } else {
      const newPage: Page = {
        id: pages.length + 1,
        ...pageFormData,
        lastModified: new Date().toISOString().split('T')[0],
        author: 'مدير النظام',
        status: pageFormData.status as 'published' | 'draft' | 'archived'
      };
      setPages([...pages, newPage]);
      setAlert({ type: 'success', message: 'تم إضافة الصفحة بنجاح' });
    }
    
    setShowPageModal(false);
    setEditingPage(null);
    setPageFormData({
      title: '',
      slug: '',
      content: '',
      metaDescription: '',
      status: 'draft'
    });
  };

  const handleSettingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSetting) {
      setSettings(settings.map(setting => 
        setting.id === editingSetting.id 
          ? { 
              ...settingFormData, 
              id: editingSetting.id,
              type: settingFormData.type as 'text' | 'textarea' | 'image' | 'number' | 'boolean'
            }
          : setting
      ));
      setAlert({ type: 'success', message: 'تم تحديث الإعداد بنجاح' });
    } else {
      const newSetting: Setting = {
        id: settings.length + 1,
        ...settingFormData,
        type: settingFormData.type as 'text' | 'textarea' | 'image' | 'number' | 'boolean'
      };
      setSettings([...settings, newSetting]);
      setAlert({ type: 'success', message: 'تم إضافة الإعداد بنجاح' });
    }
    
    setShowSettingsModal(false);
    setEditingSetting(null);
    setSettingFormData({
      key: '',
      value: '',
      type: 'text',
      description: '',
      category: 'general'
    });
  };

  const handleEditPage = (page: Page) => {
    setEditingPage(page);
    setPageFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaDescription: page.metaDescription,
      status: page.status
    });
    setShowPageModal(true);
  };

  const handleEditSetting = (setting: Setting) => {
    setEditingSetting(setting);
    setSettingFormData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
      description: setting.description,
      category: setting.category
    });
    setShowSettingsModal(true);
  };

  const handleDeletePage = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      setPages(pages.filter(page => page.id !== id));
      setAlert({ type: 'success', message: 'تم حذف الصفحة بنجاح' });
    }
  };

  const handleDeleteSetting = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإعداد؟')) {
      setSettings(settings.filter(setting => setting.id !== id));
      setAlert({ type: 'success', message: 'تم حذف الإعداد بنجاح' });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { bg: string; text: string } } = {
      published: { bg: 'success', text: 'منشور' },
      draft: { bg: 'warning', text: 'مسودة' },
      archived: { bg: 'secondary', text: 'مؤرشف' }
    };
    const variant = variants[status] || { bg: 'secondary', text: 'غير محدد' };
    return <Badge bg={variant.bg}>{variant.text}</Badge>;
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">إدارة المحتوى والإعدادات</h1>
      </div>

      {alert && (
        <Alert 
          variant={alert.type} 
          dismissible 
          onClose={() => setAlert(null)}
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'pages')}
        className="mb-4"
      >
        <Tab eventKey="pages" title="إدارة الصفحات">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>الصفحات</h5>
            <Button 
              variant="primary" 
              onClick={() => {
                setEditingPage(null);
                setPageFormData({
                  title: '',
                  slug: '',
                  content: '',
                  metaDescription: '',
                  status: 'draft'
                });
                setShowPageModal(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              إضافة صفحة جديدة
            </Button>
          </div>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>العنوان</th>
                      <th>الرابط</th>
                      <th>الحالة</th>
                      <th>آخر تعديل</th>
                      <th>المؤلف</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr key={page.id}>
                        <td>
                          <div>
                            <div className="fw-bold">{page.title}</div>
                            <small className="text-muted">{page.metaDescription}</small>
                          </div>
                        </td>
                        <td>
                          <code>/{page.slug}</code>
                        </td>
                        <td>{getStatusBadge(page.status)}</td>
                        <td>{page.lastModified}</td>
                        <td>{page.author}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleEditPage(page)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeletePage(page.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="settings" title="إدارة الإعدادات">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إعدادات الموقع</h5>
            <Button 
              variant="primary" 
              onClick={() => {
                setEditingSetting(null);
                setSettingFormData({
                  key: '',
                  value: '',
                  type: 'text',
                  description: '',
                  category: 'general'
                });
                setShowSettingsModal(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              إضافة إعداد جديد
            </Button>
          </div>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>المفتاح</th>
                      <th>القيمة</th>
                      <th>النوع</th>
                      <th>الفئة</th>
                      <th>الوصف</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settings.map((setting) => (
                      <tr key={setting.id}>
                        <td>
                          <code>{setting.key}</code>
                        </td>
                        <td>
                          <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {setting.value}
                          </div>
                        </td>
                        <td>
                          <Badge bg="info">{setting.type}</Badge>
                        </td>
                        <td>
                          <Badge bg="secondary">{setting.category}</Badge>
                        </td>
                        <td>{setting.description}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleEditSetting(setting)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeleteSetting(setting.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Modal إضافة/تعديل الصفحة */}
      <Modal show={showPageModal} onHide={() => setShowPageModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPage ? 'تعديل الصفحة' : 'إضافة صفحة جديدة'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlePageSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>عنوان الصفحة</Form.Label>
                  <Form.Control
                    type="text"
                    value={pageFormData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setPageFormData({
                        ...pageFormData, 
                        title,
                        slug: generateSlug(title)
                      });
                    }}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>رابط الصفحة</Form.Label>
                  <Form.Control
                    type="text"
                    value={pageFormData.slug}
                    onChange={(e) => setPageFormData({...pageFormData, slug: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>محتوى الصفحة</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={pageFormData.content}
                onChange={(e) => setPageFormData({...pageFormData, content: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>وصف الصفحة (SEO)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={pageFormData.metaDescription}
                onChange={(e) => setPageFormData({...pageFormData, metaDescription: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>حالة الصفحة</Form.Label>
              <Form.Select
                value={pageFormData.status}
                onChange={(e) => setPageFormData({...pageFormData, status: e.target.value as 'published' | 'draft' | 'archived'})}
              >
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
                <option value="archived">مؤرشف</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPageModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" type="submit">
              {editingPage ? 'تحديث' : 'إضافة'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal إضافة/تعديل الإعداد */}
      <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSetting ? 'تعديل الإعداد' : 'إضافة إعداد جديد'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSettingSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>مفتاح الإعداد</Form.Label>
                  <Form.Control
                    type="text"
                    value={settingFormData.key}
                    onChange={(e) => setSettingFormData({...settingFormData, key: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>الفئة</Form.Label>
                  <Form.Select
                    value={settingFormData.category}
                    onChange={(e) => setSettingFormData({...settingFormData, category: e.target.value})}
                  >
                    {settingCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>القيمة</Form.Label>
              {settingFormData.type === 'textarea' ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={settingFormData.value}
                  onChange={(e) => setSettingFormData({...settingFormData, value: e.target.value})}
                  required
                />
              ) : (
                <Form.Control
                  type={settingFormData.type === 'number' ? 'number' : 'text'}
                  value={settingFormData.value}
                  onChange={(e) => setSettingFormData({...settingFormData, value: e.target.value})}
                  required
                />
              )}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>نوع البيانات</Form.Label>
                  <Form.Select
                    value={settingFormData.type}
                    onChange={(e) => setSettingFormData({...settingFormData, type: e.target.value as 'text' | 'textarea' | 'image' | 'number' | 'boolean'})}
                  >
                    {settingTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>الوصف</Form.Label>
              <Form.Control
                type="text"
                value={settingFormData.description}
                onChange={(e) => setSettingFormData({...settingFormData, description: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSettingsModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" type="submit">
              {editingSetting ? 'تحديث' : 'إضافة'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

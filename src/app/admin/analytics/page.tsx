'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, Alert, Tabs, Tab } from 'react-bootstrap';

interface AnalyticsData {
  totalVisitors: number;
  totalBookings: number;
  totalRevenue: number;
  conversionRate: number;
  popularTours: Array<{
    name: string;
    bookings: number;
    revenue: number;
  }>;
  monthlyStats: Array<{
    month: string;
    visitors: number;
    bookings: number;
    revenue: number;
  }>;
  topCountries: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
  deviceStats: Array<{
    device: string;
    visitors: number;
    percentage: number;
  }>;
}

interface Report {
  id: number;
  title: string;
  type: 'financial' | 'bookings' | 'visitors' | 'custom';
  dateRange: string;
  generatedAt: string;
  status: 'ready' | 'generating' | 'failed';
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [dateRange, setDateRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setAnalyticsData({
      totalVisitors: 15420,
      totalBookings: 324,
      totalRevenue: 485600,
      conversionRate: 2.1,
      popularTours: [
        { name: 'جولة مصر الكلاسيكية', bookings: 45, revenue: 112500 },
        { name: 'دبي الحديثة', bookings: 38, revenue: 68400 },
        { name: 'أوروبا الرومانسية', bookings: 32, revenue: 102400 },
        { name: 'ماليزيا الاستوائية', bookings: 28, revenue: 56000 },
        { name: 'جولة الصين', bookings: 25, revenue: 75000 }
      ],
      monthlyStats: [
        { month: 'يناير', visitors: 5200, bookings: 108, revenue: 162000 },
        { month: 'فبراير', visitors: 4800, bookings: 95, revenue: 142500 },
        { month: 'مارس', visitors: 5420, bookings: 121, revenue: 181100 }
      ],
      topCountries: [
        { country: 'السعودية', visitors: 8500, percentage: 55.1 },
        { country: 'الإمارات', visitors: 3200, percentage: 20.8 },
        { country: 'الكويت', visitors: 1800, percentage: 11.7 },
        { country: 'قطر', visitors: 1200, percentage: 7.8 },
        { country: 'البحرين', visitors: 720, percentage: 4.7 }
      ],
      deviceStats: [
        { device: 'الهاتف المحمول', visitors: 9252, percentage: 60 },
        { device: 'الكمبيوتر المكتبي', visitors: 4626, percentage: 30 },
        { device: 'التابلت', visitors: 1542, percentage: 10 }
      ]
    });

    setReports([
      {
        id: 1,
        title: 'تقرير المبيعات الشهري',
        type: 'financial',
        dateRange: '2024-01-01 إلى 2024-01-31',
        generatedAt: '2024-01-31',
        status: 'ready'
      },
      {
        id: 2,
        title: 'تقرير الحجوزات الأسبوعي',
        type: 'bookings',
        dateRange: '2024-01-22 إلى 2024-01-28',
        generatedAt: '2024-01-28',
        status: 'ready'
      },
      {
        id: 3,
        title: 'تقرير الزوار الشهري',
        type: 'visitors',
        dateRange: '2024-01-01 إلى 2024-01-31',
        generatedAt: '2024-01-31',
        status: 'generating'
      }
    ]);
  }, [dateRange]);

  const generateReport = (type: string) => {
    const newReport: Report = {
      id: reports.length + 1,
      title: `تقرير ${type === 'financial' ? 'المالي' : type === 'bookings' ? 'الحجوزات' : 'الزوار'}`,
      type: type as 'financial' | 'bookings' | 'visitors' | 'custom',
      dateRange: `آخر ${dateRange} يوم`,
      generatedAt: new Date().toISOString().split('T')[0],
      status: 'generating'
    };
    
    setReports([...reports, newReport]);
    setAlert({ type: 'success', message: 'تم بدء إنشاء التقرير' });

    // محاكاة إنشاء التقرير
    setTimeout(() => {
      setReports(reports.map(report => 
        report.id === newReport.id 
          ? { ...report, status: 'ready' }
          : report
      ));
    }, 3000);
  };

  const downloadReport = () => {
    setAlert({ type: 'success', message: 'تم تحميل التقرير بنجاح' });
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { bg: string; text: string } } = {
      ready: { bg: 'success', text: 'جاهز' },
      generating: { bg: 'warning', text: 'قيد الإنشاء' },
      failed: { bg: 'danger', text: 'فشل' }
    };
    const variant = variants[status] || { bg: 'secondary', text: 'غير محدد' };
    return <Badge bg={variant.bg}>{variant.text}</Badge>;
  };

  if (!analyticsData) {
    return (
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">الإحصائيات والتقارير</h1>
        <div className="d-flex gap-2">
          <Form.Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="7">آخر 7 أيام</option>
            <option value="30">آخر 30 يوم</option>
            <option value="90">آخر 90 يوم</option>
            <option value="365">آخر سنة</option>
          </Form.Select>
          <Button variant="outline-primary">
            <i className="fas fa-download me-2"></i>
            تصدير البيانات
          </Button>
        </div>
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
        onSelect={(k) => setActiveTab(k || 'overview')}
        className="mb-4"
      >
        <Tab eventKey="overview" title="نظرة عامة">
          {/* إحصائيات رئيسية */}
          <Row className="mb-4">
            <Col md={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fas fa-users text-primary fa-2x"></i>
                    </div>
                    <div>
                      <h3 className="mb-0 text-primary">{analyticsData.totalVisitors.toLocaleString()}</h3>
                      <small className="text-muted">إجمالي الزوار</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fas fa-calendar-check text-success fa-2x"></i>
                    </div>
                    <div>
                      <h3 className="mb-0 text-success">{analyticsData.totalBookings}</h3>
                      <small className="text-muted">إجمالي الحجوزات</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fas fa-chart-line text-warning fa-2x"></i>
                    </div>
                    <div>
                      <h3 className="mb-0 text-warning">{analyticsData.totalRevenue.toLocaleString()}</h3>
                      <small className="text-muted">إجمالي الإيرادات (ر.س)</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="fas fa-percentage text-info fa-2x"></i>
                    </div>
                    <div>
                      <h3 className="mb-0 text-info">{analyticsData.conversionRate}%</h3>
                      <small className="text-muted">معدل التحويل</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* الجولات الأكثر شعبية */}
            <Col lg={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">الجولات الأكثر شعبية</h5>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <Table className="table-sm mb-0">
                      <thead>
                        <tr>
                          <th>الجولة</th>
                          <th>الحجوزات</th>
                          <th>الإيرادات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.popularTours.map((tour, index) => (
                          <tr key={index}>
                            <td>{tour.name}</td>
                            <td>
                              <Badge bg="primary">{tour.bookings}</Badge>
                            </td>
                            <td className="fw-bold text-success">
                              {tour.revenue.toLocaleString()} ر.س
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* إحصائيات الأجهزة */}
            <Col lg={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">إحصائيات الأجهزة</h5>
                </Card.Header>
                <Card.Body>
                  {analyticsData.deviceStats.map((device, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span>{device.device}</span>
                        <span className="fw-bold">{device.percentage}%</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* إحصائيات البلدان */}
            <Col lg={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">أهم البلدان</h5>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <Table className="table-sm mb-0">
                      <thead>
                        <tr>
                          <th>البلد</th>
                          <th>الزوار</th>
                          <th>النسبة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.topCountries.map((country, index) => (
                          <tr key={index}>
                            <td>{country.country}</td>
                            <td>{country.visitors.toLocaleString()}</td>
                            <td>
                              <Badge bg="info">{country.percentage}%</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* الإحصائيات الشهرية */}
            <Col lg={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">الإحصائيات الشهرية</h5>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <Table className="table-sm mb-0">
                      <thead>
                        <tr>
                          <th>الشهر</th>
                          <th>الزوار</th>
                          <th>الحجوزات</th>
                          <th>الإيرادات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.monthlyStats.map((month, index) => (
                          <tr key={index}>
                            <td>{month.month}</td>
                            <td>{month.visitors.toLocaleString()}</td>
                            <td>{month.bookings}</td>
                            <td className="fw-bold text-success">
                              {month.revenue.toLocaleString()} ر.س
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="reports" title="التقارير">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>التقارير</h5>
            <div className="d-flex gap-2">
              <Button 
                variant="outline-primary" 
                onClick={() => generateReport('financial')}
              >
                <i className="fas fa-chart-line me-2"></i>
                تقرير مالي
              </Button>
              <Button 
                variant="outline-success" 
                onClick={() => generateReport('bookings')}
              >
                <i className="fas fa-calendar-check me-2"></i>
                تقرير الحجوزات
              </Button>
              <Button 
                variant="outline-info" 
                onClick={() => generateReport('visitors')}
              >
                <i className="fas fa-users me-2"></i>
                تقرير الزوار
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>اسم التقرير</th>
                      <th>النوع</th>
                      <th>الفترة</th>
                      <th>تاريخ الإنشاء</th>
                      <th>الحالة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="fw-bold">{report.title}</td>
                        <td>
                          <Badge bg={
                            report.type === 'financial' ? 'warning' :
                            report.type === 'bookings' ? 'success' :
                            report.type === 'visitors' ? 'info' : 'secondary'
                          }>
                            {report.type === 'financial' ? 'مالي' :
                             report.type === 'bookings' ? 'حجوزات' :
                             report.type === 'visitors' ? 'زوار' : 'مخصص'}
                          </Badge>
                        </td>
                        <td>{report.dateRange}</td>
                        <td>{report.generatedAt}</td>
                        <td>{getStatusBadge(report.status)}</td>
                        <td>
                          {report.status === 'ready' ? (
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={downloadReport}
                            >
                              <i className="fas fa-download me-1"></i>
                              تحميل
                            </Button>
                          ) : report.status === 'generating' ? (
                            <Button variant="outline-secondary" size="sm" disabled>
                              <i className="fas fa-spinner fa-spin me-1"></i>
                              جاري الإنشاء
                            </Button>
                          ) : (
                            <Button variant="outline-danger" size="sm">
                              <i className="fas fa-redo me-1"></i>
                              إعادة المحاولة
                            </Button>
                          )}
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
    </Container>
  );
}

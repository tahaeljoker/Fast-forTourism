'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTours: 0,
    totalOffers: 0,
    totalVisas: 0,
    totalUsers: 0
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'tour',
      title: 'جولة جديدة إلى دبي',
      date: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      type: 'offer',
      title: 'عرض خاص لأوروبا',
      date: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      type: 'visa',
      title: 'طلب تأشيرة أمريكا',
      date: '2024-01-13',
      status: 'pending'
    }
  ]);

  const [recentBookings] = useState([
    {
      id: 1,
      customer: 'أحمد محمد',
      tour: 'جولة مصر',
      date: '2024-01-15',
      amount: 2500,
      status: 'confirmed'
    },
    {
      id: 2,
      customer: 'فاطمة علي',
      tour: 'جولة ماليزيا',
      date: '2024-01-14',
      amount: 1800,
      status: 'pending'
    },
    {
      id: 3,
      customer: 'محمد حسن',
      tour: 'جولة أوروبا',
      date: '2024-01-13',
      amount: 3200,
      status: 'confirmed'
    }
  ]);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setStats({
      totalTours: 8,
      totalOffers: 5,
      totalVisas: 12,
      totalUsers: 45
    });
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      active: 'success',
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      tour: 'fas fa-map-marked-alt',
      offer: 'fas fa-tags',
      visa: 'fas fa-passport',
      user: 'fas fa-user'
    };
    return <i className={`${icons[type] || 'fas fa-info'} text-primary`}></i>;
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">لوحة التحكم الرئيسية</h1>
        <div className="text-muted">
          <i className="fas fa-calendar-alt me-2"></i>
          {new Date().toLocaleDateString('ar-SA')}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="fas fa-map-marked-alt text-primary fa-2x"></i>
                </div>
                <div>
                  <h3 className="mb-0 text-primary">{stats.totalTours}</h3>
                  <small className="text-muted">إجمالي الجولات</small>
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
                  <i className="fas fa-tags text-success fa-2x"></i>
                </div>
                <div>
                  <h3 className="mb-0 text-success">{stats.totalOffers}</h3>
                  <small className="text-muted">إجمالي العروض</small>
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
                  <i className="fas fa-passport text-warning fa-2x"></i>
                </div>
                <div>
                  <h3 className="mb-0 text-warning">{stats.totalVisas}</h3>
                  <small className="text-muted">طلبات التأشيرات</small>
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
                  <i className="fas fa-users text-info fa-2x"></i>
                </div>
                <div>
                  <h3 className="mb-0 text-info">{stats.totalUsers}</h3>
                  <small className="text-muted">إجمالي المستخدمين</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* الأنشطة الأخيرة */}
        <Col lg={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">الأنشطة الأخيرة</h5>
                <Button variant="outline-primary" size="sm">
                  عرض الكل
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="list-group-item border-0 px-0">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{activity.title}</h6>
                        <small className="text-muted">
                          <i className="fas fa-clock me-1"></i>
                          {activity.date}
                        </small>
                      </div>
                      <div>
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* الحجوزات الأخيرة */}
        <Col lg={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">الحجوزات الأخيرة</h5>
                <Button variant="outline-primary" size="sm">
                  عرض الكل
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table-sm mb-0">
                  <thead>
                    <tr>
                      <th>العميل</th>
                      <th>الجولة</th>
                      <th>المبلغ</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <div>
                            <div className="fw-bold">{booking.customer}</div>
                            <small className="text-muted">{booking.date}</small>
                          </div>
                        </td>
                        <td>{booking.tour}</td>
                        <td className="fw-bold text-success">
                          {booking.amount.toLocaleString()} ر.س
                        </td>
                        <td>{getStatusBadge(booking.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* إجراءات سريعة */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">إجراءات سريعة</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3} className="mb-3">
                  <Button
                    variant="outline-primary"
                    className="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                    onClick={() => router.push('/admin/tours')}
                  >
                    <i className="fas fa-plus fa-2x mb-2"></i>
                    <span>إضافة جولة جديدة</span>
                  </Button>
                </Col>
                <Col md={3} className="mb-3">
                  <Button
                    variant="outline-success"
                    className="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                    onClick={() => router.push('/admin/offers')}
                  >
                    <i className="fas fa-tag fa-2x mb-2"></i>
                    <span>إنشاء عرض جديد</span>
                  </Button>
                </Col>
                <Col md={3} className="mb-3">
                  <Button
                    variant="outline-warning"
                    className="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                    onClick={() => router.push('/admin/visas')}
                  >
                    <i className="fas fa-passport fa-2x mb-2"></i>
                    <span>إدارة التأشيرات</span>
                  </Button>
                </Col>
                <Col md={3} className="mb-3">
                  <Button
                    variant="outline-info"
                    className="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                    onClick={() => router.push('/admin/analytics')}
                  >
                    <i className="fas fa-chart-bar fa-2x mb-2"></i>
                    <span>عرض التقارير</span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

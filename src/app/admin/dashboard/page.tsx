'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [stats, setStats] = useState({
    totalTours: 0,
    totalOffers: 0,
    totalVisas: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // التحقق من الجلسة والإعادة فوراً إذا لم يكن هناك توكن
  useEffect(() => {
    console.log('Dashboard: جاري التحقق من الجلسة');
    if (typeof window !== 'undefined') {
      const adminToken = localStorage.getItem('adminToken');
      console.log('Dashboard: التوكن المحفوظ=', adminToken);
      
      if (!adminToken) {
        console.log('Dashboard: لا يوجد توكن - إعادة توجيه للـ login');
        router.push('/admin/login');
      } else {
        console.log('Dashboard: لديك وصول!');
        setHasAccess(true);
        setIsLoaded(true);
      }
    }
  }, [router]);

  // جلب البيانات من API
  useEffect(() => {
    if (!isLoaded || !hasAccess) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // جلب الجولات
        const toursRes = await fetch('/api/tours');
        const toursData = await toursRes.json();
        const tours = Array.isArray(toursData) ? toursData : toursData.data || [];

        // جلب العروض
        const offersRes = await fetch('/api/offers');
        const offersData = await offersRes.json();
        const offers = Array.isArray(offersData) ? offersData : offersData.data || [];

        // جلب التأشيرات
        const visasRes = await fetch('/api/visas');
        const visasData = await visasRes.json();
        const visas = Array.isArray(visasData) ? visasData : visasData.data || [];

        // تحديث الإحصائيات
        setStats({
          totalTours: tours.length,
          totalOffers: offers.length,
          totalVisas: visas.length
        });

        // تحديث النشاطات الأخيرة من البيانات الفعلية
        const activities = [
          ...tours.slice(0, 2).map((tour: any) => ({
            id: tour.id,
            type: 'tour',
            title: tour.name,
            date: new Date().toISOString().split('T')[0],
            status: 'active'
          })),
          ...offers.slice(0, 1).map((offer: any) => ({
            id: offer.id,
            type: 'offer',
            title: offer.title,
            date: new Date().toISOString().split('T')[0],
            status: 'active'
          }))
        ];
        setRecentActivities(activities);

        // تحديث الحجوزات الأخيرة (من الجولات والعروض)
        const bookings = [
          ...tours.slice(0, 3).map((tour: any) => ({
            id: tour.id,
            customer: 'عميل',
            tour: tour.name,
            date: new Date().toISOString().split('T')[0],
            amount: tour.price || 0,
            status: 'confirmed'
          }))
        ];
        setRecentBookings(bookings);

        console.log('Dashboard: تم جلب البيانات بنجاح');
      } catch (error) {
        console.error('Dashboard: خطأ في جلب البيانات:', error);
        setRecentActivities([]);
        setRecentBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isLoaded, hasAccess]);

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
    <>
      {!isLoaded ? (
        <Container fluid className="py-5 text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">جاري التحقق...</span>
          </div>
          <p className="text-muted">جاري التحقق من صلاحياتك...</p>
        </Container>
      ) : (
        <Container fluid>
          {loading && (
            <div className="alert alert-info mb-4">
              <i className="fas fa-spinner fa-spin me-2"></i>
              جاري تحميل البيانات...
            </div>
          )}
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
                  <i className="fas fa-list text-info fa-2x"></i>
                </div>
                <div>
                  <h3 className="mb-0 text-info">{recentActivities.length}</h3>
                  <small className="text-muted">أنشطة حالية</small>
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
      )}
    </>
  );
}

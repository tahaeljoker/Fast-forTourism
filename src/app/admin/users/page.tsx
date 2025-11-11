'use client';

import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { User, FormDataType, permissionLabels } from '@/types/admin';

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
    status: 'active',
    permissions: [] as string[]
  });
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const availablePermissions = useMemo(() => [
    'manage_tours',
    'manage_offers',
    'manage_visas',
    'manage_content',
    'manage_users',
    'view_analytics',
    'manage_settings'
  ], []);

  // Using permissionLabels imported from types/admin

  useEffect(() => {
    // محاكاة تحميل البيانات
    setUsers([
      {
        id: 1,
        name: 'مدير النظام',
        email: 'admin@alfaris.com',
        phone: '+966501234567',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-15 10:30',
        createdAt: '2024-01-01',
        permissions: availablePermissions
      },
      {
        id: 2,
        name: 'أحمد محمد',
        email: 'ahmed@alfaris.com',
        phone: '+966507654321',
        role: 'manager',
        status: 'active',
        lastLogin: '2024-01-14 15:45',
        createdAt: '2024-01-05',
        permissions: ['manage_tours', 'manage_offers', 'view_analytics']
      },
      {
        id: 3,
        name: 'فاطمة علي',
        email: 'fatima@alfaris.com',
        phone: '+966509876543',
        role: 'employee',
        status: 'active',
        lastLogin: '2024-01-13 09:20',
        createdAt: '2024-01-08',
        permissions: ['manage_visas', 'manage_content']
      },
      {
        id: 4,
        name: 'محمد حسن',
        email: 'mohammed@alfaris.com',
        phone: '+966501112233',
        role: 'employee',
        status: 'inactive',
        lastLogin: '2024-01-10 14:15',
        createdAt: '2024-01-12',
        permissions: ['manage_tours']
      }
    ]);
  }, [availablePermissions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...formData, id: editingUser.id, lastLogin: editingUser.lastLogin, createdAt: editingUser.createdAt }
          : user
      ));
      setAlert({ type: 'success', message: 'تم تحديث المستخدم بنجاح' });
    } else {
      const newUser: User = {
        id: users.length + 1,
        ...formData,
        lastLogin: 'لم يسجل دخول بعد',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      setAlert({ type: 'success', message: 'تم إضافة المستخدم بنجاح' });
    }
    
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'employee',
      status: 'active',
      permissions: []
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      permissions: user.permissions
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== id));
      setAlert({ type: 'success', message: 'تم حذف المستخدم بنجاح' });
    }
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permission)
      });
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: { [key: string]: { bg: string; text: string } } = {
      admin: { bg: 'danger', text: 'مدير' },
      manager: { bg: 'warning', text: 'مدير فرع' },
      employee: { bg: 'info', text: 'موظف' }
    };
    const variant = variants[role] || { bg: 'secondary', text: 'غير محدد' };
    return <Badge bg={variant.bg}>{variant.text}</Badge>;
  };


  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">إدارة المستخدمين</h1>
        <Button 
          variant="primary" 
          onClick={() => {
            setEditingUser(null);
            setFormData({
              name: '',
              email: '',
              phone: '',
              role: 'employee',
              status: 'active',
              permissions: []
            });
            setShowModal(true);
          }}
        >
          <i className="fas fa-plus me-2"></i>
          إضافة مستخدم جديد
        </Button>
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

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الهاتف</th>
                  <th>الدور</th>
                  <th>الحالة</th>
                  <th>آخر دخول</th>
                  <th>تاريخ الإنشاء</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div>
                        <div className="fw-bold">{user.name}</div>
                        <small className="text-muted">ID: #{user.id}</small>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>
                      <Badge 
                        bg={user.status === 'active' ? 'success' : 'secondary'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </td>
                    <td>
                      <small>{user.lastLogin}</small>
                    </td>
                    <td>{user.createdAt}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.role === 'admin'}
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

      {/* Modal إضافة/تعديل المستخدم */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>الاسم الكامل</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>البريد الإلكتروني</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>رقم الهاتف</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>الدور</Form.Label>
                    <Form.Select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as 'admin' | 'manager' | 'employee'})}
                    >
                    <option value="employee">موظف</option>
                    <option value="manager">مدير فرع</option>
                    <option value="admin">مدير</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>الحالة</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive' | 'suspended'})}
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="suspended">معلق</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>الصلاحيات</Form.Label>
              <div className="row">
                {availablePermissions.map((permission) => (
                  <Col md={6} key={permission} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      id={permission}
                      label={permissionLabels[permission]}
                      checked={formData.permissions.includes(permission)}
                      onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                    />
                  </Col>
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" type="submit">
              {editingUser ? 'تحديث' : 'إضافة'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

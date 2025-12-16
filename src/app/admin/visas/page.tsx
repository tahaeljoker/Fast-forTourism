'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

interface Visa {
  id: string;
  country: string;
  type: string;
  processingTime: string;
  price: number;
}

export default function VisasPage() {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVisas() {
      try {
        const response = await fetch('/api/visas');
        if (!response.ok) {
          throw new Error('Failed to fetch visas');
        }
        const data = await response.json();
        setVisas(data);
      } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchVisas();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this visa?')) {
      try {
        const response = await fetch(`/api/visas/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete visa');
        }

        setVisas(visas.filter((visa) => visa.id !== id));
      } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        alert('Error deleting visa.');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <ProtectedAdminPage>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Visas Management</h1>
          <Link href="/admin/visas/new" className="btn btn-primary">
            Add New Visa
          </Link>
        </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Type</th>
                <th scope="col">Processing Time</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visas.map((visa) => (
                <tr key={visa.id}>
                  <td className="align-middle">{visa.country}</td>
                  <td className="align-middle">{visa.type}</td>
                  <td className="align-middle">{visa.processingTime}</td>
                  <td className="align-middle">${visa.price}</td>
                  <td className="align-middle">
                    <Link href={`/admin/visas/edit/${visa.id}`} className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(visa.id)} className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </ProtectedAdminPage>
  );
}
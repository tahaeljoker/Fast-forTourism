'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

interface Tour {
  id: string;
  name: string;
  country: string;
  price: number;
  image: string;
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch('/api/tours');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        const toursData = Array.isArray(data) ? data : data.data || [];
        setTours(toursData);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      try {
        const response = await fetch(`/api/tours/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete tour');
        }

        // Remove the tour from the local state to update the UI
        setTours(tours.filter((tour) => tour.id !== id));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        alert('Error deleting tour.');
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
          <h1>Tours Management</h1>
          <Link href="/admin/tours/new" className="btn btn-primary">
            Add New Tour
          </Link>
        </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td>
                    <Image src={tour.image} alt={tour.name} width={80} height={60} className="rounded" style={{ objectFit: 'cover' }} />
                  </td>
                  <td className="align-middle">{tour.name}</td>
                  <td className="align-middle">{tour.country}</td>
                  <td className="align-middle">${tour.price}</td>
                  <td className="align-middle">
                    <Link href={`/admin/tours/edit/${tour.id}`} className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(tour.id)} className="btn btn-sm btn-outline-danger">
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
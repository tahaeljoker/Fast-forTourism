'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  tourId: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch('/api/offers');
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }
        const data = await response.json();
        setOffers(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await fetch(`/api/offers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete offer');
        }

        setOffers(offers.filter((offer) => offer.id !== id));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        alert('Error deleting offer.');
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
          <h1>Offers Management</h1>
          <Link href="/admin/offers/new" className="btn btn-primary">
            Add New Offer
          </Link>
        </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Discount (%)</th>
                <th scope="col">Tour ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td className="align-middle">{offer.title}</td>
                  <td className="align-middle">{offer.description}</td>
                  <td className="align-middle">{offer.discountPercentage}%</td>
                  <td className="align-middle">{offer.tourId}</td>
                  <td className="align-middle">
                    <Link href={`/admin/offers/edit/${offer.id}`} className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(offer.id)} className="btn btn-sm btn-outline-danger">
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
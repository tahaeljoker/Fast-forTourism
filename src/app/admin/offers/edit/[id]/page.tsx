'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Offer {
  title: string;
  description: string;
  discountPercentage: number;
  tourId: string;
}

export default function EditOfferPage() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      async function fetchOffer() {
        try {
          const response = await fetch(`/api/offers/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch offer data');
          }
          const data = await response.json();
          setOffer(data);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        }
      }
      fetchOffer();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOffer((prevOffer) => {
      if (!prevOffer) return prevOffer;
      return ({
        ...prevOffer,
        [name]: name === 'discountPercentage' ? parseFloat(value) || 0 : value,
      } as Offer);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offer) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update offer');
      }

      router.push('/admin/offers');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!offer && !error) {
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Offer</h1>
        <Link href="/admin/offers" className="btn btn-secondary">
          Back to Offers
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          {offer && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Offer Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={offer.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows={3}
                  value={offer.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="discountPercentage" className="form-label">Discount Percentage (%)</label>
                <input
                  type="number"
                  className="form-control"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={offer.discountPercentage}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tourId" className="form-label">Tour ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="tourId"
                  name="tourId"
                  value={offer.tourId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Offer'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

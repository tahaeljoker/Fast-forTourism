'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewOfferPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [tourId, setTourId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          discountPercentage: parseFloat(discountPercentage),
          tourId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create offer');
      }

      router.push('/admin/offers');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Add New Offer</h1>
        <Link href="/admin/offers" className="btn btn-secondary">
          Back to Offers
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="title" className="form-label">Offer Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="discountPercentage" className="form-label">Discount Percentage (%)</label>
              <input
                type="number"
                className="form-control"
                id="discountPercentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tourId" className="form-label">Tour ID</label>
              <input
                type="text"
                className="form-control"
                id="tourId"
                value={tourId}
                onChange={(e) => setTourId(e.target.value)}
                required
              />
              <div className="form-text">
                The ID of the tour this offer applies to.
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add Offer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewVisaPage() {
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');
  const [processingTime, setProcessingTime] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/visas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country,
          type,
          processingTime,
          price: parseFloat(price),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create visa');
      }

      router.push('/admin/visas');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Add New Visa</h1>
        <Link href="/admin/visas" className="btn btn-secondary">
          Back to Visas
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="type" className="form-label">Visa Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="processingTime" className="form-label">Processing Time</label>
              <input
                type="text"
                className="form-control"
                id="processingTime"
                value={processingTime}
                onChange={(e) => setProcessingTime(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price ($)</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add Visa'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

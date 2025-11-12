'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Visa {
  country: string;
  type: string;
  processingTime: string;
  price: number;
}

export default function EditVisaPage() {
  const [visa, setVisa] = useState<Visa | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      async function fetchVisa() {
        try {
          const response = await fetch(`/api/visas/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch visa data');
          }
          const data = await response.json();
          setVisa(data);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        }
      }
      fetchVisa();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisa((prevVisa) => {
      if (!prevVisa) return prevVisa;
      return ({
        ...prevVisa,
        [name]: name === 'price' ? parseFloat(value) || 0 : value,
      } as Visa);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visa) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/visas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visa),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update visa');
      }

      router.push('/admin/visas');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!visa && !error) {
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
        <h1>Edit Visa</h1>
        <Link href="/admin/visas" className="btn btn-secondary">
          Back to Visas
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          {visa && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={visa.country}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">Visa Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={visa.type}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="processingTime" className="form-label">Processing Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="processingTime"
                  name="processingTime"
                  value={visa.processingTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={visa.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Visa'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Tour {
  name: string;
  country: string;
  description: string;
  price: number;
  image: string;
}

export default function EditTourPage() {
  const [tour, setTour] = useState<Tour | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      async function fetchTour() {
        try {
          const response = await fetch(`/api/tours/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch tour data');
          }
          const data = await response.json();
          setTour(data);
        } catch (err) {
          setError(err.message);
        }
      }
      fetchTour();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTour((prevTour) => ({
      ...prevTour,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tour),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update tour');
      }

      router.push('/admin/tours');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!tour && !error) {
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
        <h1>Edit Tour</h1>
        <Link href="/admin/tours" className="btn btn-secondary">
          Back to Tours
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          {tour && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Tour Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={tour.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={tour.country}
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
                  rows={4}
                  value={tour.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={tour.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image Path</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={tour.image}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Tour'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

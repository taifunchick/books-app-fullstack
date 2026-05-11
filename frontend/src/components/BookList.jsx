import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function BookList({ token }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    search: '',
    sort: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [pagination.page, filters]);

  const fetchBooks = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: pagination.page,
      ...filters
    });
    
    try {
      const res = await fetch(`http://localhost:5000/api/books?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books);
        setPagination(data.pagination);
      } else if (res.status === 401) {
        toast.error('Session expired');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Failed to fetch books');
    }
    setLoading(false);
  };

  const deleteBook = async (id) => {
    if (window.confirm('Delete this book?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          toast.success('Book deleted');
          fetchBooks();
        }
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPagination({ ...pagination, page: 1 });
  };

  const applyFilters = () => {
    fetchBooks();
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      search: '',
      sort: ''
    });
    setPagination({ ...pagination, page: 1 });
    setTimeout(() => fetchBooks(), 100);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div>
      <div className="filters">
        <div className="filter-group">
          <div className="filter-item">
            <label>Search</label>
            <input
              name="search"
              placeholder="Search books..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Min Price</label>
            <input
              name="minPrice"
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <label>Max Price</label>
            <input
              name="maxPrice"
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <label>Sort by</label>
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
              <option value="">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <div className="filter-item">
            <button onClick={applyFilters}>Apply</button>
            <button onClick={clearFilters} style={{ marginTop: 5, background: '#999' }}>Clear</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>Loading...</div>
      ) : (
        <>
          <div className="book-list">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <p className="price">${book.price}</p>
                <span className="category">{book.category}</span>
                <span className="category">📚 Stock: {book.stock}</span>
                <div className="rating">{renderStars(book.rating)}</div>
                <p className="desc" style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
                  {book.description?.slice(0, 100)}...
                </p>
                <div className="book-actions">
                  <button className="edit-btn" onClick={() => navigate(`/edit/${book._id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteBook(book._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  className={pagination.page === i + 1 ? 'active' : ''}
                  onClick={() => setPagination({ ...pagination, page: i + 1 })}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookList;
"use client";

import { useState, useEffect } from 'react';

const AdminPage3 = () => {
  const [serverid, setServerid] = useState('');
  const [serverdate, setServerdate] = useState('');
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverDescription2, setServerDescription2] = useState(''); // New field
  const [servercategory, setServercategory] = useState('');
  const [servercomments, setServercomments] = useState('');
  const [serverImage, setServerImage] = useState(null); // Single image
  const [serverMultiImages, setServerMultiImages] = useState([]); // Separate field for multi-images
  const [serverReviews, setServerReviews] = useState([]); // Change to an array for multiple reviews
  const [newReview, setNewReview] = useState(''); // To store the new review text
  const [servers, setServers] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which entry is being edited

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setServers(data);
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  };

  const handleidChange = (e) => setServerid(e.target.value);
  const handledateChange = (e) => setServerdate(e.target.value);
  const handleNameChange = (e) => setServerName(e.target.value);
  const handleDescriptionChange = (e) => setServerDescription(e.target.value);
  const handleDescription2Change = (e) => setServerDescription2(e.target.value); // New handler
  const handlecategoryChange = (e) => setServercategory(e.target.value);
  const handlecommentsChange = (e) => setServercomments(e.target.value);
  const handleNewReviewChange = (e) => setNewReview(e.target.value); // Handler for the new review input

  const handleImageChange = (e) => setServerImage(e.target.files[0]); // Single image handler
  const handleMultiImageChange = (e) => setServerMultiImages(Array.from(e.target.files)); // Multi-image handler

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      setServerReviews([...serverReviews, newReview]); // Add the new review to the array
      setNewReview(''); // Clear the input field
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the ID already exists (for new entries or if changing the ID of an existing entry)
    const existingIndex = servers.findIndex((server) => server.id === serverid);
    if (existingIndex !== -1 && existingIndex !== editIndex) {
      alert('The ID already exists. Please use a different ID.');
      return; // Prevent submission
    }
  
    const formData = new FormData();
    formData.append('id', serverid);
    formData.append('date', serverdate);
    formData.append('title', serverName);
    formData.append('description', serverDescription);
    formData.append('description2', serverDescription2); // New field
    formData.append('category', servercategory);
    formData.append('comments', servercomments);
    
    // Join the reviews array into a comma-separated string before sending
    formData.append('reviews', serverReviews.join(','));
  
    // Append single image
    formData.append('image', serverImage);
  
    // Append multiple images
    serverMultiImages.forEach((image, index) => {
      formData.append(`multiImage${index}`, image);
    });
  
    try {
      const url = editIndex !== null ? `/api/blog?index=${editIndex}` : '/api/blog';
      const method = editIndex !== null ? 'PUT' : 'POST';
  
      await fetch(url, {
        method: method,
        body: formData,
      });
  
      alert('Server data saved successfully!');
      fetchServers(); // Refresh server list
      resetForm();
    } catch (error) {
      console.error('Error saving server data:', error);
      alert('Failed to save server data.');
    }
  };
    

const handleEdit = (index) => {
  const server = servers[index];

  setServerid(server.id);
  setServerdate(server.date);
  setServerName(server.title);
  setServerDescription(server.description);
  setServerDescription2(server.description2); // New field
  setServercategory(server.category);
  setServercomments(server.comments);
  setServerReviews(server.reviews && typeof server.reviews === 'string' ? server.reviews.split(',') : Array.isArray(server.reviews) ? server.reviews : []); // Load reviews correctly
  setEditIndex(index);
};


  const handleDelete = async (index) => {
    try {
      await fetch(`/api/blog?index=${index}`, {
        method: 'DELETE',
      });
      alert('Server data deleted successfully!');
      fetchServers();
    } catch (error) {
      console.error('Error deleting server data:', error);
      alert('Failed to delete server data.');
    }
  };

  const resetForm = () => {
    setServerid('');
    setServerdate('');
    setServerName('');
    setServerDescription('');
    setServerDescription2(''); // Reset new field
    setServercategory('');
    setServercomments('');
    setServerReviews([]); // Reset reviews array
    setNewReview(''); // Reset new review input
    setServerImage(null); // Reset single image
    setServerMultiImages([]); // Reset multi-image field
    setEditIndex(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard For Blogs</h1>
      <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Blog ID:</label>
            <textarea
              className="form-control"
              value={serverid}
              onChange={handleidChange}
              placeholder="Enter blog ID"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blog Date:</label>
            <textarea
              className="form-control"
              value={serverdate}
              onChange={handledateChange}
              placeholder="Enter blog date"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blog Name:</label>
            <input
              type="text"
              className="form-control"
              value={serverName}
              onChange={handleNameChange}
              placeholder="Enter blog name"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blog Description:</label>
            <textarea
              className="form-control"
              value={serverDescription}
              onChange={handleDescriptionChange}
              placeholder="Enter blog description"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blog Description 2:</label>
            <textarea
              className="form-control"
              value={serverDescription2}
              onChange={handleDescription2Change}
              placeholder="Enter blog description 2"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blog Category:</label>
            <textarea
              className="form-control"
              value={servercategory}
              onChange={handlecategoryChange}
              placeholder="Enter blog category"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blog Comment:</label>
            <textarea
              className="form-control"
              value={servercomments}
              onChange={handlecommentsChange}
              placeholder="Enter blog comment"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
  <label className="form-label">Reviews:</label>
  <textarea
    className="form-control"
    value={serverReviews.join('\n')} // Display reviews as new-line separated values
    onChange={(e) => setServerReviews(e.target.value.split('\n'))} // Convert input back to an array
    placeholder="Enter reviews, one per line"
    style={{ borderRadius: '10px' }}
  />
</div>

          <div className="mb-3">
            <label className="form-label">Reviews:</label>
            <ul className="list-group">
              {serverReviews.map((review, index) => (
                <li key={index} className="list-group-item">{review}</li>
              ))}
            </ul>
          </div>
          <div className="mb-3">
            <label className="form-label">Single Blog Picture:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Multiple Blog Pictures:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleMultiImageChange}
              style={{ borderRadius: '10px' }}
              multiple // Allows multiple file uploads
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '10px', backgroundColor: '#FF6600' }}>
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Existing Blogs</h2>
        <ul className="list-group">
          {servers.map((server, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {server.title} - {server.description}
              <div>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage3;



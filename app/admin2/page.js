"use client";

import { useState, useEffect } from 'react';

const AdminPage2 = () => {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverImage, setServerImage] = useState(null);
  const [servers, setServers] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which entry is being edited

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/saveServerDataVendor');
      const data = await response.json();
      setServers(data);
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  };

  const handleNameChange = (e) => setServerName(e.target.value);
  const handleDescriptionChange = (e) => setServerDescription(e.target.value);
  const handleImageChange = (e) => setServerImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', serverName);
    formData.append('description', serverDescription);
    formData.append('image', serverImage);


    try {
      const url = editIndex !== null ? `/api/saveServerDataVendor?index=${editIndex}` : '/api/saveServerDataVendor';
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
    setServerName(server.title);
    setServerDescription(server.description);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await fetch(`/api/saveServerDataVendor?index=${index}`, {
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
    setServerName('');
    setServerDescription('');
    setServerImage(null);
    setEditIndex(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard For Vendors</h1>
      <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Vendor Name:</label>
            <input
              type="text"
              className="form-control"
              value={serverName}
              onChange={handleNameChange}
              placeholder="Enter server name"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Vendor Description:</label>
            <textarea
              className="form-control"
              value={serverDescription}
              onChange={handleDescriptionChange}
              placeholder="Enter server description"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Vendor Logo:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              style={{ borderRadius: '10px' }}
            />
          </div>
          
         
          <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '10px', backgroundColor: '#FF6600' }}>
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Existing Vendors</h2>
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

export default AdminPage2;

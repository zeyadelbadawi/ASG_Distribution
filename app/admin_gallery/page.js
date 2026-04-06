"use client";

import { useState, useEffect } from 'react';

const admin_galleryy = () => {
  const [serverid, setServerid] = useState('');
  const [serverImage, setServerImage] = useState(null);
  const [servers, setServers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setServers(data);
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  };

  const handleidChange = (e) => setServerid(e.target.value);
  const handleImageChange = (e) => setServerImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', serverid);
    formData.append('image', serverImage);

    try {
      const url = editIndex !== null ? `/api/gallery?index=${editIndex}` : '/api/gallery';
      const method = editIndex !== null ? 'PUT' : 'POST';

      await fetch(url, {
        method: method,
        body: formData,
      });

      alert('Server data saved successfully!');
      fetchServers();
      resetForm();
    } catch (error) {
      console.error('Error saving server data:', error);
      alert('Failed to save server data.');
    }
  };

  const handleEdit = (index) => {
    if (index < 0 || index >= servers.length) {
      console.error('Invalid index:', index);
      return;
    }

    const server = servers[index];
    if (!server) {
      console.error('Server data is undefined at index:', index);
      return;
    }

    setServerid(server.id || '');
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await fetch(`/api/gallery?index=${index}`, {
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
    setServerImage(null);
    setEditIndex(null);
  };

  // Handle moving the image up in the list
  const moveUp = async (index) => {
    if (index === 0) return; // Already at the top

    const newServers = [...servers];
    [newServers[index - 1], newServers[index]] = [newServers[index], newServers[index - 1]]; // Swap positions
    setServers(newServers);

    // Persist the new order to the server
    try {
        await fetch('/api/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newServers),
        });
        console.log('Gallery order updated successfully!');
    } catch (error) {
        console.error('Error updating gallery order:', error);
        alert('Failed to update gallery order.');
    }
};


  // Handle moving the image down in the list
  const moveDown = async (index) => {
    if (index === servers.length - 1) return;

    const newServers = [...servers];
    [newServers[index], newServers[index + 1]] = [newServers[index + 1], newServers[index]];

    console.log('Updated servers:', newServers); // Debugging log
    setServers(newServers);

    // Persist the new order to the server
    try {
        await fetch('/api/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newServers),
        });
        console.log('Gallery order updated successfully!');
    } catch (error) {
        console.error('Error updating gallery order:', error);
        alert('Failed to update gallery order.');
    }
};


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard For Gallery</h1>
      <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Gallery ID:</label>
            <textarea
              className="form-control"
              value={serverid}
              onChange={handleidChange}
              placeholder="Enter gallery id"
              style={{ borderRadius: '10px' }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gallery Picture:</label>
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
        <h2 className="text-center">Existing Gallery</h2>
        <ul className="list-group">
          {servers.map((server, index) => (
            <li key={server.id} className="list-group-item d-flex justify-content-between align-items-center">
              <img src={server.imageUrl} alt="Gallery" style={{ width: '100px', height: '100px' }} />
              <div>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => moveUp(index)}>↑</button>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => moveDown(index)}>↓</button>
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

export default admin_galleryy;

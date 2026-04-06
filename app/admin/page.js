'use client';

import { useState, useEffect } from 'react';

const AdminPagee = () => {
    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverDescription1, setServerDescription1] = useState('');

    const [serverImage, setServerImage] = useState(null);
    const [serverIcon, setServerIcon] = useState(null);
    const [tabNumber, setTabNumber] = useState(''); // Keep track of tab number
    const [description2, setDescription2] = useState('');
    const [points, setPoints] = useState(['']);
    const [benefits, setBenefits] = useState(['']);
    const [servers, setServers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchServers();
    }, []);

    const fetchServers = async () => {
        try {
            const response = await fetch('/services.json');
            const data = await response.json();
            setServers(data);
        } catch (error) {
            console.error('Error fetching server data:', error);
        }
    };

    const handleNameChange = (e) => setServerName(e.target.value);
    const handleDescriptionChange = (e) => setServerDescription(e.target.value);
    const handleDescription1Change = (e) => setServerDescription1(e.target.value);

    const handleImageChange = (e) => setServerImage(e.target.files[0]);
    const handleIconChange = (e) => setServerIcon(e.target.files[0]);
    const handleTabNumberChange = (e) => setTabNumber(e.target.value); // Set tab number
    const handleDescription2Change = (e) => setDescription2(e.target.value);

    // Handle points and benefits changes
    const handlePointsChange = (index, value) => {
        const updatedPoints = [...points];
        updatedPoints[index] = value;
        setPoints(updatedPoints);
    };

    const handleBenefitsChange = (index, value) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index] = value;
        setBenefits(updatedBenefits);
    };

    // Add new fields for points and benefits
    const addPointField = () => setPoints([...points, '']);
    const addBenefitField = () => setBenefits([...benefits, '']);


    // Remove points and benefits fields
    const removePointField = (index) => {
        setPoints(points.filter((_, i) => i !== index));
    };

    const removeBenefitField = (index) => {
        setBenefits(benefits.filter((_, i) => i !== index));
    };

    // Validate if the tab number already exists
    const isTabNumberUnique = () => {
      // When editing, exclude the current item's tabNumber from the uniqueness check
      if (editIndex !== null) {
          const currentTabNumber = servers[editIndex]?.tabNumber;
          return !servers.some(service => service.tabNumber === parseInt(tabNumber, 10) && service.tabNumber !== currentTabNumber);
      }
  
      // For new entries, check if the tabNumber already exists
      return !servers.some(service => service.tabNumber === parseInt(tabNumber, 10));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the tabNumber: Check if it's a valid number
    if (isNaN(parseInt(tabNumber, 10))) {
        alert("Tab number must be a valid number.");
        return;
    }

    // Check if tab number is unique only for new items or when changing the tab number
    if (editIndex === null && !isTabNumberUnique()) {
        alert('Tab number already exists! Please choose a different tab number.');
        return; // Stop the form submission if tab number is not unique
    }

    try {
        let imageUrl = '';
        let iconUrl = '';

        // If editing, use existing image/icon URLs if no new image/icon is uploaded
        if (editIndex !== null) {
            const existingService = servers[editIndex];
            imageUrl = existingService.imageUrl || '';  // Keep the current image URL if no new image
            iconUrl = existingService.iconUrl || '';    // Keep the current icon URL if no new icon
        }

        // Upload the image if a new one is selected
        if (serverImage) {
            const formData = new FormData();
            formData.append('file', serverImage);

            const imageResponse = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });

            if (imageResponse.ok) {
                const imageData = await imageResponse.json();
                imageUrl = imageData.imageUrl;
            } else {
                throw new Error('Image upload failed.');
            }
        }

        // Upload the icon if a new one is selected
        if (serverIcon) {
            const formData = new FormData();
            formData.append('file', serverIcon);

            const iconResponse = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });

            if (iconResponse.ok) {
                const iconData = await iconResponse.json();
                iconUrl = iconData.imageUrl; // Assuming the API returns imageUrl for icons as well
            } else {
                throw new Error('Icon upload failed.');
            }
        }

        // Prepare the JSON data
        const newServiceData = {
            title: serverName,
            description: serverDescription,
            description1: serverDescription1,

            imageUrl, // URL of the uploaded or existing image
            iconUrl,  // URL of the uploaded or existing icon
            tabNumber: parseInt(tabNumber, 10), // Convert tabNumber to a number
            description2,
            points: points.filter(point => point.trim() !== ''),
            benefits: benefits.filter(benefit => benefit.trim() !== ''),
        };

        // Send the JSON data to saveServerData API
        const url = editIndex !== null ? `/api/saveServerData?index=${editIndex}` : '/api/saveServerData';
        const method = editIndex !== null ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newServiceData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save server data.');
        }

        alert('Service data saved successfully!');
        fetchServers(); // Re-fetch updated servers after saving
        resetForm(); // Reset the form after successful submission
    } catch (error) {
        console.error('Error saving server data:', error);
        alert(`Failed to save server data: ${error.message}`);
    }
};


    const handleEdit = (index) => {
        const server = servers[index];
        setServerName(server.title);
        setServerDescription(server.description);
        setServerDescription1(server.description1);

        setDescription2(server.description2);
        setTabNumber(server.tabNumber);
        setPoints(server.points || ['']);
        setBenefits(server.benefits || ['']);
        setEditIndex(index);
    };

    const handleDelete = async (index) => {
        try {
            await fetch(`/api/saveServerData?index=${index}`, {
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
        setServerDescription1('');

        setServerImage(null);
        setServerIcon(null);
        setTabNumber('');
        setDescription2('');
        setPoints(['']);
        setBenefits(['']);
        setEditIndex(null);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Solutions Dashboard</h1>
            <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '600px', borderRadius: '15px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Server Name:</label>
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
                        <label className="form-label">Solutions Description:</label>
                        <textarea
                            className="form-control"
                            value={serverDescription}
                            onChange={handleDescriptionChange}
                            placeholder="Enter server description"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Solutions Image:</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Icon (SVG):</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleIconChange}
                            accept=".svg"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tab Number:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={tabNumber}
                            onChange={handleTabNumberChange}
                            placeholder="Enter tab number"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Solutions details Description:</label>
                        <textarea
                            className="form-control"
                            value={serverDescription1}
                            onChange={handleDescription1Change}
                            placeholder="Enter Solutions details description1"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Solution detailsDescription 2:</label>
                        <textarea
                            className="form-control"
                            value={description2}
                            onChange={handleDescription2Change}
                            placeholder="Enter additional description"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>

                    {/* Points Section */}
                    <div className="mb-3">
                        <label className="form-label">Points:</label>
                        {points.map((point, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={point}
                                    onChange={(e) => handlePointsChange(index, e.target.value)}
                                    placeholder="Enter point"
                                    style={{ borderRadius: '10px' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={() => removePointField(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary mt-2" onClick={addPointField}>
                            Add Point
                        </button>
                    </div>

                    {/* Benefits Section */}
                    <div className="mb-3">
                        <label className="form-label">Benefits:</label>
                        {benefits.map((benefit, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={benefit}
                                    onChange={(e) => handleBenefitsChange(index, e.target.value)}
                                    placeholder="Enter benefit"
                                    style={{ borderRadius: '10px' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={() => removeBenefitField(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary mt-2" onClick={addBenefitField}>
                            Add Benefit
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '10px', backgroundColor: '#FF6600' }}>
                        {editIndex !== null ? 'Update' : 'Save'}
                    </button>
                </form>
            </div>

            <div className="mt-5">
                <h2 className="text-center">Existing Solutions</h2>
                <ul className="list-group">
                    {servers.map((server, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {server.title} 
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

export default AdminPagee;

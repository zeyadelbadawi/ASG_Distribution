'use client';
import { useState, useEffect } from 'react';
import styles from './AdminPage.module.css'; // Ensure this is the correct path

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('banner');

    // State for each section
    const [aboutContent, setAboutContent] = useState({ title: '', text: '', points: [], buttonText: '', image: '' });
    const [featuresContent, setFeaturesContent] = useState({ title: '', tabs: [{ name: '', features: [{ iconPath: '', title: '' }] }] });
    const [testimonials, setTestimonials] = useState([]);
    const [galleryContent, setGalleryContent] = useState({ title: '', tagline: '', items: [] });
    const [storageContent, setStorageContent] = useState({ title: '', tagline: '', items: [], bottomText: '' });
    const [servicesContent, setServicesContent] = useState({ title: '', tagline: '', items: [] });
    const [bannerContent, setBannerContent] = useState({ slides: [] }); // Ensure slides is an empty array by default
    const [blogs, setBlogs] = useState([]);
    const [processImages, setProcessImages] = useState({
        img1: '',
        img2: '',
        img3: ''
    });
    const [selectedImage, setSelectedImage] = useState({});
    const [newTestimonial, setNewTestimonial] = useState({ clientName: '', text: '', imagePath: '', rating: 5 });
    const [newGalleryItem, setNewGalleryItem] = useState({ title: '', imagePath: '', link: '' });

    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => {
                setAboutContent(data.about);
                setFeaturesContent(data.features);
                setTestimonials(data.testimonials);
                setGalleryContent(data.gallery);
                setStorageContent(data.storage);
                setServicesContent(data.services);
                setBannerContent(data.banner); // Adding banner content
                setBlogs(data.blogs); // Add this line to set blogs content
                setProcessImages(data.processImages || { img1: '', img2: '', img3: '' });

            })
            .catch(error => console.error('Error fetching content:', error));
    }, []);

    // Tab Change Handler
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // ------------------- About Section Handlers -------------------
    const handleAboutInputChange = (name, value) => {
        setAboutContent({ ...aboutContent, [name]: value });
    };

    const handlePointChange = (index, value) => {
        const updatedPoints = [...aboutContent.points];
        updatedPoints[index] = value;
        setAboutContent({ ...aboutContent, points: updatedPoints });
    };

    const addPoint = () => {
        setAboutContent({ ...aboutContent, points: [...aboutContent.points, ''] });
    };

    const handleAboutImageChange = (file) => {
        setSelectedImage({ ...selectedImage, about: file });
    };

    // ------------------- Features Section Handlers -------------------
    const handleFeaturesInputChange = (index, key, value) => {
        const updatedTabs = [...featuresContent.tabs];
        updatedTabs[index][key] = value;
        setFeaturesContent({ ...featuresContent, tabs: updatedTabs });
    };

    const handleFeatureChange = (tabIndex, featureIndex, key, value) => {
        const updatedTabs = [...featuresContent.tabs];
        updatedTabs[tabIndex].features[featureIndex][key] = value;
        setFeaturesContent({ ...featuresContent, tabs: updatedTabs });
    };

    const handleFeatureIconChange = (tabIndex, featureIndex, file) => {
        setSelectedImage({ ...selectedImage, [`features-${tabIndex}-${featureIndex}`]: file });
    };

    const addFeature = (tabIndex) => {
        const updatedTabs = [...featuresContent.tabs];
        updatedTabs[tabIndex].features.push({ iconPath: '', title: '' });
        setFeaturesContent({ ...featuresContent, tabs: updatedTabs });
    };

    const addTab = () => {
        setFeaturesContent({ ...featuresContent, tabs: [...featuresContent.tabs, { name: '', features: [{ iconPath: '', title: '' }] }] });
    };

    const deleteFeature = (tabIndex, featureIndex) => {
        const updatedTabs = [...featuresContent.tabs];
        updatedTabs[tabIndex].features.splice(featureIndex, 1);
        setFeaturesContent({ ...featuresContent, tabs: updatedTabs });
    };

    // ------------------- Testimonials Section Handlers -------------------
    const handleTestimonialChange = (index, key, value) => {
        const updatedTestimonials = [...testimonials];
        updatedTestimonials[index][key] = value;
        setTestimonials(updatedTestimonials);
    };

    const handleTestimonialImageChange = (index, file) => {
        setSelectedImage({ ...selectedImage, [`testimonial-${index}`]: file });
    };

    const addTestimonial = () => {
        setTestimonials([...testimonials, { ...newTestimonial }]);
        setNewTestimonial({ clientName: '', text: '', imagePath: '', rating: 5 });
    };

    const deleteTestimonial = (index) => {
        const updatedTestimonials = testimonials.filter((_, i) => i !== index);
        setTestimonials(updatedTestimonials);
    };

    // ------------------- Gallery Section Handlers -------------------
    const handleGalleryInputChange = (key, value) => {
        setGalleryContent({ ...galleryContent, [key]: value });
    };

    const handleGalleryItemChange = (index, key, value) => {
        const updatedItems = [...galleryContent.items];
        updatedItems[index][key] = value;
        setGalleryContent({ ...galleryContent, items: updatedItems });
    };

    const handleGalleryImageChange = (index, file) => {
        setSelectedImage({ ...selectedImage, [`gallery-${index}`]: file });
    };

    const addGalleryItem = () => {
        setGalleryContent({ ...galleryContent, items: [...galleryContent.items, { ...newGalleryItem }] });
        setNewGalleryItem({ title: '', imagePath: '', link: '' });
    };

    const deleteGalleryItem = (index) => {
        const updatedItems = galleryContent.items.filter((_, i) => i !== index);
        setGalleryContent({ ...galleryContent, items: updatedItems });
    };

    // ------------------- Storage Section Handlers -------------------
    const handleStorageInputChange = (key, value) => {
        setStorageContent({ ...storageContent, [key]: value });
    };

    const handleStorageItemChange = (index, key, value) => {
        const updatedItems = [...storageContent.items];
        updatedItems[index][key] = value;
        setStorageContent({ ...storageContent, items: updatedItems });
    };

    const handleStorageImageChange = (index, file) => {
        setSelectedImage({ ...selectedImage, [`partners-${index}`]: file });
    };

    const addStorageItem = () => {
        setStorageContent({ ...storageContent, items: [...storageContent.items, { title: '', imagePath: '', link: '', description: '' }] });
    };

    const deleteStorageItem = (index) => {
        const updatedItems = storageContent.items.filter((_, i) => i !== index);
        setStorageContent({ ...storageContent, items: updatedItems });
    };

    const handleBannerInputChange = (index, key, value) => {
        const updatedSlides = [...bannerContent.slides];
        updatedSlides[index][key] = value;
        setBannerContent({ slides: updatedSlides });
    };

    const handleBannerImageChange = async (index, file, fieldName) => {
        setSelectedImage({ ...selectedImage, [`${fieldName}-${index}`]: file });
    
        // Upload the image to the server
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const uploadResponse = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });
    
            if (uploadResponse.ok) {
                const result = await uploadResponse.json();
                const imageUrl = result.imageUrl;
    
                // Update the specific image field in the banner content
                const updatedSlides = [...bannerContent.slides];
                updatedSlides[index][fieldName] = imageUrl;
                setBannerContent({ slides: updatedSlides });
            } else {
                console.error('Failed to upload image:', uploadResponse.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    
   
const addBannerSlide = () => {
    setBannerContent((prevContent) => ({
        slides: [
            ...(prevContent?.slides || []), // Use previous slides if they exist, otherwise use an empty array
            { backgroundImage: '', subTitle: '', title: '', text: '', buttonLink: '', buttonText: '', phoneNumber: '' }
        ],
    }));
};

    const deleteBannerSlide = (index) => {
        const updatedSlides = bannerContent.slides.filter((_, i) => i !== index);
        setBannerContent({ slides: updatedSlides });
    };


    const handleBlogChange = (index, key, value) => {
        const updatedBlogs = [...blogs];
        updatedBlogs[index][key] = value;
        setBlogs(updatedBlogs);
    };
    
    const addBlog = () => {
        setBlogs([...blogs, { image: '', author: '', date: '', title: '', link: '' }]);
    };
    
    const deleteBlog = (index) => {
        const updatedBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(updatedBlogs);
    };

    const handleBlogImageChange = async (index, file) => {
        setSelectedImage({ ...selectedImage, [`blog-${index}`]: file });
    
        // Upload the image to the server
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const uploadResponse = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });
    
            if (uploadResponse.ok) {
                const result = await uploadResponse.json();
                const imageUrl = result.imageUrl;
    
                // Update the blog image in the blogs state
                const updatedBlogs = [...blogs];
                updatedBlogs[index].image = imageUrl;
                setBlogs(updatedBlogs);
            } else {
                console.error('Failed to upload image:', uploadResponse.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    

    // ------------------- Services Section Handlers -------------------
    const handleServicesInputChange = (key, value) => {
        setServicesContent({ ...servicesContent, [key]: value });
    };

    const handleServiceChange = (index, key, value) => {
        const updatedItems = [...servicesContent.items];
        updatedItems[index][key] = value;
        setServicesContent({ ...servicesContent, items: updatedItems });
    };

    const handleServiceImageChange = (index, file, type) => {
        setSelectedImage({ ...selectedImage, [`Solutions-${index}-${type}`]: file });
    };

    const addServiceItem = () => {
        setServicesContent({ ...servicesContent, items: [...servicesContent.items, { title: '', imagePath: '', iconPath: '', link: '', description: '' }] });
    };

    const deleteServiceItem = (index) => {
        const updatedItems = servicesContent.items.filter((_, i) => i !== index);
        setServicesContent({ ...servicesContent, items: updatedItems });
    };


    const handleProcessImageChange = async (index, file) => {
        setSelectedImage({ ...selectedImage, [`process-img-${index}`]: file });

        // Upload the image to the server
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadResponse = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                const result = await uploadResponse.json();
                const imageUrl = result.imageUrl;

                // Update the image in the process images state
                const updatedProcessImages = { ...processImages };
                updatedProcessImages[`img${index}`] = imageUrl;
                setProcessImages(updatedProcessImages);
            } else {
                console.error('Failed to upload image:', uploadResponse.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // ------------------- Form Submission Handler -------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedContent = {
            about: { ...aboutContent },
            features: { ...featuresContent },
            testimonials: [...testimonials],
            gallery: { ...galleryContent },
            storage: { ...storageContent },
            services: { ...servicesContent },
            banner: { ...bannerContent }, 
          
            blogs: [...blogs], // Include blogs in the updated content
            processImages: { ...processImages } // Include process images in the updated content

        };

    
        // Handle image uploads for all sections
        for (const [key, file] of Object.entries(selectedImage)) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                const uploadResponse = await fetch('/api/uploadImage', {
                    method: 'POST',
                    body: formData,
                });
    
                if (uploadResponse.ok) {
                    const result = await uploadResponse.json();
                    const imageUrl = result.imageUrl;
    
                    // Update the appropriate section based on the key
                    if (key === 'about') {
                        updatedContent.about.image = imageUrl;
                    } else if (key.startsWith('features')) {
                        const [_, tabIndex, featureIndex] = key.split('-');
                        updatedContent.features.tabs[tabIndex].features[featureIndex].iconPath = imageUrl;
                    } else if (key.startsWith('testimonial')) {
                        const index = key.split('-')[1];
                        updatedContent.testimonials[index].imagePath = imageUrl;
                    } else if (key.startsWith('Client')) {
                        const index = key.split('-')[1];
                        updatedContent.gallery.items[index].imagePath = imageUrl;
                    } else if (key.startsWith('partners')) {
                        const index = key.split('-')[1];
                        updatedContent.storage.items[index].imagePath = imageUrl;
                    } else if (key.startsWith('Solutions')) {
                        const [_, index, type] = key.split('-');
                        updatedContent.services.items[index][`${type}Path`] = imageUrl;
                    } else if (key.startsWith('banner')) {
                        const index = key.split('-')[1];
                        updatedContent.banner.slides[index].backgroundImage = imageUrl;
                    } else if (key.startsWith('blog')) { // Handle blog images
                        const index = key.split('-')[1];
                        updatedContent.blogs[index].image = imageUrl;
                    }else if (key.startsWith('process-img')) { // Handle process images
                        const index = key.split('-')[2];
                        updatedContent.processImages[`img${index}`] = imageUrl;
                    }

                } else {
                    console.error('Failed to upload image:', uploadResponse.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    
        // Update JSON content
        fetch('/api/getContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContent),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Content updated successfully!');
                } else {
                    alert('Error updating content.');
                }
            })
            .catch((error) => console.error('Error updating content:', error));
    };
    

    return (
        <div className={styles.adminContainer}>
            <h1 className={styles.adminHeader}>Admin Dashboard</h1>
            <div className={styles.adminTabs}>
            {['banner', 'about', 'features', 'partners', 'Solutions', 'Values', 'Client', 'testimonials', 'blogs'].map((tab) => (
        <button
            key={tab}
            className={`${styles.adminTab} ${activeTab === tab ? styles.adminActive : ''}`}
            onClick={() => handleTabChange(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
    ))}
</div>

            <form onSubmit={handleSubmit}>
                {activeTab === 'about' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit About Section</h2>
                        <label className={styles.label}>Title:
                            <input type="text" className={styles.inputText} value={aboutContent.title} onChange={(e) => handleAboutInputChange('title', e.target.value)} />
                        </label>
                        <label className={styles.label}>Text:
                            <textarea className={styles.textArea} value={aboutContent.text} onChange={(e) => handleAboutInputChange('text', e.target.value)} />
                        </label>
                        <label className={styles.label}>Button Text:
                            <input type="text" className={styles.inputText} value={aboutContent.buttonText} onChange={(e) => handleAboutInputChange('buttonText', e.target.value)} />
                        </label>
                        <label className={styles.label}>Image:
                            <input type="file" className={styles.inputFile} onChange={(e) => handleAboutImageChange(e.target.files[0])} />
                            <p>Current Image: {aboutContent.image}</p>
                        </label>
                        <h3>Points:</h3>
                        {aboutContent.points.map((point, index) => (
                            <input key={index} type="text" className={styles.inputText} value={point} onChange={(e) => handlePointChange(index, e.target.value)} />
                        ))}
                        <button type="button" className={styles.button} onClick={addPoint}>Add Point</button>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit Features Section</h2>
                        <label className={styles.label}>Title:
                            <input type="text" className={styles.inputText} value={featuresContent.title} onChange={(e) => setFeaturesContent({ ...featuresContent, title: e.target.value })} />
                        </label>
                        {featuresContent.tabs.map((tab, tabIndex) => (
                            <div key={tabIndex}>
                                <h3>Tab {tabIndex + 1}: {tab.name}</h3>
                                <label className={styles.label}>Tab Name:
                                    <input type="text" className={styles.inputText} value={tab.name} onChange={(e) => handleFeaturesInputChange(tabIndex, 'name', e.target.value)} />
                                </label>
                                <h4>Features:</h4>
                                {tab.features.map((feature, featureIndex) => (
                                    <div key={featureIndex}>
                                        <label className={styles.label}>Title:
                                            <input type="text" className={styles.inputText} value={feature.title} onChange={(e) => handleFeatureChange(tabIndex, featureIndex, 'title', e.target.value)} />
                                        </label>
                                        <label className={styles.label}>Icon:
                                            <input type="file" className={styles.inputFile} onChange={(e) => handleFeatureIconChange(tabIndex, featureIndex, e.target.files[0])} />
                                            <p>Current Icon: {feature.iconPath}</p>
                                        </label>
                                        <button type="button" className={styles.button} onClick={() => deleteFeature(tabIndex, featureIndex)}>Delete Feature</button>
                                    </div>
                                ))}
                                <button type="button" className={styles.button} onClick={() => addFeature(tabIndex)}>Add Feature</button>
                            </div>
                        ))}
                        <button type="button" className={styles.button} onClick={addTab}>Add Tab</button>
                    </div>
                )}

                {activeTab === 'testimonials' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit Testimonials Section</h2>
                        {testimonials.map((testimonial, index) => (
                            <div key={index}>
                                <label className={styles.label}>Client Name:
                                    <input type="text" className={styles.inputText} value={testimonial.clientName} onChange={(e) => handleTestimonialChange(index, 'clientName', e.target.value)} />
                                </label>
                                <label className={styles.label}>Text:
                                    <textarea className={styles.textArea} value={testimonial.text} onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)} />
                                </label>
                                <label className={styles.label}>Rating:
                                    <input type="number" className={styles.inputText} value={testimonial.rating} min="1" max="5" onChange={(e) => handleTestimonialChange(index, 'rating', e.target.value)} />
                                </label>
                                <label className={styles.label}>Image:
                                    <input type="file" className={styles.inputFile} onChange={(e) => handleTestimonialImageChange(index, e.target.files[0])} />
                                    <p>Current Image: {testimonial.imagePath}</p>
                                </label>
                                <button type="button" className={styles.button} onClick={() => deleteTestimonial(index)}>Delete Testimonial</button>
                            </div>
                        ))}
                        <div>
                            <h3>Add New Testimonial</h3>
                            <label className={styles.label}>Client Name:
                                <input type="text" className={styles.inputText} value={newTestimonial.clientName} onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })} />
                            </label>
                            <label className={styles.label}>Text:
                                <textarea className={styles.textArea} value={newTestimonial.text} onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })} />
                            </label>
                            <label className={styles.label}>Rating:
                                <input type="number" className={styles.inputText} value={newTestimonial.rating} min="1" max="5" onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: e.target.value })} />
                            </label>
                            <button type="button" className={styles.button} onClick={addTestimonial}>Add Testimonial</button>
                        </div>
                    </div>
                )}

                {activeTab === 'Client' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit Clients Section</h2>
                        <label className={styles.label}>Title:
                            <input type="text" className={styles.inputText} value={galleryContent.title} onChange={(e) => handleGalleryInputChange('title', e.target.value)} />
                        </label>
                        <label className={styles.label}>Tagline:
                            <input type="text" className={styles.inputText} value={galleryContent.tagline} onChange={(e) => handleGalleryInputChange('tagline', e.target.value)} />
                        </label>
                        {galleryContent.items.map((item, index) => (
                            <div key={index}>
                                <label className={styles.label}>Title:
                                    <input type="text" className={styles.inputText} value={item.title} onChange={(e) => handleGalleryItemChange(index, 'title', e.target.value)} />
                                </label>
                                <label className={styles.label}>Image:
                                    <input type="file" className={styles.inputFile} onChange={(e) => handleGalleryImageChange(index, e.target.files[0])} />
                                    <p>Current Image: {item.imagePath}</p>
                                </label>
                                <label className={styles.label}>Link:
                                    <input type="text" className={styles.inputText} value={item.link} onChange={(e) => handleGalleryItemChange(index, 'link', e.target.value)} />
                                </label>
                                <button type="button" className={styles.button} onClick={() => deleteGalleryItem(index)}>Delete Item</button>
                            </div>
                        ))}
                        <div>
                            <h3>Add New Client Item</h3>
                            <label className={styles.label}>Title:
                                <input type="text" className={styles.inputText} value={newGalleryItem.title} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })} />
                            </label>
                            <label className={styles.label}>Link:
                                <input type="text" className={styles.inputText} value={newGalleryItem.link} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, link: e.target.value })} />
                            </label>
                            <button type="button" className={styles.button} onClick={addGalleryItem}>Add Client Item</button>
                        </div>
                    </div>
                )}

                {activeTab === 'partners' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit Partners Section</h2>
                        <label className={styles.label}>Title:
                            <input type="text" className={styles.inputText} value={storageContent.title} onChange={(e) => handleStorageInputChange('title', e.target.value)} />
                        </label>
                        <label className={styles.label}>Tagline:
                            <input type="text" className={styles.inputText} value={storageContent.tagline} onChange={(e) => handleStorageInputChange('tagline', e.target.value)} />
                        </label>
                        {storageContent.items.map((item, index) => (
                            <div key={index}>
                                <label className={styles.label}>Title:
                                    <input type="text" className={styles.inputText} value={item.title} onChange={(e) => handleStorageItemChange(index, 'title', e.target.value)} />
                                </label>
                                <label className={styles.label}>Image:
                                    <input type="file" className={styles.inputFile} onChange={(e) => handleStorageImageChange(index, e.target.files[0])} />
                                    <p>Current Image: {item.imagePath}</p>
                                </label>
                                <label className={styles.label}>Link:
                                    <input type="text" className={styles.inputText} value={item.link} onChange={(e) => handleStorageItemChange(index, 'link', e.target.value)} />
                                </label>
                                <label className={styles.label}>Description:
                                    <textarea className={styles.textArea} value={item.description} onChange={(e) => handleStorageItemChange(index, 'description', e.target.value)} />
                                </label>
                                <button type="button" className={styles.button} onClick={() => deleteStorageItem(index)}>Delete Item</button>
                                <br></br>

                            </div>
                        ))}
                        <div>
                            <br></br>
                        <label className={styles.label}>Bottom Text:
                            <textarea className={styles.textArea} value={storageContent.bottomText} onChange={(e) => handleStorageInputChange('bottomText', e.target.value)} />
                        </label>
                            <h3>Add New Partner Item</h3>
                            <button type="button" className={styles.button} onClick={addStorageItem}>Add partner Item</button>
                        </div>
                        
                    </div>
                )}

                {activeTab === 'Solutions' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit Solutions Section</h2>
                        <label className={styles.label}>Title:
                            <input type="text" className={styles.inputText} value={servicesContent.title} onChange={(e) => handleServicesInputChange('title', e.target.value)} />
                        </label>
                        <label className={styles.label}>Tagline:
                            <input type="text" className={styles.inputText} value={servicesContent.tagline} onChange={(e) => handleServicesInputChange('tagline', e.target.value)} />
                        </label>
                        {servicesContent.items.map((item, index) => (
                            <div key={index}>
                                <label className={styles.label}>Title:
                                    <input type="text" className={styles.inputText} value={item.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} />
                                </label>
                                <label className={styles.label}>Image:
                                    <input type="file" className={styles.inputFile} onChange={(e) => handleServiceImageChange(index, e.target.files[0], 'image')} />
                                    <p>Current Image: {item.imagePath}</p>
                                </label>
                                <label className={styles.label}>Icon:
                                    <input type="file" className={styles.inputFile} onChange={(e) => handleServiceImageChange(index, e.target.files[0], 'icon')} />
                                    <p>Current Icon: {item.iconPath}</p>
                                </label>
                                <label className={styles.label}>Link:
                                    <input type="text" className={styles.inputText} value={item.link} onChange={(e) => handleServiceChange(index, 'link', e.target.value)} />
                                </label>
                                <label className={styles.label}>Description:
                                    <textarea className={styles.textArea} value={item.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} />
                                </label>
                                <button type="button" className={styles.button} onClick={() => deleteServiceItem(index)}>Delete Solution</button>
                            </div>
                        ))}
                        <div>
                            <h3>Add New Solutions</h3>
                            <button type="button" className={styles.button} onClick={addServiceItem}>Add Solution</button>
                        </div>
                    </div>
                )}








{activeTab === 'banner' && (
    <div className={styles.adminTabContent}>
        <h2>Edit Banner Section</h2>
        {bannerContent.slides.map((slide, index) => (
            <div key={index}>
                <label className={styles.label}>Background Image:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBannerImageChange(index, e.target.files[0], 'backgroundImage')}
                    />
                    <p>Current Image: {slide.backgroundImage}</p>
                </label>

                <label className={styles.label}>Background Image Two:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBannerImageChange(index, e.target.files[0], 'backgroundImageTwo')}
                    />
                    <p>Current Image: {slide.backgroundImageTwo}</p>
                </label>

                <label className={styles.label}>Shape 1:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBannerImageChange(index, e.target.files[0], 'shape1')}
                    />
                    <p>Current Image: {slide.shape1}</p>
                </label>

                <label className={styles.label}>Shape 2:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBannerImageChange(index, e.target.files[0], 'shape2')}
                    />
                    <p>Current Image: {slide.shape2}</p>
                </label>

                <label className={styles.label}>Shape 3:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBannerImageChange(index, e.target.files[0], 'shape3')}
                    />
                    <p>Current Image: {slide.shape3}</p>
                </label>

                <label className={styles.label}>Shape 4:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBannerImageChange(index, e.target.files[0], 'shape4')}
                    />
                    <p>Current Image: {slide.shape4}</p>
                </label>

                <label className={styles.label}>Subtitle: 
                    <input type="text" className={styles.inputText} value={slide.subTitle} onChange={(e) => handleBannerInputChange(index, 'subTitle', e.target.value)} />
                </label>
                <label className={styles.label}>Title: 
                    <input type="text" className={styles.inputText} value={slide.title} onChange={(e) => handleBannerInputChange(index, 'title', e.target.value)} />
                </label>
                <label className={styles.label}>Text: 
                    <textarea className={styles.textArea} value={slide.text} onChange={(e) => handleBannerInputChange(index, 'text', e.target.value)} />
                </label>
                <label className={styles.label}>Button Link: 
                    <input type="text" className={styles.inputText} value={slide.buttonLink} onChange={(e) => handleBannerInputChange(index, 'buttonLink', e.target.value)} />
                </label>
                <label className={styles.label}>Button Text: 
                    <input type="text" className={styles.inputText} value={slide.buttonText} onChange={(e) => handleBannerInputChange(index, 'buttonText', e.target.value)} />
                </label>
                <label className={styles.label}>Phone Number: 
                    <input type="text" className={styles.inputText} value={slide.phoneNumber} onChange={(e) => handleBannerInputChange(index, 'phoneNumber', e.target.value)} />
                </label>
                <button type="button" className={styles.button} onClick={() => deleteBannerSlide(index)}>Delete Slide</button>
        
            </div>
        ))}
        <button type="button" className={styles.button} onClick={addBannerSlide}>Add Slide</button>
    </div>
)}
{activeTab === 'blogs' && (
    <div className={styles.adminTabContent}>
        <h2>Edit Blogs</h2>
        {blogs.map((blog, index) => (
            <div key={index}>
                <label className={styles.label}>Image:
                    <input
                        type="file"
                        className={styles.inputFile}
                        onChange={(e) => handleBlogImageChange(index, e.target.files[0])} // Use handleBlogImageChange here
                    />
                    <p>Current Image: {blog.image}</p>
                </label>
                <label className={styles.label}>Author:
                    <input
                        type="text"
                        className={styles.inputText}
                        value={blog.author}
                        onChange={(e) => handleBlogChange(index, 'author', e.target.value)}
                    />
                </label>
                <label className={styles.label}>Date:
                    <input
                        type="text"
                        className={styles.inputText}
                        value={blog.date}
                        onChange={(e) => handleBlogChange(index, 'date', e.target.value)}
                    />
                </label>
                <label className={styles.label}>Title:
                    <input
                        type="text"
                        className={styles.inputText}
                        value={blog.title}
                        onChange={(e) => handleBlogChange(index, 'title', e.target.value)}
                    />
                </label>
                <label className={styles.label}>Link:
                    <input
                        type="text"
                        className={styles.inputText}
                        value={blog.link}
                        onChange={(e) => handleBlogChange(index, 'link', e.target.value)}
                    />
                </label>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => deleteBlog(index)}
                >
                    Delete Blog
                </button>
            </div>
        ))}
        <button type="button" className={styles.button} onClick={addBlog}>
            Add Blog
        </button>
    </div>
)}
{activeTab === 'Values' && (
                    <div className={styles.adminTabContent}>
                        <h2>Edit Process Images</h2>
                        <div>
                            <label className={styles.label}>Image 1:
                                <input type="file" className={styles.inputFile} onChange={(e) => handleProcessImageChange(1, e.target.files[0])} />
                                <p>Current Image: {processImages.img1}</p>
                            </label>
                        </div>
                        <div>
                            <label className={styles.label}>Image 2:
                                <input type="file" className={styles.inputFile} onChange={(e) => handleProcessImageChange(2, e.target.files[0])} />
                                <p>Current Image: {processImages.img2}</p>
                            </label>
                        </div>
                        <div>
                            <label className={styles.label}>Image 3:
                                <input type="file" className={styles.inputFile} onChange={(e) => handleProcessImageChange(3, e.target.files[0])} />
                                <p>Current Image: {processImages.img3}</p>
                            </label>
                        </div>
                    </div>
                )}

                <button type="submit" className={styles.adminSaveButton}>Save Changes</button>
            </form>
        </div>
    );
}

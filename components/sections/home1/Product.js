'use client'; 

import { useState } from 'react';

export default function Product() {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company:'',
        message: '',
    });
    
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null); // Track form submission status
    
    const listId = 'FZGec'; // Replace with your GetResponse List ID
    
    // Regex patterns for validation (phone pattern updated to match Egyptian numbers)
    const phonePattern = /^01[0-9]{9}$/; // Matches 11-digit Egyptian numbers starting with 01
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Form validation logic
    const validateForm = () => {
        let formErrors = {};
        
        if (!formData.name.trim()) {
            formErrors.name = "Name is required";
        }
        
        if (!phonePattern.test(formData.phone)) {
            formErrors.phone = "Enter a valid Egyptian phone number";
        }
        
        if (!emailPattern.test(formData.email)) {
            formErrors.email = "Enter a valid email address";
        }
        
        if (!formData.company.trim()) {
            formErrors.company = "Company name is required";
        }

        if (!formData.message.trim()) {
            formErrors.message = "Message is required";
        }
        
        setErrors(formErrors);
        
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Prepend +20 (Egypt country code) to the phone number before submission
                const formattedPhone = `+20${formData.phone.trim()}`;
                
                const requestBody = {
                    name: formData.name,
                    email: formData.email,
                    campaign: {
                        campaignId: listId,
                    },
                    customFieldValues: [
                        {
                            customFieldId: '4qvEI',  // Company
                            value: [formData.company.trim()]
                        },
                        {
                            customFieldId: '4qhal',  
                            value: [formattedPhone]  // Use the formatted phone with +20
                        },
                        {
                            customFieldId: '4qhVW',  // Comment
                            value: [formData.message.trim()]
                        }
                    ]
                };
    
                const response = await fetch('http://localhost:5000/api/contacts', { // Change to your backend URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
    
                if (response.ok) {
                    setSubmissionStatus("Form submitted successfully!");
                    console.log("Form data sent to GetResponse successfully!");
                    // Optionally, reset form fields here
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        message: ""

                    });

                } else {
                    const errorData = await response.json();
                    setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
                    console.error("Failed to submit form:", errorData);
                }
            } catch (error) {
                setSubmissionStatus("An error occurred while submitting the form.");
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
        {/* Product One Start */}
        <section id="product-section" className="product-one">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="product-one__left">
                            <div className="section-title text-left">
                                <div className="section-title__tagline-box">
                                    <span className="section-title__tagline">Product</span>
                                </div>
                                <h2 className="section-title__title">Become one of our Success partners! 
                                </h2>
                            </div>
                            <p className="product-one__text">
                            Unlock a world of opportunities for growth and prosperity in the distribution industry.                            </p>
                            <div className="product-one__img">
                                <img src="assets/images/resources/product-one-img-1.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="product-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                            <form onSubmit={handleSubmit} className="product-one__form contact-form-validated">
                                <div className="product-one__single-list">
                                    <div className="select-box">
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="Enter your name" 
                                            className="wide" 
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{
                                                backgroundColor: '#FF6600', 
                                                color: '#FFFFFF', 
                                                height: '70px', 
                                                borderRadius: '5px', 
                                                padding: '0 20px', 
                                                width: '100%', 
                                                boxSizing: 'border-box',
                                                border: '2px solid #FFFFFF' 
                                            }}/>
                                        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                                    </div>
                                </div>
                                <div className="product-one__single-list">
                                    <div className="select-box">
                                        <input 
                                            type="text" 
                                            name="company" 
                                            placeholder="Enter your company name" 
                                            className="wide" 
                                            value={formData.company}
                                            onChange={handleChange}
                                            style={{
                                                backgroundColor: '#FF6600', 
                                                color: '#FFFFFF', 
                                                height: '70px', 
                                                borderRadius: '5px', 
                                                padding: '0 20px', 
                                                width: '100%', 
                                                boxSizing: 'border-box',
                                                border: '2px solid #FFFFFF' 
                                            }}/>
                                        {errors.company && <p style={{color: 'red'}}>{errors.company}</p>}
                                    </div>
                                </div>
                                <div className="product-one__single-list">
                                    <div className="select-box">
                                        <input 
                                            type="text" 
                                            name="phone" 
                                            placeholder="Enter your phone number" 
                                            className="wide" 
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{
                                                backgroundColor: '#FF6600', 
                                                color: '#FFFFFF', 
                                                height: '70px', 
                                                borderRadius: '5px', 
                                                padding: '0 20px', 
                                                width: '100%', 
                                                boxSizing: 'border-box',
                                                border: '2px solid #FFFFFF' 
                                            }}/>
                                        {errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}
                                    </div>
                                </div>
                                <div className="product-one__single-list">
                                    <div className="select-box">
                                        <input 
                                            type="text" 
                                            name="email" 
                                            placeholder="Enter your email" 
                                            className="wide" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{
                                                backgroundColor: '#FF6600', 
                                                color: '#FFFFFF', 
                                                height: '70px', 
                                                borderRadius: '5px', 
                                                padding: '0 20px', 
                                                width: '100%', 
                                                boxSizing: 'border-box',
                                                border: '2px solid #FFFFFF' 
                                            }}/>
                                        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                                    </div>
                                </div>
                                
                               
                                <div className="product-one__single-list">
                                    <div className="select-box">
                                        <input 
                                            type="text" 
                                            name="message" 
                                            placeholder="Enter your Message" 
                                            className="wide" 
                                            value={formData.message}
                                            onChange={handleChange}
                                            style={{
                                                backgroundColor: '#FF6600', 
                                                color: '#FFFFFF', 
                                                height: '120px', 
                                                borderRadius: '5px', 
                                                padding: '0 20px', 
                                                width: '100%', 
                                                boxSizing: 'border-box',
                                                border: '2px solid #FFFFFF' 
                                            }}/>
                                        {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
                                    </div>
                                </div>
                                <div className="product-one__btn-box">
                                    <button type="submit" className="thm-btn product-one__btn">Send</button>
                                </div>
                                {submissionStatus && <p>{submissionStatus}</p>} {/* Show submission status */}
                            </form>

                            <div className="result"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

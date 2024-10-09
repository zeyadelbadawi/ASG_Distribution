'use client'; // Mark this as a client component

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PartnerList from "@/components/admin_components/PartnerList";
import PartnerForm from "@/components/admin_components/PartnerForm";
import partnersData from "@/data/partnersData";

export default function AdminDashboard() {
    const [partners, setPartners] = useState(partnersData); // Set initial state to the partnersData
    const [selectedPartner, setSelectedPartner] = useState(null); // State for currently selected partner for editing

    // Edit partner logic: Set the selected partner for the form
    const handleEditPartner = (partner) => {
        setSelectedPartner(partner); // Set the selected partner for editing
    };

    // Delete product logic: Remove a product from the selected partner
    const handleDeleteProduct = (productId) => {
        if (selectedPartner) {
            const updatedProducts = selectedPartner.products.filter(p => p.id !== productId);
            const updatedPartner = { ...selectedPartner, products: updatedProducts };
            setSelectedPartner(updatedPartner);

            const updatedPartners = partners.map(p => p.id === selectedPartner.id ? updatedPartner : p);
            setPartners(updatedPartners);
        }
    };

    // Save partner logic: Add a new partner or update the existing one
    const handleSavePartner = async (newPartner) => {
        let updatedPartners;
        const partnerExists = partners.some(p => p.id === newPartner.id);

        if (selectedPartner) {
            // Update an existing partner
            updatedPartners = partners.map(p =>
                p.id === selectedPartner.id ? newPartner : p
            );
        } else {
            // Validate if the entered ID is unique
            if (partnerExists) {
                alert('Partner ID already exists, please use a unique ID.');
                return;
            }
            // Add a new partner
            updatedPartners = [...partners, newPartner];
        }

        setPartners(updatedPartners);
        setSelectedPartner(null); // Reset the form after saving

        // Save to API
        try {
            const response = await fetch('/api/partners/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPartners),
            });
    
            if (response.ok) {
                console.log('Partners data updated successfully');
            } else {
                console.error('Failed to update partners data');
            }
        } catch (error) {
            console.error('Error updating partners data:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <main style={{
                flexGrow: 1,
                paddingBottom: '100px',
            }} className="container">
                <h2 className="text-center mt-4 mb-4">Partners pages Management Dashboard</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <PartnerList partners={partners} onEdit={handleEditPartner} />
                    </div>
                    <div className="col-lg-6">
                        <PartnerForm partner={selectedPartner} onSave={handleSavePartner} />
                    </div>
                </div>
            </main>
        </div>
    );
}
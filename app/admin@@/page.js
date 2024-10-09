"use client";
import React, { useState } from "react";
import SidebarMenu from "@/components/dropdown/dropdown"; // Correct path for SidebarMenu
import AdminPage from "@/app/updateContent/page"; // Correct path for Home Page
import AdminPagee from "@/app/admin/page"; // Correct path for Solutions Page
import AdminPage2 from "@/app/admin2/page"; // Correct path for Partners Page
import AdminPage3 from "@/app/admiiin/page"; // Correct path for Blogs Page
import AdminGallery from "@/app/admin_gallery/page"; // Correct path for Gallery Page

import AdminDashboard from "@/app/admin_dashboard_partenersData/page"; // Correct path for Gallery Page

function Apps() {
  const [selectedPage, setSelectedPage] = useState("Home Page");

  // Function to render the selected page component
  const renderPageContent = () => {
    switch (selectedPage) {
      case "Home Page":
        return <AdminPage />;
      case "Solutions":
        return <AdminPagee />;
      case "Partners":
        return <AdminPage2 />;
      case "Blogs":
        return <AdminPage3 />;
      case "Gallery":
        return <AdminGallery />;
      case "Parteners Products":
        return <AdminDashboard />;  
      default:
        return <AdminPage />; // Default to home page
    }
  };

  return (
    <div style={{ display: "flex", marginLeft: "0" }}>
      {/* Sidebar Menu */}
      <SidebarMenu setSelectedPage={setSelectedPage} selectedPage={selectedPage} />

      {/* Page content dynamically changes without affecting the URL */}
      <div style={{ flexGrow: 1, padding: "20px", marginLeft: "250px" }}>
        {renderPageContent()}
      </div>
    </div>
  );
}

export default Apps;

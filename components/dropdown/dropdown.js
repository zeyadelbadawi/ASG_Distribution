import React from "react";

function SidebarMenu({ setSelectedPage, selectedPage }) {
  // Define the available pages and their names
  const pageRoutes = [
    { page: "Home Page" },
    { page: "Solutions" },
    { page: "Partners" },
    {page: "Parteners Products"},
    { page: "Blogs" },
    { page: "Gallery" },
  ];

  return (
    <div style={styles.sidebar}>
      {/* Company Logo */}
      <div style={styles.logoContainer}>
        <a href="/" style={styles.logoLink}> {/* Redirect to home page with href */}
          <img
            src="/assets/images/resources/footer-logo-1.png" // Adjusted path
            alt="Company Logo"
            style={styles.logo}
          />
        </a>
      </div>

      {/* Menu List */}
      <ul style={styles.menuList}>
        {pageRoutes.map((item, index) => (
          <li
            key={index}
            style={{
              ...styles.menuItem,
              ...(selectedPage === item.page ? styles.activeMenuItem : {}),
            }}
            onClick={() => setSelectedPage(item.page)} // Update the selected page state
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f76709")} // Hover effect
            onMouseLeave={(e) => {
              if (selectedPage !== item.page) {
                e.target.style.backgroundColor = "#2c2f36"; // Revert to original if not active
              }
            }}
          >
            {item.page}
          </li>
        ))}
      </ul>

      
    </div>
  );
}

// Inline styles for the sidebar
const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#1d1f24", // Use your website's primary background color here
    color: "#fff",
    padding: "20px",
    height: "100vh",
    position: "fixed", // Sidebar is fixed on the left
    left: 0, // Ensure the sidebar starts from the leftmost position
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Ensures the footer is at the bottom
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "20px", // Space between logo and menu items
  },
  logoLink: {
    display: "block",
    cursor: "pointer",
  },
  logo: {
    maxWidth: "150px",
    height: "auto",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    flexGrow: 1, // Allows the menu list to grow and take available space
  },
  menuItem: {
    padding: "12px 18px",
    margin: "12px 0",
    cursor: "pointer",
    backgroundColor: "#2c2f36", // Default background color
    borderRadius: "5px",
    color: "#ccc",
    fontSize: "16px",
    fontFamily: "'Montserrat', sans-serif", // Montserrat font
    transition: "background-color 0.3s, color 0.3s",
  },
  activeMenuItem: {
    backgroundColor: "#f76709", // Highlight active item with accent color
    color: "#fff",
  },
  footer: {
    paddingTop: "20px",
    borderTop: "1px solid #2c2f36",
    textAlign: "center",
  },
  footerText: {
    marginBottom: "10px",
    color: "#ccc",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    width: "24px",
    height: "24px",
    margin: "0 10px",
  },
};

export default SidebarMenu;

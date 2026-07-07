import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

import "./MainLayout.css";

function MainLayout({
  children,
  loading = false,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Section */}
      <div
        className={`main-section ${
          sidebarOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >

        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Optional Breadcrumb */}
        {/* <Breadcrumb /> */}

        {/* Loader */}
        {loading && <Loader />}

        {/* Page */}
        <main className="page-wrapper">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          © {new Date().getFullYear()} Warehouse AI ERP
        </footer>

      </div>

    </div>
  );
}

export default MainLayout;
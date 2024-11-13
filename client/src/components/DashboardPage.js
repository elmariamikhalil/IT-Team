import React, { useEffect, useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CNavbar,
  CNavbarBrand,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavbarToggler,
  CSidebarToggler,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer, cilUser } from "@coreui/icons";

const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <CSidebar>
        <CSidebarBrand className="text-center py-4">
          <h4>My Dashboard</h4>
        </CSidebarBrand>
        <CSidebarNav>
          <CNavItem>
            <CNavLink href="/dashboard" className="d-flex align-items-center">
              <CIcon icon={cilSpeedometer} size="lg" className="me-2" />{" "}
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/profile" className="d-flex align-items-center">
              <CIcon icon={cilUser} size="lg" className="me-2" /> Profile
            </CNavLink>
          </CNavItem>
        </CSidebarNav>
        <CSidebarToggler />
      </CSidebar>

      {/* Main Content */}
      <CContainer fluid className="p-4">
        {/* Header */}
        <CNavbar color="light" light expand="md" className="mb-4">
          <CNavbarBrand>Welcome, {userProfile?.username}</CNavbarBrand>
          <CNavbarToggler />
        </CNavbar>

        <CRow>
          <CCol>
            {/* Display loading spinner or profile content */}
            {loading ? (
              <div className="d-flex justify-content-center">
                <CSpinner color="primary" />
              </div>
            ) : (
              <CCard>
                <CCardHeader>
                  <h5>User Profile</h5>
                </CCardHeader>
                <CCardBody>
                  <h6>Name: {userProfile?.username}</h6>
                  <p>Email: {userProfile?.email}</p>
                  {/* Add more profile information as needed */}
                </CCardBody>
              </CCard>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default DashboardPage;

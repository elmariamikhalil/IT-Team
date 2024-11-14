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
  CAvatar,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import axios from "axios";


const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
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

  // Toggle Sidebar Visibility
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <CSidebar visible={sidebarVisible}>
        <CSidebarBrand className="text-center py-4">
          <h4>My Dashboard</h4>
        </CSidebarBrand>
        <CSidebarNav>
          <CNavItem>
            <CNavLink href="/dashboard" className="d-flex align-items-center">
              {/* <CIcon icon={cilSpeedometer} size="lg" className="me-2" />{" "} */}
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/profile" className="d-flex align-items-center">
              {/* <CIcon icon={cilUser} size="lg" className="me-2" /> Profile */}
            </CNavLink>
          </CNavItem>
        </CSidebarNav>
        <CSidebarToggler onClick={toggleSidebar} className="mt-auto" />
      </CSidebar>

      {/* Main Content */}
      <CContainer fluid className="p-4">
        {/* Header */}
        <CNavbar
          color="light"
          light
          expand="md"
          className="mb-4 d-flex justify-content-between"
        >
          <CNavbarBrand>My App Name</CNavbarBrand>
          <div className="d-flex align-items-center">
            {userProfile?.avatar && (
              <CAvatar src={userProfile.avatar} size="md" className="me-2" />
            )}
            <div>
              <strong>{userProfile?.username}</strong>
              <br />
              <small>{userProfile?.email}</small>
            </div>
          </div>
        </CNavbar>

        <CRow className="justify-content-center">
          <CCol md={8} lg={6}>
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
// No additional code needed at the placeholder as the requested features are already implemented in the provided code.
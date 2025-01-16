import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.data;
        setProfile(userData);
        setName(userData.name);
        setEmail(userData.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setProfile(response.data.data);
      setModalOpen(false); 
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} />
          <Box display="flex" alignItems="center" onClick={handleMenuClick} sx={{ cursor: "pointer" }}>
            <Avatar sx={{ mr: 1 }}>
              <AccountCircle />
            </Avatar>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {profile.name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => setModalOpen(true)}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            My Profile
          </Typography>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">
                <strong>Name:</strong> {profile.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profile.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {profile.role}
              </Typography>
            </CardContent>
          </Card>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
          </form>
        </Box>
      </Modal>

      {!profile.role && (
        <Box mt={3} display="flex" justifyContent="center" flexDirection="column">
          <Typography variant="h5" gutterBottom>
            Welcome, {profile.name}!
          </Typography>
          <Typography>Your role: {profile.role}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;

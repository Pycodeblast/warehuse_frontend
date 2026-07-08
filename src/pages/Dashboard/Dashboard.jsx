import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStats, getRecentActivity } from "./DashboardService";
import "./Dashboard.css";
import { useEffect, useState } from "react";

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
  totalProducts: 0,
  totalInventory: 0,
  totalUsers: 0,
  totalFiles: 0,
  todayAiRequests: 0,
});
const [activity, setActivity] = useState([]);
useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const [statsData, activityData] = await Promise.all([
      getDashboardStats(),
      getRecentActivity(),
    ]);

    setStats(statsData);
    setActivity(activityData);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <MainLayout>

      {/* Header */}

      <Box className="dashboard-header">
        <Typography variant="h4" className="dashboard-title">
          Dashboard
        </Typography>

        <Typography className="dashboard-subtitle">
          Welcome back, <strong>{user?.username}</strong>
        </Typography>
      </Box>

      {/* Cards */}

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>

              <Inventory2Icon className="card-icon" />

              <Typography className="card-title">
                Inventory
              </Typography>

          <Typography variant="h4">
  {stats.totalProducts}
</Typography>

              <Typography className="card-desc">
                Total Stock Items
              </Typography>

            </CardContent>
          </Card>
        </Grid>


       


        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>

              <PeopleIcon className="card-icon" />

              <Typography className="card-title">
                Users
              </Typography>

              <Typography variant="h4">
               {stats.totalUsers}
              </Typography>

              <Typography className="card-desc">
                Registered Users
              </Typography>

            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>

              <SmartToyIcon className="card-icon" />

              <Typography className="card-title">
                AI Requests
              </Typography>

              <Typography variant="h4">
              {stats.todayAiRequests}
              </Typography>

              <Typography className="card-desc">
                AI Queries Today
              </Typography>

            </CardContent>
          </Card>
        </Grid>

      </Grid>



      {/* Recent Activity */}

      <Paper className="dashboard-section">

        <Typography variant="h6">
          Recent Activity
        </Typography>

    <ul className="activity-list">
  {activity.length === 0 ? (
    <li>No activity in last 24 hours</li>
  ) : (
    activity.map((item, index) => (
      <li key={index}>
        <strong>{item.module}</strong> - {item.description}
        <br />
        <small>
          by {item.username} •{" "}
          {new Date(item.time).toLocaleString()}
        </small>
      </li>
    ))
  )}
</ul>

      </Paper>



      {/* Quick Actions */}

      <Paper className="dashboard-section">

        <Typography variant="h6">
          Quick Overview
        </Typography>

        <Typography className="overview-text">

          Warehouse AI helps manage inventory,
          products, users, files and AI-powered
          insights from one place.

        </Typography>

      </Paper>

    </MainLayout>
  );
}

export default Dashboard;
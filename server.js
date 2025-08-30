const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockData = {
  dashboard: {
    plants: 47,
    capacity: 2340,
    investment: 2.8,
    efficiency: 89.2
  },
  infrastructure: [
    {
      id: 1,
      name: "Gujarat Green Hydrogen Plant",
      type: "plant",
      status: "operational",
      capacity: 150,
      efficiency: 85,
      energy_source: "solar",
      location: { latitude: 23.0225, longitude: 72.5714, city: "Ahmedabad", state: "Gujarat" }
    },
    {
      id: 2,
      name: "Rajasthan Wind-H2 Facility",
      type: "plant",
      status: "under_construction",
      capacity: 200,
      efficiency: 88,
      energy_source: "wind",
      location: { latitude: 26.9124, longitude: 75.7873, city: "Jaipur", state: "Rajasthan" }
    },
    {
      id: 3,
      name: "Tamil Nadu Coastal Plant",
      type: "plant",
      status: "planned",
      capacity: 300,
      efficiency: 90,
      energy_source: "tidal",
      location: { latitude: 13.0827, longitude: 80.2707, city: "Chennai", state: "Tamil Nadu" }
    }
  ],
  investments: [
    {
      id: 1,
      project_name: "Gujarat Green Hydrogen Initiative",
      amount_required: 500000000,
      amount_raised: 300000000,
      investor_count: 12,
      status: "active"
    },
    {
      id: 2,
      project_name: "Rajasthan Wind-H2 Development",
      amount_required: 750000000,
      amount_raised: 450000000,
      investor_count: 8,
      status: "active"
    }
  ]
};

// API Routes
app.get('/api/dashboard', (req, res) => {
  res.json(mockData.dashboard);
});

app.get('/api/infrastructure', (req, res) => {
  res.json(mockData.infrastructure);
});

app.get('/api/investments', (req, res) => {
  res.json(mockData.investments);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication
  if (email && password) {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 1,
        email: email,
        name: 'Energy Analyst',
        role: 'analyst'
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { firstName, lastName, email, company, password } = req.body;
  
  // Mock registration
  if (email && password && firstName && lastName) {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 2,
        email: email,
        name: `${firstName} ${lastName}`,
        company: company,
        role: 'user'
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Mock data and entities for the application

// Mock Infrastructure data
const mockInfrastructure = [
  {
    id: 1,
    name: "Gujarat Green Hydrogen Plant",
    type: "plant",
    status: "operational",
    capacity: 150,
    efficiency: 85,
    energy_source: "solar",
    location: { latitude: 23.0225, longitude: 72.5714, city: "Ahmedabad", state: "Gujarat" },
    created_date: "2024-01-15"
  },
  {
    id: 2,
    name: "Rajasthan Wind-H2 Facility",
    type: "plant",
    status: "under_construction",
    capacity: 200,
    efficiency: 88,
    energy_source: "wind",
    location: { latitude: 26.9124, longitude: 75.7873, city: "Jaipur", state: "Rajasthan" },
    created_date: "2024-02-10"
  },
  {
    id: 3,
    name: "Tamil Nadu Coastal Plant",
    type: "plant",
    status: "planned",
    capacity: 300,
    efficiency: 90,
    energy_source: "tidal",
    location: { latitude: 13.0827, longitude: 80.2707, city: "Chennai", state: "Tamil Nadu" },
    created_date: "2024-03-05"
  }
];

// Mock Energy Sources data
const mockEnergySources = [
  {
    id: 1,
    solar_potential: 5.2,
    wind_potential: 7.8,
    tidal_potential: 2.1,
    grid_connectivity: "High",
    location: { latitude: 23.0225, longitude: 72.5714, city: "Ahmedabad", state: "Gujarat" },
    created_date: "2024-01-01"
  },
  {
    id: 2,
    solar_potential: 6.1,
    wind_potential: 9.2,
    tidal_potential: 0,
    grid_connectivity: "Medium",
    location: { latitude: 26.9124, longitude: 75.7873, city: "Jaipur", state: "Rajasthan" },
    created_date: "2024-01-15"
  }
];

// Mock Investment data
const mockInvestments = [
  {
    id: 1,
    project_name: "Gujarat Green Hydrogen Initiative",
    amount_required: 500000000,
    amount_raised: 300000000,
    investor_count: 12,
    status: "active",
    created_date: "2024-01-10"
  },
  {
    id: 2,
    project_name: "Rajasthan Wind-H2 Development",
    amount_required: 750000000,
    amount_raised: 450000000,
    investor_count: 8,
    status: "active",
    created_date: "2024-02-01"
  }
];

// Mock Plant Performance data
const mockPerformance = [
  {
    id: 1,
    plant_id: 1,
    efficiency: 85,
    output: 145,
    timestamp: "2024-03-15T10:00:00Z"
  },
  {
    id: 2,
    plant_id: 1,
    efficiency: 87,
    output: 148,
    timestamp: "2024-03-15T11:00:00Z"
  },
  {
    id: 3,
    plant_id: 2,
    efficiency: 88,
    output: 176,
    timestamp: "2024-03-15T10:00:00Z"
  }
];

// Mock Entity classes
export const Infrastructure = {
  list: async (sortBy = "-created_date", limit = 50) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockInfrastructure.slice(0, limit));
      }, 500);
    });
  }
};

export const EnergySource = {
  list: async (sortBy = "-created_date", limit = 20) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEnergySources.slice(0, limit));
      }, 500);
    });
  }
};

export const Investment = {
  list: async (sortBy = "-created_date", limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockInvestments.slice(0, limit));
      }, 500);
    });
  }
};

export const PlantPerformance = {
  list: async (sortBy = "-timestamp", limit = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPerformance.slice(0, limit));
      }, 500);
    });
  }
};
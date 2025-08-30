# HydroMap - Green Infrastructure Platform

A comprehensive React application for managing and optimizing green hydrogen infrastructure, featuring interactive mapping, analytics, and collaboration tools.

## 🚀 Features

- **Home Page**: Landing page with features overview and call-to-action
- **Authentication**: Login and Signup pages with modern UI
- **Dashboard**: Real-time monitoring of hydrogen infrastructure
- **Interactive Map**: Visualization of plants, storage, and distribution networks
- **Plant Optimizer**: AI-powered location analysis for optimal plant placement
- **Analytics**: Comprehensive performance tracking and insights
- **Collaboration Hub**: Connect investors, partners, and projects

## 📁 Project Structure

```
HydroMap/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── input.jsx
│   │   │   └── sidebar.jsx
│   │   └── Layout.jsx          # Main layout component
│   ├── pages/                  # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Map.jsx
│   │   ├── Optimizer.jsx
│   │   ├── Analytics.jsx
│   │   └── Collaboration.jsx
│   ├── entities/
│   │   └── all.js              # Mock data and API functions
│   ├── utils/
│   │   └── index.js            # Utility functions
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # React entry point
│   └── index.css               # Global styles with Tailwind
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Step 1: Install Dependencies
```bash
# Navigate to the project directory
cd HydroMap

# Install all dependencies
npm install
```

### Step 2: Start the Development Server
```bash
# Start the React development server
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🎯 How to Use

### 1. **Home Page** (`/Home`)
- Landing page with feature overview
- Click "Get Started" to go to Login page
- Click "Start Free Trial" to go to Signup page

### 2. **Authentication**
- **Login** (`/Login`): Sign in with email and password
- **Signup** (`/Signup`): Create a new account
- Both pages have mock authentication (any credentials work)

### 3. **Dashboard** (`/Dashboard`)
- Overview of hydrogen infrastructure
- Key metrics and performance indicators
- Charts showing energy sources, performance trends, and alerts
- Recent activity feed

### 4. **Interactive Map** (`/Map`)
- Visualization of hydrogen plants and infrastructure
- Filter by type, status, and energy source
- Layer controls for different data types
- Click on locations to view details

### 5. **Plant Optimizer** (`/Optimizer`)
- AI-powered location analysis
- Select optimization criteria
- View recommended locations with scores
- Investment and capacity estimates

### 6. **Analytics** (`/Analytics`)
- Comprehensive performance tracking
- Multiple chart types (bar, line, pie, area)
- Time range selection
- Key insights and trends

### 7. **Collaboration Hub** (`/Collaboration`)
- Browse active projects seeking funding
- Connect with investors and partners
- Submit new projects
- Filter and search functionality

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Glass Effect**: Translucent cards with backdrop blur
- **Animations**: Smooth transitions and hover effects using Framer Motion
- **Color Scheme**: Green and blue gradients representing clean energy
- **Typography**: Clear hierarchy with proper contrast

## 🔧 Technical Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Recharts**: Chart and data visualization
- **Lucide React**: Modern icon library
- **Radix UI**: Accessible UI components

## 📊 Mock Data

The application uses mock data for demonstration:
- Infrastructure plants with locations, capacity, and status
- Energy source data with renewable potential
- Investment information and funding status
- Performance metrics and analytics data

## 🚀 Build for Production

```bash
# Create production build
npm run build

# The build folder will contain optimized files for deployment
```

## 🔄 Available Scripts

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App (not recommended)

## 🌟 Key Components

### Layout Component
- Responsive sidebar navigation
- Quick stats display
- User profile section
- Mobile-friendly design

### UI Components
- Reusable button, card, badge components
- Consistent styling with Tailwind CSS
- Accessible design patterns

### Pages
- Each page is a complete feature module
- Consistent header and navigation
- Loading states and error handling

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Future Enhancements

- Real API integration
- User authentication with JWT
- Real-time data updates
- Advanced filtering and search
- Export functionality
- Multi-language support
- Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**HydroMap** - Accelerating the global transition to green hydrogen through intelligent mapping, optimization, and collaboration.
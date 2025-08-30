import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  MapPin, 
  Users, 
  TrendingUp,
  Sun,
  Wind,
  Waves,
  Factory,
  Gauge,
  Globe,
  Shield,
  BarChart3,
  Play,
  ChevronDown
} from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Map the Future of Green Hydrogen",
      subtitle: "Visualize infrastructure, optimize locations, and accelerate the clean energy transition",
      icon: MapPin,
      color: "from-green-400 to-blue-500"
    },
    {
      title: "AI-Powered Plant Optimization",
      subtitle: "Leverage advanced analytics to identify optimal sites for hydrogen production",
      icon: Gauge,
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "Connect the Hydrogen Ecosystem",
      subtitle: "Bridge investors, developers, and partners in the largest energy transformation",
      icon: Users,
      color: "from-purple-400 to-green-500"
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Interactive Infrastructure Mapping",
      description: "Comprehensive visualization of hydrogen plants, storage facilities, and distribution networks across regions.",
      color: "bg-green-500"
    },
    {
      icon: Gauge,
      title: "Smart Location Optimization",
      description: "AI-driven site selection based on renewable energy potential, costs, and infrastructure proximity.",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Investment Collaboration Hub",
      description: "Connect with investors, developers, and partners to accelerate project funding and development.",
      color: "bg-purple-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics Dashboard",
      description: "Monitor plant performance, track efficiency metrics, and optimize operations with live data insights.",
      color: "bg-cyan-500"
    },
    {
      icon: Shield,
      title: "Regulatory Compliance Tools",
      description: "Navigate complex regulatory landscapes with built-in compliance tracking and zone mapping.",
      color: "bg-indigo-500"
    },
    {
      icon: Globe,
      title: "Global Network Integration",
      description: "Access worldwide hydrogen infrastructure data and connect with international partners.",
      color: "bg-emerald-500"
    }
  ];

  const stats = [
    { number: "2.8B+", label: "Investment Tracked", prefix: "$" },
    { number: "47", label: "Active Plants", prefix: "" },
    { number: "2,340", label: "Daily Capacity", prefix: "", suffix: " t/d" },
    { number: "89%", label: "Avg Efficiency", prefix: "" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
                "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(34, 197, 94, 0.2))",
                "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Floating Energy Icons */}
          {[Sun, Wind, Waves, Factory, Zap].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute text-green-400/30"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [-20, -40, -20],
                x: [0, 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                delay: index * 2
              }}
              style={{
                left: `${15 + index * 20}%`,
                top: `${20 + (index % 2) * 40}%`
              }}
            >
              <Icon size={32 + index * 8} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Brand */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HydroMap
                </h1>
                <p className="text-lg text-slate-600 font-medium">Green Infrastructure Platform</p>
              </div>
            </div>

            {/* Dynamic Hero Content */}
            <div className="h-32 flex items-center justify-center">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${heroSlides[currentSlide].color} flex items-center justify-center`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {React.createElement(heroSlides[currentSlide].icon, { className: "w-6 h-6 text-white" })}
                  </motion.div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                  {heroSlides[currentSlide].title}
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to={createPageUrl("Login")}>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" className="border-2 border-slate-300 hover:border-slate-400 px-8 py-6 rounded-xl text-lg font-semibold group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.prefix}{stat.number}{stat.suffix || ""}
                  </div>
                  <div className="text-slate-600 font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-slate-400" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Comprehensive <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Hydrogen</span> Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From infrastructure mapping to investment optimization, everything you need to accelerate the green hydrogen revolution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {React.createElement(feature.icon, { className: "w-7 h-7 text-white" })}
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-white rounded-full"></div>
            <div className="absolute top-3/4 right-1/4 w-64 h-64 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/2 w-48 h-48 border-2 border-white rounded-full"></div>
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Ready to Transform Energy Infrastructure?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of energy professionals, investors, and developers who are building the future of clean hydrogen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link to={createPageUrl("Signup")}>
                <Button className="bg-white text-slate-900 hover:bg-gray-100 px-10 py-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to={createPageUrl("Login")}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 rounded-xl text-lg font-bold">
                  View Live Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">HydroMap</h3>
                <p className="text-slate-400">Green Infrastructure Platform</p>
              </div>
            </div>
            
            <p className="text-slate-400 max-w-2xl mx-auto">
              Accelerating the global transition to green hydrogen through intelligent mapping, optimization, and collaboration.
            </p>
            
            <div className="border-t border-slate-700 pt-8">
              <p className="text-slate-400">
                © 2024 HydroMap. Powering the future of clean energy infrastructure.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
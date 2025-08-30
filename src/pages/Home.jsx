import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, MapPin, Users, BarChart3, Play, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    { title: "Map the Future of Green Hydrogen", subtitle: "Visualize infrastructure, optimize locations, and accelerate the clean energy transition", icon: MapPin },
    { title: "AI-Powered Plant Optimization", subtitle: "Leverage advanced analytics to identify optimal sites for hydrogen production", icon: BarChart3 },
    { title: "Connect the Hydrogen Ecosystem", subtitle: "Bridge investors, developers, and partners in the largest energy transformation", icon: Users }
  ];

  const features = [
    { icon: MapPin, title: "Interactive Infrastructure Mapping", description: "Comprehensive visualization of hydrogen plants, storage facilities, and distribution networks." },
    { icon: BarChart3, title: "Smart Location Optimization", description: "AI-driven site selection based on renewable energy potential and infrastructure proximity." },
    { icon: Users, title: "Investment Collaboration Hub", description: "Connect with investors, developers, and partners to accelerate project funding." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HydroMap
                </h1>
                <p className="text-lg text-slate-600 font-medium">Green Infrastructure Platform</p>
              </div>
            </div>

            <div className="h-32 flex items-center justify-center">
              <div key={currentSlide} className="text-center space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                    {React.createElement(heroSlides[currentSlide].icon, { className: "w-6 h-6 text-white" })}
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                  {heroSlides[currentSlide].title}
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/Login">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group inline-flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <button className="border-2 border-slate-300 hover:border-slate-400 px-8 py-6 rounded-xl text-lg font-semibold group inline-flex items-center">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">$2.8B+</div>
                <div className="text-slate-600 font-medium mt-1">Investment Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">47</div>
                <div className="text-slate-600 font-medium mt-1">Active Plants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">2,340 t/d</div>
                <div className="text-slate-600 font-medium mt-1">Daily Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">89%</div>
                <div className="text-slate-600 font-medium mt-1">Avg Efficiency</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-8 h-8 text-slate-400 animate-bounce" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Comprehensive <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Hydrogen</span> Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From infrastructure mapping to investment optimization, everything you need to accelerate the green hydrogen revolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                      {React.createElement(feature.icon, { className: "w-7 h-7 text-white" })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Ready to Transform Energy Infrastructure?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of energy professionals, investors, and developers who are building the future of clean hydrogen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link to="/Signup">
                <button className="bg-white text-slate-900 hover:bg-gray-100 px-10 py-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group inline-flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to="/Login">
                <button className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 rounded-xl text-lg font-bold">
                  View Live Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
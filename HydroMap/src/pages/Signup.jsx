import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, User, Building, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/Dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-400/10 to-purple-400/10"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(34, 197, 94, 0.1))",
              "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  HydroMap
                </h1>
                <p className="text-sm text-slate-600">Green Infrastructure Platform</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Join HydroMap</h2>
              <p className="text-slate-600">Create your account to start building the future of clean energy</p>
            </motion.div>
          </div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-effect border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-slate-900">Create Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 bg-white/80 border-white/30 focus:border-green-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-white/80 border-white/30 focus:border-green-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-white/80 border-white/30 focus:border-green-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="text"
                        name="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="pl-10 bg-white/80 border-white/30 focus:border-green-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-white/80 border-white/30 focus:border-green-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-white/80 border-white/30 focus:border-green-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                    <span className="text-sm text-slate-600">
                      I agree to the{' '}
                      <Link to="#" className="text-green-600 hover:text-green-700 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="#" className="text-green-600 hover:text-green-700 font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or sign up with</span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="bg-white/80 border-white/30 hover:bg-white/90">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="bg-white/80 border-white/30 hover:bg-white/90">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </Button>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                  <p className="text-slate-600">
                    Already have an account?{' '}
                    <Link to="/Login" className="text-green-600 hover:text-green-700 font-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/Home" className="text-slate-600 hover:text-slate-800 font-medium">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
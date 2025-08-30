import React, { useState, useContext, createContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Settings as SettingsIcon, Globe, Bell, Shield, User, Save, Moon, Sun, Waves, Zap } from "lucide-react";
import { useUser } from "../contexts/UserContext";

// Currency and Theme Context
export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hydromap_theme');
    return saved || 'light';
  });
  
  const currencies = {
    'INR': { symbol: '₹', name: 'Indian Rupee', rate: 1, format: 'crore' },
    'USD': { symbol: '$', name: 'US Dollar', rate: 0.012, format: 'million' },
    'EUR': { symbol: '€', name: 'Euro', rate: 0.011, format: 'million' },
    'GBP': { symbol: '£', name: 'British Pound', rate: 0.0095, format: 'million' }
  };

  const themes = {
    light: {
      name: 'Light Mode',
      background: 'from-slate-50 via-blue-50 to-green-50',
      cardBg: 'bg-white/95',
      textPrimary: 'text-slate-900',
      textSecondary: 'text-slate-600',
      border: 'border-white/20',
      accent: 'from-green-600 to-blue-600'
    },
    dark: {
      name: 'Dark Mode',
      background: 'from-slate-900 via-blue-900 to-green-900',
      cardBg: 'bg-slate-800/95',
      textPrimary: 'text-white',
      textSecondary: 'text-slate-300',
      border: 'border-slate-700/50',
      accent: 'from-green-400 to-blue-400'
    },
    ocean: {
      name: 'Ocean Theme',
      background: 'from-blue-900 via-teal-800 to-cyan-900',
      cardBg: 'bg-blue-800/90',
      textPrimary: 'text-cyan-50',
      textSecondary: 'text-cyan-200',
      border: 'border-cyan-500/30',
      accent: 'from-cyan-400 to-teal-400'
    },
    forest: {
      name: 'Forest Theme',
      background: 'from-green-900 via-emerald-800 to-teal-900',
      cardBg: 'bg-green-800/90',
      textPrimary: 'text-green-50',
      textSecondary: 'text-green-200',
      border: 'border-green-500/30',
      accent: 'from-emerald-400 to-green-400'
    }
  };

  const formatCurrency = (amount) => {
    const rate = currencies[currency]?.rate || 1;
    const convertedAmount = amount * rate;
    
    if (currency === 'INR') {
      if (convertedAmount >= 10000000) {
        return `${(convertedAmount / 10000000).toFixed(1)} Cr`;
      } else if (convertedAmount >= 100000) {
        return `${(convertedAmount / 100000).toFixed(1)} L`;
      } else {
        return convertedAmount.toLocaleString('en-IN');
      }
    } else {
      if (convertedAmount >= 1000000) {
        return `${(convertedAmount / 1000000).toFixed(1)}M`;
      } else if (convertedAmount >= 1000) {
        return `${(convertedAmount / 1000).toFixed(1)}K`;
      } else {
        return convertedAmount.toLocaleString();
      }
    }
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    setCurrencySymbol(currencies[newCurrency].symbol);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('hydromap_theme', newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  React.useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <CurrencyContext.Provider value={{ 
      currency, currencySymbol, currencies, changeCurrency, 
      theme, themes, changeTheme, toggleTheme, formatCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default function Settings() {
  const { currency, currencies, changeCurrency, theme, themes, changeTheme } = useContext(CurrencyContext);
  const { user, updateUser } = useUser();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });
  const [profile, setProfile] = useState({
    name: user?.name || "Energy Analyst",
    email: user?.email || "analyst@hydromap.com",
    company: user?.company || "Green Energy Solutions"
  });

  const handleSave = () => {
    updateUser(profile);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-600 text-lg">Manage your account preferences and configurations</p>
        </div>

        <div className="grid gap-8">
          {/* Currency & Theme Settings */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Globe className="w-5 h-5 text-green-500" />
                Currency & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-3 block">Default Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => changeCurrency(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {Object.entries(currencies).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.symbol} {info.name} ({code})
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-500 mt-2">
                  Current: {currencies[currency].symbol} {currencies[currency].name}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700 mb-3 block">Theme Selection</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(themes).map(([key, themeData]) => (
                    <div
                      key={key}
                      onClick={() => changeTheme(key)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        theme === key 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-slate-300 bg-white hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {key === 'light' && <Sun className="w-5 h-5 text-yellow-500" />}
                        {key === 'dark' && <Moon className="w-5 h-5 text-blue-500" />}
                        {key === 'ocean' && <Waves className="w-5 h-5 text-cyan-500" />}
                        {key === 'forest' && <Zap className="w-5 h-5 text-green-500" />}
                        <span className="font-medium text-slate-700">{themeData.name}</span>
                      </div>
                      <div className={`h-8 rounded bg-gradient-to-r ${themeData.background}`}></div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  Current: {themes[theme].name}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <User className="w-5 h-5 text-blue-500" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Company</label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({...profile, company: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Bell className="w-5 h-5 text-purple-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-slate-700 capitalize">{key} Notifications</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Shield className="w-5 h-5 text-red-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Change Password
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
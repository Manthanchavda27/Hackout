import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Sun, Wind, Waves, Zap, Battery, Container, Settings, Download, Play, Pause, RotateCcw } from "lucide-react";
import { CurrencyContext } from "./Settings";

export default function FactoryVisualization() {
  const { currencySymbol, formatCurrency } = useContext(CurrencyContext);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time data simulation
  const [factoryData, setFactoryData] = useState({
    solar: {
      capacity: 150,
      currentOutput: 125,
      efficiency: 83,
      workingHours: 8.5,
      chargingLevel: 85,
      panels: 500,
      temperature: 45,
      irradiance: 850
    },
    wind: {
      capacity: 200,
      currentOutput: 180,
      efficiency: 90,
      workingHours: 22.3,
      chargingLevel: 92,
      turbines: 12,
      windSpeed: 15.2,
      wingSize: 80,
      direction: 245
    },
    tidal: {
      capacity: 100,
      currentOutput: 75,
      efficiency: 75,
      workingHours: 24,
      chargingLevel: 78,
      generators: 8,
      tideHeight: 2.3,
      flowRate: 3.2
    },
    electrolysis: {
      capacity: 450,
      currentProduction: 380,
      efficiency: 84,
      anodeAge: 2.5,
      cathodeAge: 2.8,
      workingHours: 18.7,
      oxygenOutput: 3040,
      hydrogenOutput: 380,
      temperature: 80,
      pressure: 30
    },
    storage: {
      totalCapacity: 1000,
      currentLevel: 750,
      containers: 20,
      pressure: 350,
      temperature: 25,
      safetyLevel: 95,
      lastMaintenance: "2024-01-15",
      carbonFiberIntegrity: 98
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (isRunning) {
        setFactoryData(prev => ({
          ...prev,
          solar: {
            ...prev.solar,
            currentOutput: Math.max(0, prev.solar.capacity * (0.7 + Math.random() * 0.3)),
            chargingLevel: Math.min(100, prev.solar.chargingLevel + (Math.random() - 0.5) * 2)
          },
          wind: {
            ...prev.wind,
            currentOutput: Math.max(0, prev.wind.capacity * (0.8 + Math.random() * 0.2)),
            windSpeed: Math.max(5, 20 * Math.random()),
            chargingLevel: Math.min(100, prev.wind.chargingLevel + (Math.random() - 0.5) * 1.5)
          },
          tidal: {
            ...prev.tidal,
            currentOutput: Math.max(0, prev.tidal.capacity * (0.6 + Math.random() * 0.4)),
            tideHeight: 1 + Math.random() * 3,
            chargingLevel: Math.min(100, prev.tidal.chargingLevel + (Math.random() - 0.5) * 1)
          },
          electrolysis: {
            ...prev.electrolysis,
            currentProduction: Math.max(0, prev.electrolysis.capacity * (0.75 + Math.random() * 0.25)),
            oxygenOutput: Math.max(0, 3200 * (0.8 + Math.random() * 0.2)),
            hydrogenOutput: Math.max(0, 400 * (0.8 + Math.random() * 0.2))
          },
          storage: {
            ...prev.storage,
            currentLevel: Math.min(prev.storage.totalCapacity, Math.max(100, prev.storage.currentLevel + (Math.random() - 0.5) * 10))
          }
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const downloadFactoryReport = () => {
    const reportData = {
      timestamp: currentTime.toISOString(),
      factoryStatus: isRunning ? 'Running' : 'Stopped',
      productionUnits: {
        solar: {
          ...factoryData.solar,
          dailyProduction: `${(factoryData.solar.currentOutput * factoryData.solar.workingHours).toFixed(1)} kWh`,
          revenue: `${currencySymbol}${formatCurrency(factoryData.solar.currentOutput * factoryData.solar.workingHours * 4.5)}`
        },
        wind: {
          ...factoryData.wind,
          dailyProduction: `${(factoryData.wind.currentOutput * factoryData.wind.workingHours).toFixed(1)} kWh`,
          revenue: `${currencySymbol}${formatCurrency(factoryData.wind.currentOutput * factoryData.wind.workingHours * 4.5)}`
        },
        tidal: {
          ...factoryData.tidal,
          dailyProduction: `${(factoryData.tidal.currentOutput * factoryData.tidal.workingHours).toFixed(1)} kWh`,
          revenue: `${currencySymbol}${formatCurrency(factoryData.tidal.currentOutput * factoryData.tidal.workingHours * 4.5)}`
        }
      },
      electrolysisUnit: {
        ...factoryData.electrolysis,
        dailyHydrogenProduction: `${(factoryData.electrolysis.hydrogenOutput * 24).toFixed(1)} kg`,
        dailyOxygenProduction: `${(factoryData.electrolysis.oxygenOutput * 24).toFixed(1)} kg`
      },
      storageUnit: {
        ...factoryData.storage,
        utilizationRate: `${((factoryData.storage.currentLevel / factoryData.storage.totalCapacity) * 100).toFixed(1)}%`,
        estimatedValue: `${currencySymbol}${formatCurrency(factoryData.storage.currentLevel * 450)}`
      },
      totalDailyRevenue: `${currencySymbol}${formatCurrency(
        (factoryData.solar.currentOutput * factoryData.solar.workingHours * 4.5) +
        (factoryData.wind.currentOutput * factoryData.wind.workingHours * 4.5) +
        (factoryData.tidal.currentOutput * factoryData.tidal.workingHours * 4.5)
      )}`
    };
    
    // Create CSV format
    const csvContent = [
      ['Metric', 'Value', 'Unit'],
      ['Report Generated', currentTime.toLocaleString(), ''],
      ['Factory Status', isRunning ? 'Running' : 'Stopped', ''],
      ['Solar Output', factoryData.solar.currentOutput.toFixed(1), 'MW'],
      ['Wind Output', factoryData.wind.currentOutput.toFixed(1), 'MW'],
      ['Tidal Output', factoryData.tidal.currentOutput.toFixed(1), 'MW'],
      ['Hydrogen Production', factoryData.electrolysis.hydrogenOutput.toFixed(1), 'kg/h'],
      ['Storage Level', factoryData.storage.currentLevel.toFixed(1), 'kg'],
      ['Total Daily Revenue', reportData.totalDailyRevenue, '']
    ].map(row => row.join(',')).join('\n');
    
    // Download CSV
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = `factory-report-${currentTime.toISOString().split('T')[0]}.csv`;
    csvLink.click();
    
    // Download JSON
    const jsonStr = JSON.stringify(reportData, null, 2);
    const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `factory-report-${currentTime.toISOString().split('T')[0]}.json`;
    jsonLink.click();
  };

  const UnitCard = ({ title, icon: Icon, data, color, onClick }) => (
    <Card 
      className={`glass-effect border-white/20 cursor-pointer hover:shadow-lg transition-all duration-300 ${
        selectedUnit === title ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onClick(title)}
    >
      <CardHeader className="pb-2">
        <CardTitle className={`flex items-center gap-2 text-${color}-600`}>
          <Icon className={`w-6 h-6 text-${color}-500`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Output:</span>
            <span className="font-semibold">{data.currentOutput?.toFixed(1) || data.currentProduction?.toFixed(1)} {title === 'Electrolysis Unit' ? 'kg/h' : 'MW'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Efficiency:</span>
            <span className="font-semibold">{data.efficiency}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
              style={{ width: `${data.chargingLevel || (data.currentLevel / data.totalCapacity * 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Factory Visualization
            </h1>
            <p className="text-slate-600 text-lg">Real-time hydrogen production facility monitoring</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsRunning(!isRunning)}
              className={`${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? 'Stop' : 'Start'} Factory
            </Button>
            <Button onClick={downloadFactoryReport} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Badge className={isRunning ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {isRunning ? 'RUNNING' : 'STOPPED'}
                </Badge>
                <span className="text-sm text-slate-600">
                  Last Updated: {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Total Production</p>
                <p className="text-xl font-bold text-green-600">
                  {(factoryData.solar.currentOutput + factoryData.wind.currentOutput + factoryData.tidal.currentOutput).toFixed(1)} MW
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Factory Diagram */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Settings className="w-5 h-5 text-blue-500" />
              Production Flow Diagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-96">
              {/* Energy Sources */}
              <div className="grid grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500 flex items-center justify-center ${isRunning ? 'animate-pulse' : ''}`}>
                    <Sun className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-yellow-700">Solar Panels</h3>
                  <p className="text-sm text-slate-600">{factoryData.solar.currentOutput.toFixed(1)} MW</p>
                  <p className="text-xs text-slate-500">{factoryData.solar.panels} panels</p>
                </div>
                
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center ${isRunning ? 'animate-spin' : ''}`}>
                    <Wind className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-700">Wind Turbines</h3>
                  <p className="text-sm text-slate-600">{factoryData.wind.currentOutput.toFixed(1)} MW</p>
                  <p className="text-xs text-slate-500">{factoryData.wind.windSpeed.toFixed(1)} m/s</p>
                </div>
                
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-teal-500 flex items-center justify-center ${isRunning ? 'animate-bounce' : ''}`}>
                    <Waves className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-teal-700">Tidal Generators</h3>
                  <p className="text-sm text-slate-600">{factoryData.tidal.currentOutput.toFixed(1)} MW</p>
                  <p className="text-xs text-slate-500">{factoryData.tidal.tideHeight.toFixed(1)}m tide</p>
                </div>
              </div>

              {/* Flow Lines */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-teal-500"></div>
                  <span className="text-sm font-medium text-slate-700">Energy Flow</span>
                  <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-purple-500"></div>
                </div>
              </div>

              {/* Electrolysis Unit */}
              <div className="text-center mb-12">
                <div className={`w-32 h-24 mx-auto mb-4 rounded-lg bg-purple-500 flex items-center justify-center ${isRunning ? 'animate-pulse' : ''}`}>
                  <Zap className="w-16 h-16 text-white" />
                </div>
                <h3 className="font-semibold text-purple-700">Electrolysis Unit</h3>
                <p className="text-sm text-slate-600">{factoryData.electrolysis.hydrogenOutput.toFixed(1)} kg/h H₂</p>
                <p className="text-xs text-slate-500">{factoryData.electrolysis.oxygenOutput.toFixed(1)} kg/h O₂</p>
              </div>

              {/* Storage */}
              <div className="text-center">
                <div className={`w-24 h-32 mx-auto mb-4 rounded-lg bg-gray-600 flex items-center justify-center ${isRunning ? 'animate-pulse' : ''}`}>
                  <Container className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-semibold text-gray-700">Carbon Fiber Storage</h3>
                <p className="text-sm text-slate-600">{factoryData.storage.currentLevel.toFixed(0)} kg stored</p>
                <p className="text-xs text-slate-500">{factoryData.storage.containers} containers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UnitCard 
            title="Solar Production"
            icon={Sun}
            data={factoryData.solar}
            color="yellow"
            onClick={setSelectedUnit}
          />
          <UnitCard 
            title="Wind Production"
            icon={Wind}
            data={factoryData.wind}
            color="blue"
            onClick={setSelectedUnit}
          />
          <UnitCard 
            title="Tidal Production"
            icon={Waves}
            data={factoryData.tidal}
            color="teal"
            onClick={setSelectedUnit}
          />
          <UnitCard 
            title="Electrolysis Unit"
            icon={Zap}
            data={factoryData.electrolysis}
            color="purple"
            onClick={setSelectedUnit}
          />
          <UnitCard 
            title="Storage System"
            icon={Container}
            data={factoryData.storage}
            color="gray"
            onClick={setSelectedUnit}
          />
        </div>

        {/* Detailed Unit Information */}
        {selectedUnit && (
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-900">{selectedUnit} - Detailed Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedUnit === 'Solar Production' && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-2">Performance Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Capacity:</span> {factoryData.solar.capacity} MW</p>
                        <p><span className="text-slate-600">Current Output:</span> {factoryData.solar.currentOutput.toFixed(1)} MW</p>
                        <p><span className="text-slate-600">Efficiency:</span> {factoryData.solar.efficiency}%</p>
                        <p><span className="text-slate-600">Working Hours:</span> {factoryData.solar.workingHours} hrs</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Environmental Data</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Temperature:</span> {factoryData.solar.temperature}°C</p>
                        <p><span className="text-slate-600">Irradiance:</span> {factoryData.solar.irradiance} W/m²</p>
                        <p><span className="text-slate-600">Panel Count:</span> {factoryData.solar.panels}</p>
                        <p><span className="text-slate-600">Charging Level:</span> {factoryData.solar.chargingLevel.toFixed(1)}%</p>
                      </div>
                    </div>
                  </>
                )}
                
                {selectedUnit === 'Wind Production' && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-2">Performance Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Capacity:</span> {factoryData.wind.capacity} MW</p>
                        <p><span className="text-slate-600">Current Output:</span> {factoryData.wind.currentOutput.toFixed(1)} MW</p>
                        <p><span className="text-slate-600">Efficiency:</span> {factoryData.wind.efficiency}%</p>
                        <p><span className="text-slate-600">Working Hours:</span> {factoryData.wind.workingHours} hrs</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Wind Conditions</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Wind Speed:</span> {factoryData.wind.windSpeed.toFixed(1)} m/s</p>
                        <p><span className="text-slate-600">Wing Size:</span> {factoryData.wind.wingSize}m diameter</p>
                        <p><span className="text-slate-600">Turbines:</span> {factoryData.wind.turbines}</p>
                        <p><span className="text-slate-600">Direction:</span> {factoryData.wind.direction}°</p>
                      </div>
                    </div>
                  </>
                )}

                {selectedUnit === 'Electrolysis Unit' && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-2">Production Data</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">H₂ Production:</span> {factoryData.electrolysis.hydrogenOutput.toFixed(1)} kg/h</p>
                        <p><span className="text-slate-600">O₂ Output:</span> {factoryData.electrolysis.oxygenOutput.toFixed(1)} kg/h</p>
                        <p><span className="text-slate-600">Efficiency:</span> {factoryData.electrolysis.efficiency}%</p>
                        <p><span className="text-slate-600">Working Hours:</span> {factoryData.electrolysis.workingHours} hrs</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Equipment Status</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Anode Age:</span> {factoryData.electrolysis.anodeAge} years</p>
                        <p><span className="text-slate-600">Cathode Age:</span> {factoryData.electrolysis.cathodeAge} years</p>
                        <p><span className="text-slate-600">Temperature:</span> {factoryData.electrolysis.temperature}°C</p>
                        <p><span className="text-slate-600">Pressure:</span> {factoryData.electrolysis.pressure} bar</p>
                      </div>
                    </div>
                  </>
                )}

                {selectedUnit === 'Storage System' && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-2">Storage Status</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Current Level:</span> {factoryData.storage.currentLevel.toFixed(0)} kg</p>
                        <p><span className="text-slate-600">Total Capacity:</span> {factoryData.storage.totalCapacity} kg</p>
                        <p><span className="text-slate-600">Utilization:</span> {((factoryData.storage.currentLevel / factoryData.storage.totalCapacity) * 100).toFixed(1)}%</p>
                        <p><span className="text-slate-600">Containers:</span> {factoryData.storage.containers}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Safety & Condition</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-600">Pressure:</span> {factoryData.storage.pressure} bar</p>
                        <p><span className="text-slate-600">Temperature:</span> {factoryData.storage.temperature}°C</p>
                        <p><span className="text-slate-600">Safety Level:</span> {factoryData.storage.safetyLevel}%</p>
                        <p><span className="text-slate-600">Fiber Integrity:</span> {factoryData.storage.carbonFiberIntegrity}%</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
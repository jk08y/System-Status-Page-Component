import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  SunMoon, 
  Search, 
  Bell,
  Filter,
  Clock,
  Link,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Server,
  Database,
  Cloud,
  Network
} from 'lucide-react';

// Comprehensive service and incident data 
const initialServices = [
  { 
    id: 1,
    name: 'Web Application', 
    status: 'operational', 
    description: 'Main application services',
    category: 'Frontend',
    lastUpdated: '2024-12-08T10:30:00Z',
    responseTime: '12ms'
  },
  { 
    id: 2,
    name: 'Database Cluster', 
    status: 'degraded', 
    description: 'Some performance bottlenecks detected', 
    category: 'Backend',
    lastUpdated: '2024-12-08T09:45:00Z',
    responseTime: '45ms'
  },
  { 
    id: 3,
    name: 'API Services', 
    status: 'operational', 
    description: 'All API endpoints functioning normally',
    category: 'Infrastructure',
    lastUpdated: '2024-12-08T11:15:00Z',
    responseTime: '18ms'
  },
  { 
    id: 4,
    name: 'Authentication', 
    status: 'outage', 
    description: 'Login services experiencing critical issues',
    category: 'Security',
    lastUpdated: '2024-12-08T08:20:00Z',
    responseTime: 'N/A'
  }
];

const pastIncidents = [
  {
    id: 1,
    date: '2024-12-05',
    service: 'Database Cluster',
    description: 'Temporary connection slowdown',
    duration: '2h 15m',
    severity: 'Low',
    resolution: 'Resolved'
  },
  {
    id: 2,
    date: '2024-11-28',
    service: 'Web Application',
    description: 'Minor backend performance issues',
    duration: '45m',
    severity: 'Medium',
    resolution: 'Resolved'
  }
];

const StatusPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedIncident, setExpandedIncident] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Status configuration with enhanced styling
  const statusConfig = {
    operational: {
      color: 'text-green-500 bg-green-50',
      icon: <CheckCircle className="inline mr-2" />,
      label: 'Operational'
    },
    degraded: {
      color: 'text-yellow-600 bg-yellow-50',
      icon: <AlertTriangle className="inline mr-2" />,
      label: 'Degraded Performance'
    },
    outage: {
      color: 'text-red-500 bg-red-50',
      icon: <XCircle className="inline mr-2" />,
      label: 'Outage'
    }
  };

  // Categories for filtering
  const categories = ['All', 'Frontend', 'Backend', 'Infrastructure', 'Security'];

  // Dynamic service filtering
  const filteredServices = initialServices.filter(service => 
    (filterCategory === 'All' || service.category === filterCategory) &&
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-refresh simulation
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Refresh every minute

    return () => clearInterval(refreshInterval);
  }, []);

  // Service icon mapping
  const getServiceIcon = (category) => {
    switch(category) {
      case 'Frontend': return <Link className="mr-2" />;
      case 'Backend': return <Server className="mr-2" />;
      case 'Infrastructure': return <Cloud className="mr-2" />;
      case 'Security': return <Network className="mr-2" />;
      default: return <Server className="mr-2" />;
    }
  };

  return (
    <div className={`
      ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}
      min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 transition-colors duration-300
    `}>
      {/* Header with Advanced Features */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center">
            <Server className="mr-3 text-blue-500" />
            System Status
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 w-4 h-4" />
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
            aria-label="Toggle Dark/Light Mode"
          >
            <SunMoon />
          </button>
        </div>
      </header>

      {/* Urgent Notification Banner */}
      {filteredServices.some(service => service.status === 'outage') && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 flex items-center animate-pulse">
          <Bell className="mr-3" />
          <p>Critical Services Experiencing Disruption</p>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-grow">
          <input 
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full p-3 rounded-lg pl-10
              ${isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-gray-100 border-gray-300 text-black'}
              border focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          <Search className="absolute left-3 top-4 text-gray-500" />
        </div>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`
              w-full sm:w-48 p-3 rounded-lg appearance-none
              ${isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-gray-100 border-gray-300 text-black'}
              border focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredServices.map((service) => (
          <div 
            key={service.id} 
            className={`
              p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105
              ${isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100'}
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {getServiceIcon(service.category)}
                <h2 className="text-lg font-semibold">{service.name}</h2>
              </div>
              <span className={`
                ${statusConfig[service.status].color} 
                px-2 py-1 rounded-full text-xs font-medium flex items-center
              `}>
                {statusConfig[service.status].icon}
                {statusConfig[service.status].label}
              </span>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p>{service.description}</p>
              <div className="flex justify-between">
                <span>Category: {service.category}</span>
                <span>Response: {service.responseTime}</span>
              </div>
              <p className="text-xs">
                Last Updated: {new Date(service.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Incident History with Expandable Details */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <RefreshCw className="mr-3" />
          Incident History
        </h2>
        <div className={`
          rounded-lg overflow-hidden
          ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
        `}>
          {pastIncidents.map((incident) => (
            <div 
              key={incident.id} 
              className={`
                p-4 border-b last:border-b-0 cursor-pointer
                ${isDarkMode 
                  ? 'border-gray-700 hover:bg-gray-700' 
                  : 'border-gray-200 hover:bg-gray-200'}
                transition duration-300 ease-in-out
              `}
              onClick={() => setExpandedIncident(
                expandedIncident === incident.id ? null : incident.id
              )}
            >
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{incident.service}</span>
                    <span 
                      className={`
                        text-xs px-2 py-1 rounded-full
                        ${incident.severity === 'Low' ? 'bg-green-200 text-green-800' : 
                          incident.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 
                          'bg-red-200 text-red-800'}
                      `}
                    >
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{incident.description}</p>
                </div>
                <button className="ml-4">
                  {expandedIncident === incident.id ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
              {expandedIncident === incident.id && (
                <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>Date:</strong> {incident.date}
                    </div>
                    <div>
                      <strong>Duration:</strong> {incident.duration}
                    </div>
                    <div>
                      <strong>Status:</strong> {incident.resolution}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2024 System Status Dashboard. All rights reserved.</p>
        <p className="mt-2 text-xs">Last Sync: {lastUpdated.toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default StatusPage;

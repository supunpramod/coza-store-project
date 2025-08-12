import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample stats data
  const stats = [
    {
      name: 'Total Users',
      value: '12,345',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Total Revenue',
      value: '$34,543',
      change: '+8.1%',
      changeType: 'positive',
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Pending Orders',
      value: '231',
      change: '-2.5%',
      changeType: 'negative',
      icon: (
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      name: 'Active Projects',
      value: '15',
      change: '+3',
      changeType: 'positive',
      icon: (
        <svg
          className="w-6 h-6 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  // Chart data for Pie and Bar
  const pieData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3, 7, 14, 10, 8, 12, 15],
        backgroundColor: '#3B82F6',
        borderRadius: 6,
      },
      {
        label: 'Users',
        data: [8, 15, 7, 12, 9, 11, 5, 18, 13, 10, 14, 16],
        backgroundColor: '#10B981',
        borderRadius: 6,
      },
    ],
  };

  // Check role from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAdmin(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === 'admin');
    } catch (err) {
      console.error('Invalid token', err);
      setIsAdmin(false);
    }
  }, []);

  // Fetch recent activity only if admin
  useEffect(() => {
    if (!isAdmin) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const res = await axios.get('https://randomuser.me/api/?results=5', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = res.data.results || [];

        const activity = users.map((user, index) => {
          const isOnline = Math.random() > 0.3;
          const actions = isOnline
            ? ['Logged in', 'Viewed dashboard', 'Updated profile', 'Created order']
            : ['Logged out', 'Session expired'];

          return {
            id: index + 1,
            user: `${user.name.first} ${user.name.last}`,
            action: actions[Math.floor(Math.random() * actions.length)],
            time: isOnline
              ? 'Just now'
              : `${Math.floor(Math.random() * 60)} minutes ago`,
            isOnline,
            avatar: user.picture.thumbnail,
          };
        });

        setRecentActivity(activity);
      } catch (err) {
        console.error('Error fetching users:', err);
        setRecentActivity([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Access denied — Admins only.
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                <span
                  className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-opacity-20 bg-gray-200">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue & Users
            </h3>
            <select className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    drawBorder: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Sources
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 space-y-2">
            {pieData.labels.map((label, index) => (
              <div
                key={label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {pieData.datasets[0].data[index]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img
                    className="h-10 w-10 rounded-full mr-4"
                    src={activity.avatar}
                    alt={activity.user}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900">
                          {activity.user
                            .split(' ')
                            .map(
                              (name) =>
                                name.charAt(0).toUpperCase() + name.slice(1)
                            )
                            .join(' ')}
                        </p>
                        <span
                          className={`ml-2 inline-block w-2 h-2 rounded-full ${
                            activity.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                          title={activity.isOnline ? 'Online' : 'Offline'}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No activity found.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

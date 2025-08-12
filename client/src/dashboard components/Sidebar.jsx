import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  FolderIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Product Manage', icon: UsersIcon, path: '/productmanage' },
  { name: 'Blog Manage', icon: FolderIcon, path: '/blogmanage' },
  { name: 'Contact Show', icon: CogIcon, path: '/contactshow' },
];

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Remove JWT and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optional: clear other app state if needed
    sessionStorage.clear();

    navigate('/login');
  };

  return (
    <div className={`
      ${sidebarOpen ? 'w-64' : 'w-20'} 
      bg-gradient-to-b from-blue-700 to-black
      text-white 
      transition-all duration-300 ease-in-out 
      h-screen flex flex-col
      shadow-xl
    `}>
      {/* Logo/Header Area */}
      <div className="p-4 flex items-center justify-between border-b border-blue-600">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold flex items-center">
            <span className="bg-white text-blue-700 rounded-lg p-1 mr-2">
              <HomeIcon className="h-5 w-5" />
            </span>
            CoZA Admin Panel
          </h1>
        ) : (
          <div className="bg-white text-blue-700 rounded-lg p-1 mx-auto">
            <HomeIcon className="h-5 w-5" />
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {sidebarOpen ? (
            <ChevronLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 flex-1 px-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              <Link
                to={item.path}
                className={`
                  flex items-center w-full p-3 
                  ${location.pathname === item.path ? 
                    'bg-blue-600 shadow-md' : 
                    'hover:bg-blue-600/70'
                  } 
                  rounded-lg transition-all
                  ${sidebarOpen ? 'justify-start' : 'justify-center'}
                `}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="ml-3 whitespace-nowrap overflow-hidden">
                    {item.name}
                  </span>
                )}
                {location.pathname === item.path && sidebarOpen && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="w-full p-3 border-t border-transparent">
        <button className={`
          flex items-center w-full p-3 
          hover:bg-blue-600/70 
          rounded-lg transition-colors
          ${sidebarOpen ? 'justify-start' : 'justify-center'}
        `}>
          <CogIcon className="h-5 w-5" />
          {sidebarOpen && <span className="ml-3">Settings</span>}
        </button>
        <button 
          onClick={handleLogout}
          className={`
            flex items-center w-full p-3 
            hover:bg-red-600/90 
            rounded-lg transition-colors mt-1
            ${sidebarOpen ? 'justify-start' : 'justify-center'}
          `}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

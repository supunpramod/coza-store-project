import { BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from "@headlessui/react";

import { Link } from 'react-router-dom';

const Topbar = ({ sidebarOpen }) => {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order received', time: '5 mins ago', read: false },
    { id: 2, text: 'Table reservation confirmed', time: '1 hour ago', read: true },
    { id: 3, text: 'New message from customer', time: '2 hours ago', read: true }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const capitalize = (str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
      const firstName = capitalize(parsedUser.firstName);
      const lastName = capitalize(parsedUser.lastName);
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm z-10 border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-1/3 min-w-[250px]">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-0 focus:ring-0 focus:outline-none w-full text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-5">
          {/* Notifications Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <BellIcon className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Notifications</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Menu.Item key={notification.id}>
                        {({ active }) => (
                          <div className={`px-4 py-3 ${!notification.read ? 'bg-blue-50' : ''} ${active ? 'bg-gray-50' : ''}`}>
                            <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        )}
                      </Menu.Item>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <Link to="/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View all notifications
                  </Link>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* User Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                  alt="User profile"
                  className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              {sidebarOpen && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {userName || 'Guest'}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500 group-hover:text-gray-700 transition-colors" />
                </div>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{userName || 'Guest'}</p>
                  <p className="text-xs text-gray-500 truncate">admin@restaurant.com</p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.href = '/login';
                        }}
                        className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-red-600`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
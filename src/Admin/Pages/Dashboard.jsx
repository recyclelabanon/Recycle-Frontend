import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  Newspaper, 
  Folder, 
  MessageSquare,
  Network,
  Mail // ✅ Added icon for newsletters
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useBlogContext } from '../Context/BlogContext';
import { useEvents } from '../Context/EventContext';
import { useNewsContext } from '../Context/NewsContext';
import { useTeamContext } from '../Context/TeamContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../Hooks/useApi';

const StatCard = ({ title, value, icon, className = "bg-white" }) => (
  <div className={`${className} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  </div>
);

function Dashboard() {
  const navigate = useNavigate();
  const { blogs } = useBlogContext();
  const { events } = useEvents();
  const { news } = useNewsContext();
  const { teams } = useTeamContext();
  const { sendRequest } = useApi();

  const [activities, setActivities] = useState([]);
  const [newsletterCount, setNewsletterCount] = useState(0); // ✅ new state for newsletter

  // ✅ Fetch newsletters count from backend
  useEffect(() => {
    const fetchNewsletterCount = async () => {
      try {
        const data = await sendRequest("https://recyclelabanonweb.onrender.com/api/newsletter");
        setNewsletterCount(data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
      }
    };
    fetchNewsletterCount();
  }, [sendRequest]);

  useEffect(() => {
    const recentActivities = [
      {
        type: 'newsletter',
        icon: <Mail className="text-red-500" size={20} />,
        title: "New newsletter subscriber joined 🎉",
        timestamp: "Just now",
      },
      {
        type: 'blog',
        icon: <FileText className="text-blue-500" size={20} />,
        title: blogs?.[0]?.title || "Recycling Tips",
        timestamp: "2 hours ago",
      },
      {
        type: 'event',
        icon: <Calendar className="text-green-500" size={20} />,
        title: events?.[0]?.title || "Beach Cleanup",
        timestamp: "5 hours ago",
      },
      {
        type: 'contact',
        icon: <MessageSquare className="text-purple-500" size={20} />,
        title: "New contact form submission",
        timestamp: "1 day ago",
      },
    ];
    setActivities(recentActivities);
  }, [blogs, events, news, teams]);

  // --- Stats Section ---
  const stats = [
    { 
      title: 'Programs', 
      value: 3, 
      icon: <Folder size={24} />, 
      className: 'bg-pink-50 hover:bg-pink-100 transition-colors' 
    },
    { 
      title: 'Blog Posts', 
      value: blogs?.length || 8, 
      icon: <FileText size={24} />, 
      className: 'bg-blue-50 hover:bg-blue-100 transition-colors' 
    },
    { 
      title: 'Events', 
      value: events?.length || 5, 
      icon: <Calendar size={24} />, 
      className: 'bg-green-50 hover:bg-green-100 transition-colors' 
    },
    { 
      title: 'News Articles', 
      value: news?.length || 12, 
      icon: <Newspaper size={24} />, 
      className: 'bg-yellow-50 hover:bg-yellow-100 transition-colors' 
    },
    { 
      title: 'Team Members', 
      value: teams?.length || 6, 
      icon: <Users size={24} />, 
      className: 'bg-purple-50 hover:bg-purple-100 transition-colors' 
    },
    { 
      title: 'Our Network Hero', 
      value: 1, 
      icon: <Network size={24} />, 
      className: 'bg-indigo-50 hover:bg-indigo-100 transition-colors' 
    },
    { 
      title: 'Our Network Partners', 
      value: 4, 
      icon: <Users size={24} />, 
      className: 'bg-teal-50 hover:bg-teal-100 transition-colors' 
    },
    { 
      title: 'Newsletter Subscribers', 
      value: newsletterCount, 
      icon: <Mail size={24} />, 
      className: 'bg-red-50 hover:bg-red-100 transition-colors' 
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md">
            <BarChart3 className="text-gray-600" />
            <span className="text-gray-600">Analytics</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            className={stat.className}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activities</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-3">
                  {activity.icon}
                  <span>
                    {activity.type === 'newsletter'
                      ? activity.title
                      : activity.type === 'blog'
                      ? `New blog post added: "${activity.title}"`
                      : activity.type === 'event'
                      ? `Event updated: "${activity.title}"`
                      : activity.title}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">Customize</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/admin/blogs')}
              className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors flex flex-col items-center"
            >
              <FileText className="mb-2" />
              <span>Create Blog Post</span>
            </button>

            <button
              onClick={() => navigate('/admin/events')}
              className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors flex flex-col items-center"
            >
              <Calendar className="mb-2" />
              <span>Add New Event</span>
            </button>

            <button
              onClick={() => navigate('/admin/news')}
              className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors flex flex-col items-center"
            >
              <Newspaper className="mb-2" />
              <span>Post News</span>
            </button>

            <button
              onClick={() => navigate('/admin/newsletter')}
              className="p-4 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 transition-colors flex flex-col items-center"
            >
              <Mail className="mb-2" />
              <span>Manage Newsletters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Dashboard;

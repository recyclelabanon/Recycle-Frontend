import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Newspaper, 
  Users, 
  Folder, 
  MessageSquare 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { name: 'Blogs', to: '/admin/blogs', icon: FileText },
  { name: 'Events', to: '/admin/events', icon: Calendar },
  { name: 'News', to: '/admin/news', icon: Newspaper },
  { name: 'Teams', to: '/admin/teams', icon: Users },
  { name: 'Programs', to: '/admin/programs', icon: Folder },
  { name: 'Contacts', to: '/admin/contacts', icon: MessageSquare },
];

function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold">RecycleLebanon Admin</h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="mr-3 h-6 w-6" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
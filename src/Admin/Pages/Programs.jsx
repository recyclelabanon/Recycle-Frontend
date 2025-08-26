import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Calendar, Users, MapPin } from 'lucide-react';



function Programs() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from an API
  const programs = [
    {
      id: '1',
      title: 'Community Recycling Initiative',
      description: 'A comprehensive program to establish recycling centers in local communities...',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      location: 'Beirut District',
      participants: 250,
      status: 'active'
    },
    {
      id: '2',
      title: 'School Environmental Education',
      description: 'Educational program teaching students about sustainability and recycling...',
      image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      location: 'Multiple Schools',
      participants: 500,
      status: 'upcoming'
    }
  ];

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Programs</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-700">
          <Plus size={20} />
          <span>New Program</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="p-1.5 bg-white rounded-full text-blue-600 hover:text-blue-800 shadow-sm">
                  <Edit2 size={16} />
                </button>
                <button className="p-1.5 bg-white rounded-full text-red-600 hover:text-red-800 shadow-sm">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(program.status)}`}>
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{program.title}</h3>
              <p className="mt-2 text-gray-600">{program.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{program.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={16} className="mr-2" />
                  <span>{program.participants} participants</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programs;
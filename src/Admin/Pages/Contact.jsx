import { useState } from 'react';
import { Search, Mail, Phone, Calendar, ExternalLink, Trash2 } from 'lucide-react';



function Contact() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from an API
  const contacts = [
    {
      id: '1',
      name: 'Maya Khoury',
      email: 'maya.khoury@email.com',
      phone: '+961 71 123 456',
      message: 'Interested in organizing a recycling workshop for our community...',
      type: 'contact',
      date: '2024-02-20',
      status: 'new'
    },
    {
      id: '2',
      name: 'Green Solutions LLC',
      email: 'partnerships@greensolutions.com',
      phone: '+961 1 987 654',
      message: 'Proposing a partnership for sustainable waste management...',
      type: 'partnership',
      date: '2024-02-19',
      status: 'in-progress'
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Requests</h1>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="all">All Types</option>
          <option value="contact">Contact</option>
          <option value="partnership">Partnership</option>
        </select>
        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="p-6 border-b last:border-b-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    contact.type === 'partnership' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2" />
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2" />
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-600">{contact.phone}</a>
                  </div>
                </div>
                <p className="mt-3 text-gray-600">{contact.message}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(contact.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                  <ExternalLink size={18} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
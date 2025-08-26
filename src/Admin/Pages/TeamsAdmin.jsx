// src/admin/Pages/Teams.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Edit, Trash, Plus } from 'lucide-react';
import { useTeamContext } from '../Context/TeamContext';

function TeamsAdmin() {
  const { teams, loading, error, deleteTeam, refreshTeams } = useTeamContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    // Ensure we have the latest data
    refreshTeams();
  }, [refreshTeams]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        setIsDeleting(true);
        await deleteTeam(id);
        // Team list should update automatically via context
      } catch (err) {
        setDeleteError('Failed to delete team member');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return <div className="p-4">Loading team members...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading team members: {error}
        <button 
          onClick={refreshTeams}
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Link
          to="/admin/teams/new"
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="mr-2" size={16} />
          Add New Member
        </Link>
      </div>

      {deleteError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {deleteError}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {teams.length > 0 ? (
            teams.map((member) => (
              <li key={member._id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 mr-4">
                      {member.profilePic && (
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={member.profilePic}
                          alt={member.fullName}
                        />
                      )}
                      {!member.profilePic && (
                        <Users className="h-12 w-12 rounded-full bg-gray-100 p-2 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{member.fullName}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <span>{member.position}</span>
                        <span className="mx-2">•</span>
                        <span>{member.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/teams/edit/${member._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(member._id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 text-center text-gray-500">
              No team members yet. Click &quot;Add New Member&quot; to create one.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TeamsAdmin;
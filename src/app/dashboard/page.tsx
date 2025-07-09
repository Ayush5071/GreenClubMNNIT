'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiEye, FiEdit3, FiTrash2, FiLogOut, FiUser, FiSettings, FiBarChart, FiFilter, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'member';
}

interface Problem {
  _id: string;
  title: string;
  description: string;
  category: 'environment' | 'campus' | 'awareness' | 'research' | 'other';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reportedBy: string;
  assignedTo?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem?: Problem;
  onSubmit: (problem: Partial<Problem>) => Promise<void>;
  currentUser: User | null;
}

const ProblemModal = ({ isOpen, onClose, problem, onSubmit, currentUser }: ProblemModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'environment' as 'environment' | 'campus' | 'awareness' | 'research' | 'other',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    status: 'open' as 'open' | 'in-progress' | 'resolved' | 'closed',
    tags: '',
  });

  useEffect(() => {
    if (problem) {
      setFormData({
        title: problem.title,
        description: problem.description,
        category: problem.category,
        priority: problem.priority,
        status: problem.status,
        tags: problem.tags.join(', '),
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'environment',
        priority: 'medium',
        status: 'open',
        tags: '',
      });
    }
  }, [problem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-700/50"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {problem ? 'Edit Problem' : 'Add New Problem'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="problem-title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              id="problem-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400"
              placeholder="Enter problem title"
              required
            />
          </div>

          <div>
            <label htmlFor="problem-description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="problem-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400"
              placeholder="Describe the problem in detail"
              required
            />
          </div>

          <div>
            <label htmlFor="problem-category" className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              id="problem-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white"
            >
              <option value="environment">Environment</option>
              <option value="campus">Campus</option>
              <option value="awareness">Awareness</option>
              <option value="research">Research</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="problem-priority" className="block text-sm font-medium text-gray-300 mb-2">
              Priority
            </label>
            <select
              id="problem-priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Status field - only show for admins when editing */}
          {problem && currentUser?.role === 'admin' && (
            <div>
              <label htmlFor="problem-status" className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                id="problem-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="problem-tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input
              id="problem-tags"
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., waste, recycling, energy"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {problem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAuth();
    fetchProblems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems');
      if (response.ok) {
        const data = await response.json();
        setProblems(data.problems);
      }
    } catch (error) {
      console.error('Fetch problems error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreateProblem = async (problemData: Partial<Problem>) => {
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problemData),
      });

      if (response.ok) {
        await fetchProblems();
      }
    } catch (error) {
      console.error('Create problem error:', error);
    }
  };

  const handleUpdateProblem = async (problemData: Partial<Problem>) => {
    if (!editingProblem) return;

    try {
      const response = await fetch(`/api/problems/${editingProblem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problemData),
      });

      if (response.ok) {
        await fetchProblems();
        setEditingProblem(null);
      }
    } catch (error) {
      console.error('Update problem error:', error);
    }
  };

  const handleDeleteProblem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    try {
      const response = await fetch(`/api/problems/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProblems();
      }
    } catch (error) {
      console.error('Delete problem error:', error);
    }
  };

  const filteredProblems = problems
    .filter(problem => {
      const matchesFilter = filter === 'all' || problem.status === filter;
      const matchesPriorityFilter = priorityFilter === 'all' || problem.priority === priorityFilter;
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesPriorityFilter && matchesSearch;
    })
    .sort((a, b) => {
      // Priority order: urgent > high > medium > low
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      // If priorities are the same, sort by creation date (newest first)
      if (priorityDiff === 0) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      return priorityDiff;
    });

  const statusCounts = {
    all: problems.length,
    open: problems.filter(p => p.status === 'open').length,
    'in-progress': problems.filter(p => p.status === 'in-progress').length,
    resolved: problems.filter(p => p.status === 'resolved').length,
    closed: problems.filter(p => p.status === 'closed').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      {/* Header */}
      <div className="bg-gray-800/70 backdrop-blur-lg shadow-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 gap-2 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-lg sm:text-2xl font-bold text-green-400 whitespace-nowrap">Green Club Dashboard</h1>
              <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">Welcome, {user?.name}</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-300 bg-green-600/20 px-2 sm:px-3 py-1 rounded-full border border-green-600/30">
                {user?.role}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-red-400 transition-colors text-xs sm:text-sm"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {Object.entries(statusCounts).map(([status, count]) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 capitalize">
                    {status.replace('-', ' ')}
                  </p>
                  <p className="text-2xl font-bold text-white">{count}</p>
                </div>
                <FiBarChart className="h-8 w-8 text-green-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Permissions Info */}
        <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="text-sm text-gray-300">
              {user?.role === 'admin' ? (
                <>
                  <span className="text-green-400 font-medium">Admin privileges:</span> You can edit/delete any problem and change their status.
                </>
              ) : (
                <>
                  <span className="text-blue-400 font-medium">Member permissions:</span> You can edit/delete only problems you created. Only admins can change problem status.
                </>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-80 bg-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              
              <label htmlFor="status-filter" className="sr-only">Filter by status</label>
              <select
                id="status-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <label htmlFor="priority-filter" className="sr-only">Filter by priority</label>
              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700/50 text-white"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">🔴 Urgent</option>
                <option value="high">🟠 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Problem</span>
            </button>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Problems ({filteredProblems.length})
            </h2>
            
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No problems found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Group problems by priority */}
                {['urgent', 'high', 'medium', 'low'].map(priority => {
                  const priorityProblems = filteredProblems.filter(p => p.priority === priority);
                  if (priorityProblems.length === 0) return null;
                  
                  return (
                    <div key={priority} className="space-y-4">
                      {/* Priority section header */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          priority === 'urgent' ? 'bg-red-500' :
                          priority === 'high' ? 'bg-orange-500' :
                          priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <h3 className="text-lg font-semibold text-white capitalize">
                          {priority} Priority ({priorityProblems.length})
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                      </div>
                      
                      {/* Problems in this priority */}
                      <div className="space-y-3 ml-6">
                        {priorityProblems.map((problem) => (
                          <motion.div
                            key={problem._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-gray-700/50 rounded-lg p-4 hover:shadow-lg transition-shadow bg-gray-700/30"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-white">{problem.title}</h4>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(problem.status)}`}>
                                    {problem.status}
                                  </span>
                                  {/* Ownership indicator */}
                                  {problem.reportedBy === user?.email && (
                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30">
                                      Your Problem
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-gray-300 mb-3 line-clamp-2">{problem.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {problem.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-600/50 text-gray-300 px-2 py-1 text-xs rounded border border-gray-600/30">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4 text-xs sm:text-sm text-gray-400 w-full">
                                  <span className="break-all">Category: {problem.category}</span>
                                  <span className="break-all">By: {problem.reportedBy}</span>
                                  <span className="truncate max-w-[120px] sm:max-w-[90px] inline-block align-bottom" title={problem.createdAt}>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                {/* Edit button - show for admin or problem owner */}
                                {(user?.role === 'admin' || problem.reportedBy === user?.email) && (
                                  <button
                                    onClick={() => {
                                      setEditingProblem(problem);
                                      setIsModalOpen(true);
                                    }}
                                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                    title="Edit problem"
                                    aria-label="Edit problem"
                                  >
                                    <FiEdit3 className="w-4 h-4" />
                                  </button>
                                )}
                                
                                {/* Delete button - show for admin or problem owner */}
                                {(user?.role === 'admin' || problem.reportedBy === user?.email) && (
                                  <button
                                    onClick={() => handleDeleteProblem(problem._id)}
                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                    title={user?.role === 'admin' ? 'Delete problem (Admin)' : 'Delete your problem'}
                                    aria-label={user?.role === 'admin' ? 'Delete problem (Admin)' : 'Delete your problem'}
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProblemModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProblem(null);
            }}
            problem={editingProblem || undefined}
            onSubmit={editingProblem ? handleUpdateProblem : handleCreateProblem}
            currentUser={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

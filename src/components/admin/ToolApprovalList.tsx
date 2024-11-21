import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

export default function ToolApprovalList() {
  const [filter, setFilter] = useState('pending');

  const { data: tools, isLoading } = useQuery({
    queryKey: ['toolSubmissions', filter],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/tools?status=${filter}`);
      return response.data;
    },
  });

  const handleApprove = async (toolId: string) => {
    try {
      await axios.post(`/api/admin/tools/${toolId}/approve`);
      // Refetch tools
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  const handleReject = async (toolId: string) => {
    try {
      await axios.post(`/api/admin/tools/${toolId}/reject`);
      // Refetch tools
    } catch (error) {
      console.error('Error rejecting tool:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Tool Submissions</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {tools?.map((tool) => (
            <li key={tool.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{tool.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>Submitted by {tool.developer.name}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDistanceToNow(new Date(tool.submittedAt))} ago</span>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <button
                    onClick={() => handleApprove(tool.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(tool.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
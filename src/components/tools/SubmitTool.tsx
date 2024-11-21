import { useState } from 'react';
import { Tool } from '../../types';

export default function SubmitTool() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    repository: '',
    proposedCredits: 1,
    port: 3000,
    env: {},
    memory: '512Mi',
    cpu: '0.5',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    const submission = {
      ...formData,
      status: 'pending',
      submittedAt: new Date(),
      developer: {
        id: 'current-user-id',
        name: 'Developer Name',
        email: 'dev@example.com',
      },
    };
    console.log('Tool submission:', submission);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Submit Your Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Tool Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          >
            <option value="">Select a category</option>
            <option value="NLP">Natural Language Processing</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Audio">Audio Processing</option>
            <option value="Video">Video Processing</option>
            <option value="File Conversion">File Conversion</option>
          </select>
        </div>

        <div>
          <label htmlFor="repository" className="block text-sm font-medium text-gray-700">
            GitHub Repository URL
          </label>
          <input
            type="url"
            id="repository"
            value={formData.repository}
            onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="proposedCredits" className="block text-sm font-medium text-gray-700">
            Proposed Credit Cost per Use
          </label>
          <input
            type="number"
            id="proposedCredits"
            min="1"
            value={formData.proposedCredits}
            onChange={(e) => setFormData({ ...formData, proposedCredits: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Container Configuration</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                Application Port
              </label>
              <input
                type="number"
                id="port"
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="memory" className="block text-sm font-medium text-gray-700">
                Memory Limit
              </label>
              <input
                type="text"
                id="memory"
                value={formData.memory}
                onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="cpu" className="block text-sm font-medium text-gray-700">
                CPU Limit
              </label>
              <input
                type="text"
                id="cpu"
                value={formData.cpu}
                onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Submit Tool for Review
        </button>
      </form>
    </div>
  );
}
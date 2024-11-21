import { useState } from 'react';
import { ToolSubmission } from '../../types';

interface ToolApprovalProps {
  submission: ToolSubmission;
  onApprove: (id: string, config: any) => void;
  onReject: (id: string, notes: string) => void;
}

export default function ToolApproval({ submission, onApprove, onReject }: ToolApprovalProps) {
  const [reviewNotes, setReviewNotes] = useState('');
  const [config, setConfig] = useState({
    creditCost: submission.proposedCredits,
    subdomain: submission.toolName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    containerConfig: submission.containerConfig,
  });

  const handleApprove = () => {
    onApprove(submission.id, config);
  };

  const handleReject = () => {
    onReject(submission.id, reviewNotes);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Tool Submission Review</h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>Submitted by: {submission.developer.name}</p>
            <p>Submitted at: {new Date(submission.submittedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-md font-medium text-gray-900">Tool Details</h4>
          <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{submission.toolName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">{submission.category}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{submission.description}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Repository</dt>
              <dd className="mt-1 text-sm text-gray-900">{submission.repository}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-md font-medium text-gray-900">Configuration</h4>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Credit Cost per Use
              </label>
              <input
                type="number"
                value={config.creditCost}
                onChange={(e) => setConfig({ ...config, creditCost: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subdomain
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={config.subdomain}
                  onChange={(e) => setConfig({ ...config, subdomain: e.target.value })}
                  className="block w-full rounded-l-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  .aigeniusworks.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700">
            Review Notes
          </label>
          <textarea
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Approve & Deploy
          </button>
        </div>
      </div>
    </div>
  );
}
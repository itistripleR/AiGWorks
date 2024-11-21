import { Star } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onUseTool: (tool: Tool) => void;
  userCredits: { free: number; paid: number };
}

export default function ToolCard({ tool, onUseTool, userCredits }: ToolCardProps) {
  const totalCredits = userCredits.free + userCredits.paid;
  const canUseTool = totalCredits >= tool.creditCost;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {tool.category}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(tool.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {tool.rating} ({tool.usageCount.toLocaleString()} uses)
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span>By {tool.developer}</span>
            <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
              {tool.creditCost} credits
            </span>
          </div>
          <button
            onClick={() => onUseTool(tool)}
            disabled={!canUseTool}
            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
              canUseTool
                ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                : 'text-gray-400 bg-gray-100 cursor-not-allowed'
            }`}
          >
            {canUseTool ? 'Try Now' : 'Insufficient Credits'}
          </button>
        </div>
      </div>
    </div>
  );
}
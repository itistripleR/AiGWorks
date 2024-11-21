import { Activity, Heart, History } from 'lucide-react';
import ToolCard from './ToolCard';
import CreditDisplay from './CreditDisplay';
import { Tool } from '../types';
import { useState } from 'react';

const popularTools: Tool[] = [
  {
    id: '1',
    name: 'TextGenius',
    description: 'Advanced NLP model for text generation and analysis',
    category: 'NLP',
    icon: 'text',
    developer: 'AI Labs',
    rating: 4.8,
    usageCount: 15000,
    creditCost: 2
  },
  {
    id: '2',
    name: 'VisionPro',
    description: 'State-of-the-art computer vision for object detection',
    category: 'Computer Vision',
    icon: 'camera',
    developer: 'Vision AI',
    rating: 4.9,
    usageCount: 12000,
    creditCost: 3
  }
];

export default function Dashboard() {
  const [userCredits, setUserCredits] = useState({
    free: 10,
    paid: 0,
    lastFreeCredit: new Date(),
    unusedDays: 0
  });

  const handleUseTool = (tool: Tool) => {
    setUserCredits(prev => {
      const newCredits = { ...prev };
      const cost = tool.creditCost;

      if (newCredits.free >= cost) {
        newCredits.free -= cost;
      } else {
        const remainingCost = cost - newCredits.free;
        newCredits.free = 0;
        newCredits.paid -= remainingCost;
      }

      return newCredits;
    });
  };

  return (
    <div className="flex">
      <div className="flex-1 max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <CreditDisplay
            freeCredits={userCredits.free}
            paidCredits={userCredits.paid}
            lastUpdated={userCredits.lastFreeCredit}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Popular Tools</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onUseTool={handleUseTool}
                userCredits={{ free: userCredits.free, paid: userCredits.paid }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-64 flex-shrink-0 border-l border-gray-200 bg-white p-4">
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Total Usage</p>
                <p className="text-lg font-semibold text-gray-900">2,345</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Favorites</p>
                <p className="text-lg font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <History className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Recent Tools</p>
                <p className="text-lg font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
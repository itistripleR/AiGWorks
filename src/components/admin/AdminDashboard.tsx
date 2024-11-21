import { useState } from 'react';
import { Tabs, Tab } from '@headlessui/react';
import { Settings, Users, Box, Activity } from 'lucide-react';
import ToolApprovalList from './ToolApprovalList';
import CreditManagement from './CreditManagement';
import UserManagement from './UserManagement';
import Analytics from './Analytics';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Tool Approvals', icon: Box, component: ToolApprovalList },
    { name: 'Credit Management', icon: Settings, component: CreditManagement },
    { name: 'User Management', icon: Users, component: UserManagement },
    { name: 'Analytics', icon: Activity, component: Analytics },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <Tabs
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
          className="space-y-6"
        >
          <Tabs.List className="flex space-x-4 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <Tabs.Tab
                key={tab.name}
                className={`${
                  selectedTab === index
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panels>
            {tabs.map((tab, index) => (
              <Tabs.Panel key={index}>
                <tab.component />
              </Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </div>
    </div>
  );
}
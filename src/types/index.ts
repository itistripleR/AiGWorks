export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'NLP' | 'Computer Vision' | 'Audio' | 'Video' | 'File Conversion';
  icon: string;
  developer: string;
  rating: number;
  usageCount: number;
  creditCost: number;
  status: 'pending' | 'approved' | 'rejected';
  repository: string;
  subdomain: string;
  containerConfig?: {
    port: number;
    env: Record<string, string>;
    memory: string;
    cpu: string;
  };
}

export interface ToolSubmission {
  id: string;
  toolName: string;
  description: string;
  category: Tool['category'];
  repository: string;
  developer: {
    id: string;
    name: string;
    email: string;
  };
  proposedCredits: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewNotes?: string;
  containerConfig?: {
    port: number;
    env: Record<string, string>;
    memory: string;
    cpu: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  role: 'user' | 'developer' | 'admin';
  favorites: string[];
  credits: {
    free: number;
    paid: number;
    lastFreeCredit: Date;
    unusedDays: number;
  };
}
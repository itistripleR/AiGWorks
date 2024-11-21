import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, Play, Flag, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ToolDetail() {
  const { id } = useParams();
  const [review, setReview] = useState<'loved' | 'liked' | 'notForMe' | null>(null);

  // Mock data - replace with actual API call
  const tool = {
    id,
    name: 'AI Image Generator',
    description: 'Create stunning images using state-of-the-art AI models',
    coverImage: 'https://source.unsplash.com/random/1920x1080/?ai,technology',
    credits: 5,
    author: 'AI Labs',
    rating: 4.8,
    reviews: 1234,
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative">
        <div className="aspect-video w-full">
          <img
            src={tool.coverImage}
            alt={tool.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">{tool.name}</h1>
            <p className="text-lg text-white/80 mb-6">{tool.description}</p>
            
            <div className="flex items-center space-x-6">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-purple-700">
                <Play className="h-5 w-5" />
                <span>Launch ({tool.credits} credits)</span>
              </button>
              
              <button className="text-white hover:text-purple-400">
                <Heart className="h-6 w-6" />
              </button>
              
              <div className="flex items-center text-white">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{tool.rating} ({tool.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Rate this tool</h3>
          <div className="flex space-x-4">
            {[
              { value: 'loved', label: 'Loved it!', color: 'bg-pink-600' },
              { value: 'liked', label: 'Like this', color: 'bg-blue-600' },
              { value: 'notForMe', label: 'Not for me', color: 'bg-gray-600' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setReview(option.value as any)}
                className={`${
                  review === option.value ? option.color : 'bg-gray-700'
                } text-white px-4 py-2 rounded-lg transition-colors`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-white/80">
          <div className="flex items-center space-x-4">
            <span>By {tool.author}</span>
            <button className="flex items-center space-x-2 hover:text-white">
              <MessageCircle className="h-5 w-5" />
              <span>Contact Developer</span>
            </button>
          </div>
          
          <button className="flex items-center space-x-2 text-red-500 hover:text-red-400">
            <Flag className="h-5 w-5" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
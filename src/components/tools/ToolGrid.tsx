import { motion } from 'framer-motion';
import { Heart, Star, Play, Flag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Tool {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  credits: number;
  author: string;
  rating: number;
}

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {tools.map((tool) => (
        <motion.div
          key={tool.id}
          className="relative aspect-video rounded-lg overflow-hidden"
          onHoverStart={() => setHoveredTool(tool.id)}
          onHoverEnd={() => setHoveredTool(null)}
          whileHover={{ scale: 1.05 }}
        >
          <Link to={`/tool/${tool.id}`}>
            <img
              src={tool.coverImage}
              alt={tool.name}
              className="w-full h-full object-cover"
            />
            
            {hoveredTool === tool.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end"
              >
                <h3 className="text-white text-lg font-bold">{tool.name}</h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-2">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-purple-400">
                      <Heart className="h-5 w-5" />
                    </button>
                    <div className="flex items-center text-white">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {tool.rating}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">{tool.credits} credits</span>
                    <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
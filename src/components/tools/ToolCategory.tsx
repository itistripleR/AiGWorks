import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ToolGrid from './ToolGrid';

interface ToolCategoryProps {
  title: string;
  tools: any[];
}

export default function ToolCategory({ title, tools }: ToolCategoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="px-8 mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-hidden relative"
      >
        <motion.div
          className="flex space-x-4 px-8"
          drag="x"
          dragConstraints={scrollRef}
        >
          <ToolGrid tools={tools} />
        </motion.div>
      </div>
    </div>
  );
}
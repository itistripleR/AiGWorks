import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ToolCategory from '../components/tools/ToolCategory';

export default function HomePage() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['toolCategories'],
    queryFn: async () => {
      const response = await axios.get('/api/tools/categories');
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {categories?.map((category) => (
        <ToolCategory
          key={category.id}
          title={category.name}
          tools={category.tools}
        />
      ))}
    </div>
  );
}
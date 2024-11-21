import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
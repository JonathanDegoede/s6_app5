import { QueryClient, QueryClientProvider } from 'react-query';
import History from './History';
import LedControl from './LedControl';

const App = () => {

  const queryClient = new QueryClient();

  return (
    <div>
      <h1>
        Covid Tracker App
      </h1>
      <QueryClientProvider client={queryClient}>
        <History/>
        <LedControl/>
      </QueryClientProvider>
    </div>
  );
}

export default App;

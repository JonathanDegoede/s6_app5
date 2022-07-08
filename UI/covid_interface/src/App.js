import History from './History';
import LedControl from './LedControl';
import { QueryClient } from '../node_modules/react-query/es/core/index';
import { QueryClientProvider } from '../node_modules/react-query/es/react/QueryClientProvider';
import { Box } from '../node_modules/@mui/material/index';

const App = () => {

  const queryClient = new QueryClient();

  return (
    <Box sx={{margin: "20px"}}>
      <Box component={"h1"} sx={{fontFamily: "Roboto"}}>
        <span>Covid Tracker App</span>
      </Box>
      <QueryClientProvider client={queryClient}>
        <History/>
        <LedControl/>
      </QueryClientProvider>
    </Box>
  );
}

export default App;

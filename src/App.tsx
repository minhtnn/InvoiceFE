import { BrowserRouter } from 'react-router-dom';

import AppProvider from './providers/app-provider';
import { AppRoutes } from './routes/routes';

function App ()
{

  return (
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
  )
}

export default App

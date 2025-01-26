import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <Toaster position="top-right" reverseOrder={false} />

            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);

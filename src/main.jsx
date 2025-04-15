import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LoginUserProvider} from "./provider/LoginUserProvider.jsx";

const queryClinet=new QueryClient()
createRoot(document.getElementById('root')).render(
      <QueryClientProvider client={queryClinet}>
          <LoginUserProvider>
              <App />
          </LoginUserProvider>
      </QueryClientProvider>
)

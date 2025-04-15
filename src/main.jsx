import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LoginUserProvider} from "./provider/LoginUserProvider.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClinet=new QueryClient()
createRoot(document.getElementById('root')).render(
      <QueryClientProvider client={queryClinet}>
          <GoogleOAuthProvider clientId={"966155629484-9n0o3kfb6h2nhfcoitovunlr18muq7ij.apps.googleusercontent.com"}>
              <LoginUserProvider>
                  <App />
              </LoginUserProvider>
          </GoogleOAuthProvider>
      </QueryClientProvider>
)

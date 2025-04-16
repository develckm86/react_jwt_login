import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LoginUserProvider} from "./provider/LoginUserProvider.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient=new QueryClient()
createRoot(document.getElementById('root')).render(
      <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={"966155629484-f6brj2njj75b8emskamh6mdq8upe0faq.apps.googleusercontent.com"}>
              <LoginUserProvider>
                  <App />
              </LoginUserProvider>
          </GoogleOAuthProvider>
      </QueryClientProvider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query'

import OrderContextProvider from './components/context/OrderContext'
import UserContextProvider from './components/context/User.jsx'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <OrderContextProvider>
            <ToastContainer />
           <App/>
          </OrderContextProvider>
        </UserContextProvider>
  
  </QueryClientProvider>
)

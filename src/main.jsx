import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store,persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store = {store}>
  <ChakraProvider>
    <PersistGate persistor={persistor}>
    <App /> 
    </PersistGate>
    </ChakraProvider>
  </Provider>
  
    </BrowserRouter>
)

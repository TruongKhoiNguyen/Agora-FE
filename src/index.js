import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react'

import theme from './styles/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider resetCSS theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
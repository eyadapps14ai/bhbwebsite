import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import App from './App.jsx';
import AboutPage from './AboutPage.jsx';
const root=document.getElementById('root');
const Page=/^\/about\/?$/.test(window.location.pathname)?AboutPage:App;
if(root.hasChildNodes())hydrateRoot(root,<Page/>);else createRoot(root).render(<Page/>);

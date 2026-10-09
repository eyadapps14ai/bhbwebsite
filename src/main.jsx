import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import App from './App.jsx';
import AboutPage from './AboutPage.jsx';
import ShowcasePage,{SpacesPage} from './ShowcasePage.jsx';
const root=document.getElementById('root');
const path=window.location.pathname.replace(/\/$/,'');
const Page=path==='/about'?AboutPage:path==='/expertise'?ShowcasePage:path==='/spaces'?SpacesPage:App;
if(root.hasChildNodes())hydrateRoot(root,<Page/>);else createRoot(root).render(<Page/>);

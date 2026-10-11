import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import App from './App.jsx';
import AboutPage from './AboutPage.jsx';
import ShowcasePage,{SpacesPage} from './ShowcasePage.jsx';
const root=document.getElementById('root');
const path=window.location.pathname.replace(/\/$/,'');
const dashboard=import.meta.env.VITE_BHB_DASHBOARD_URL||(import.meta.env.DEV?'http://127.0.0.1:5173/':'');
if(path==='/admin'&&dashboard)window.location.replace(dashboard);
else{const Page=path==='/about'?AboutPage:path==='/expertise'?ShowcasePage:path==='/spaces'?SpacesPage:App;
if(root.hasChildNodes())hydrateRoot(root,<Page/>);else createRoot(root).render(<Page/>);}

import fs from 'node:fs/promises';
import {build, createServer} from 'vite';
import {renderToString} from 'react-dom/server';
import React from 'react';
await build();
const server=await createServer({server:{middlewareMode:true,hmr:false,ws:false},optimizeDeps:{noDiscovery:true,include:[]},appType:'custom'});
try {
 const {default:App}=await server.ssrLoadModule('/src/App.jsx');
 const {default:AboutPage,aboutMeta}=await server.ssrLoadModule('/src/AboutPage.jsx');
 const {default:ExpertisePage,SpacesPage,expertiseMeta,spacesMeta}=await server.ssrLoadModule('/src/ShowcasePage.jsx');
 const {faqs}=await server.ssrLoadModule('/src/content.js');
 const template=await fs.readFile('dist/index.html','utf8');
 const domain=process.env.BHB_SITE_URL || 'https://www.bhbcentre.com';
 const url=new URL(domain);if(url.protocol!=='https:')throw new Error('BHB_SITE_URL must use HTTPS');const base=url.origin;
 const organization={'@type':'Organization','@id':base+'/#organization',name:'BHB Business Hub',description:'BHB Business Hub is a business centre in Dubai, United Arab Emirates, offering company formation, business support, accounting and VAT support, and flexible office solutions.',slogan:'The Art of All Business Needs.',areaServed:{'@type':'City',name:'Dubai'},url:base+'/',logo:base+'/brand/logo.svg'};
 const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
 for(const page of [{path:'/',component:App,file:'dist/index.html'},{path:'/about/',component:AboutPage,file:'dist/about/index.html',meta:aboutMeta},{path:'/expertise/',component:ExpertisePage,file:'dist/expertise/index.html',meta:expertiseMeta},{path:'/spaces/',component:SpacesPage,file:'dist/spaces/index.html',meta:spacesMeta}]){
  let html=template.replace('<div id="root"></div>',`<div id="root">${renderToString(React.createElement(page.component))}</div>`);
  if(page.meta){html=html.replace(/<title>.*?<\/title>/,`<title>${escape(page.meta.title)}</title>`).replace(/<meta name="description" content="[^"]*"\/>/,`<meta name="description" content="${escape(page.meta.description)}"/>`).replace(/<meta property="og:title" content="[^"]*"\/>/,`<meta property="og:title" content="${escape(page.meta.title)}"/>`).replace(/<meta property="og:description" content="[^"]*"\/>/,`<meta property="og:description" content="${escape(page.meta.description)}"/>`).replace(/<meta name="twitter:title" content="[^"]*"\/>/,`<meta name="twitter:title" content="${escape(page.meta.title)}"/>`).replace(/<meta name="twitter:description" content="[^"]*"\/>/,`<meta name="twitter:description" content="${escape(page.meta.description)}"/>`);}
  const graph=page.meta?[organization,{'@type':page.path==='/about/'?'AboutPage':'CollectionPage','@id':base+page.path+'#page',url:base+page.path,name:page.meta.title,description:page.meta.description,about:{'@id':organization['@id']},inLanguage:'en'}]:[organization,{'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}];
  const schema=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');
  html=html.replace('</head>',`<script type="application/ld+json">${schema}</script><link rel="canonical" href="${base+page.path}"/><meta property="og:url" content="${base+page.path}"/><meta property="og:image" content="${base}/brand/social-preview.png"/><meta name="twitter:image" content="${base}/brand/social-preview.png"/></head>`);
  if(page.meta)await fs.mkdir('dist'+page.path,{recursive:true});
  await fs.writeFile(page.file,html);
 }
 await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
 await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url><url><loc>${base}/about/</loc></url><url><loc>${base}/expertise/</loc></url><url><loc>${base}/spaces/</loc></url></urlset>`);
 console.log('Homepage, About Us, Our Expertise and Our Spaces pre-rendered with page-specific metadata, schema, canonical URLs and sitemap.');
}finally{await server.close();}

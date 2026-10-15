// Serves the built site (dist/) on Cloud Run, which sets PORT. /admin goes to the BHB dashboard.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {extname,join,normalize} from 'node:path';
const root=new URL('./dist/',import.meta.url).pathname,dashboard=process.env.BHB_DASHBOARD_URL||'',port=Number(process.env.PORT)||8080;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.mp3':'audio/mpeg'};
const base={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
async function find(path){try{return (await stat(path)).isDirectory()?find(join(path,'index.html')):path}catch{return null}}
createServer(async(req,res)=>{
 const send=(status,headers,body)=>{res.writeHead(status,{...base,...headers});res.end(req.method==='HEAD'?undefined:body)};
 if(req.method!=='GET'&&req.method!=='HEAD')return send(405,{Allow:'GET, HEAD'});
 let url,path;try{url=new URL(req.url,'http://site');path=decodeURIComponent(url.pathname)}catch{return send(400,{})}
 if(/^\/admin\/?$/.test(path)&&dashboard)return send(302,{Location:dashboard,'Cache-Control':'no-store'});
 const target=normalize(join(root,path));
 if(!target.startsWith(root))return send(400,{});
 const file=await find(target);
 if(!file)return send(404,{'Content-Type':'text/html; charset=utf-8'},'<!doctype html><title>Page not found</title><p>Page not found. <a href="/">Go to the BHB homepage</a>.</p>');
 // Folder pages (/about) need a trailing slash so their relative links resolve.
 if(file.endsWith('/index.html')&&!target.endsWith('index.html')&&!path.endsWith('/'))return send(301,{Location:path+'/'+url.search});
 send(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':path.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache'},await readFile(file));
}).listen(port,()=>console.log('BHB website listening on port '+port));

import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('/Users/khaledaladdin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const generated='/Users/khaledaladdin/.codex/generated_images/01a11c7d-1f14-75d2-b29a-12edb89bb579/';
const assets=[
 ['ahmed','/Users/khaledaladdin/Downloads/attachments/2826243.jpg',true],
 ['fasia','media/retouched/fasia-background-v2.png',false],
 ['reception','media/retouched/reception-plants-tv-v5.png'],
 ['private',generated+'exec-1d7f128a-2c36-44c7-be84-4b49bcfc4969.png'],
 ['shared',generated+'exec-cb1cbaa1-f77a-4ae2-9a9e-c95b38c4f4fc.png'],
 ['meeting',generated+'exec-70c7116a-0178-4206-94fc-585d3509aeab.png'],
 ['daylight',generated+'exec-eb8b1325-13e0-420f-a678-14c92ad175ed.png']
];
await fs.mkdir('public/photos',{recursive:true});
const manifest=[];
for(const [id,source,portrait] of assets){
 const metadata=await sharp(source).metadata();
 for(const size of [480,960,1440]){
  let pipeline=sharp(source).rotate();
  if(portrait){const height=Math.round(metadata.width*1.25);const top=id==='ahmed'?180:60;pipeline=pipeline.extract({left:0,top,width:metadata.width,height:Math.min(height,metadata.height-top)});}
  const out=`public/photos/${id}-${size}.webp`;
  const info=await pipeline.resize({width:size,withoutEnlargement:true}).webp({quality:84,effort:5}).toFile(out);
  manifest.push({id,file:out,width:info.width,height:info.height,bytes:info.size});
 }
}
await fs.writeFile('public/photos/manifest.json',JSON.stringify(manifest,null,2));
console.log('Optimized',manifest.length,'files:',Math.round(manifest.reduce((n,a)=>n+a.bytes,0)/1024),'KB total. Originals unchanged.');

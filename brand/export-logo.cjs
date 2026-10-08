const fs=require('fs');
const path=require('path');
const sharp=require('/Users/khaledaladdin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const {createCanvas,GlobalFonts}=require('/Users/khaledaladdin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
GlobalFonts.registerFromPath('/System/Library/Fonts/Supplemental/Arial.ttf','Arial');
GlobalFonts.registerFromPath('/System/Library/Fonts/Supplemental/Arial Bold.ttf','Arial');
const ctx=createCanvas(300,190).getContext('2d');
function tracked(text,y,size,weight,spacing,ink){ctx.font=`${weight} ${size}px Arial`;const widths=[...text].map(c=>ctx.measureText(c).width);let x=150-(widths.reduce((a,b)=>a+b,0)+spacing*(text.length-1))/2;return [...text].map((c,i)=>{const out=c===' '?'':`<text x="${x}" y="${y}" fill="${ink}" font-family="Arial" font-weight="${weight}" font-size="${size}">${c}</text>`;x+=widths[i]+spacing;return out}).join('');}
const root=path.join(__dirname,'logo');
const b='M5 5h44c28 0 35 29 18 42 22 13 14 42-15 42H5V5zm16 15v20h26c16 0 17-20 0-20H21zm0 35v19h29c16 0 16-19 0-19H21zM165 5h44c28 0 35 29 18 42 22 13 14 42-15 42h-47V5zm16 15v20h26c16 0 17-20 0-20h-26zm0 35v19h29c16 0 16-19 0-19h-29z';
const h='M88 5h15v84H88zM140 5h15v84h-15zM108 43l14-14 13 14v25l-13-16-14 16z';
function svg(ink,gold,full=true,bg=null){return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${full?760:490}" viewBox="0 0 300 ${full?190:122.5}"><title>BHB Business Hub Business Centre</title>${bg?`<rect width="300" height="190" fill="${bg}"/>`:''}<g transform="translate(29 14)"><path fill="${ink}" fill-rule="evenodd" d="${b}"/><path fill="${gold}" d="${h}"/></g>${full?tracked('BUSINESS HUB',142,22,600,5.3,ink)+tracked('BUSINESS CENTRE',165,10.5,400,6,ink):''}</svg>`}
(async()=>{
for(const [name,ink,gold] of [['ivory-gold','#fffff0','#c5a36a'],['black-gold','#10100e','#c5a36a'],['all-black','#000000','#000000'],['all-white','#ffffff','#ffffff']]){
for(const full of [true,false]){const base=`BHB-${full?'full-logo':'monogram'}-${name}`;const s=svg(ink,gold,full);fs.writeFileSync(path.join(root,base+'.svg'),s);await sharp(Buffer.from(s)).resize({width:3200}).png().toFile(path.join(root,base+'.png'));}
}
await sharp(Buffer.from(svg('#fffff0','#c5a36a',true,'#141713'))).png().toFile(path.join(root,'BHB-preview-dark.png'));
await sharp(Buffer.from(svg('#10100e','#c5a36a',true,'#f2eee5'))).png().toFile(path.join(root,'BHB-preview-light.png'));
fs.writeFileSync(path.join(root,'BRAND-README.txt'),`BHB BUSINESS HUB — OFFICIAL LOGO ASSET PACK\n\nExtracted from the approved Phase 1 website mark.\nThe B letterforms and architectural gold H are unchanged.\n\nPRIMARY: BHB-full-logo-black-gold.svg on light backgrounds.\nREVERSED: BHB-full-logo-ivory-gold.svg on dark backgrounds.\nMONOGRAM: compact BHB mark for small applications.\nALL-BLACK / ALL-WHITE: single-colour printing and production.\n\nSVG: scalable vector artwork. BHB symbol is defined as vector paths.\nDescriptor text uses Arial/Helvetica; outline text in your design\nsoftware before supplying final artwork to a sign or print vendor.\nPNG: 3200 pixels wide with transparent background.\nPreview files have solid backgrounds and are for reference only.\n\nChampagne gold #C5A36A\nBlack #10100E\nCharcoal #141713\nIvory #FFFFF0\n\nKeep the proportions intact. Do not stretch, add effects or replace\nthe central H. Leave at least the width of one gold vertical column\naround the logo. Use the monogram when the descriptor becomes illegible.\n\nThis package is artwork preparation, not trademark registration.\n`);
})();

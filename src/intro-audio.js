// Original procedural soundtrack: no external audio files or licensed recordings.
export function createIntroAudio(){
 const AudioContext=window.AudioContext||window.webkitAudioContext;
 if(!AudioContext)return null;
 const ctx=new AudioContext();const master=ctx.createGain();master.gain.value=.24;master.connect(ctx.destination);
 const voices=[];const timers=[];let stopped=false;
 const noise=(duration,frequency,gain)=>{const n=Math.ceil(ctx.sampleRate*duration);const buffer=ctx.createBuffer(1,n,ctx.sampleRate);const data=buffer.getChannelData(0);for(let i=0;i<n;i++)data[i]=(Math.random()*2-1)*(1-i/n);const source=ctx.createBufferSource();source.buffer=buffer;const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=frequency;const volume=ctx.createGain();volume.gain.value=gain;source.connect(filter);filter.connect(volume);volume.connect(master);source.start();voices.push(source)};
 const tone=(frequency,duration,gain,type='sine')=>{const oscillator=ctx.createOscillator(),volume=ctx.createGain();oscillator.type=type;oscillator.frequency.value=frequency;volume.gain.setValueAtTime(0,ctx.currentTime);volume.gain.linearRampToValueAtTime(gain,ctx.currentTime+.3);volume.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);oscillator.connect(volume);volume.connect(master);oscillator.start();oscillator.stop(ctx.currentTime+duration);voices.push(oscillator)};
 return {async start(){await ctx.resume();[146.83,220,293.66,440].forEach((frequency,i)=>tone(frequency,9,.12/(i+1)));},door(){if(stopped)return;noise(1.7,420,.36);tone(73.42,1.8,.12);},step(){if(stopped)return;noise(.16,800,.3);tone(85,.25,.11);},stop(){if(stopped)return;stopped=true;timers.forEach(clearTimeout);master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(.0001,ctx.currentTime,.045);setTimeout(()=>ctx.close().catch(()=>{}),250);}};
}

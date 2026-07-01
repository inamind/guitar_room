const fs = require('fs');

['chord-progression.html', 'scale-finder.html', 'triad-shell.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>\n<script src="guitar-synth.js"></script>');
  content = content.replace(/synth\s*=\s*new\s*Tone\.PolySynth\([\s\S]*?\}\)\.toDestination\(\);/m, 'synth = await getGuitarSynth();');
  content = content.replace(/synth\s*=\s*new\s*Tone\.PolySynth\([\s\S]*?\}\);/m, 'synth = await getGuitarSynth();');
  content = content.replace(/synth\.volume\.value\s*=\s*-[0-9]+;/m, '');
  content = content.replace(/delayEffect\s*=\s*new\s*Tone\.FeedbackDelay\([\s\S]*?\.toDestination\(\);/m, '');
  content = content.replace(/synth\.connect\(delayEffect\);/m, '');
  content = content.replace(/synth\.toDestination\(\);/m, '');
  fs.writeFileSync(file, content);
});
console.log('done');

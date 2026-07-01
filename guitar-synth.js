let _guitarSampler = null;
let _guitarReverb = null;
let _guitarPromise = null;

async function getGuitarSynth() {
    if (_guitarSampler) return _guitarSampler;
    
    // Use a promise to prevent multiple concurrent initializations
    if (_guitarPromise) return _guitarPromise;

    _guitarPromise = new Promise(async (resolve, reject) => {
        try {
            // Create Reverb
            _guitarReverb = new Tone.Reverb({
                decay: 3.5,
                preDelay: 0.01
            }).toDestination();
            await _guitarReverb.generate();

            _guitarSampler = new Tone.Sampler({
                urls: {
                    "E2": "E2.mp3",
                    "A2": "A2.mp3",
                    "C3": "C3.mp3",
                    "E3": "E3.mp3",
                    "A3": "A3.mp3",
                    "C4": "C4.mp3",
                    "F4": "F4.mp3"
                },
                baseUrl: "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/guitar-acoustic/",
                onload: () => {
                    _guitarSampler.connect(_guitarReverb);
                    _guitarSampler.volume.value = -2;
                    resolve(_guitarSampler);
                },
                onerror: (e) => reject(e)
            });
        } catch (e) {
            reject(e);
        }
    });

    return _guitarPromise;
}

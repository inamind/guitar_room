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
                    "E2": "E2.wav",
                    "A2": "A2.wav",
                    "C3": "C3.wav",
                    "E3": "E3.wav",
                    "A3": "A3.wav",
                    "C4": "C4.wav",
                    "F4": "F4.wav"
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

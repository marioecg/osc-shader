import GUI from 'lil-gui'

const params = {
    zoom: 1.0,
    progress: 0,
    brightness: { r: 0.5, g: 0.5, b: 0.5 },
    contrast: { r: 0.5, g: 0.5, b: 0.5 },
    oscillation: { r: 1.0, g: 1.0, b: 1.0 },
    phase: { r: 0.01, g: 0.02, b: 0.03 },
}

/* --------------------------------- Socket --------------------------------- */
const socket = new WebSocket('ws://192.168.1.11:8081')

socket.addEventListener('open', () => {
    console.log('Connected to OSC bridge')

    // Send initial values as soon as it opens the socket
    for (const key in params) {
        let value = params[key]

        // If it's an object with r/g/b/a, convert it to an array
        if (typeof value === 'object' && value !== null) {
            // Extract RGB(A) in order
            value = Object.values(value)
        } else {
            // Make sure single floats are also arrays
            value = [value]
        }

        sendOSC(`u_${key}`, value)
    }
})

socket.addEventListener('error', (err) => console.error('WebSocket error:', err))

function sendOSC(address, value) {
    if (socket.readyState !== WebSocket.OPEN) return

    const msg = {
        address,
        // Ensure value is always an array (even for single numbers)
        value: Array.isArray(value) ? value : [value],
    }

    socket.send(JSON.stringify(msg))
}

/* ----------------------------------- GUI ---------------------------------- */
const container = document.getElementById('controls')
const gui = new GUI({ container })

gui.add(params, 'zoom', 0, 10, 0.01).onChange((value) => sendOSC('u_zoom', value))
gui.add(params, 'progress', 0, 1, 0.01).onChange((value) => sendOSC('u_progress', value))

const colorf = gui.addFolder('color')
const brightnessf = colorf.addFolder('brightness')

brightnessf.add(params.brightness, 'r', 0, 1, 0.01).onChange(() => {
    sendOSC('u_brightness', [params.brightness.r, params.brightness.g, params.brightness.b])
})
brightnessf.add(params.brightness, 'g', 0, 1, 0.01).onChange(() => {
    sendOSC('u_brightness', [params.brightness.r, params.brightness.g, params.brightness.b])
})
brightnessf.add(params.brightness, 'b', 0, 1, 0.01).onChange(() => {
    sendOSC('u_brightness', [params.brightness.r, params.brightness.g, params.brightness.b])
})

const contrastf = colorf.addFolder('contrast')

contrastf.add(params.contrast, 'r', 0, 1, 0.01).onChange(() => {
    sendOSC('u_contrast', [params.contrast.r, params.contrast.g, params.contrast.b])
})
contrastf.add(params.contrast, 'g', 0, 1, 0.01).onChange(() => {
    sendOSC('u_contrast', [params.contrast.r, params.contrast.g, params.contrast.b])
})
contrastf.add(params.contrast, 'b', 0, 1, 0.01).onChange(() => {
    sendOSC('u_contrast', [params.contrast.r, params.contrast.g, params.contrast.b])
})

const oscillationf = colorf.addFolder('oscillation')

oscillationf.add(params.oscillation, 'r', 0, 1, 0.01).onChange(() => {
    sendOSC('u_oscillation', [params.oscillation.r, params.oscillation.g, params.oscillation.b])
})
oscillationf.add(params.oscillation, 'g', 0, 1, 0.01).onChange(() => {
    sendOSC('u_oscillation', [params.oscillation.r, params.oscillation.g, params.oscillation.b])
})
oscillationf.add(params.oscillation, 'b', 0, 1, 0.01).onChange(() => {
    sendOSC('u_oscillation', [params.oscillation.r, params.oscillation.g, params.oscillation.b])
})

const phasef = colorf.addFolder('phase')

phasef.add(params.phase, 'r', 0, 1, 0.01).onChange(() => {
    sendOSC('u_phase', [params.phase.r, params.phase.g, params.phase.b])
})
phasef.add(params.phase, 'g', 0, 1, 0.01).onChange(() => {
    sendOSC('u_phase', [params.phase.r, params.phase.g, params.phase.b])
})
phasef.add(params.phase, 'b', 0, 1, 0.01).onChange(() => {
    sendOSC('u_phase', [params.phase.r, params.phase.g, params.phase.b])
})

import osc from 'osc'
import { WebSocketServer } from 'ws'

/* ----------------------------------- OSC ---------------------------------- */
// Send OSC to glslViewer (default port 4000)
const udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 57121, // any unused port
    remoteAddress: '127.0.0.1',
    remotePort: 4000, // glslViewer default
})
udpPort.open()

/* -------------------------------- WebSocket ------------------------------- */
// Browser will connect to this WebSocket server
const wss = new WebSocketServer({ host: '0.0.0.0', port: 8081 })
console.log('WebSocket server running on ws://localhost:8081')

wss.on('connection', (ws) => {
    console.log('Browser connected')

    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg)
            console.log('Received from browser:', data)

            const args = Array.isArray(data.value) ? data.value : [data.value]

            udpPort.send({
                address: `/${data.address}`,
                args: args.map((v) => ({ type: 'f', value: v })),
            })
        } catch (err) {
            console.error('Invalid message:', err)
        }
    })
})

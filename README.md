# osc-shader-test

A small setup that uses [lil-gui](https://lil-gui.georgealways.com/) to send OSC messages to [GlslViewer](https://github.com/patriciogonzalezvivo/glslViewer), enabling real-time manipulation of shader uniforms.

## Instructions

### 1. Run GlslViewer with OSC listening on port 4000

```bash
glslViewer main.frag -p 4000
```

### 2. Start the GUI

Navigate to the `gui/` folder and run the development server:

```bash
cd gui
npm run dev
```

### 3. Run the OSC server

Navigate to the `server/`, start the Node.js server to forward OSC messages from the GUI:

```bash
cd server
node index.js
```

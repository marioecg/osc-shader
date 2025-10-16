#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_buffer0;

uniform float u_time;

uniform vec2 u_resolution;

void main() {
    vec2 pixel = 1.0 / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    vec3 color = vec3(0.0);

#if defined(BUFFER_0)
    color.rg = st;
#else
    color = texture2D(u_buffer0, st);
#endif

    gl_FragColor = vec4(color, 1.0);
}
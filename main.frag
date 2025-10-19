#ifdef GL_ES
precision highp float;
#endif

#define DURATION 5

uniform sampler2D u_buffer0;

uniform float u_time;
uniform float u_zoom;
uniform float u_progress;

uniform vec2 u_resolution;

uniform vec3 u_brightness;
uniform vec3 u_contrast;
uniform vec3 u_oscillation;
uniform vec3 u_phase;

#include "lygia/math/const.glsl"
#include "lygia/color/palette.glsl"

float loopTime() {
    float dur = float(DURATION);
    return (mod(u_time, dur) / dur) * TWO_PI;
}

void main() {
    float t = loopTime();
    
    vec2 pixel = 1.0 / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    vec3 color = vec3(0.0);

#if defined(BUFFER_0)
    vec2 st2 = st - 0.5;
    st2 *= u_zoom;
    float x = length(st2) + sin(t) * 0.5 + 0.5;

    color = palette(x, u_brightness, u_contrast, u_oscillation, u_phase);
#else
    color = texture2D(u_buffer0, st).rgb;
#endif

    gl_FragColor = vec4(color, 1.0);
}
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;
// varying vec3 vPosition;
// varying vec3 vNormal;

void main () {


    gl_FragColor = vec4(gl_PointCoord,0.0,1.0);


}
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;


varying vec2 vUv;
void main(){
    
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectionPosition;

    gl_PointSize = 2.0 * (1.0 / - viewPosition.z);
    
}
//Normal buffer
attribute vec3 position;
attribute vec3 normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;

varying vec4 worldPosition;
varying vec4 viewPosition;
varying vec3 worldNormal;
varying vec3 viewNormal;

void main() {
    worldPosition = model * vec4(position, 1.0);
    viewPosition = view * worldPosition;
    worldNormal = normalize(mat3(model)*normal);
    viewNormal = mat3(modelview) * normal;
    
    gl_Position = projection * viewPosition;
}
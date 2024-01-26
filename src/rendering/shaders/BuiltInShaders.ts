// @ts-nocheck: Imports are fine with esbuild and TS doesn't let us turn off a single error type
import color_frag from '../../../assets/shaders/color.frag';
import direct_directional_frag from '../../../assets/shaders/direct_directional.frag';
import direct_ibl_frag from '../../../assets/shaders/direct_ibl.frag';
import lines_frag from '../../../assets/shaders/lines.frag';
import lines_vert from '../../../assets/shaders/lines.vert';
import mesh_vert from '../../../assets/shaders/mesh.vert';
import oit_reveal_frag from '../../../assets/shaders/oit_reveal.frag';
import pbr_frag from '../../../assets/shaders/pbr.frag';
import pbr_ambient_frag from '../../../assets/shaders/pbr_ambient.frag';
import pbr_directional_frag from '../../../assets/shaders/pbr_directional.frag';
import pbr_emissive_frag from '../../../assets/shaders/pbr_emissive.frag';
import pbr_ibl_frag from '../../../assets/shaders/pbr_ibl.frag';
import pp_fxaa_frag from '../../../assets/shaders/pp_fxaa.frag';
import pp_oit_frag from '../../../assets/shaders/pp_oit.frag';
import quad_frag from '../../../assets/shaders/quad.frag';
import skybox_frag from '../../../assets/shaders/skybox.frag';
import tonemap_frag from '../../../assets/shaders/tonemap.frag';
import uv_vert from '../../../assets/shaders/uv.vert';
import vsm_frag from '../../../assets/shaders/vsm.frag';
import camera_glsl from '../../../assets/shaders/snippets/camera.glsl';
import shadow_glsl from '../../../assets/shaders/snippets/shadow.glsl';

const BuiltInShaders = {
	'webgl2': {
		'shaders/color.frag': color_frag,
		'shaders/direct_directional.frag': direct_directional_frag,
		'shaders/direct_ibl.frag': direct_ibl_frag,
		'shaders/lines.frag': lines_frag,
		'shaders/lines.vert': lines_vert,
		'shaders/mesh.vert': mesh_vert,
		'shaders/oit_reveal.frag': oit_reveal_frag,
		'shaders/pbr.frag': pbr_frag,
		'shaders/pbr_ambient.frag': pbr_ambient_frag,
		'shaders/pbr_directional.frag': pbr_directional_frag,
		'shaders/pbr_emissive.frag': pbr_emissive_frag,
		'shaders/pbr_ibl.frag': pbr_ibl_frag,
		'shaders/pp_fxaa.frag': pp_fxaa_frag,
		'shaders/pp_oit.frag': pp_oit_frag,
		'shaders/quad.frag': quad_frag,
		'shaders/skybox.frag': skybox_frag,
		'shaders/tonemap.frag': tonemap_frag,
		'shaders/uv.vert': uv_vert,
		'shaders/vsm.frag': vsm_frag,
	},
	'snippets': {
		'shaders/snippets/camera.glsl': camera_glsl,
		'shaders/snippets/shadow.glsl': shadow_glsl,
	},
};

globalThis.BuiltInShaders = BuiltInShaders;
export default BuiltInShaders;

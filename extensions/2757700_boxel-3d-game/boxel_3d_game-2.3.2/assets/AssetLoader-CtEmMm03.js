import{e as E,f as Y,as as $,o as S,b as _,ax as j,w as L,u as y,c as D,a as g,aq as U,ar as R,F as q,at as K,ay as ee,az as te,aw as re,P as N,V as v,b4 as ae,x as I,W as x,b5 as B,b6 as T,b7 as ie,S as b,ah as se,C as P,t as ne,D as F,R as oe,N as A,v as le,U as de,M as ue,q as V,y as he,z as ce,B as Q,H as W,I as fe,J as pe,K as me,X as ge,Y as ve,b8 as H,b9 as xe,ba as we,ap as Te,bb as Me,a7 as Se,bc as ye,G as be,l as Ee,n as De,b0 as Be,T as Pe,am as Ce,j as ke,A as Re,k as ze,bd as Oe,p as _e}from"./SkeletonUtils-K4FW0S_X.js";const z=(d,e)=>{const t=d.__vccOpts||d;for(const[r,a]of e)t[r]=a;return t},je={key:0,class:"modal"},Le={class:"container"},Ue={class:"content"},Ne={key:0,class:"title"},Ie=["innerHTML"],Fe={class:"inputs"},Ae=["id","type","value","min","max","step","accept"],Ve={__name:"Modal",setup(d){var e=E(""),t=E(""),r=E([]),a=E(!1);function i(){window.addEventListener("openModal",n),window.addEventListener("closeModal",h),window.addEventListener("keydown",p)}function s(){window.removeEventListener("openModal",n),window.removeEventListener("closeModal",h),window.removeEventListener("keydown",p)}function n(o){a.value=!0,o.detail&&(o.detail.title&&(e.value=o.detail.title),o.detail.text&&(t.value=o.detail.text),o.detail.inputs&&(r.value=o.detail.inputs,r.value.forEach(function(l){l.type=="file"||l.type=="range"||l.type=="text"?l.event="change":l.event="click"}))),setTimeout(function(){window.dispatchEvent(new CustomEvent("modalOpened"))},100)}function h(){a.value=!1,setTimeout(function(){window.dispatchEvent(new CustomEvent("modalClosed"))},100)}function c(o,l){o==null&&(o=h),o(l)}function f(o){var l=r.value[r.value.length-1];l&&c(l.callback,o)}function p(o){if(a.value==!0){var l=["Space","Enter","Escape"];l.indexOf(o.code)>-1&&(o.preventDefault(),f(o))}}return Y(function(){i()}),$(function(){s()}),(o,l)=>(S(),_(j,{name:"fade-modal"},{default:L(()=>[y(a)==!0?(S(),D("div",je,[g("div",{class:"background",onClick:h}),g("div",Le,[g("div",Ue,[y(e)!=""?(S(),D("h1",Ne,U(y(e)),1)):R("",!0),g("p",{class:"text",innerHTML:y(t)},null,8,Ie),g("div",Fe,[(S(!0),D(q,null,K(y(r),(m,w)=>(S(),D("input",ee({class:m.class,id:"modal-"+m.type+"-"+w,type:m.type,value:m.value,min:m.min,max:m.max,step:m.step,accept:m.accept,style:m.style},{[te(m.event)]:u=>c(m.callback,u)}),null,16,Ae))),256))]),g("a",{class:"close",onClick:h},l[0]||(l[0]=[g("span",null,"x",-1)]))])])])):R("",!0)]),_:1}))}},Qe=z(Ve,[["__scopeId","data-v-9019b8bf"]]),We={key:0,class:"loading"},He={class:"bar"},Ge={class:"label"},Xe={__name:"Loading",setup(d){var e=E({urls:"",index:0,max:1,percent:0});function t(a){e.value=a}function r(){return e.value.percent==100}return window.addEventListener("updateLoading",function(a){t(a.detail)}),(a,i)=>(S(),_(j,{name:"fade-loading"},{default:L(()=>[r()==!1?(S(),D("div",We,[g("div",He,[g("div",{class:"progress",style:re({width:y(e).percent+"%"})},null,4)]),g("div",Ge,"Loading: "+U(y(e).percent)+"%",1)])):R("",!0)]),_:1}))}},Je=z(Xe,[["__scopeId","data-v-290702a9"]]);class Ze{constructor(){this.loops=[],this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.speed=1,this.running=!1,this.index=0}add(e,t=1e3/60){const r=new Ye(e,t);this.loops.push(r)}get(e){return this.loops[e]}tick(e){if(this.running==!0&&(this.index=requestAnimationFrame(e),this.loops.length>0))for(var t=this.getDelta(),r=this.loops[0].sum/this.loops[0].rate,a=this.loops.length-1;a>=0;a--)this.loops[a].sum+=t,(this.loops[a].sum>=this.loops[a].rate||this.loops[a].rate==-1)&&(this.loops[a].sum%=this.loops[a].rate,this.loops[a].callback({delta:this.loops[a].rate==-1?t:this.loops[a].rate,alpha:a==0?0:r,index:this.index}))}start(){this.reset();var e=function(){this.tick(e)}.bind(this);e()}stop(){this.getElapsedTime(),this.running=!1}reset(){this.startTime=this.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0;for(var e=this.loops.length-1;e>=0;e--)this.loops[e].reset()}isRunning(){return this.running}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.running){const t=this.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e*this.speed}now(){return(typeof performance>"u"?Date:performance).now()}}class Ye{constructor(e=()=>{},t){this.rate=t/1e3,this.sum=0,this.alpha=0,this.callback=e,t<0&&(this.rate=-1)}reset(){this.sum=0,this.alpha=0}}class $e extends N{constructor(e,t,r,a={}){super(),this.pixelSize=e,this.resolution=new v,this.renderResolution=new v,this.pixelatedMaterial=this.createPixelatedMaterial(),this.normalMaterial=new ae,this.fsQuad=new I(this.pixelatedMaterial),this.scene=t,this.camera=r,this.normalEdgeStrength=a.normalEdgeStrength||.3,this.depthEdgeStrength=a.depthEdgeStrength||.4,this.beautyRenderTarget=new x,this.beautyRenderTarget.texture.minFilter=B,this.beautyRenderTarget.texture.magFilter=B,this.beautyRenderTarget.texture.type=T,this.beautyRenderTarget.depthTexture=new ie,this.normalRenderTarget=new x,this.normalRenderTarget.texture.minFilter=B,this.normalRenderTarget.texture.magFilter=B,this.normalRenderTarget.texture.type=T}dispose(){this.beautyRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.pixelatedMaterial.dispose(),this.normalMaterial.dispose(),this.fsQuad.dispose()}setSize(e,t){this.resolution.set(e,t),this.renderResolution.set(e/this.pixelSize|0,t/this.pixelSize|0);const{x:r,y:a}=this.renderResolution;this.beautyRenderTarget.setSize(r,a),this.normalRenderTarget.setSize(r,a),this.fsQuad.material.uniforms.resolution.value.set(r,a,1/r,1/a)}setPixelSize(e){this.pixelSize=e,this.setSize(this.resolution.x,this.resolution.y)}render(e,t){const r=this.fsQuad.material.uniforms;r.normalEdgeStrength.value=this.normalEdgeStrength,r.depthEdgeStrength.value=this.depthEdgeStrength,e.setRenderTarget(this.beautyRenderTarget),e.render(this.scene,this.camera);const a=this.scene.overrideMaterial;e.setRenderTarget(this.normalRenderTarget),this.scene.overrideMaterial=this.normalMaterial,e.render(this.scene,this.camera),this.scene.overrideMaterial=a,r.tDiffuse.value=this.beautyRenderTarget.texture,r.tDepth.value=this.beautyRenderTarget.depthTexture,r.tNormal.value=this.normalRenderTarget.texture,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear()),this.fsQuad.render(e)}createPixelatedMaterial(){return new b({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tNormal:{value:null},resolution:{value:new se(this.renderResolution.x,this.renderResolution.y,1/this.renderResolution.x,1/this.renderResolution.y)},normalEdgeStrength:{value:0},depthEdgeStrength:{value:0}},vertexShader:`
				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D tDiffuse;
				uniform sampler2D tDepth;
				uniform sampler2D tNormal;
				uniform vec4 resolution;
				uniform float normalEdgeStrength;
				uniform float depthEdgeStrength;
				varying vec2 vUv;

				float getDepth(int x, int y) {

					return texture2D( tDepth, vUv + vec2(x, y) * resolution.zw ).r;

				}

				vec3 getNormal(int x, int y) {

					return texture2D( tNormal, vUv + vec2(x, y) * resolution.zw ).rgb * 2.0 - 1.0;

				}

				float depthEdgeIndicator(float depth, vec3 normal) {

					float diff = 0.0;
					diff += clamp(getDepth(1, 0) - depth, 0.0, 1.0);
					diff += clamp(getDepth(-1, 0) - depth, 0.0, 1.0);
					diff += clamp(getDepth(0, 1) - depth, 0.0, 1.0);
					diff += clamp(getDepth(0, -1) - depth, 0.0, 1.0);
					return floor(smoothstep(0.01, 0.02, diff) * 2.) / 2.;

				}

				float neighborNormalEdgeIndicator(int x, int y, float depth, vec3 normal) {

					float depthDiff = getDepth(x, y) - depth;
					vec3 neighborNormal = getNormal(x, y);

					// Edge pixels should yield to faces who's normals are closer to the bias normal.
					vec3 normalEdgeBias = vec3(1., 1., 1.); // This should probably be a parameter.
					float normalDiff = dot(normal - neighborNormal, normalEdgeBias);
					float normalIndicator = clamp(smoothstep(-.01, .01, normalDiff), 0.0, 1.0);

					// Only the shallower pixel should detect the normal edge.
					float depthIndicator = clamp(sign(depthDiff * .25 + .0025), 0.0, 1.0);

					return (1.0 - dot(normal, neighborNormal)) * depthIndicator * normalIndicator;

				}

				float normalEdgeIndicator(float depth, vec3 normal) {

					float indicator = 0.0;

					indicator += neighborNormalEdgeIndicator(0, -1, depth, normal);
					indicator += neighborNormalEdgeIndicator(0, 1, depth, normal);
					indicator += neighborNormalEdgeIndicator(-1, 0, depth, normal);
					indicator += neighborNormalEdgeIndicator(1, 0, depth, normal);

					return step(0.1, indicator);

				}

				void main() {

					vec4 texel = texture2D( tDiffuse, vUv );

					float depth = 0.0;
					vec3 normal = vec3(0.0);

					if (depthEdgeStrength > 0.0 || normalEdgeStrength > 0.0) {

						depth = getDepth(0, 0);
						normal = getNormal(0, 0);

					}

					float dei = 0.0;
					if (depthEdgeStrength > 0.0)
						dei = depthEdgeIndicator(depth, normal);

					float nei = 0.0;
					if (normalEdgeStrength > 0.0)
						nei = normalEdgeIndicator(depth, normal);

					float Strength = dei > 0.0 ? (1.0 - depthEdgeStrength * dei) : (1.0 + normalEdgeStrength * nei);

					gl_FragColor = texel * Strength;

				}
			`})}}class M extends N{constructor(e,t,r,a){super(),this.renderScene=t,this.renderCamera=r,this.selectedObjects=a!==void 0?a:[],this.visibleEdgeColor=new P(1,1,1),this.hiddenEdgeColor=new P(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new v(e.x,e.y):new v(256,256);const i=Math.round(this.resolution.x/this.downSampleRatio),s=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new x(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new ne,this.depthMaterial.side=F,this.depthMaterial.depthPacking=oe,this.depthMaterial.blending=A,this.prepareMaskMaterial=this.getPrepareMaskMaterial(),this.prepareMaskMaterial.side=F,this.prepareMaskMaterial.fragmentShader=f(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new x(this.resolution.x,this.resolution.y,{type:T}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new x(i,s,{type:T}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new x(i,s,{type:T}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new x(Math.round(i/2),Math.round(s/2),{type:T}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this.getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new x(i,s,{type:T}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new x(Math.round(i/2),Math.round(s/2),{type:T}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const n=4,h=4;this.separableBlurMaterial1=this.getSeparableBlurMaterial(n),this.separableBlurMaterial1.uniforms.texSize.value.set(i,s),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeparableBlurMaterial(h),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(i/2),Math.round(s/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=h,this.overlayMaterial=this.getOverlayMaterial();const c=le;this.copyUniforms=de.clone(c.uniforms),this.materialCopy=new b({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:A,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new P,this.oldClearAlpha=1,this.fsQuad=new I(null),this.tempPulseColor1=new P,this.tempPulseColor2=new P,this.textureMatrix=new ue;function f(p,o){const l=o.isPerspectiveCamera?"perspective":"orthographic";return p.replace(/DEPTH_TO_VIEW_Z/g,l+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let r=Math.round(e/this.downSampleRatio),a=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(r,a),this.renderTargetBlurBuffer1.setSize(r,a),this.renderTargetEdgeBuffer1.setSize(r,a),this.separableBlurMaterial1.uniforms.texSize.value.set(r,a),r=Math.round(r/2),a=Math.round(a/2),this.renderTargetBlurBuffer2.setSize(r,a),this.renderTargetEdgeBuffer2.setSize(r,a),this.separableBlurMaterial2.uniforms.texSize.value.set(r,a)}updateSelectionCache(){const e=this._selectionCache;function t(r){r.isMesh&&e.add(r)}e.clear();for(let r=0;r<this.selectedObjects.length;r++)this.selectedObjects[r].traverse(t)}changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;for(const r of this._selectionCache)e===!0?r.visible=t.get(r):(t.set(r,r.visible),r.visible=e)}changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,r=this._selectionCache;function a(i){if(i.isMesh||i.isSprite){if(!r.has(i)){const s=i.visible;(e===!1||t.get(i)===!0)&&(i.visible=e),t.set(i,s)}}else(i.isPoints||i.isLine)&&(e===!0?i.visible=t.get(i):(t.set(i,i.visible),i.visible=e))}this.renderScene.traverse(a)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}render(e,t,r,a,i){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,i&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.updateSelectionCache(),this.changeVisibilityOfSelectedObjects(!1);const n=this.renderScene.background;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this.updateTextureMatrix(),this.changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=n,this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const h=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(h),this.tempPulseColor2.multiplyScalar(h)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=M.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=M.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=M.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=M.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,i&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(r),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=r.texture,e.setRenderTarget(null),this.fsQuad.render(e))}getPrepareMaskMaterial(){return new b({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new v(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif

					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}getEdgeDetectionMaterial(){return new b({uniforms:{maskTexture:{value:null},texSize:{value:new v(.5,.5)},visibleEdgeColor:{value:new V(1,1,1)},hiddenEdgeColor:{value:new V(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}getSeparableBlurMaterial(e){return new b({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new v(.5,.5)},direction:{value:new v(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}getOverlayMaterial(){return new b({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:he,depthTest:!1,depthWrite:!1,transparent:!0})}}M.BlurDirectionX=new v(1,0),M.BlurDirectionY=new v(0,1);var C=function(){var d=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(f){f.preventDefault(),r(++d%e.children.length)},!1);function t(f){return e.appendChild(f.dom),f}function r(f){for(var p=0;p<e.children.length;p++)e.children[p].style.display=p===f?"block":"none";d=f}var a=(performance||Date).now(),i=a,s=0,n=t(new C.Panel("FPS","#0ff","#002")),h=t(new C.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new C.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:e,addPanel:t,showPanel:r,begin:function(){a=(performance||Date).now()},end:function(){s++;var f=(performance||Date).now();if(h.update(f-a,200),f>=i+1e3&&(n.update(s*1e3/(f-i),100),i=f,s=0,c)){var p=performance.memory;c.update(p.usedJSHeapSize/1048576,p.jsHeapSizeLimit/1048576)}return f},update:function(){a=this.end()},domElement:e,setMode:r}};C.Panel=function(d,e,t){var r=1/0,a=0,i=Math.round,s=i(window.devicePixelRatio||1),n=80*s,h=48*s,c=3*s,f=2*s,p=3*s,o=15*s,l=74*s,m=30*s,w=document.createElement("canvas");w.width=n,w.height=h,w.style.cssText="width:80px;height:48px";var u=w.getContext("2d");return u.font="bold "+9*s+"px Helvetica,Arial,sans-serif",u.textBaseline="top",u.fillStyle=t,u.fillRect(0,0,n,h),u.fillStyle=e,u.fillText(d,c,f),u.fillRect(p,o,l,m),u.fillStyle=t,u.globalAlpha=.9,u.fillRect(p,o,l,m),{dom:w,update:function(k,Z){r=Math.min(r,k),a=Math.max(a,k),u.fillStyle=t,u.globalAlpha=1,u.fillRect(0,0,n,o),u.fillStyle=e,u.fillText(i(k)+" "+d+" ("+i(r)+"-"+i(a)+")",c,f),u.drawImage(w,p+s,o,l-s,m,p,o,l-s,m),u.fillRect(p+l-s,o,s,m),u.fillStyle=t,u.globalAlpha=.9,u.fillRect(p+l-s,o,s,i((1-k/Z)*m))}}};class qe{constructor(e=document.createElement("canvas")){this.camera=new ce(45,window.innerWidth/window.innerHeight,1,100),this.scene=new Q,this.canvas=e,this.stats=new C,window.devicePixelRatio=1,this.renderer=new W({alpha:!0,canvas:e}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!1,this.renderer.shadowMap.type=fe,this.renderPass=new pe(this.scene,this.camera),this.outputPass=new me,this.outlinePass=new M({x:window.innerWidth,y:window.innerHeight},this.scene,this.camera),this.outlinePass.edgeStrength=3,this.outlinePass.edgeGlow=0,this.outlinePass.edgeThickness=.125,this.outlinePass.visibleEdgeColor.set("#000000"),this.outlinePass.hiddenEdgeColor.set("#000000"),this.outlinePass.enabled=!0,this.smaaPass=new ge(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio),this.smaaPass.enabled=!1,this.pixelatedPass=new $e(2,this.scene,this.camera),this.pixelatedPass.normalEdgeStrength=1,this.pixelatedPass.depthEdgeStrength=1,this.pixelatedPass.enabled=!1,this.composer=new ve(this.renderer),this.composer.addPass(this.renderPass),this.composer.addPass(this.pixelatedPass),this.composer.addPass(this.outlinePass),this.composer.addPass(this.smaaPass),this.composer.addPass(this.outputPass),this.resize=this.resize.bind(this),window.addEventListener("resize",this.resize),window.dispatchEvent(new Event("resize"))}render(){this.stats.begin(),this.composer.render(),this.stats.end()}resize(e){var t=e.target.innerWidth,r=e.target.innerHeight;this.setSize(t,r)}setSize(e,t){var r=e/t;this.camera.isOrthographicCamera&&(this.camera.left=-r*.5,this.camera.right=r*.5,this.camera.top=.5,this.camera.bottom=-.5),this.camera.aspect=r,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t)}setCamera(e){this.camera=e,this.renderPass.camera=e,this.pixelatedPass.camera=e,this.outlinePass.renderCamera=e}setScene(e){this.scene=e,this.scene.fog=this.fog,this.renderPass.scene=e,this.pixelatedPass.scene=e,this.outlinePass.renderScene=e}setShadows(e=!0){this.renderer.shadowMap.enabled=e,this.scene.traverse(function(t){t.material&&(t.castShadow=e,t.receiveShadow=e,t.material.needsUpdate=!0)})}setSelectedObjects(e=[]){this.outlinePass.selectedObjects=e}addStats(){document.body.appendChild(this.stats.dom)}removeStats(){document.body.removeChild(this.stats.dom)}}class Ke{constructor(){}static create(e="PointLight",t){var r,a;if(t=Object.assign({color:"#ffffff",decay:2,distance:0,groundColor:"#000000",intensity:Math.PI,castShadow:!1,skyColor:"#ffffff"},t),e=="AmbientLight"?r=new H(t.color,t.intensity):e=="DirectionalLight"?(r=new xe(t.color,t.intensity),a=new we(r)):e=="HemisphereLight"?(r=new Te(t.skyColor,t.groundColor,t.intensity),a=new Me(r)):e=="PointLight"&&(r=new Se(t.color,t.intensity,t.distance,t.decay),a=new ye(r)),r==null){console.error(`Error: Light type "${e}" does not exists.`);return}return t.castShadow&&(r.castShadow=!0),t.helper==!0&&a&&(r.addEventListener("added",function(i){r.parent.add(a)}),r.addEventListener("removed",function(i){a.removeFromParent()})),r}}class et extends be{constructor(e){super(e)}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,function(s){var n=s.scene;n.name=a,n.animations=s.animations,n.userData={...i.userData},n.duplicate=this.duplicate.bind(this,n),this.manager.cache[a]=n,this.addMixer(n)}.bind(this),function(s){},function(s){console.error(s)})}catch(a){console.error(a)}}duplicate(e){const t=Ee(e);return this.addMixer(t),t}addMixer(e){if(e.animations.length>0){var t=e.userData.loop||2201;e.mixer=new De(e),e.actions={};for(var r=0;r<e.animations.length;r++){var a=e.animations[r],i=e.mixer.clipAction(a);t==2200&&(i.setLoop(t),i.clampWhenFinished=!0),i.play(),i.setEffectiveWeight(0),e.actions[a.name]=i,r==0&&(e.actions.active=i,i.setEffectiveWeight(1))}e.play=function(s,n=1){var h=e.actions.active,c=e.actions[s];c&&c!=h&&(h==null?(c.setEffectiveWeight(1),c.reset().fadeIn(n)):(h.setEffectiveWeight(1),c.setEffectiveWeight(1),c.reset().crossFadeFrom(h,n)),c.duration=n,e.actions.active=c)}}}renderThumbnail(e,t){t=Object.assign({height:64,position:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},width:64},t);const r=e.position.clone(),a=e.scale.clone();return e.position.copy(t.position),e.scale.copy(t.scale),O.add(e),X.setSize(t.width,t.height),X.render(O,J),e.removeFromParent(),e.position.copy(r),e.scale.copy(a),G.toDataURL("image/png")}}const tt=new H("#ffffff",Math.PI),O=new Q,G=document.createElement("canvas"),X=new W({alpha:!0,canvas:G}),J=new Be(-.5,.5,.5,-.5,.01,100);O.add(tt),J.position.z=10;class rt extends Pe{constructor(e){super(e)}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,function(s){s.colorSpace=Ce,s.name=a,s.magFilter=i.magFilter||B,s.duplicate=this.duplicate.bind(this,s),i.center&&s.center.copy(i.center),i.repeat&&s.repeat.copy(i.repeat),this.manager.cache[a]=s}.bind(this),void 0,function(s){console.error(`Error: Texture "${i.url}" not found.`)})}catch(a){console.error(a)}}duplicate(e){return e=e.clone(),e}}class at extends ke{constructor(e){super(e),this.listener=new Re}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,function(s){var n=new ze(this.listener);n.name=a,n.setBuffer(s),n.duplicate=this.duplicate.bind(this,n),i.userData&&(n.userData=i.userData,n.userData.loop&&n.setLoop(n.userData.loop),n.userData.volume&&n.setVolume(n.userData.volume)),this.manager.cache[a]=n}.bind(this),function(s){},function(s){console.error(`Error: Audio "${i.url}" not found.`)})}catch(a){console.error(a)}}duplicate(e){return console.warn("AudioLoader: Audio cannot be cloned."),e}}class it extends Oe{constructor(e){super(e),this.setMimeType("application/json"),this.setResponseType("json")}async load(e){try{var t=await fetch(e),r=await t.json();for(const[a,i]of Object.entries(r))super.load(i.url,function(s){this.manager.cache[a]=s}.bind(this),function(s){},function(s){console.error(`Error: File ${i.url} not found.`)})}catch(a){console.error(a)}}duplicate(e){return JSON.parse(JSON.stringify(e))}}class st extends _e{constructor(e,t,r){super(e,nt.bind(t),r),this.cache={},this.assetModelLoader=new et(this),this.assetTextureLoader=new rt(this),this.assetAudioLoader=new at(this),this.assetJSONLoader=new it(this)}load(e={}){e.models&&this.assetModelLoader.load(e.models),e.textures&&this.assetTextureLoader.load(e.textures),e.audio&&this.assetAudioLoader.load(e.audio),e.json&&this.assetJSONLoader.load(e.json)}get(e){var t=this.cache[e];return t}duplicate(e){var t=this.get(e);return t&&(t=t.duplicate()),t}}function nt(d,e,t){var r=Math.ceil(e/t*100);dispatchEvent(new CustomEvent("updateLoading",{detail:{url:d,itemsLoaded:e,itemsTotal:t,percent:r}})),typeof this=="function"&&this(d,e,t)}export{st as A,qe as G,Ke as L,Qe as M,Ze as T,z as _,Je as a};

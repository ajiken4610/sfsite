<template lang="pug">
.wrapper
  .loading-wrapper(v-if="loading")
    .loading LOADING...
  #container(ref="container", @click="clicked = true")
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
}

.loading-wrapper {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: table;
  margin: auto;
}
.loading {
  font-size: 5rem;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
#container {
  position: absolute;
}
</style>

<script lang="ts">
let showed = false;
</script>
<script setup lang="ts">
import {
  AnimationMixer,
  Clock,
  EventDispatcher,
  LinearFilter,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneBufferGeometry,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
const loading = ref(true);
const clicked = ref(false);
if (showed) {
  location.reload();
} else {
  showed = true;
}
const container = ref<HTMLDivElement>(null);
const running = ref(true);
onMounted(() => {
  nextTick(async () => {
    // レンダラの初期化
    const renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    let mouseX = 0.5;
    let mouseY = 0.5;
    renderer.domElement.addEventListener("mousemove", (e) => {
      mouseX = e.x / renderer.domElement.clientWidth;
      mouseY = e.y / renderer.domElement.clientHeight;
    });

    // UVスクローラを読み込み
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    const scroller = await loader.loadAsync("/scroll-view.glb", (e) => {
      console.log((e.loaded / e.total) * 100);
    });

    const scrollerScene = new Scene();
    scrollerScene.add(scroller.scene);
    const uvScrollTexture = await new TextureLoader().loadAsync("scroll.png");
    uvScrollTexture.wrapS = RepeatWrapping;
    uvScrollTexture.wrapT = RepeatWrapping;
    const scrollSpeed = {
      points: 0.25,
      doors: 0.5,
      dispFrame: 0.6,
      platformLine: 0.25,
      floor: 0.35,
      welcome: 0.1,
      pillar: 0.2,
    };
    const materials: ShaderMaterial[] = [];
    const startTime = Date.now();
    scroller.scene.traverse((object) => {
      if (object.type === "Mesh") {
        const mesh = object as Mesh;
        const material = new ShaderMaterial({
          vertexShader: `
        varying vec2 v_UV;
        void main() {
	        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          v_UV = uv;
        }`,
          fragmentShader: `
        varying vec2 v_UV;
        uniform sampler2D u_Texture;
        uniform float u_Time;
        void main() {
	        gl_FragColor = texture2D(u_Texture,vec2(v_UV.x+u_Time*${
            scrollSpeed[mesh.name]
          },1.-v_UV.y));
        }
        `,
          uniforms: {
            u_Texture: { value: null },
            u_Time: { value: 0 },
          },
        });
        materials.push(material);
        material.uniforms.u_Texture.value = uvScrollTexture;
        mesh.material = material;
      }
    });
    const scrollerCamera = scroller.cameras[0] as OrthographicCamera;
    scrollerCamera.top = (scrollerCamera.top / 2) * (1080 / 1920);
    scrollerCamera.bottom = (scrollerCamera.bottom / 2) * (1080 / 1920);
    scrollerCamera.left = scrollerCamera.left / 2;
    scrollerCamera.right = scrollerCamera.right / 2;
    scrollerCamera.updateProjectionMatrix();
    const renderTargetParameters = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
    };
    const scrollerRenderTarget = new WebGLRenderTarget(1920, 1080, {
      ...renderTargetParameters,
      depthBuffer: false,
    });

    // // パーティクルGPGPU
    // const particleCount = 16;
    // let gpgpuRenderTarget1 = new WebGLRenderTarget(10, particleCount, {
    //   depthBuffer: false,
    //   stencilBuffer: false,
    //   minFilter: NearestFilter,
    //   magFilter: NearestFilter,
    // });
    // let gpgpuRenderTarget2 = new WebGLRenderTarget(10, particleCount, {
    //   depthBuffer: false,
    //   stencilBuffer: false,
    //   minFilter: NearestFilter,
    //   magFilter: NearestFilter,
    // });

    // const gpgpuGeometory = new PlaneBufferGeometry(2, 2);
    // const gpgpuMaterial = new ShaderMaterial({
    //   vertexShader: `
    //   varying vec2 v_UV;
    //   void main() {
    //     v_UV = uv;
    //     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    //   }`,
    //   fragmentShader: `
    //   uniform sampler2D u_Old;
    //   uniform float u_Time;
    //   varying vec2 v_UV;
    //   float rand(vec2 co){
    //     return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    //   }
    //   float restore(vec4 val){
    //     const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
    //     return dot(val,bitShift);
    //   }
    //   vec4 store(float val){
    //     const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
    //     const vec4 bitMask = vec4(1./256.,1./256.,1./256.,0.);
    //     vec4 ret = fract(val*bitShift);
    //     ret -= ret.yzww * bitMask;
    //     return ret;
    //   }
    //   void main() {
    //     const float paramCount = 10.;
    //     const float offset = 1./paramCount;
    //     float oldX = restore(texture2D(u_Old,vec2(offset*0.,v_UV.y)));
    //     float oldY = restore(texture2D(u_Old,vec2(offset*1.,v_UV.y)));
    //     float oldZ = restore(texture2D(u_Old,vec2(offset*2.,v_UV.y)));
    //     float oldVX = restore(texture2D(u_Old,vec2(offset*3.,v_UV.y)));
    //     float oldVY = restore(texture2D(u_Old,vec2(offset*4.,v_UV.y)));
    //     float oldVZ = restore(texture2D(u_Old,vec2(offset*5.,v_UV.y)));
    //     float oldR = restore(texture2D(u_Old,vec2(offset*6.,v_UV.y)));
    //     float oldG = restore(texture2D(u_Old,vec2(offset*7.,v_UV.y)));
    //     float oldB = restore(texture2D(u_Old,vec2(offset*8.,v_UV.y)));
    //     float oldLife = restore(texture2D(u_Old,vec2(offset*9.,v_UV.y)));
    //     int index = int(v_UV.x*paramCount);
    //     gl_FragColor = vec4(float(index)/paramCount,.0,.0,1.);
    //     const float speed = .01;
    //     switch(index){
    //       case 0: // x
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.1)): oldX + (oldVX-.5)*speed);
    //         break;
    //       case 1: // y
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.2)) : oldY + (oldVY-.5)*speed);
    //         break;
    //       case 2: // z
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.3)) : oldZ + (oldVZ-.5)*speed);
    //         break;
    //       case 3: // vx
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.4)) : oldVX );
    //         break;
    //       case 4: // vy
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.5)) : oldVY );
    //         break;
    //       case 5: // vz
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.6)) : oldVZ );
    //         break;
    //       case 6: // r
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.7))*.2 : oldR  );
    //         break;
    //       case 7: // g
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.8)) : oldG  );
    //         break;
    //       case 8: // b
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.9)) : oldB  );
    //         break;
    //       case 9: // life
    //         gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time))*.5+.5 : max(0.,oldLife - (1./120.)) );
    //         break;
    //     }
    //   }`,
    //   uniforms: {
    //     u_Old: { value: null },
    //     u_Time: { value: 0 },
    //   },
    // });
    // const gpgpuMesh = new Mesh(gpgpuGeometory, gpgpuMaterial);
    // const gpgpuScene = new Scene();
    // gpgpuScene.add(gpgpuMesh);
    // const gpgpuCamera = new OrthographicCamera();
    // gpgpuCamera.position.z = 1;
    // gpgpuCamera.lookAt(0, 0, 0);
    // gpgpuCamera.top = 1;
    // gpgpuCamera.bottom = -1;
    // gpgpuCamera.left = -1;
    // gpgpuCamera.right = 1;
    // gpgpuCamera.near = 0.1;
    // gpgpuCamera.far = 2;
    // gpgpuCamera.updateProjectionMatrix();

    // // パーティクル
    // const particleGeometory = new BufferGeometry();
    // const indexes = new Float32Array(particleCount);
    // for (var i = 0; i < particleCount; i++) {
    //   indexes[i] = (1 / particleCount) * i + (1 / particleCount) * 0.5;
    // }
    // particleGeometory.setAttribute(
    //   "a_Index",
    //   new Float32BufferAttribute(indexes, 1)
    // );
    // particleGeometory.setAttribute(
    //   "position",
    //   new Float32BufferAttribute(new Float32Array(192), 3)
    // );
    // particleGeometory.drawRange.start = 0;
    // particleGeometory.drawRange.count = particleCount;
    // const particleMaterial = new ShaderMaterial({
    //   vertexShader: `
    // attribute float a_Index;
    // uniform sampler2D u_CoordTexture;
    // varying float v_Index;
    // varying vec3 v_Color;
    // varying float v_Z;
    // float restore(vec4 val){
    //     const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
    //     return dot(val,bitShift);
    // }
    // void main() {
    //   const float paramCount = 10.;
    //   const float offset = 1./paramCount;
    //   float x = restore(texture2D(u_CoordTexture,vec2(offset*0.,a_Index)));
    //   float y = restore(texture2D(u_CoordTexture,vec2(offset*1.,a_Index)));
    //   float z = restore(texture2D(u_CoordTexture,vec2(offset*2.,a_Index)));
    //   float r = restore(texture2D(u_CoordTexture,vec2(offset*6.,a_Index)));
    //   float g = restore(texture2D(u_CoordTexture,vec2(offset*7.,a_Index)));
    //   float b = restore(texture2D(u_CoordTexture,vec2(offset*8.,a_Index)));
    //   gl_PointSize = z*8.;
    //   gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y,.5, 1.0);
    //   v_Index = a_Index;
    //   v_Color = vec3(r,g,b);
    //   v_Z = z;
    // }`,
    //   fragmentShader: `
    // uniform sampler2D u_CoordTexture;
    // uniform sampler2D u_Mist;
    // varying vec3 v_Color;
    // varying float v_Index;
    // varying float v_Z;
    // float restore(vec4 val){
    //     const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
    //     return dot(val,bitShift);
    // }
    // void main() {
    //   const float paramCount = 10.;
    //   const float offset = 1./paramCount;
    //   if(distance(gl_PointCoord,vec2(.5)) > .5 || texture2D(u_Mist,vec2(gl_FragCoord.x/1920.,gl_FragCoord.y/1080.)).x < 1.-v_Z ){
    //     discard;
    //   }else{
    //     gl_FragColor = vec4( v_Color, 1.0 );
    //   }
    // }`,
    //   uniforms: {
    //     u_CoordTexture: { value: null },
    //     u_Mist: { value: null },
    //   },
    // });
    // const mistTexture = await new TextureLoader().loadAsync("mist.png");
    // particleMaterial.uniforms.u_Mist.value = mistTexture;
    // const particlePoints = new Points(particleGeometory, particleMaterial);

    // const particleScene = new Scene();
    // particleScene.add(particlePoints);

    // const particleCamera = new OrthographicCamera();
    // particleCamera.position.z = 1;
    // particleCamera.lookAt(0, 0, 0);
    // particleCamera.top = 1;
    // particleCamera.bottom = 0;
    // particleCamera.left = 0;
    // particleCamera.right = 1;
    // particleCamera.near = 0.1;
    // particleCamera.far = 2;
    // particleCamera.updateProjectionMatrix();

    // const particleRenderTarget = new WebGLRenderTarget(1920, 1080, {
    //   depthBuffer: false,
    //   stencilBuffer: false,
    //   minFilter: LinearFilter,
    //   magFilter: LinearFilter,
    // });

    // 画面の中描画
    const dispScene = new Scene();
    const dispModel = await loader.loadAsync("/welcome-animation.glb", (e) => {
      console.log((e.loaded / e.total) * 100);
    });
    const mixer = new AnimationMixer(dispModel.scene);
    for (const animation of dispModel.animations) {
      const action = mixer.clipAction(animation);
      action.play();
    }
    const clock = new Clock();
    const welcomeScene = new Scene();
    welcomeScene.add(dispModel.scene);
    const dispGeometory = new PlaneBufferGeometry(2, 2);
    const dispMaterial = new ShaderMaterial({
      vertexShader: `
  varying vec2 v_UV;
  void main() {
    v_UV = uv;
	  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
      fragmentShader: `
  varying vec2 v_UV;
  uniform float u_Time;
  uniform lowp float[10] texts;

  uniform sampler2D numberTexture;
  vec3 toRGB(float h,float s,float v){
    return ((clamp(abs(fract(h+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*s+1.)*v;
  }
  void main() {
    const float textLength = 10.;
    const float textTypeCount = 11.;
    float uf = fract(v_UV.x*textLength);
    int ui = int(v_UV.x*textLength);
    float currentText = texts[ui];
    vec3 color = texture2D(numberTexture,(vec2(1./textTypeCount*uf+currentText/textTypeCount,v_UV.y*2.-.5))).rgb;
    gl_FragColor = vec4(color*toRGB(currentText/textTypeCount+u_Time/30.,1.,1.),1.);
  }
  `,
      uniforms: {
        // 0-9,10:":",11:" "
        texts: { value: [0, 0, 0, 0, 10, 0, 0, 10, 0, 0] },
        numberTexture: { value: null },
        u_Time: { value: 0 },
      },
    });
    const numberTexture = await new TextureLoader().loadAsync("numbers.png");
    dispMaterial.uniforms.numberTexture.value = numberTexture;

    const dispMesh = new Mesh(dispGeometory, dispMaterial);
    dispScene.add(dispMesh);
    const dispCamera = new OrthographicCamera();
    dispCamera.position.z = 1;
    dispCamera.lookAt(0, 0, 0);
    dispCamera.top = 1;
    dispCamera.bottom = -1;
    dispCamera.left = -1;
    dispCamera.right = 1;
    dispCamera.near = 0.1;
    dispCamera.far = 2;
    dispCamera.updateProjectionMatrix();
    const dispRenderTarget = new WebGLRenderTarget(512, 512);

    // シーンの初期化
    const scene = new Scene();

    // 板ポリ
    const geometory = new PlaneBufferGeometry(3.5555555, 2);
    const material = new ShaderMaterial({
      vertexShader: `
  varying vec2 v_UV;
  varying vec4 v_DispColor;
  uniform sampler2D u_DispTexture;
  uniform float u_Time;
  vec3 toRGB(float h,float s,float v){
    return ((clamp(abs(fract(h+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*s+1.)*v;
  }
  void main() {
    v_UV = uv;
    vec4 s1 = texture2D(u_DispTexture,vec2(.25,.25));
    vec4 s2 = texture2D(u_DispTexture,vec2(.25,.50));
    vec4 s3 = texture2D(u_DispTexture,vec2(.25,.75));
    vec4 s4 = texture2D(u_DispTexture,vec2(.50,.25));
    vec4 s5 = texture2D(u_DispTexture,vec2(.50,.50));
    vec4 s6 = texture2D(u_DispTexture,vec2(.50,.75));
    vec4 s7 = texture2D(u_DispTexture,vec2(.75,.25));
    vec4 s8 = texture2D(u_DispTexture,vec2(.75,.50));
    vec4 s9 = texture2D(u_DispTexture,vec2(.75,.75));
    s1 = vec4(toRGB(s1.g*.3333+s1.b*.6666+u_Time*.05,1.,(s1.r+s1.g+s1.b)),s1.a);
    s2 = vec4(toRGB(s2.g*.3333+s2.b*.6666+u_Time*.05,1.,(s2.r+s2.g+s2.b)),s2.a);
    s3 = vec4(toRGB(s3.g*.3333+s3.b*.6666+u_Time*.05,1.,(s3.r+s3.g+s3.b)),s3.a);
    s4 = vec4(toRGB(s4.g*.3333+s4.b*.6666+u_Time*.05,1.,(s4.r+s4.g+s4.b)),s4.a);
    s5 = vec4(toRGB(s5.g*.3333+s5.b*.6666+u_Time*.05,1.,(s5.r+s5.g+s5.b)),s5.a);
    s6 = vec4(toRGB(s6.g*.3333+s6.b*.6666+u_Time*.05,1.,(s6.r+s6.g+s6.b)),s6.a);
    s7 = vec4(toRGB(s7.g*.3333+s7.b*.6666+u_Time*.05,1.,(s7.r+s7.g+s7.b)),s7.a);
    s8 = vec4(toRGB(s8.g*.3333+s8.b*.6666+u_Time*.05,1.,(s8.r+s8.g+s8.b)),s8.a);
    s9 = vec4(toRGB(s9.g*.3333+s9.b*.6666+u_Time*.05,1.,(s9.r+s9.g+s9.b)),s9.a);
    v_DispColor = (s1+s2+s3+s4+s5+s6+s7+s8+s9)/ 9.;
	  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
      fragmentShader: `
  varying vec2 v_UV;
  varying vec4 v_DispColor;
  uniform sampler2D u_Scroller;
  uniform sampler2D u_AllOff;
  uniform sampler2D u_OnOff;
  uniform sampler2D u_DispOff;
  uniform sampler2D u_DispCoord;
  uniform sampler2D u_DispTexture;
  uniform vec2 u_Mouse;
  uniform float u_Time;
  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }
  vec4 noise(vec2 uv){
    return vec4(rand(uv+sin(u_Time)),rand(uv+sin(u_Time*.8)),rand(uv+sin(u_Time*.7)),1.);
  }
  vec3 toRGB(float h,float s,float v){
    return ((clamp(abs(fract(h+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*s+1.)*v;
  }
  void main() {
    vec2 move = vec2(
      (u_Mouse.x-.5)*.5
      ,
      -(u_Mouse.y-.5)*.5
      );
    const float fac = .1;
    move*=fac;
    move = clamp(move,-fac,fac);
    vec2 uv = ((v_UV-.5)*(1.-fac)+.5)+move;
    vec4 dispCoord = texture2D(u_DispCoord,uv);
    vec4 disp = texture2D(u_DispTexture,dispCoord.xy);
    disp = vec4(toRGB(disp.g*.3333+disp.b*.6666+u_Time*.05,1.,(disp.r+disp.g+disp.b))*.7,disp.a);
    vec4 color = mix(texture2D(u_AllOff,uv)+texture2D(u_OnOff,uv)*texture2D(u_Scroller,uv)+v_DispColor*texture2D(u_DispOff,uv),disp,dispCoord.z);
    float h = dot(color.xyz,vec3(0.299, 0.587, 0.114));
	  gl_FragColor = color+((noise(uv)-.5)*max(0.,.1-h));
  }`,
      uniforms: {
        u_Scroller: { value: null },
        u_AllOff: { value: null },
        u_OnOff: { value: null },
        u_DispOff: { value: null },
        u_Particle: { value: null },
        u_DispCoord: { value: null },
        u_DispTexture: { value: null },
        u_Mouse: { value: new Vector2(0.5, 0.5) },
        u_Time: { value: 0 },
      },
    });
    material.uniforms.u_Scroller.value = scrollerRenderTarget.texture;
    const allOffTexture = await new TextureLoader().loadAsync("alloff.png");
    material.uniforms.u_AllOff.value = allOffTexture;
    const onOffTexture = await new TextureLoader().loadAsync("on-off.png");
    material.uniforms.u_OnOff.value = onOffTexture;
    const dispOffTexture = await new TextureLoader().loadAsync("disp-off.png");
    material.uniforms.u_DispOff.value = dispOffTexture;
    const dispCoordTexture = await new TextureLoader().loadAsync(
      "dispcoord.png"
    );
    dispCoordTexture.magFilter = NearestFilter;
    dispCoordTexture.minFilter = NearestFilter;
    material.uniforms.u_DispCoord.value = dispCoordTexture;
    material.uniforms.u_DispTexture.value = dispRenderTarget.texture;
    //material.uniforms.u_Particle.value = particleRenderTarget.texture;
    const planeMesh = new Mesh(geometory, material);
    scene.add(planeMesh);

    const camera = new OrthographicCamera();
    camera.position.z = 1;
    camera.lookAt(0, 0, 0);
    camera.top = 1;
    camera.bottom = -1;
    camera.left = -window.innerWidth / window.innerHeight;
    camera.right = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 2;
    camera.updateProjectionMatrix();

    // コンポーザーの初期化
    const composer = new EffectComposer(renderer);

    // レンダーパス：描画
    const renderPass = new RenderPass(scene, camera);

    // セーブパス：描画されたものを保存する => フレームバッファオブジェクト(3)
    const savePass = new SavePass(
      new WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        renderTargetParameters
      )
    );

    // ブレンドパス(シェーダパス) 色をブレンドする(2)
    const blendPass = new ShaderPass(
      BlendShader, // シェーダ
      "tDiffuse1" // TextureID？ => 前のパス(RenderPass)から受け取ったテクスチャを入れるスロット名,デフォルトは"tDiffuse"だが、このシェーダにはないので、上書き
    );
    blendPass.uniforms.tDiffuse2.value = savePass.renderTarget.texture;
    blendPass.uniforms.mixRatio.value = 0.85;

    let blurSize = 5;

    // 水平ブラー (4)
    const horizontalBlurPass = new ShaderPass(HorizontalBlurShader);
    horizontalBlurPass.uniforms.h.value = (1 / window.innerWidth) * blurSize;

    // 垂直ブラー (5)
    const verticalBlurPass = new ShaderPass(VerticalBlurShader);
    verticalBlurPass.uniforms.v.value = (1 / window.innerHeight) * blurSize;

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.x = 1 / window.innerWidth;
    fxaaPass.uniforms.resolution.value.y = 1 / window.innerHeight;

    // アウトプットパス(6)
    const outputPass = new ShaderPass(CopyShader);
    outputPass.renderToScreen = true;

    // パスを順番に追加
    composer.addPass(renderPass);
    composer.addPass(blendPass);
    composer.addPass(savePass);
    composer.addPass(horizontalBlurPass);
    composer.addPass(verticalBlurPass);
    composer.addPass(fxaaPass);
    composer.addPass(outputPass);

    // 画面の大きさ変更時にどうするか
    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);

      horizontalBlurPass.uniforms.h.value = (1 / window.innerWidth) * blurSize;
      verticalBlurPass.uniforms.v.value = (1 / window.innerHeight) * blurSize;
      fxaaPass.uniforms.resolution.value.x = 1 / window.innerWidth;
      fxaaPass.uniforms.resolution.value.y = 1 / window.innerHeight;
      camera.left = -window.innerWidth / window.innerHeight;
      camera.right = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onWindowResize, false);

    let mouseCurrentX = mouseX;
    let mouseCurrentY = mouseY;
    container.value.appendChild(renderer.domElement);

    function render() {
      const toFes = Math.floor((1663369200000 - Date.now()) / 1000);
      // スクローラのレンダリング
      renderer.setRenderTarget(scrollerRenderTarget);
      renderer.render(scrollerScene, scrollerCamera);

      // // GPGPUのレンダリング
      // gpgpuMaterial.uniforms.u_Old.value = gpgpuRenderTarget2.texture;
      // renderer.setRenderTarget(gpgpuRenderTarget1);
      // renderer.render(gpgpuScene, gpgpuCamera);
      // const flip = gpgpuRenderTarget1;
      // gpgpuRenderTarget1 = gpgpuRenderTarget2;
      // gpgpuRenderTarget2 = flip;

      // // パーティクルのレンダリング
      // particleMaterial.uniforms.u_CoordTexture.value = gpgpuRenderTarget1.texture;
      // renderer.setRenderTarget(particleRenderTarget);
      // renderer.render(particleScene, particleCamera);

      // ディスプのレンダリング
      renderer.setRenderTarget(dispRenderTarget);
      if (toFes > 0) {
        renderer.render(dispScene, dispCamera);
      } else {
        renderer.render(welcomeScene, dispModel.cameras[0]);
        mixer.update(clock.getDelta());
      }
      // シーンのレンダリング
      renderer.setRenderTarget(null);
      composer.render();
      if (running.value) requestAnimationFrame(render);

      horizontalBlurPass.uniforms.h.value = (1 / window.innerWidth) * blurSize;
      verticalBlurPass.uniforms.v.value = (1 / window.innerHeight) * blurSize;
      blurSize =
        clicked.value && toFes < 0
          ? blurSize + 0.03
          : Math.max(0.1, blurSize - 0.03);

      if (clicked.value && blurSize > 5) {
        running.value = false;
        location.href = "/home";
      }

      const time = (Date.now() - startTime) / 1000;
      for (const material of materials) {
        material.uniforms.u_Time.value = time;
      }
      material.uniforms.u_Time.value = time;
      dispMaterial.uniforms.u_Time.value = time;
      const mill = (1663369200000 - Date.now()) % 1000; //
      const sec = toFes % 60;
      const min = Math.floor((toFes % 3600) / 60);
      const hour = Math.floor(toFes / 3600);
      if (toFes > 3600) {
        dispMaterial.uniforms.texts.value[9] = sec % 10;
        dispMaterial.uniforms.texts.value[8] = Math.floor(sec / 10);
        dispMaterial.uniforms.texts.value[7] = 10;
        dispMaterial.uniforms.texts.value[6] = min % 10;
        dispMaterial.uniforms.texts.value[5] = Math.floor(min / 10);
        dispMaterial.uniforms.texts.value[4] = 10;
        dispMaterial.uniforms.texts.value[3] = hour % 10;
        dispMaterial.uniforms.texts.value[2] = Math.floor((hour / 10) % 10);
        dispMaterial.uniforms.texts.value[1] = Math.floor((hour / 100) % 10);
        dispMaterial.uniforms.texts.value[0] = Math.floor((hour / 1000) % 10);
      } else {
        dispMaterial.uniforms.texts.value[9] = Math.floor(mill % 10);
        dispMaterial.uniforms.texts.value[8] = Math.floor((mill / 10) % 10);
        dispMaterial.uniforms.texts.value[7] = Math.floor((mill / 100) % 10);
        dispMaterial.uniforms.texts.value[6] = 10;
        dispMaterial.uniforms.texts.value[5] = sec % 10;
        dispMaterial.uniforms.texts.value[4] = Math.floor(sec / 10);
        dispMaterial.uniforms.texts.value[3] = 10;
        dispMaterial.uniforms.texts.value[2] = min % 10;
        dispMaterial.uniforms.texts.value[1] = Math.floor(min / 10);
        dispMaterial.uniforms.texts.value[0] = 11;
      }
      // gpgpuMaterial.uniforms.u_Time.value = time;
      // material.uniforms.u_DispColor.value = new Color(
      //   Math.floor(Math.random() * 256) * 0x010000 +
      //     Math.floor(Math.random() * 256) * 0x000100 +
      //     Math.floor(Math.random() * 256) * 0x000001
      // );
      material.uniforms.u_Mouse.value.x = mouseCurrentX =
        mouseX * 0.2 + mouseCurrentX * 0.8;
      material.uniforms.u_Mouse.value.y = mouseCurrentY =
        mouseY * 0.2 + mouseCurrentY * 0.8;
    }
    render();

    // オブジェクト開放したい
    const registry = new FinalizationRegistry((heldValue: EventDispatcher) => {
      if (heldValue.dispatchEvent) {
        heldValue.dispatchEvent({ type: "dispose" });
      }
    });
    loading.value = false;
  });
});
onUnmounted(() => {
  running.value = false;
});
</script>

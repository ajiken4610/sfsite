<template lang="pug">
#container(ref="container")
</template>
<script lang="ts">
let showed = false;
</script>
<script setup lang="ts">
import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  Color,
  EventDispatcher,
  Float32BufferAttribute,
  Line,
  LinearFilter,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneBufferGeometry,
  Points,
  PointsMaterial,
  RawShaderMaterial,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  Texture,
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
if (showed) {
  location.reload();
} else {
  showed = true;
}
const container = ref<HTMLDivElement>(null);
const running = ref(true);
onMounted(async () => {
  // レンダラの初期化
  const renderer = new WebGLRenderer();
  renderer.shadowMap.enabled = true;
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

  // シーンの初期化
  const scene = new Scene();

  // 板ポリ
  const geometory = new PlaneBufferGeometry(3.5555555, 2);
  const material = new ShaderMaterial({
    vertexShader: `
  varying vec2 v_UV;
  void main() {
    v_UV = uv;
	  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
    fragmentShader: `
  varying vec2 v_UV;
  uniform sampler2D u_Scroller;
  uniform sampler2D u_AllOff;
  uniform sampler2D u_OnOff;
  uniform sampler2D u_DispOff;
  uniform vec3 u_DispColor;
  uniform vec2 u_Mouse;
  uniform float u_Time;
  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }
  vec4 noise(vec2 uv){
    return vec4(rand(uv+sin(u_Time)),rand(uv+sin(u_Time*.8)),rand(uv+sin(u_Time*.7)),1.);
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
    vec4 color = texture2D(u_AllOff,uv)+texture2D(u_OnOff,uv)*texture2D(u_Scroller,uv)+vec4(u_DispColor,1.0)*texture2D(u_DispOff,uv);
    float h = dot(color.xyz,vec3(0.299, 0.587, 0.114));
	  gl_FragColor = color+((noise(uv)-.5)*max(0.,.1-h));
  }`,
    uniforms: {
      u_Scroller: { value: null },
      u_AllOff: { value: null },
      u_OnOff: { value: null },
      u_DispOff: { value: null },
      u_Particle: { value: null },
      u_DispColor: { value: new Color(0x000000) },
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
  blendPass.uniforms.mixRatio.value = 0.75;

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

    // シーンのレンダリング
    renderer.setRenderTarget(null);
    composer.render();
    if (running.value) requestAnimationFrame(render);

    horizontalBlurPass.uniforms.h.value = (1 / window.innerWidth) * blurSize;
    verticalBlurPass.uniforms.v.value = (1 / window.innerHeight) * blurSize;
    blurSize = Math.max(0, blurSize - 0.03);
    if (blurSize < 0) {
      composer.removePass(horizontalBlurPass);
      composer.removePass(verticalBlurPass);
    }

    const time = (Date.now() - startTime) / 1000;
    for (const material of materials) {
      material.uniforms.u_Time.value = time;
    }
    material.uniforms.u_Time.value = time;
    // gpgpuMaterial.uniforms.u_Time.value = time;
    material.uniforms.u_DispColor.value = new Color(
      Math.floor(Math.random() * 256) * 0x010000 +
        Math.floor(Math.random() * 256) * 0x000100 +
        Math.floor(Math.random() * 256) * 0x000001
    );
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
});
onUnmounted(() => {
  running.value = false;
});
</script>

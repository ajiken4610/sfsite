<template lang="pug">
div
  LayoutHeader
  #background-container(ref="container")
  .container(:class="{ 'my-4': $route.path !== '/home' }")
    slot
  LayoutFooter
  LayoutLoadingOverlay
  LayoutToastContainer(:toasts="toasts")
</template>

<script setup lang="ts">
import {
  BufferGeometry,
  Camera,
  CameraHelper,
  Float32BufferAttribute,
  LinearFilter,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Points,
  Scene,
  ShaderMaterial,
  TextureLoader,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const toasts = ref<
  { title?: string; subtitle?: string; body: string; key: number }[]
>([]);

watch(
  getShowingToasts(),
  (value) => {
    toasts.value = value;
  },
  { deep: true, immediate: true }
);

const router = useRouter();
const loading = ref(false);
const overlaying = ref(false);
router.beforeEach((to, from, next) => {
  loading.value = true;
  overlaying.value = true;
  next();
});
router.afterEach(() => {
  overlaying.value = false;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
const container = ref<HTMLDivElement>();
let mouseX = 0.5,
  mouseY = 0.5,
  scroll = 0;
let currentX = 0.5,
  currentY = 0.25;
onMounted(async () => {
  window.addEventListener("mousemove", (e) => {
    mouseX = e.x / renderer.domElement.clientWidth;
    mouseY = e.y / renderer.domElement.clientHeight;
  });
  const particleCount = 64;
  let gpgpuRenderTarget1 = new WebGLRenderTarget(10, particleCount, {
    depthBuffer: false,
    stencilBuffer: false,
    minFilter: NearestFilter,
    magFilter: NearestFilter,
  });
  let gpgpuRenderTarget2 = new WebGLRenderTarget(10, particleCount, {
    depthBuffer: false,
    stencilBuffer: false,
    minFilter: NearestFilter,
    magFilter: NearestFilter,
  });

  const gpgpuGeometory = new PlaneBufferGeometry(2, 2);
  const gpgpuMaterial = new ShaderMaterial({
    vertexShader: `
      varying vec2 v_UV;
      void main() {
        v_UV = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    fragmentShader: `
      uniform sampler2D u_Old;
      uniform float u_Time;
      varying vec2 v_UV;
      float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
      float restore(vec4 val){
        const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
        return dot(val,bitShift);
      }
      vec4 store(float val){
        const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
        const vec4 bitMask = vec4(1./256.,1./256.,1./256.,0.);
        vec4 ret = fract(val*bitShift);
        ret -= ret.yzww * bitMask;
        return ret;
      }
      void main() {
        const float paramCount = 10.;
        const float offset = 1./paramCount;
        float oldX = restore(texture2D(u_Old,vec2(offset*0.,v_UV.y)));
        float oldY = restore(texture2D(u_Old,vec2(offset*1.,v_UV.y)));
        float oldZ = restore(texture2D(u_Old,vec2(offset*2.,v_UV.y)));
        float oldVX = restore(texture2D(u_Old,vec2(offset*3.,v_UV.y)));
        float oldVY = restore(texture2D(u_Old,vec2(offset*4.,v_UV.y)));
        float oldVZ = restore(texture2D(u_Old,vec2(offset*5.,v_UV.y)));
        float oldR = restore(texture2D(u_Old,vec2(offset*6.,v_UV.y)));
        float oldG = restore(texture2D(u_Old,vec2(offset*7.,v_UV.y)));
        float oldB = restore(texture2D(u_Old,vec2(offset*8.,v_UV.y)));
        float oldLife = restore(texture2D(u_Old,vec2(offset*9.,v_UV.y)));
        int index = int(v_UV.x*paramCount);
        gl_FragColor = vec4(float(index)/paramCount,.0,.0,1.);
        const float speed = .01;
        switch(index){
          case 0: // x
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.1)): oldX + (oldVX-.5)*speed);
            break;
          case 1: // y
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.2)) : oldY + (oldVY-.5)*speed);
            break;
          case 2: // z
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.3)) : oldZ + (oldVZ-.5)*speed);
            break;
          case 3: // vx
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.4)) : oldVX );
            break;
          case 4: // vy
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.5)) : oldVY );
            break;
          case 5: // vz
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.6)) : oldVZ );
            break;
          case 6: // r
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.7))*.2 : oldR  );
            break;
          case 7: // g
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.8)) : oldG  );
            break;
          case 8: // b
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time+.9)) : oldB  );
            break;
          case 9: // life
            gl_FragColor = store(oldLife == 0. ? rand(v_UV+sin(u_Time))*.5+.5 : max(0.,oldLife - (1./240.)) );
            break;
        }
      }`,
    uniforms: {
      u_Old: { value: null },
      u_Time: { value: 0 },
    },
  });
  const gpgpuMesh = new Mesh(gpgpuGeometory, gpgpuMaterial);
  const gpgpuScene = new Scene();
  gpgpuScene.add(gpgpuMesh);
  const gpgpuCamera = new OrthographicCamera();
  gpgpuCamera.position.z = 1;
  gpgpuCamera.lookAt(0, 0, 0);
  gpgpuCamera.top = 1;
  gpgpuCamera.bottom = -1;
  gpgpuCamera.left = -1;
  gpgpuCamera.right = 1;
  gpgpuCamera.near = 0.1;
  gpgpuCamera.far = 2;
  gpgpuCamera.updateProjectionMatrix();

  // パーティクル
  const particleGeometory = new BufferGeometry();
  const indexes = new Float32Array(particleCount);
  for (var i = 0; i < particleCount; i++) {
    indexes[i] = (1 / particleCount) * i + (1 / particleCount) * 0.5;
  }
  particleGeometory.setAttribute(
    "a_Index",
    new Float32BufferAttribute(indexes, 1)
  );
  particleGeometory.setAttribute(
    "position",
    new Float32BufferAttribute(new Float32Array(192), 3)
  );
  particleGeometory.drawRange.start = 0;
  particleGeometory.drawRange.count = particleCount;
  const particleMaterial = new ShaderMaterial({
    vertexShader: `
    attribute float a_Index;
    uniform sampler2D u_CoordTexture;
    varying float v_Index;
    varying vec3 v_Color;
    float restore(vec4 val){
        const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
        return dot(val,bitShift);
    }
    void main() {
      const float paramCount = 10.;
      const float offset = 1./paramCount;
      float x = restore(texture2D(u_CoordTexture,vec2(offset*0.,a_Index)));
      float y = restore(texture2D(u_CoordTexture,vec2(offset*1.,a_Index)));
      float z = restore(texture2D(u_CoordTexture,vec2(offset*2.,a_Index)));
      float r = restore(texture2D(u_CoordTexture,vec2(offset*6.,a_Index)));
      float g = restore(texture2D(u_CoordTexture,vec2(offset*7.,a_Index)));
      float b = restore(texture2D(u_CoordTexture,vec2(offset*8.,a_Index)));
      gl_PointSize = z*10.;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
      v_Index = a_Index;
      v_Color = vec3(r,g,b);
    }`,
    fragmentShader: `
    uniform sampler2D u_CoordTexture;
    uniform sampler2D u_Mist;
    varying vec3 v_Color;
    varying float v_Index;
    float restore(vec4 val){
        const vec4 bitShift = vec4(1.,1./256.,1./(256.*256.),1./(256.*256.*256.));
        return dot(val,bitShift);
    }
    void main() {
      const float paramCount = 10.;
      const float offset = 1./paramCount;
      gl_FragColor = vec4( v_Color, 1.0 );
    }`,
    uniforms: {
      u_CoordTexture: { value: null },
    },
  });
  const particlePoints = new Points(particleGeometory, particleMaterial);

  const particleScene = new Scene();
  particleScene.add(particlePoints);

  const particleCamera = new OrthographicCamera();
  particleCamera.position.set(0.5, 0.5, 1);
  particleCamera.lookAt(0, 0, 0);
  particleCamera.top = 0.5;
  particleCamera.bottom = 0;
  particleCamera.left = 0;
  particleCamera.right = 0.5;
  particleCamera.near = 0.01;
  particleCamera.far = 5;
  particleCamera.updateProjectionMatrix();

  const renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearAlpha(0);
  container.value.appendChild(renderer.domElement);

  // コンポーザーの初期化
  const composer = new EffectComposer(renderer);

  // レンダーパス：描画
  const renderPass = new RenderPass(
    particleScene,
    particleCamera
    //camera
  );

  // セーブパス：描画されたものを保存する => フレームバッファオブジェクト(3)
  const savePass = new SavePass(
    new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
    })
  );

  // ブレンドパス(シェーダパス) 色をブレンドする(2)
  const blendPass = new ShaderPass(
    BlendShader, // シェーダ
    "tDiffuse1" // TextureID？ => 前のパス(RenderPass)から受け取ったテクスチャを入れるスロット名,デフォルトは"tDiffuse"だが、このシェーダにはないので、上書き
  );
  blendPass.uniforms.tDiffuse2.value = savePass.renderTarget.texture;
  blendPass.uniforms.mixRatio.value = 0.85;

  let blurSize = 0;

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
  composer.addPass(horizontalBlurPass);
  composer.addPass(verticalBlurPass);
  composer.addPass(fxaaPass);
  composer.addPass(outputPass);

  const onWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    horizontalBlurPass.uniforms.h.value = (1 / window.innerWidth) * blurSize;
    verticalBlurPass.uniforms.v.value = (1 / window.innerHeight) * blurSize;
    fxaaPass.uniforms.resolution.value.x = 1 / window.innerWidth;
    fxaaPass.uniforms.resolution.value.y = 1 / window.innerHeight;
    particleCamera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onWindowResize, false);
  const startTime = Date.now();
  const render = () => {
    requestAnimationFrame(render);
    // GPGPUのレンダリング
    gpgpuMaterial.uniforms.u_Old.value = gpgpuRenderTarget2.texture;
    renderer.setRenderTarget(gpgpuRenderTarget1);
    renderer.render(gpgpuScene, gpgpuCamera);
    const flip = gpgpuRenderTarget1;
    gpgpuRenderTarget1 = gpgpuRenderTarget2;
    gpgpuRenderTarget2 = flip;

    // パーティクルのレンダリング
    particleMaterial.uniforms.u_CoordTexture.value = gpgpuRenderTarget1.texture;
    renderer.setRenderTarget(null);
    composer.render();

    gpgpuMaterial.uniforms.u_Time.value = Date.now() - startTime;

    currentX = currentX * 0.5 + mouseX * 0.5;
    currentY = currentY * 0.5 + ((mouseY + scroll) / 2) * 0.5;
    particleCamera.position.set(currentX * 0.5, currentY * 0.5, 1);
    particleCamera.updateProjectionMatrix();
  };
  render();
});

window.addEventListener("scroll", function () {
  let scrollPx = document.documentElement.scrollTop;
  let hiddenHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = scrollPx / hiddenHeight;
  scroll = scrollValue;
});
</script>

<style scoped lang="scss">
#background-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1000;
}
#background-container > :deep(*) {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>

<style lang="scss">
@import "highlight.js/scss/github-dark.scss";

@import "bootstrap/scss/functions";
// Default variable overrides
$light: #dddddd;
$dark: #181b2c;

$body-bg: #181b2c;
$body-color: #fff;

$component-active-color: $body-color;
$component-active-bg: $body-bg;

$popover-bg: $body-bg;
$popover-border-color: $body-color;

$modal-content-bg: $body-bg;
$modal-content-color: $body-color;

$toast-header-color: $body-color;
$toast-background-color: rgba(black, 0.5);
$toast-header-background-color: rgba(black, 0.1);

$dropdown-link-color: $body-bg;

$nav-link-color: $body-color;
$nav-link-hover-color: $body-color;
$nav-tabs-link-active-color: $body-color;

$btn-close-color: $body-color;

$card-height: 100%;

:root {
  --vs-controls-color: #ffffff;
  --vs-border-color: #ffffff;

  --vs-dropdown-bg: #181b2c;
  --vs-dropdown-color: #ffffff;
  --vs-dropdown-option-color: #ffffff;

  --vs-selected-bg: #181b2c;
  --vs-selected-color: #ffffff;

  --vs-search-input-color: #ffffff;

  --vs-dropdown-option--active-bg: #2d3353;
  --vs-dropdown-option--active-color: #ffffff;
}
@import "bootstrap/scss/bootstrap";

@import "vue-select/dist/vue-select.css";

@import "public/bootstrap-icons.css";
@import "public/katex.min.css";

$custom-colors: (
  "sfsite": #181b2c,
);

$theme-colors: map-merge($theme-colors, $custom-colors);
.page-enter-active,
.page-leave-active {
  transition: all 1s ease;
}
a,
a:hover {
  color: $body-color;
}
.page-enter-from,
.page-leave-to,
.page-leave-active {
  transform: translateY(-100%);
  opacity: 0;
}

.page-move {
  transition: all 1s ease;
}
body:not(.modal-open) {
  overflow-y: scroll;
}
</style>

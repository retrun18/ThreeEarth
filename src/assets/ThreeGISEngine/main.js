/**
 * Created by appleli on 2017/11/23 0023.
 */
// import THREE from "three";
var THREE=require('three');
var TGE={
  /**
   * 初始化球面场景
   * @param {domName} container 画布容器
   * @constructor
   */
  InitGlobalScene(container)
  {
    var container=document.getElementById(container);
    var MapScene={};
    var scene;
    var Renderer;
    var MainCamera;
    var HemisphereLight;
    var DirectionalLight;
    /**
     * 定义属性访问器
     */
    Object.defineProperties(MapScene,{
      Scene:{
        get:function () {
          return scene;
        }
      },
      Renderer:{
        get:function () {
          return Renderer;
        }
      },
      MainCamera:{
        get:function () {
          return MainCamera;
        }
      },
    })
    function InitScene() {
      scene= new THREE.Scene();
    }
    function InitRender() {
      Renderer = new THREE.WebGLRenderer();//渲染器
      Renderer.setClearColor("#ffffff", 1.0);//背景颜色为浅蓝色
      Renderer.setSize(container.clientWidth, container.clientHeight);//设置渲染显示范围尺寸
      container.appendChild(Renderer.domElement);//将renderer加载到div
    }
    function InitCamera() {
      //ms.mainCamera = new THREE.OrthographicCamera(-(mapExtent.xmax - mapExtent.xmin)/mScale / 2, (mapExtent.xmax - mapExtent.xmin) /mScale/ 2, (mapExtent.ymax - mapExtent.ymin) /mScale/ 2, -(mapExtent.ymax - mapExtent.ymin) /mScale/ 2, 1, 10000);//正摄相机
      MainCamera = new THREE.PerspectiveCamera(60, container.clientWidth /container.clientWidth, 1, 20000);
      MainCamera.position.x = 0;
      MainCamera.position.z =500;
      // MainCamera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0
      // });
    }
    function InitLights() {
      //灯光,半球光源
      HemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      HemisphereLight.color.setHSL(0.6, 1, 0.6);
      HemisphereLight.groundColor.setHSL(0.095, 1, 0.75);
      HemisphereLight.position.set(0, 500, 0);
      Scene.add(HemisphereLight);

      //平行光源

      var DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
      DirectionalLight.color.setHSL(0.1, 1, 0.95);
      DirectionalLight.position.set(-1, 1.75, 1);
      DirectionalLight.position.multiplyScalar(50);
      Scene.add(DirectionalLight);

      DirectionalLight.castShadow = true;

      DirectionalLight.shadow.mapSize.width = 2048;
      DirectionalLight.shadow.mapSize.height = 2048;

      var d = 50;

      DirectionalLight.shadow.camera.left = -d;
      DirectionalLight.shadow.camera.right = d;
      DirectionalLight.shadow.camera.top = d;
      DirectionalLight.shadow.camera.bottom = -d;

      DirectionalLight.shadow.camera.far = 3500;
      DirectionalLight.shadow.bias = -0.0001;
      //dirLight.shadowCameraVisible = true;
    }
    function InitBasicEnvironment(){
     var group = new THREE.Group();
      Scene.add( group );
      // earth
      var loader = new THREE.TextureLoader();
      loader.load( 'static/pictures/land_ocean_ice_cloud_2048.jpg', function ( texture ) {
        var geometry = new THREE.SphereGeometry( 200, 200, 200 );
        var material = new THREE.MeshLambertMaterial( { map: texture, overdraw: 0.5 } );
        var mesh = new THREE.Mesh( geometry, material );
        group.add( mesh );
      } );
      // // SKYDOME天空盒
      // var vertexShader = document.getElementById('vertexShader').textContent;
      // var fragmentShader = document.getElementById('fragmentShader').textContent;
      // var uniforms = {
      //   topColor: { type: "c", value: new THREE.Color(0x0077ff) },
      //   bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
      //   offset: { type: "f", value: 33 },
      //   exponent: { type: "f", value: 0.6 }
      // };
      // uniforms.topColor.value.copy(HemisphereLight.color);
      //
      // //scene.fog.color.copy(uniforms.bottomColor.value);
      //
      // var skyGeo = new THREE.SphereGeometry(100, 32, 15);
      // var skyMat = new THREE.ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide });
      //
      // var sky = new THREE.Mesh(skyGeo, skyMat);
      // Scene.add(sky);
    }
    InitScene();//初始化场景
    InitRender();//初始化画布（必须在相机初始化前面）
    InitCamera();//初始化相机
    InitLights();//初始化灯光
    InitBasicEnvironment();
    /**
     * 画布自适应
     */
    function onWindowResize() {
      MainCamera.aspect = container.clientWidth / container.clientHeight;
      MainCamera.updateProjectionMatrix();
      Renderer.setSize( container.clientWidth, container.clientHeight);
    }
    document.body.onload=onWindowResize;
    document.body.onresize=onWindowResize;
    function render()
  {
    requestAnimationFrame(render);
    Renderer.render(Scene,MainCamera);
  }
  render();
  }
}
export default  TGE;

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
  InitGlobeScene(container)
  {
    var container=document.getElementById(container);
    var MapScene={
      scene:undefined,
      renderer:undefined,
      rendererWidth:0,
      rendererHeight:0,

    };
    InitScene();//初始化场景
    InitRender();//初始化画布（必须在相机初始化前面）
    InitCamera();//初始化相机
    InitLights();//初始化灯光
    InitBaseEnvironment();
    function InitScene() {
      MapScene.scene = new THREE.Scene();
    }
    function InitRender() {
      MapScene.renderer = new THREE.WebGLRenderer();//渲染器
      MapScene.renderWidth = container.clientWidth;
      MapScene.renderHeight = container.clientHeight;
      MapScene.renderer.setClearColor("#ffffff", 1.0);//背景颜色为浅蓝色
      MapScene.renderer.setSize(MapScene.renderWidth, MapScene.renderHeight);//设置渲染显示范围尺寸
      container.appendChild(MapScene.renderer.domElement);//将renderer加载到div
    }
    function InitCamera() {
      //ms.mainCamera = new THREE.OrthographicCamera(-(mapExtent.xmax - mapExtent.xmin)/mScale / 2, (mapExtent.xmax - mapExtent.xmin) /mScale/ 2, (mapExtent.ymax - mapExtent.ymin) /mScale/ 2, -(mapExtent.ymax - mapExtent.ymin) /mScale/ 2, 1, 10000);//正摄相机
      MapScene.mainCamera = new THREE.PerspectiveCamera(60, container.clientWidth /container.clientWidth, 1, 20000);
      MapScene.mainCamera.position.x = 0;
      MapScene.mainCamera.position.z =500;
      // MapScene.mainCamera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0
      // });
    }
    function InitLights() {
      //灯光
      MapScene.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      MapScene.hemiLight.color.setHSL(0.6, 1, 0.6);
      MapScene.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      MapScene.hemiLight.position.set(0, 500, 0);
      MapScene.scene.add(MapScene.hemiLight);

      //平行光

      var dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.color.setHSL(0.1, 1, 0.95);
      dirLight.position.set(-1, 1.75, 1);
      dirLight.position.multiplyScalar(50);
      MapScene.scene.add(dirLight);

      dirLight.castShadow = true;

      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;

      var d = 50;

      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;

      dirLight.shadow.camera.far = 3500;
      dirLight.shadow.bias = -0.0001;
      //dirLight.shadowCameraVisible = true;
    }
    function InitBaseEnvironment(){
     var group = new THREE.Group();
      MapScene.scene.add( group );
      // earth
      var loader = new THREE.TextureLoader();
      loader.load( 'static/pictures/land_ocean_ice_cloud_2048.jpg', function ( texture ) {
        var geometry = new THREE.SphereGeometry( 200, 20, 20 );
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
      // uniforms.topColor.value.copy(MapScene.hemiLight.color);
      //
      // //scene.fog.color.copy(uniforms.bottomColor.value);
      //
      // var skyGeo = new THREE.SphereGeometry(100, 32, 15);
      // var skyMat = new THREE.ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide });
      //
      // var sky = new THREE.Mesh(skyGeo, skyMat);
      // MapScene.scene.add(sky);
    }

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize() {
      MapScene.mainCamera.aspect = container.clientWidth / container.clientHeight;
      MapScene.mainCamera.updateProjectionMatrix();
      MapScene.renderer.setSize( container.clientWidth, container.clientHeight);
    }
    function render()
  {

    //imageContext.drawImage(video, 0, 0);

    //if (texture) texture.needsUpdate = true;
    requestAnimationFrame(render);
    MapScene.renderer.render(MapScene.scene,MapScene.mainCamera);
  }
  render();
  }
}
export default  TGE;

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

async function init() {
  let renderer
  const scene = new THREE.Scene()
  scene.backgroundBlurriness = 0.5
  scene.backgroundIntensity = 0.69

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.domElement.style.width = '100% !important'
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  window.addEventListener('resize', function () {
    let width = window.innerWidth
    let height = window.innerHeight

    renderer.setSize(width, height)

    camera.aspect = width / height

    camera.updateProjectionMatrix()
  })

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)
  const light = new THREE.PointLight(0xffffff, 10, 10)
  light.position.set(1, 1, 1)
  scene.add(light)

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  camera.position.x = 2.76942813020402
  camera.position.y = -7.906113373639309
  camera.position.z = 5.543139630886989
  const controls = new OrbitControls(camera, renderer.domElement)

  controls.enableZoom = false;
  controls.enablePan = false;
  


  const silver = new THREE.Color('rgb(211,211,211)')

  const loader = new GLTFLoader()
  loader.crossOrigin = ''
  loader.load(
    'https://cdn.shopify.com/s/files/1/0734/8522/2208/files/model.gltf?v=1703723345',
    async function (gltf) {
      await gltf
      // gltf.scene.rotation.x = 5
      let model = gltf.scene.children[0]
      model.rotation.x = -2

      model.material.color = silver
      model.material.roughness = 0.025
      scene.add(model)
    },
    undefined,
    function (error) {
      console.error(error)
    }
  )

  new RGBELoader().load(
    'https://cdn.shopify.com/s/files/1/0734/8522/2208/files/sky_blue.hdr?v=1703723358',
    async function (texture) {
      await texture
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
      scene.environment = texture
    }
  )
  if (document.getElementById('about-main-info-wrapper')) {
    document
      .getElementById('about-main-info-wrapper')
      .before(renderer.domElement)
  }

  function animate() {
    requestAnimationFrame(animate)
    rotateModel(scene)

    renderer.render(scene, camera)
  }

  animate()

  function rotateModel(model) {
    model.rotation.x += 0.0025
    model.rotation.y += 0.0025
  }
}

await init()

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

  renderer = new THREE.WebGLRenderer()

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)
  const light = new THREE.PointLight(0xffffff, 10, 10)
  light.position.set(1, 1, 1)
  scene.add(light)

  camera.position.z = 5

  const controls = new OrbitControls(camera, renderer.domElement)
  const silver = new THREE.Color('rgb(211,211,211)')
  const loader = new GLTFLoader()
  loader.crossOrigin = ''
  loader.load(
    'https://cdn.shopify.com/s/files/1/0734/8522/2208/files/model.gltf?v=1703723345',
    async function (gltf) {
      await gltf
      gltf.scene.rotation.x = 0.7
      let model = gltf.scene.children[0]
      // rgb(211,211,211)
      model.material.color = silver
      console.log(model)
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

  const screenWidth = 500
  const screenHeight = 500

  renderer.setSize(screenWidth, screenHeight)

  document.getElementById('about_description').appendChild(renderer.domElement)

  function animate() {
    requestAnimationFrame(animate)
    window.addEventListener('resize', onWindowResize)
    rotateModel(scene)
    renderer.render(scene, camera)
  }

  animate()

  function onWindowResize() {
    const width = screenWidth
    const height = screenHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }

  function rotateModel(model) {
    model.rotation.x += 0.0025
    model.rotation.y += 0.0025
  }
}

await init()

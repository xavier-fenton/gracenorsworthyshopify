import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

init()

function init() {
  let renderer
  const scene = new THREE.Scene()
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

  const loader = new GLTFLoader()

  loader.crossOrigin = ''
  loader.load(
    '../assets/obj_003_website.gltf',
    async function (gltf) {
      knuckleModel = gltf.scene

      await renderer.compileAsync(knuckleModel, camera, scene)

      scene.add(knuckleModel)
    },
    undefined,
    function (error) {
      console.error(error)
    }
  )

  new RGBELoader().load('../assets/lake_pier_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping

    scene.background = texture
    scene.environment = texture
    console.log(scene.background)
  })

  const screenWidth = 500
  const screenHeight = 500

  renderer.setSize(screenWidth, screenHeight)
  document.getElementById('about_description').appendChild(renderer.domElement)

  let knuckleModel
  function animate() {
    requestAnimationFrame(animate)
    window.addEventListener('resize', onWindowResize)
    knuckleModel.children[0].rotation.x += 0.0025
    knuckleModel.children[0].rotation.y += 0.0025
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
}

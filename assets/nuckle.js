import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({ alpha: true })

const aboutPageDiv = document.getElementById('about_description')

console.log(aboutPageDiv)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
const light = new THREE.PointLight(0xff0000, 1, 100)
light.position.set(50, 50, 50)
scene.add(light)
camera.position.z = 5
const controls = new OrbitControls(camera, renderer.domElement)
const loader = new GLTFLoader()

let knuckleObject
let basicMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  skinning: true,
})
loader.load(
  '../assets/obj_003_website.gltf',
  function (gltf) {
    knuckleObject = gltf
    gltf.material = basicMaterial
    console.log(gltf)
    scene.add(gltf.scene)
    // gltf.scene.children[0].rotation.y += 3
    // console.log(gltf.scene.children[0].rotation)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

renderer.setSize(500, 500)
document.getElementById('about_description').appendChild(renderer.domElement)

async function animate() {
  requestAnimationFrame(animate)
  knuckleObject.scene.children[0].rotation.x += 0.0025
  knuckleObject.scene.children[0].rotation.y += 0.0025
  window.addEventListener('resize', onWindowResize)
  renderer.render(scene, camera)
}

animate()

function onWindowResize() {
  const width = 500
  const height = 500

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

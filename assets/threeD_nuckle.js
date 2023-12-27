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
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)
camera.position.z = 5
const controls = new OrbitControls(camera, renderer.domElement)
const loader = new GLTFLoader()

let knuckleObject

loader.load(
  '../assets/obj_003_website.gltf',
  function (gltf) {
    knuckleObject = gltf
    console.log(knuckleObject.scene.children[0])
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

function animate() {
  requestAnimationFrame(animate)
  knuckleObject.scene.children[0].rotation.x += 0.0025
  knuckleObject.scene.children[0].rotation.y += 0.0025

  renderer.render(scene, camera)
}

animate()

import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'

// import './assets/main.css'

import { createApp   }   from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import HomeView from '@/views/HomeView.vue'

const app = createApp(App)

app.use(createPinia ())
app.use(router)
app.mount('#app')

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)

// const renderer = new THREE.WebGLRenderer()

// camera.position.set(0, 0, 20)
// camera.lookAt(0, 0, 0)

// // create a blue LineBasicMaterial
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000FF })

// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( lineGeometry, lineMaterial );

// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry(4, 4, 4)
// const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
// scene.add( line );
// renderer.render( scene, camera );

// // camera.position.z = 5

// function animate() {
//   requestAnimationFrame(animate)

//   cube.rotation.x += 0.01
//   cube.rotation.y += 0.01

//   renderer.render(scene, camera)
// }

// if (WebGL.isWebGLAvailable()) {
//   // Initiate function or other initializations here
//   animate()
// }
// else {
//   const warning = WebGL.getWebGLErrorMessage()
//   document.getElementById('app')!.appendChild(warning)
// }
// animate();

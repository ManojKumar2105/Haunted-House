
import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js'
import {OrbitControls} from 'https://cdn.skypack.dev/@three-ts/orbit-controls'
import { GUI } from "https://unpkg.com/three@0.112.1/examples/jsm/libs/dat.gui.module.js";

const gui=new GUI();
// Canvas
const canvas = document.querySelector('canvas.webgl')
const fog=new THREE.Fog('#262837',1,12)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const textureloader=new THREE.TextureLoader()
const alphatextures=textureloader.load('textures/door/alpha.jpg')
const ambienttextures=textureloader.load('textures/door/ambientOcclusion.jpg')
const heighttextures=textureloader.load('textures/door/height.jpg')
const normaltextures=textureloader.load('textures/door/normal.jpg')
const metalnesstextures=textureloader.load('textures/door/metalness.jpg')
const roughtextures=textureloader.load('textures/door/roughness.jpg')
const textures=textureloader.load('textures/door/color.jpg')
const ambientbricks=textureloader.load('textures/bricks/ambientOcclusion.jpg')
const normalbricks=textureloader.load('textures/bricks/normal.jpg')
const roughbricks=textureloader.load('textures/bricks/roughness.jpg')
const bricks=textureloader.load('textures/bricks/color.jpg')
const ambientgrass=textureloader.load('textures/grass/ambientOcclusion.jpg')
const normalgrass=textureloader.load('textures/grass/normal.jpg')
const roughgrass=textureloader.load('textures/grass/roughness.jpg')
const grass=textureloader.load('textures/grass/color.jpg')
ambientgrass.repeat.set(8,8)
normalgrass.repeat.set(8,8)
roughgrass.repeat.set(8,8)
grass.repeat.set(8,8)
ambientgrass.wrapS=THREE.RepeatWrapping
normalgrass.wrapS=THREE.RepeatWrapping
roughgrass.wrapS=THREE.RepeatWrapping
grass.wrapS=THREE.RepeatWrapping
ambientgrass.wrapT=THREE.RepeatWrapping
normalgrass.wrapT=THREE.RepeatWrapping
roughgrass.wrapT=THREE.RepeatWrapping
grass.wrapT=THREE.RepeatWrapping
window.addEventListener('resize',() =>
{
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})
// Scene
const scene = new THREE.Scene()
const house=new THREE.Group()
scene.add(house)
scene.fog=fog
const walls=new THREE.Mesh(new THREE.BoxBufferGeometry(4,2.5,4),new THREE.MeshStandardMaterial({
    map:bricks,
    aoMap:ambientbricks,
    normalMap:normalbricks,
    roughnessMap:roughbricks
}))
walls.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2))
walls.position.y=0.550
house.add(walls)
const roof=new THREE.Mesh(new THREE.ConeBufferGeometry(3.5,1,4),new THREE.MeshStandardMaterial({color:'red'}))
roof.position.y=1.8+0.5
roof.rotation.y=Math.PI*0.25
house.add(roof)
const door=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2,100,100),new THREE.MeshStandardMaterial({
    map:textures,
    transparent:true,
    alphaMap:alphatextures,
    aoMap:ambienttextures,
    displacementMap:heighttextures,
    displacementScale:0.1,
    normalMap:normaltextures,
    metalnessMap:metalnesstextures,
    roughnessMap:roughtextures

}))
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2))
door.position.y=0.220
door.position.z=2+0.01
house.add(door)
const bushgeo=new THREE.SphereBufferGeometry(1,16,16)
const bushmat=new THREE.MeshStandardMaterial({color:'lightgreen'})
const bush1=new THREE.Mesh(bushgeo,bushmat)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(1.3,-0.3,2.5)
const bush2=new THREE.Mesh(bushgeo,bushmat)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.9,-0.5,2.25)
const bush3=new THREE.Mesh(bushgeo,bushmat)
bush3.scale.set(0.5,0.5,0.5)
bush3.position.set(-1.5,-0.3,2.5)
house.add(bush1,bush2,bush3)
const graves=new THREE.Group()
scene.add(graves)
const gravegeo=new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const gravemat=new THREE.MeshStandardMaterial({color:'gray'})
for(let i=0;i<20;i++)
{
    const angle=Math.random()*Math.PI*2
    const radius=4+Math.random()*6
    const x=Math.sin(angle)*radius
    const z=Math.cos(angle)*radius
    const grave=new THREE.Mesh(gravegeo,gravemat)
    grave.position.set(x,-0.3,z)
    grave.castShadow=true
    graves.add(grave)
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 8
const controls=new OrbitControls(camera,canvas)
scene.add(camera)
//const textures=textureloader.load('/textures/door/color.jpg')
//Mesh(new THREE.TorusBufferGeometry(0.3,0.2,16,32),material)
const plane=new THREE.Mesh(new THREE.PlaneBufferGeometry(20,20),new THREE.MeshStandardMaterial({
    map:grass,
    aoMap:ambientgrass,
    normalMap:normalgrass,
    roughnessMap:roughgrass
}))
plane.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array,2))

plane.rotation.x=-Math.PI*0.5
plane.position.y=-0.65
//sphere.castShadow=true
plane.receiveShadow=true
scene.add(plane)
const ambientlight=new THREE.AmbientLight('white',0.5)
scene.add(ambientlight)
const directionallight=new THREE.DirectionalLight('white',0.5)
directionallight.position.set(4,5,-2)
scene.add(directionallight)
gui.add(ambientlight,'intensity',0,10,0.1)
gui.add(directionallight,'intensity',0,10,0.1)
gui.add(ambientlight.position,'x',0,5,1).name('ambient x')
gui.add(ambientlight.position,'y',0,5,1).name('ambient y')
gui.add(ambientlight.position,'z',0,5,1).name('ambient z')
gui.add(directionallight.position,'x',0,5,0.1).name('direct x')
gui.add(directionallight.position,'y',0,5,0.1).name('direct y')
gui.add(directionallight.position,'z',0,5,0.1).name('direct z')
const pointlight=new THREE.PointLight('#ff7d46',1,7)
pointlight.position.set(0,1.9,2.7)
pointlight.shadow.camera.far=7
pointlight.shadow.mapSize.width=256
pointlight.shadow.mapSize.height=256

scene.add(pointlight)
gui.add(pointlight.position,'x',0,5,0.1).name('point x')
gui.add(pointlight.position,'y',0,5,0.1).name('point y')
gui.add(pointlight.position,'z',0,5,0.1).name('point z')
scene.add(gui)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.type=THREE.PCFSoftShadowMap
renderer.setClearColor('#262837')
renderer.shadowMap.enabled=true
directionallight.castShadow=true
pointlight.castShadow=true
walls.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const clock=new THREE.Clock()
//ANIMATIONS
const tick= () =>
{
    const getElapsedTime=clock.getElapsedTime()
    //const time=Date.now()
    
    //console.log(time)
  controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
    
}
tick()

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    console.log(this.width, this.height)
    console.log(this.container)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.distance = 2
    this.camera.position.z = this.distance;
    //this.camera.fov = 2 * Math.atan((this.height / 2) / this.distance) * (180 / Math.PI);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
    this.time = 0;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.addBasicObjectShader();
    this.resize();
    this.setupResize();
    this.render();

  }



  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }


  addBasicObjectShader() {

    //this.geometry = new THREE.PlaneGeometry(100, 100, 24, 24);
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      fragmentShader: fragment,
      vertexShader: vertex,
      wireframe: true,
      side: THREE.DoubleSide

    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

  }
  render() {
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    console.log("time", this.time);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this))
  }
}


new Sketch({
  dom: document.querySelector('#container')
})

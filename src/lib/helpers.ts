import * as THREE from 'three';
import { Camera } from '@react-three/fiber';

export function fitCameraToObject(camera: Camera, object: THREE.Object3D, offset = 1.25) {
    const boundingBox = new THREE.Box3().setFromObject(object);

    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));

    cameraZ *= offset;

    (camera as THREE.PerspectiveCamera).position.z = center.z + cameraZ;

    camera.lookAt(center);
}

export function hexToHexWithAlpha(hex: string, alpha: number): string {
    alpha = Math.max(0, Math.min(1, alpha));
  
    hex = hex.replace('#', '');
  
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
  
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  
    return `#${hex}${alphaHex}`;
  }
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

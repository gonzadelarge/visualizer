import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { OBJLoader } from 'three-stdlib';
import { useLoader, useThree } from '@react-three/fiber';
import { fitCameraToObject } from './lib/helpers';

export function ModelsGroup() {
    const groupRef = useRef<THREE.Group>(null);

    const { camera } = useThree();

    const ring = useLoader(OBJLoader, '/models/ring.obj');
    const sphere = useLoader(OBJLoader, '/models/sphere.obj');

    useEffect(() => {
        if (groupRef.current) {
            const models = [ring, sphere];

            models.forEach((model) => {
                const box = new THREE.Box3().setFromObject(model);
                const center = new THREE.Vector3();
                const size = new THREE.Vector3();
                box.getCenter(center);
                box.getSize(size);

                model.position.sub(center);

                const maxAxis = Math.max(size.x, size.y, size.z);
                const scaleFactor = 1 / maxAxis;
                model.scale.setScalar(scaleFactor);
            });

            sphere.position.y += 1.2;
            groupRef.current.add(ring);
            groupRef.current.add(sphere);

            const groupBox = new THREE.Box3().setFromObject(groupRef.current);
            const groupCenter = new THREE.Vector3();
            groupBox.getCenter(groupCenter);
            groupRef.current.position.sub(groupCenter);

            const groupSize = new THREE.Vector3();
            groupBox.getSize(groupSize);
            const groupMaxAxis = Math.max(groupSize.x, groupSize.y, groupSize.z);

            if (groupMaxAxis > 1) {
                const globalScale = 1 / groupMaxAxis;
                groupRef.current.scale.setScalar(globalScale);
            }

            // ⭐️ Auto adjust camera!
            fitCameraToObject(camera, groupRef.current);
        }
    }, [ring, sphere, camera]);

    return <group ref={groupRef} />;
}

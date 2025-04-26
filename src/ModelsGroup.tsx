import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { OBJLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

export function ModelsGroup() {
    const groupRef = useRef<THREE.Group>(null);

    const ring = useLoader(OBJLoader, '/models/ring.obj');
    const sphere = useLoader(OBJLoader, '/models/sphere.obj');

    useEffect(() => {
        if (groupRef.current) {
            [ring, sphere].forEach((model, idx) => {
                const size = new THREE.Vector3();
                const center = new THREE.Vector3();
                const box = new THREE.Box3().setFromObject(model);

                box.getCenter(center);
                box.getSize(size);

                model.position.sub(center);

                const factorScale = idx === 0 ? 1 : 0.4;
                const maxAxis = Math.max(size.x, size.y, size.z);

                model.scale.multiplyScalar(factorScale / maxAxis);
            });

            sphere.position.y += 0.23;

            groupRef.current.add(ring);
            groupRef.current.add(sphere);

            const groupBox = new THREE.Box3().setFromObject(groupRef.current);
            const groupCenter = new THREE.Vector3();

            groupBox.getCenter(groupCenter);
            groupRef.current.position.sub(groupCenter);
        }
    }, [ring, sphere]);

    return <group ref={groupRef} />;
}

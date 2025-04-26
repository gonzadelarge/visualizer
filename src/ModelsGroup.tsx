import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { OBJLoader } from 'three-stdlib';
import { useLoader, useFrame } from '@react-three/fiber';


export function Model() {
    const ref = useRef<THREE.Object3D>(null);

    const object = useLoader(OBJLoader, '/models/ring.obj');

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2; // 0.2 radians per second
        }
    });

    // useEffect(() => {
    //     if (ref.current && object) {
    //         const size = new THREE.Vector3();
    //         const center = new THREE.Vector3();
    //         const box = new THREE.Box3().setFromObject(ref.current);

    //         box.getSize(size);
    //         box.getCenter(center);

    //         ref.current.position.sub(center);

    //         const maxAxis = Math.max(size.x, size.y, size.z);

    //         ref.current.scale.multiplyScalar(5 / maxAxis);
    //     }
    // }, [ref, object]);

    return (
        <primitive ref={ref} object={object} />
    );
}

export function SphereModel() {
    const ref = useRef<THREE.Object3D>(null);
    const object = useLoader(OBJLoader, '/models/sphere.obj');

    // useEffect(() => {
    //     if (ref.current && object) {
    //         const size = new THREE.Vector3();
    //         const center = new THREE.Vector3();
    //         const box = new THREE.Box3().setFromObject(ref.current);

    //         box.getSize(size);
    //         box.getCenter(center);

    //         ref.current.position.sub(center);

    //         const maxAxis = Math.max(size.x, size.y, size.z);
    //         ref.current.scale.multiplyScalar(2 / maxAxis);

    //         ref.current.position.y += 0.23;

    //     }
    // }, [ref, object]);

    return (
        <primitive ref={ref} object={object} />
    );
}

export function ModelsGroup() {
    const groupRef = useRef<THREE.Group>(null);

    const ring = useLoader(OBJLoader, '/models/ring.obj');
    const sphere = useLoader(OBJLoader, '/models/sphere.obj');

    useEffect(() => {
        if (groupRef.current) {
            const ringModel = ring.clone();
            const sphereModel = sphere.clone();

            [ringModel, sphereModel].forEach((model) => {
                const box = new THREE.Box3().setFromObject(model);
                const center = new THREE.Vector3();
                box.getCenter(center);
                model.position.sub(center);

                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 1 / maxDim;
                model.scale.setScalar(scale);
            });

            sphereModel.position.y += 1.2;

            groupRef.current.add(ringModel);
            groupRef.current.add(sphereModel);

            const groupBox = new THREE.Box3().setFromObject(groupRef.current);
            const groupCenter = new THREE.Vector3();
            groupBox.getCenter(groupCenter);
            groupRef.current.position.sub(groupCenter);

        }
    }, [ring, sphere]);

    return <group ref={groupRef} />;
}
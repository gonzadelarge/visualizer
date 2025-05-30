import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { OBJLoader } from 'three-stdlib';
import { useGLTF } from "@react-three/drei";
import { useLoader, useFrame } from '@react-three/fiber';


export function Model() {
    const ref = useRef<THREE.Object3D>(null);

    const { scene } = useGLTF('/models/ring.glb');

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2;
        }
    });

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('#cccccc'),
                        metalness: 1.0,
                        roughness: 0.2,
                        envMapIntensity: 1.0
                    });
                }
            });
        }
    }, [scene]);

    return (
        <primitive ref={ref} object={scene} />
    );
}

export function SphereModel({ color }) {
    const ref = useRef<THREE.Object3D>(null);

    const { scene } = useGLTF('/models/sphere.glb');


    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
                        color: new THREE.Color(color),
                        clearcoatRoughness: 0.2,
                        transmission: 0.8,
                        transparent: false,
                        roughness: 0.5,
                        metalness: 0.1,
                        thickness: 1.5,
                        clearcoat: 1.0,
                    });
                }
            });
        }
    }, [color])


    useEffect(() => {
        const timer = setInterval(() => {
            if (ref.current && scene) {
                scene.position.y += 5.5;
                clearInterval(timer);
            }
        }, 700);

        return () => {
            clearInterval(timer);
        };
    }, [])



    return (
        <primitive ref={ref} object={scene} />
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
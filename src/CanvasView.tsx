import React, { useRef, useEffect } from 'react'

import * as THREE from 'three';

import { OBJLoader } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { ModelsGroup } from './ModelsGroup';

function Model() {
    const ref = useRef<THREE.Object3D>(null);

    const object = useLoader(OBJLoader, '/models/ring.obj');

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2; // 0.2 radians per second
        }
    });

    useEffect(() => {
        if (ref.current) {
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            const box = new THREE.Box3().setFromObject(ref.current);

            box.getSize(size);
            box.getCenter(center);

            ref.current.position.sub(center);

            const maxAxis = Math.max(size.x, size.y, size.z);

            ref.current.scale.multiplyScalar(1 / maxAxis);
        }
    }, []);

    return (
        <primitive ref={ref} object={object} />
    );
}

function SphereModel() {
    const ref = useRef<THREE.Object3D>(null);
    const obj = useLoader(OBJLoader, '/models/sphere.obj'); // <- path to your sphere

    useEffect(() => {
        if (ref.current) {
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            const box = new THREE.Box3().setFromObject(ref.current);

            box.getSize(size);
            box.getCenter(center);

            ref.current.position.sub(center);

            const maxAxis = Math.max(size.x, size.y, size.z);
            ref.current.scale.multiplyScalar(0.41 / maxAxis);

            ref.current.position.y += 0.23;
        }
    }, []);

    return (
        <primitive ref={ref} object={obj} />
    );
}

export default function CanvasView() {
    return (
        <div className="w-full h-full">
            <Canvas
                style={{ background: '#14141d' }}
                camera={{ position: [2, 2, 2], fov: 50 }}
            >

                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} />

                <ModelsGroup />

                <OrbitControls
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 3} />
            </Canvas>
        </div>
    )
}

import React, { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { Model, ModelsGroup, SphereModel } from './ModelsGroup';

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

export default function CanvasView() {
    return (
        <div className="w-full h-full">
            <Canvas
                style={{ background: '#14141d' }}
            // camera={{
            //     position: [0, 0, 5], // Default position as fallback
            //     near: 0.1,
            //     far: 1000,
            //     fov: 50
            // }}
            >

                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} />
                <Suspense fallback={<Loader />}>
                    <Model />
                    <SphereModel />
                    <OrbitControls />
                </Suspense>


            </Canvas>
        </div>
    )
}

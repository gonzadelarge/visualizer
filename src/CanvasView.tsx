import React, { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls, Environment } from '@react-three/drei';

import { Model, SphereModel } from './ModelsGroup';

type CanvasViewProps = {
    color: string;
};

function Loader() {
    return <Html>Loading...</Html>;
}

const CanvasView: React.FC<CanvasViewProps> = ({ color }) => {
    return (
        <div className="w-full h-full">
            <Canvas
                style={{ background: '#14141d' }}
                camera={{
                    position: [0, 50, 100],
                    near: 0.1,
                    far: 1000,
                    fov: 50
                }}
            >

                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} />
                <Environment preset="sunset" background={false} />
                <Suspense fallback={<Loader />}>
                    <Model />
                    <SphereModel color={color} />
                    <OrbitControls />
                </Suspense>


            </Canvas>
        </div>
    )
}

export default CanvasView
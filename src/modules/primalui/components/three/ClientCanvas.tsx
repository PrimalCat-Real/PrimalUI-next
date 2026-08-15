'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import GradientPlane from './render/objects/GradientPlane'
import { WebGPURenderer } from 'three/webgpu'
import { WebGPURendererParameters } from 'three/src/renderers/webgpu/WebGPURenderer.js'
import { DefaultGLProps } from '@react-three/fiber/dist/declarations/src/core/renderer'
import { Environment } from '@react-three/drei'

const ClientCanvas = () => {
    const renderer = async (props: DefaultGLProps) => {
        const render = new WebGPURenderer(props as WebGPURendererParameters)
        await render.init()
        return render
    }
    return (
        <div id="canvas-container" className="flex flex-col h-fit w-full items-center min-h-screen">
            <Canvas gl={renderer}>
                <Environment preset="studio" />
                <GradientPlane></GradientPlane>
                <ambientLight intensity={0.4} />
                <axesHelper args={[5]} />

                <directionalLight position={[2, 2, 3]} intensity={2} />
                {/* <mesh>
                    <sphereGeometry args={[2, 12, 12]} />
                    <meshStandardMaterial color={0xffffff} />
                </mesh> */}
            </Canvas>
        </div>
    )
}

export default ClientCanvas
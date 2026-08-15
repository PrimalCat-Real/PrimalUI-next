'use client'

import { useThree } from '@react-three/fiber'
import { material } from '../materials/gradientMaterial'

const GradientPlane = () => {
    const { viewport } = useThree()
    const widthSegments = 64
    const heightSegments = 64


    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height, widthSegments, heightSegments]} />
            <primitive object={material} attach="material" />
        </mesh>
    )
}

export default GradientPlane

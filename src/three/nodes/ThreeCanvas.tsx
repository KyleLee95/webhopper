import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Box from './Box.tsx'
const ThreeCanvas = geometry => {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			{geometry.geometry.map(geom => {
				return geom
			})}
			<Box position={[1, 1, 1]} />
		</Canvas>
	)
}

export default ThreeCanvas

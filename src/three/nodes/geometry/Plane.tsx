import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import MaterialNode from '../MaterialNode.tsx'
const Plane = props => {
	const { width, height, widthSegments, heightSegments } = props.geometry
	return (
		<planeGeometry args={[width, height, widthSegments, heightSegments]} />
	)
}

export default Plane

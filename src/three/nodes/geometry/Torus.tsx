import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
const Torus = props => {
	const { geometry } = props
	const { radius, tube, radialSegments, tubularSegments, arc } = geometry
	return (
		<torusGeometry
			args={[radius, tube, radialSegments, tubularSegments, arc]}
		/>
	)
}

export default Torus

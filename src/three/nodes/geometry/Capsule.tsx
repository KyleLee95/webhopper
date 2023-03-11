import React, { useRef, useState } from 'react'
import MeshBasicMaterial from '../materials/MeshBasicMaterial.tsx'
import { useFrame } from '@react-three/fiber'
const Capsule = props => {
	const { geometry } = props
	const { radius, length, capSegments, radialSegments } = geometry
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	return (
		<capsuleGeometry args={[radius, length, capSegments, radialSegments]} />
	)
}

export default Capsule

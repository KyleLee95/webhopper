import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import MaterialNode from '../MaterialNode.tsx'
const Box = props => {
	console.log('props', props)
	const { depth, height, width, posX, posY, posZ, material } = props.geometry
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	return <boxGeometry args={[width, height, depth]} />
}

export default Box

import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import MaterialNode from '../MaterialNode.tsx'
import * as THREE from 'three'
const Box = props => {
	console.log('ref', props.ref)
	const { depth, height, width } = props.geometry
	const ref = useRef(null)

	console.log('depth', depth, 'height', height, 'width', width)
	return <boxGeometry ref={ref} args={[width, height, depth]} />
}

export default Box

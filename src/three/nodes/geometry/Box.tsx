import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import MaterialNode from '../MaterialNode.tsx'
import * as THREE from 'three'
const Box = props => {
	const { depth, height, width } = props.geometry
	console.log('depth', depth, 'height', height, 'width', width)
	return <boxGeometry args={[width, height, depth]} />
}

export default Box

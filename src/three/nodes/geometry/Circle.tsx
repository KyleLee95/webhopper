import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
const Circle = props => {
	const { geometry } = props
	const { radius, segments, thetaStart, thetaLength } = geometry
	return <circleGeometry args={[radius, segments, thetaStart, thetaLength]} />
}

export default Circle

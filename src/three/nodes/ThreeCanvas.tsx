import React, { useRef, useState, forwardRef, createPortal } from 'react'
import { Canvas } from '@react-three/fiber'
import { config } from '../../utils/flumeEngine.tsx'
import Controls from './cameras/Controls.tsx'

const ThreeCanvas = forwardRef((props, ref) => {
	const { geometry } = props
	const { references } = props
	return (
		<Canvas camera={{ near: 0.1, far: 1000000 }}>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<axesHelper args={[999999]} />
			<gridHelper args={[9999, 50]} />
			<Controls />
			{geometry?.map((geom, i) => {
				return geom.instance
			})}
		</Canvas>
	)
})

export default ThreeCanvas

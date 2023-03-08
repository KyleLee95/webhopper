import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
const Capsule = props => {
	console.log('props', props)
	const { data } = props
	const {
		radius,
		length,
		capSegments,
		radialSegments,
		posX,
		posY,
		posZ
	} = data
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={event => click(!clicked)}
			onPointerOver={event => hover(true)}
			onPointerOut={event => hover(false)}
		>
			<capsuleGeometry
				args={[radius, length, capSegments, radialSegments]}
			/>
			<meshBasicMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

export default Capsule

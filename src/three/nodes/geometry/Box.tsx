import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
const Box = props => {
	console.log('props', props)
	const { data } = props
	const { depth, height, width, posX, posY, posZ } = data
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			position={[posX, posZ, posY]}
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={event => click(!clicked)}
			onPointerOver={event => hover(true)}
			onPointerOut={event => hover(false)}
		>
			<boxGeometry args={[width, height, depth]} />
			<meshBasicMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

export default Box

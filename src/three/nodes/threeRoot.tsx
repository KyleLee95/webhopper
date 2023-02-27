import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRootEngine } from 'flume'
import { engine } from '../../utils/flumeEngine.tsx'
function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current.rotation.x += delta))
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={event => click(!clicked)}
			onPointerOver={event => hover(true)}
			onPointerOut={event => hover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

const ThreeRoot = ({ nodes }) => {
	const [box, setBox] = React.useState({})
	const { geometry } = useRootEngine(nodes, engine, { box })

	const checkEngine = useRootEngine(nodes, engine, { box })

	console.log('checkEngine', checkEngine)
	const root = document.getElementById('three-viewport')
	if (root == null) {
		return null
	} else {
		//causing an error where it's recreating the root all the time.
		if (!geometry) return null
		return createRoot(root).render(
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{geometry.map(geom => {
					return geom
				})}
				<Box position={[1.2, 0, 0]} />
			</Canvas>
		)
	}
}

export default ThreeRoot

import { RootEngine, FlumeConfig } from 'flume'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
const flumeConfig = new FlumeConfig()

function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	//const ref = useRef()
	// Hold state for hovered and clicked events
	//const [hovered, hover] = useState(false)
	//const [clicked, click] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	//useFrame((state, delta) => (ref.current.rotation.x += delta))
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
		//			ref={ref}
		//	scale={clicked ? 1.5 : 1}
		//	onClick={event => click(!clicked)}
		//	onPointerOver={event => hover(true)}
		//	onPointerOut={event => hover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={'orange'} />
		</mesh>
	)
}

//ROOT ENGINE

const resolvePorts = (portType, data) => {
	switch (portType) {
		case 'string':
			return data.string
		case 'boolean':
			return data.boolean
		case 'number':
			return data.number
		case 'geometry':
			return data.geometry
		default:
			return data
	}
}

const resolveNodes = (node, inputValues, nodeType, context) => {
	switch (node.type) {
		case 'string':
			return { string: inputValues.string }
		case 'boolean':
			return { boolean: inputValues.boolean }
		case 'number':
			return { number: inputValues.number }
		case 'user':
			return context.user
		case 'joinText':
			return { joinedText: inputValues.string1 + inputValues.string2 }
		case 'reverseBoolean':
			return { boolean: !inputValues.boolean }
		case 'geometry':
			const { posX, posY, posZ } = inputValues
			return { geometry: [<Box position={[posX, posY, posZ]} />] }
		case 'compose':
			const { template, ...inputs } = inputValues
			const re = /\{(.*?)\}/g
			const message = template.replace(re, (_, key) => inputs[key])
			return { message }

		default:
			return inputValues
	}
}
export const config = flumeConfig
export const engine = new RootEngine(config, resolvePorts, resolveNodes)

import { RootEngine, FlumeConfig } from 'flume'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import Box from '../three/nodes/geometry/Box.tsx'
import Capsule from '../three/nodes/geometry/Capsule.tsx'
import Circle from '../three/nodes/geometry/Circle.tsx'
import Torus from '../three/nodes/geometry/Torus.tsx'
import Plane from '../three/nodes/geometry/Plane.tsx'
import Controls from '../three/nodes/cameras/Controls.tsx'
import MeshStandardMaterial from '../three/nodes/materials/MeshStandardMaterial.tsx'
import MeshBasicMaterial from '../three/nodes/materials/MeshBasicMaterial.tsx'
const flumeConfig = new FlumeConfig()

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

/***
 *
 * We pass the instance (read: the literal JSX component) around so that
 * we have access to the methods on the instance + it gives us access to do things imperatively here in the reducer
 */
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
		case 'BoxGeometry':
			return {
				geometry: [
					{
						instance: (
							<Box geometry={{ height: 1, depth: 1, width: 1 }} />
						),
						...inputValues,
						type: 'BoxGeometry'
					}
				]
			}

		case 'CapsuleGeometry':
			return {
				geometry: [
					{
						...inputValues,
						instance: <Capsule geometry={{ ...inputValues }} />,
						type: 'CapsuleGeometry'
					}
				]
			}
		case 'TorusGeometry':
			return {
				geometry: [
					{
						...inputValues,
						instance: <Torus geometry={{ ...inputValues }} />,
						type: 'TorusGeometry'
					}
				]
			}
		case 'CircleGeometry':
			return {
				geometry: [
					{
						...inputValues,
						instance: <Circle geometry={{ ...inputValues }} />,
						type: 'CircleGeometry'
					}
				]
			}
		case 'PlaneGeometry':
			return {
				geometry: [
					{
						...inputValues,
						instance: <Plane geometry={{ ...inputValues }} />,
						type: 'PlaneGeometry'
					}
				]
			}
		case 'Controls':
			return { geometry: [<Controls />] }
		case 'MeshStandardMaterial':
			return {
				material: { type: 'MeshStandardMaterial', ...inputValues }
			}
		case 'MeshBasicMaterial':
			return {
				material: { type: 'MeshBasicMaterial', ...inputValues }
			}
		case 'rotation':
			return {
				vector: {
					...inputValues
				}
			}
		case 'vector':
			return {
				vector: {
					...inputValues
				}
			}
		case 'mirror':
			console.log('inputvalues', inputValues)

			const { posX, posY, posZ } = inputValues.geometry[0]

			const reflected = [
				[
					(1 + (-1 - 1) * posX) ^ 2,
					(-1 - 1) * posX * posY,
					(-1 - 1) * posX * posZ
				],
				[
					(-1 - 1) * posX * posY,
					(1 + (-1 - 1) * posY) ^ 2,
					(-1 - 1) * posY * posZ
				],
				[
					(-1 - 1) * posX * posZ,
					(-1 - 1) * posY * posZ,
					(1 + (-1 - 1) * posZ) ^ 2
				]
			]

			console.log('reflected', reflected)
			const vertices = new Float32Array([
				(1 + (-1 - 1) * posX) ^ 2,
				(-1 - 1) * posX * posY,
				(-1 - 1) * posX * posZ,
				(-1 - 1) * posX * posY,
				(1 + (-1 - 1) * posY) ^ 2,
				(-1 - 1) * posY * posZ,
				(-1 - 1) * posX * posZ,
				(-1 - 1) * posY * posZ,
				(1 + (-1 - 1) * posZ) ^ 2
			])
			return {
				geometry: [<bufferGeometry position={[vertices, 4]} />]
			}

		case 'merge':
			let mergedInputs = []
			for (let input in inputValues) {
				if (inputValues[input] != undefined) {
					mergedInputs.push(inputValues[input][0])
				}
			}
			return { geometry: mergedInputs }
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

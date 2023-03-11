import { RootEngine, FlumeConfig } from 'flume'
import React, { useRef, useState, forwardRef } from 'react'
import * as THREE from 'three'
import Box from '../three/nodes/geometry/Box.tsx'
import Capsule from '../three/nodes/geometry/Capsule.tsx'
import Circle from '../three/nodes/geometry/Circle.tsx'
import Torus from '../three/nodes/geometry/Torus.tsx'
import Plane from '../three/nodes/geometry/Plane.tsx'
import Controls from '../three/nodes/cameras/Controls.tsx'
import MeshStandardMaterial from '../three/nodes/materials/MeshStandardMaterial.tsx'
import MeshBasicMaterial from '../three/nodes/materials/MeshBasicMaterial.tsx'

import MeshNode from '../three/nodes/MeshNode.tsx'
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
			if (data.geometry === undefined) {
				return []
			} else {
				return data.geometry
			}
		default:
			return data
	}
}

/***
 *
 * We pass the instance (read: the literal JSX component) around so that
 * we have access to the methods on the instance + it gives us access to do things imperatively here in the reducer.
 *
 * The flume engine is the single source of truth.
 */
const resolveNodes = (node, inputValues, nodeType, context) => {
	console.log('CONTEXT IN NODE RESOLVER:', context)

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
			console.log('runs here')
			return {
				geometry: [
					{
						instance: (
							<MeshNode
								ref={context.references[0]} //need to be able to dynamically geterate an id on the fly in order to access the correct reference.
								geometry={{ ...inputValues }}
							/>
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
			const {
				posX,
				posY,
				posZ,
				depth,
				height,
				width,
				rotation,
				material,
				type
			} = inputValues.geometry[0]

			//const planeX = inputValues.plane[0].posX
			//const planeY = inputValues.plane[0].posY
			//const planeZ = inputValues.plane[0].posZ
			return {
				geometry: [
					{
						instance: <Box geometry={{ height, depth, width }} />,
						...inputValues.geometry[0],
						rotation,
						material,
						type
					}
				]
			}
		case 'merge':
			let mergedInputs = []
			for (let input in inputValues) {
				if (inputValues[input].length > 0) {
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

import { RootEngine, FlumeConfig } from 'flume'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import Box from '../three/nodes/geometry/Box.tsx'
import Capsule from '../three/nodes/geometry/Capsule.tsx'
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
				geometry: [{ ...inputValues, type: 'BoxGeometry' }]
			}

		case 'CapsuleGeometry':
			return {
				geometry: [
					{
						...inputValues,
						type: 'CapsuleGeometry'
					}
				]
			}
		case 'TorusGeometry':
			return {
				geometry: [{ ...inputValues, type: 'TorusGeometry' }]
			}
		case 'CircleGeometry':
			return {
				geometry: [
					{
						...inputValues,
						type: 'CircleGeometry'
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
		case 'mirror':
			return {
				geometry: []
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

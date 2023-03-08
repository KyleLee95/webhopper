import { RootEngine, FlumeConfig } from 'flume'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import Box from '../three/nodes/geometry/Box.tsx'
import Capsule from '../three/nodes/geometry/Capsule.tsx'
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
			return { geometry: [<Box data={inputValues} />] }
		case 'CapsuleGeometry':
			return { geometry: [<Capsule data={inputValues} />] }
		case 'merge':
			console.log('inputValues', inputValues)
			let mergedInputs = []

			for (let input in inputValues) {
				mergedInputs.push(inputValues[input])
			}
			console.log('mergedInputs', mergedInputs)
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

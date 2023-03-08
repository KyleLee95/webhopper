import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { config } from '../../utils/flumeEngine.tsx'
import GeometryNode from './GeometryNode.tsx'

const testGeometry = [
	/*{
		type: 'TorusGeometry',
		parameters: {
			width: 1,
			height: 1,
			depth: 1,
			widthSegments: 1,
			heightSegments: 1,
			depthSegments: 1
		}
	},
	{
		type: 'CircleGeometry',
		parameters: {
			width: 1,
			height: 1,
			depth: 1,
			widthSegments: 1,
			heightSegments: 1,
			depthSegments: 1
		}
	},
	{
		type: 'CapsuleGeometry',
		parameters: {
			width: 1,
			height: 1,
			depth: 1,
			widthSegments: 1,
			heightSegments: 1,
			depthSegments: 1
		}
	},*/
	{
		type: 'BoxGeometry',
		parameters: {
			width: 1,
			height: 1,
			depth: 1,
			widthSegments: 1,
			heightSegments: 1,
			depthSegments: 1
		}
	}
]
const ThreeCanvas = ({ geometry }) => {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			{testGeometry?.map(geom => {
				return <GeometryNode type={geom.type} geometry={geom} />
			})}
		</Canvas>
	)
}

//ROOT NODE

export default ThreeCanvas

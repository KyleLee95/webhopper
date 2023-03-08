import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { config } from '../../utils/flumeEngine.tsx'
import GeometryNode from './GeometryNode.tsx'

/*
 * {
 * {
 *  //node data from canvas
 * },
 *
 *
 * {
 * threejs data
 *
 *
 * }
 *
 *
 * }
 *
 *
 *
 *

const testGeometry = [
	{
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
			radius: 1,
			depth: 1,
			capSegments: 4,
			radialSegments: 8
		}
	},
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
]*/
const ThreeCanvas = ({ geometry }) => {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			{geometry?.map(geom => {
				return geom
			})}
			/*
</Canvas>
)
}

//ROOT NODE

export default ThreeCanvas

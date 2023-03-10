import React, { useRef, useState, createPortal } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { config } from '../../utils/flumeEngine.tsx'
import GeometryNode from './GeometryNode.tsx'
import MeshNode from './MeshNode.tsx'
import MaterialNode from './MaterialNode.tsx'
import Controls from './cameras/Controls.tsx'
import MeshStandardMaterial from './materials/MeshStandardMaterial'

const ThreeCanvas = ({ geometry }) => {
	return (
		<Canvas camera={{ near: 0.1, far: 1000000 }}>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<axesHelper args={[999999]} />
			<gridHelper args={[9999, 50]} />
			<Controls />
			{geometry?.map(geom => {
				console.log('geometry', geom)
				return (
					<MeshNode geometry={geom}>
						<GeometryNode geometry={geom} type={geom.type} />
						{geom.material ? (
							<MaterialNode
								material={geom.material}
								type={geom.material.type}
							/>
						) : null}
					</MeshNode>
				)
			})}
		</Canvas>
	)
}

//ROOT NODE

export default ThreeCanvas

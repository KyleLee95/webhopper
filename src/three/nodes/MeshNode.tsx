import React, { useRef, forwardRef } from 'react'
import { Center } from '@react-three/drei'
import * as THREE from 'three'
import GeometryNode from './GeometryNode.tsx'
import MaterialNode from './MaterialNode.tsx'

/***
 *
 *
 *Generic mesh node that renders the geometry + material to the three scene.
 *GeometryNode renders the geometry (box, circle, etc.)
 *MaterialNode renders the material (basic, standard, etc.)
 *
 * This abstraction allows us to try to reduce clutter in the flume engine.
 * The flume engine will handle passing whcih type of geometry to render based on the node's
 * This component will handle the actual 3D rendering.
 */
const MeshNode = forwardRef((props, ref) => {
	console.log('props', props)
	const { geometry } = props
	const { posX, posY, posZ, rotation } = geometry
	//because rotation can be an empty object, having || 0 in the rotation props keeps it from breaking.
	const { rotX, rotY, rotZ } = rotation
	return (
		<mesh
			ref={ref}
			onClick={e => console.log('click')}
			onContextMenu={e => console.log('context menu')}
			onDoubleClick={e => console.log('double click')}
			onWheel={e => console.log('wheel spins')}
			onPointerUp={e => console.log('up')}
			onPointerDown={e => console.log('down')}
			onPointerOver={e => console.log('over')}
			onPointerOut={e => console.log('out')}
			onPointerEnter={e => console.log('enter')} // see note 1
			onPointerLeave={e => console.log('leave')} // see note 1
			onPointerMove={e => console.log('move')}
			onPointerMissed={() => console.log('missed')}
			onUpdate={self => console.log('props have been updated')}
			position={[posX, posZ, posY]}
			rotation={[rotX || 0, rotZ || 0, rotY || 0]}
		>
			<GeometryNode geometry={geometry} />
			<MaterialNode materia={geometry.material} />
		</mesh>
	)
})

export default MeshNode

import React, { useRef } from 'react'
import { Center } from '@react-three/drei'
import * as THREE from 'three'
const MeshNode = props => {
	console.log('meshnode props', props)
	const { geometry } = props
	const { posX, posY, posZ, rotation } = geometry
	//because rotation can be an empty object, having || 0 in the rotation props keeps it from breaking.
	const { rotX, rotY, rotZ } = rotation
	return (
		<mesh
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
			{props.children}
		</mesh>
	)
}

export default MeshNode

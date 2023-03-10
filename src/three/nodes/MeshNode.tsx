import React from 'react'

const MeshNode = props => {
	const { geometry } = props
	const { posX, posY, posZ } = geometry
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
			position={[posX, posY, posZ]}
		>
			{props.children}
		</mesh>
	)
}

export default MeshNode

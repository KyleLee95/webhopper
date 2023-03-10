import React from 'react'
import * as THREE from 'three'
const MeshStandardMaterial = props => {
	const { color } = props
	return <meshStandardMaterial color="orange" side={THREE.DoubleSide} />
}

export default MeshStandardMaterial

import React from 'react'

const MeshStandardMaterial = props => {
	const { color } = props
	console.log('meshstdmaterial props', props)
	return <meshStandardMaterial color="orange" />
}

export default MeshStandardMaterial

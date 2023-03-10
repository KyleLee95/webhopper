import React from 'react'

const MeshBasicMaterial = props => {
	const { color } = props
	console.log('render meshbasicmaterial', props)
	return <meshBasicMaterial color="blue" />
}

export default MeshBasicMaterial

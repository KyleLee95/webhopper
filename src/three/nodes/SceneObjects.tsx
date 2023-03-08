import React from 'react'


const SceneObject = props => {
	return <div />


}


const SceneObjects = props => {

	return (

		props.children.map((child: unknown, i: number) => {
			return <SceneObject child key={i} />
		})

	
}

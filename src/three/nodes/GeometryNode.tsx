import React, { useRef, forwardRef } from 'react'
/**
 *
 *
 *
 * TODO:
 *Refactor this to forward ref to the JSX component that corresponds to the geometry.
 then you can pass. AKA this will be one massive reducer with different geometry types such as Box, Circle, etc.
 *
 */
const GeometryNode = props => {
	return props.geometry.instance
}

export default GeometryNode

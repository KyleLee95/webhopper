import React, { useRef, forwardRef } from 'react'

/**
 *
 *
 *
 *Refactor this to forward ref to the JSX component that corresponds to the geometry.
 then you can pass 
 *
 */
const GeometryNode = props => {
	return props.geometry.instance
}

export default GeometryNode

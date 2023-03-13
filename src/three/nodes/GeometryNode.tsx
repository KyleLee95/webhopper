import React, { useRef, forwardRef } from 'react'
import Box from './geometry/Box.tsx'
import * as THREE from 'three'
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
	const { geometry, type } = props
	switch (type) {
		case 'BoxGeometry':
			return <Box geometry={geometry} />
		case 'CapsuleGeometry':
			return []
		case 'CircleGeometry':
			return []
		case 'CylinderGeometry':
			return new THREE.CylinderGeometry()
		case 'DodecahedronGeometry':
			return new THREE.DodecahedronGeometry()
		case 'EdgesGeometry':
			return new THREE.EdgesGeometry()
		case 'ExtrudeGeometry':
			return new THREE.ExtrudeGeometry()
		case 'IcosahedreonGeometry':
			return new THREE.CapsuleGeometry()
		case 'LatheGeometry':
			return new THREE.CapsuleGeometry()
		case 'OctahedronGeometry':
			return new THREE.CapsuleGeometry()
		case 'PlaneGeometry':
			return new THREE.CapsuleGeometry()
		case 'PolyhedronGeometry':
			return new THREE.CapsuleGeometry()
		case 'RingGeometry':
			return new THREE.CapsuleGeometry()
		case 'ShapeGeometry':
			return new THREE.CapsuleGeometry()
		case 'SphereGeometry':
			return new THREE.CapsuleGeometry()
		case 'TetrahedronGeometry':
			return new THREE.CapsuleGeometry()
		case 'TorusGeometry':
			return []
		case 'TorusKnotGeometry':
			return new THREE.CapsuleGeometry()
		case 'TubeGeometry':
			return new THREE.CapsuleGeometry()
		case 'WireframeGeometry':
			return new THREE.CapsuleGeometry()
		default:
			return <Box geometry={{ height: 1, depth: 1, width: 1 }} />
	}
}

export default GeometryNode

import React from 'react'
import * as THREE from 'three'
import { CapsuleGeometry } from 'three'
import Box from './geometry/Box.tsx'
import Capsule from './geometry/Capsule.tsx'
import Circle from './geometry/Circle.tsx'
import Torus from './Torus.tsx'
const GeometryNode = props => {
	const { type, geometry } = props
	switch (type) {
		case 'BoxGeometry':
			return <Box geometry={geometry} />
		case 'CapsuleGeometry':
			return <Capsule />
		case 'CircleGeometry':
			return <Circle />
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
			return <Torus position={[-1, 1, 1]} />
		case 'TorusKnotGeometry':
			return new THREE.CapsuleGeometry()
		case 'TubeGeometry':
			return new THREE.CapsuleGeometry()
		case 'WireframeGeometry':
			return new THREE.CapsuleGeometry()
	}
}

export default GeometryNode

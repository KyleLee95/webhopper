import React from 'react'
import MeshStandardMaterial from './materials/MeshStandardMaterial.tsx'
import MeshBasicMaterial from './materials/MeshBasicMaterial.tsx'
import * as THREE from 'three'
const MaterialNode = props => {
	const { type, material } = props

	switch (type) {
		case 'MeshStandardMaterial':
			return <MeshStandardMaterial material={material} />
		case 'MeshBasicMaterial':
			return <MeshBasicMaterial material={material} />
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
			return <MeshStandardMaterial material={material} />
	}
}

export default MaterialNode

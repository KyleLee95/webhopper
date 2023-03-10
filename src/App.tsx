import './App.css'
import ThreeCanvas from './three/nodes/ThreeCanvas.tsx'
import React, { useState, useRef, useCallback } from 'react'
import {
	useRootEngine,
	RootEngine,
	FlumeConfig,
	Controls,
	Colors,
	NodeEditor
} from 'flume'
import { engine, config } from './utils/flumeEngine.tsx'
import { Canvas, useFrame } from '@react-three/fiber'
import RenderInWindoow from './three/nodes/NewWindowWrapper.tsx'
import RenderInWindow from './three/nodes/NewWindowWrapper'
//basic string node
config
	.addPortType({
		type: 'string',
		name: 'string',
		label: 'Text',
		color: Colors.green,
		controls: [
			Controls.text({
				name: 'string',
				label: 'Text'
			})
		]
	})
	.addPortType({
		type: 'boolean',
		name: 'boolean',
		label: 'True/False',
		color: Colors.blue,
		controls: [
			Controls.checkbox({
				name: 'boolean',
				label: 'True/False'
			})
		]
	})
	.addPortType({
		type: 'number',
		name: 'number',
		label: 'Number',
		color: Colors.red,
		controls: [
			Controls.number({
				name: 'number',
				label: 'Number'
			})
		]
	})
	.addPortType({
		type: 'geometry',
		name: 'geometry',
		label: 'geometry',
		color: Colors.orange
	})
	.addPortType({
		type: 'material',
		name: 'material',
		label: 'material',
		color: Colors.orange
	})

config
	.addNodeType({
		type: 'string',
		label: 'Text',
		description: 'Outputs a string of text',
		inputs: ports => [ports.string()],
		outputs: ports => [ports.string()]
	})
	.addNodeType({
		type: 'boolean',
		label: 'True/False',
		description: 'Outputs a true/false value',
		initialWidth: 140,
		inputs: ports => [ports.boolean()],
		outputs: ports => [ports.boolean()]
	})
	.addNodeType({
		type: 'number',
		label: 'Number',
		description: 'Outputs a numeric value',
		initialWidth: 160,
		inputs: ports => [ports.number()],
		outputs: ports => [ports.number()]
	})
config.addNodeType({
	type: 'threeRoot',
	label: 'canvas',
	description: 'canvas renderer for three.js',
	initialiWidth: 200
})

//Compose Nodes
config.addNodeType({
	type: 'compose',
	label: 'Compose',
	description: 'Composes a parameterized string of text',
	initialWidth: 230,
	inputs: ports => data => {
		const template = (data && data.template && data.template.string) || ''
		const re = /\{(.*?)\}/g
		let res,
			ids = []
		while ((res = re.exec(template)) !== null) {
			if (!ids.includes(res[1])) ids.push(res[1])
		}
		return [
			ports.string({
				name: 'template',
				label: 'Template',
				hidePort: true
			}),
			...ids.map(id => ports.string({ name: id, label: id }))
		]
	},
	outputs: ports => [ports.string({ label: 'Message' })]
})

config.addNodeType({
	type: 'joinText',
	label: 'Required Join Text',
	description: 'Combines two strings of text into one string',
	initialWidth: 160,
	inputs: ports => [
		ports.string({
			name: 'string1',
			label: 'First text'
		}),
		ports.string({
			name: 'string2',
			label: 'Second text'
		})
	],
	outputs: ports => (data, connections) => {
		if (!data.string1.string && !connections.inputs.string1) return []
		if (!data.string2.string && !connections.inputs.string2) return []
		return [ports.string({ label: 'Joined Text' })]
	}
})

config.addNodeType({
	type: 'BoxGeometry',
	label: 'box geometry',
	description: 'Three Box Geometry',
	intialWidth: 200,
	inputs: ports => [
		ports.material({
			name: 'material',
			label: 'material'
		}),
		ports.number({
			name: 'posX',
			label: 'pos X'
		}),
		ports.number({
			name: 'posY',
			label: 'pos Y'
		}),
		ports.number({
			name: 'posZ',
			label: 'pos Z'
		}),
		ports.number({
			name: 'height',
			label: 'height'
		}),
		ports.number({
			name: 'width',
			label: 'width'
		}),
		ports.number({
			name: 'depth',
			label: 'depth'
		})
	],
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})
config.addNodeType({
	type: 'CapsuleGeometry',
	label: 'capsule geometry',
	description: 'Three Capsule Geometry',
	intialWidth: 200,
	inputs: ports => [
		ports.material({
			name: 'material',
			label: 'material'
		}),
		ports.number({
			name: 'posX',
			label: 'pos X'
		}),
		ports.number({
			name: 'posY',
			label: 'pos Y'
		}),
		ports.number({
			name: 'posZ',
			label: 'pos Z'
		}),
		ports.number({
			name: 'length',
			label: 'length'
		}),
		ports.number({
			name: 'radius',
			label: 'radius'
		}),
		ports.number({
			name: 'capSegments',
			label: 'Cap Segments'
		}),
		ports.number({
			name: 'radialSegments',
			label: 'Radial Segments'
		})
	],
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})

config.addNodeType({
	type: 'TorusGeometry',
	label: 'Torus Geometry',
	description: 'Three Torus Geometry',
	intialWidth: 200,
	inputs: ports => [
		ports.material({
			name: 'material',
			label: 'material'
		}),
		ports.number({
			name: 'posX',
			label: 'pos X'
		}),
		ports.number({
			name: 'posY',
			label: 'pos Y'
		}),
		ports.number({
			name: 'posZ',
			label: 'pos Z'
		}),
		ports.number({
			name: 'radius',
			label: 'Radius'
		}),
		ports.number({
			name: 'tube',
			label: 'Tube'
		}),

		ports.number({
			name: 'radialSegements',
			label: 'Radial Segments'
		}),
		ports.number({
			name: 'tubularSegments',
			label: 'Tubular Segments'
		}),
		ports.number({
			name: 'arc',
			label: 'Arc'
		})
	],
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})

config.addNodeType({
	type: 'CircleGeometry',
	label: 'Circle Geometry',
	description: 'Three Circle Geometry',
	intialWidth: 200,
	inputs: ports => [
		ports.material({
			name: 'material',
			label: 'material'
		}),
		ports.number({
			name: 'posX',
			label: 'pos X'
		}),
		ports.number({
			name: 'posY',
			label: 'pos Y'
		}),
		ports.number({
			name: 'posZ',
			label: 'pos Z'
		}),
		ports.number({
			name: 'length',
			label: 'length'
		}),
		ports.number({
			name: 'segments',
			label: 'Segments'
		}),

		ports.number({
			name: 'thetaStart',
			label: 'Theta Start'
		}),
		ports.number({
			name: 'thetaLength',
			label: 'Theta Length'
		})
	],
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})

//Merge node

config.addNodeType({
	type: 'merge',
	label: 'Merge',
	description: 'Merge Nodes',
	intialWidth: 200,
	inputs: ports => [
		ports.geometry({
			name: 'input1',
			label: 'input 1'
		}),
		ports.geometry({
			name: 'input2',
			label: 'input 2'
		}),
		ports.geometry({
			name: 'input3',
			label: 'input 3'
		}),
		ports.geometry({
			name: 'input4',
			label: 'input 4'
		}),
		ports.geometry({
			name: 'input5',
			label: 'input 5'
		})
	],
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})

config.addNodeType({
	type: 'mirror',
	label: 'Mirror',
	description: 'Mirror Geometry',
	initialWidth: 200,
	inputs: ports => [
		ports.geometry({
			name: 'geometry',
			label: 'Geometry to be Mirrored'
		}),
		ports.geometry({
			name: 'plane',
			label: 'Plane to mirror over'
		})
	],
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})

config
	.addNodeType({
		type: 'MeshStandardMaterial',
		label: 'Mesh Standard Material',
		description: 'three mesh standard mateiral',
		initialWidth: 200,
		outputs: ports => (data, connections) => {
			return [
				ports.material({
					name: 'material',
					label: 'material'
				})
			]
		}
	})
	.addNodeType({
		type: 'MeshBasicMaterial',
		label: 'Mesh Basic Material',
		description: 'three mesh basic material',
		initialWidth: 200,
		outputs: ports => (data, connections) => {
			return [
				ports.material({
					name: 'material',
					label: 'material'
				})
			]
		}
	})

//ROOT NODE

config
	/*  ...  */
	.addRootNodeType({
		type: 'three-canvas',
		label: 'Three Canvas',
		initialWidth: 170,
		inputs: ports => [
			ports.geometry({ name: 'geometry', label: 'geometry' })
		]
	})
config.addNodeType({
	type: 'Controls',
	label: 'Controls',
	description: 'Camera Controls',
	intialWidth: 200,
	outputs: ports => (data, connections) => {
		return [
			ports.geometry({
				name: 'geometry',
				label: 'geometry'
			})
		]
	}
})

const open3DWindowViewer = () => { }

const App = () => {
	const nodeEditor = React.useRef()
	const [nodes, setNodes] = React.useState({})
	const saveNodes = () => {
		const nodes = nodeEditor.current.getNodes()
		// Do whatever you want with the nodes
	}

	const { geometry } = useRootEngine(nodes, engine, {})

	return (
		<div className="App">
			<div style={{ height: '5%' }}>
				<button>Open 3D Viewer</button>
			</div>
			<div style={{ width: '100%', height: '95%' }}>
				<NodeEditor
					ref={nodeEditor}
					nodeTypes={config.nodeTypes}
					portTypes={config.portTypes}
					defaultNodes={[
						{ type: 'BoxGeometry', x: 190, y: -150 },
						{ type: 'three-canvas', x: 300, y: 300 }
					]}
					onChange={setNodes}
				/>
			</div>
			<RenderInWindow>
				<ThreeCanvas geometry={geometry} />
			</RenderInWindow>
		</div>
	)
}

export default App

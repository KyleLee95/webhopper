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
	type: 'geometry',
	label: 'box geometry',
	description: 'Three Box Geometry',
	intialWidth: 200,
	inputs: ports => [
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

const App = () => {
	const nodeEditor = React.useRef()
	const [nodes, setNodes] = React.useState({})
	const saveNodes = () => {
		const nodes = nodeEditor.current.getNodes()
		// Do whatever you want with the nodes
	}
	const test = useRootEngine(nodes, engine, {})

	const { geometry } = useRootEngine(nodes, engine, {})
	return (
		<div className="App">
			<div style={{ width: 800, height: 400 }}>
				<NodeEditor
					ref={nodeEditor}
					nodeTypes={config.nodeTypes}
					portTypes={config.portTypes}
					defaultNodes={[
						{ type: 'geometry', x: 190, y: -150 },
						{ type: 'three-canvas', x: 300, y: 300 }
					]}
					onChange={setNodes}
				/>
			</div>

			<ThreeCanvas geometry={geometry} />
		</div>
	)
}

export default App

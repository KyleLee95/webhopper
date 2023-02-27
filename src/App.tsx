import './App.css'
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
import ThreeRoot from './three/nodes/threeRoot.tsx'
import { createRoot } from 'react-dom/client'
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

//user node
config.addNodeType({
	type: 'user',
	label: 'User',
	description: 'Outputs attributes of the current user',
	initialWidth: 130,
	outputs: ports => [
		ports.string({
			name: 'firstName',
			label: 'First Name'
		}),
		ports.string({
			name: 'lastName',
			label: 'Last Name'
		}),
		ports.boolean({
			name: 'isLoggedIn',
			label: 'Is Logged-In'
		}),
		ports.boolean({
			name: 'isAdmin',
			label: 'Is Admin'
		})
	]
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
		console.log('data in outport of geometry', data)
		return [
			ports.geometry({
				name: 'geometry',
				label: 'box Geometry'
			})
		]
	}
})
//ROOT NODE

config
	/*  ...  */
	.addRootNodeType({
		type: 'homepage',
		label: 'Homepage',
		initialWidth: 170,
		inputs: ports => [
			ports.string({
				name: 'title',
				label: 'Title'
			}),
			ports.string({
				name: 'description',
				label: 'Description'
			}),
			ports.boolean({
				name: 'showSignup',
				label: 'Show Signup'
			}),
			ports.number({
				name: 'copyrightYear',
				label: 'Copyright Year'
			}),
			ports.geometry({ name: 'geometry', label: 'geometry' })
		]
	})

const fakeUser = {
	firstName: 'Bustopher',
	lastName: 'Jones',
	isLoggedIn: true,
	isAdmin: false
}
const nullUser = {
	firstName: '',
	lastName: '',
	isLoggedIn: false,
	isAdmin: false
}

const Homepage = ({ nodes }) => {
	const [user, setUser] = React.useState(fakeUser)
	const {
		title,
		description,
		showSignup,
		copyrightYear
	} = useRootEngine(nodes, engine, { user })
	console.log('title', title)
	const login = () => setUser(fakeUser)
	const logout = () => setUser(nullUser)
	return (
		<div className="homepage">
			<h1 className="title">{title}</h1>
			<p className="description">{description}</p>
			{user.isLoggedIn ? (
				<button onClick={logout}>Logout</button>
			) : (
				<button onClick={login}>Login</button>
			)}
			{showSignup && (
				<form className="signup">
					<input type="email" />
					<button>Signup!</button>
				</form>
			)}
			<footer>© flume {copyrightYear}</footer>

			<div id="three-viewport">
				<ThreeRoot nodes={nodes} />
			</div>
		</div>
	)
}
const App = () => {
	const nodeEditor = React.useRef()
	const [nodes, setNodes] = React.useState({})
	const saveNodes = () => {
		const nodes = nodeEditor.current.getNodes()
		// Do whatever you want with the nodes
	}
	return (
		<div className="App">
			<div style={{ width: 800, height: 400 }}>
				<NodeEditor
					ref={nodeEditor}
					nodeTypes={config.nodeTypes}
					portTypes={config.portTypes}
					defaultNodes={[
						{ type: 'geometry', x: 190, y: -150 },
						{ type: 'homepage', x: 300, y: 300 },
						{ type: 'number', x: 200, y: 200 }
					]}
					onChange={setNodes}
				/>
				<Homepage nodes={nodes} />
			</div>
		</div>
	)
}

export default App

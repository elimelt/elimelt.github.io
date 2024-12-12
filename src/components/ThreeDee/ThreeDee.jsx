import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CameraFollow = ({ target }) => {
  const { camera } = useThree()
  const cameraPosition = useRef(new THREE.Vector3(15, 15, 15))
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (!target.current) return

    targetPosition.current.copy(target.current.position)

    const offset = new THREE.Vector3(15, 10, 15)
    const desiredPosition = targetPosition.current.clone().add(offset)

    cameraPosition.current.lerp(desiredPosition, 0.1)
    camera.position.copy(cameraPosition.current)

    camera.lookAt(
      targetPosition.current.x,
      targetPosition.current.y + 2,
      targetPosition.current.z
    )
  })

  return null
}

const Ball = () => {
  const ball = useRef()
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const [isJumping, setIsJumping] = useState(false)

  const SPEED = 0.15
  const GRAVITY = -0.01
  const JUMP_FORCE = 0.2
  const DAMPING = 0.8
  const ARENA_SIZE = 10

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Space' && !isJumping) {
        velocity.current.y = JUMP_FORCE
        setIsJumping(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isJumping])

  useFrame((state, delta) => {
    if (!ball.current) return

    const keys = state.gl.domElement.ownerDocument.pressedKeys || {}

    if (keys['KeyW'] || keys['ArrowUp']) velocity.current.z -= SPEED
    if (keys['KeyS'] || keys['ArrowDown']) velocity.current.z += SPEED
    if (keys['KeyA'] || keys['ArrowLeft']) velocity.current.x -= SPEED
    if (keys['KeyD'] || keys['ArrowRight']) velocity.current.x += SPEED

    velocity.current.y += GRAVITY

    ball.current.position.x += velocity.current.x
    ball.current.position.y += velocity.current.y
    ball.current.position.z += velocity.current.z

    if (Math.abs(ball.current.position.x) > ARENA_SIZE) {
      ball.current.position.x = Math.sign(ball.current.position.x) * ARENA_SIZE
      velocity.current.x *= -DAMPING
    }

    if (Math.abs(ball.current.position.z) > ARENA_SIZE) {
      ball.current.position.z = Math.sign(ball.current.position.z) * ARENA_SIZE
      velocity.current.z *= -DAMPING
    }

    if (ball.current.position.y < 0.5) {
      ball.current.position.y = 0.5
      velocity.current.y *= -DAMPING
      setIsJumping(false)
    }

    velocity.current.x *= 0.95
    velocity.current.z *= 0.95
  })

  return (
    <mesh ref={ball} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color='hotpink' />
    </mesh>
  )
}

const Floor = () => {
  const gridSize = 40
  const gridDivisions = 40

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial color='#444444' />
      </mesh>

      <gridHelper
        args={[gridSize, gridDivisions, '#888888', '#888888']}
        position={[0, 0.01, 0]}
      />
    </group>
  )
}

const Arena = () => {
  const WALL_SIZE = 10
  return (
    <>
      {[
        { position: [WALL_SIZE, 2.5, 0], rotation: [0, -Math.PI / 2, 0] },
        { position: [-WALL_SIZE, 2.5, 0], rotation: [0, Math.PI / 2, 0] },
        { position: [0, 2.5, WALL_SIZE], rotation: [0, Math.PI, 0] },
        { position: [0, 2.5, -WALL_SIZE], rotation: [0, 0, 0] }
      ].map((props, index) => (
        <mesh key={index} position={props.position} rotation={props.rotation}>
          <planeGeometry args={[20, 5]} />
          <meshStandardMaterial
            color='gray'
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  )
}

const Game = () => {
  const ballRef = useRef()

  useEffect(() => {
    const pressedKeys = {}

    const handleKeyDown = e => {
      pressedKeys[e.code] = true
    }

    const handleKeyUp = e => {
      delete pressedKeys[e.code]
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    document.pressedKeys = pressedKeys

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      delete document.pressedKeys
    }
  }, [])

  return (
    <div className='w-full h-screen'>
      <Canvas
        shadows
        camera={{
          position: [10, 15, 15],
          fov: 60,
          near: 0.001,
          far: 10000
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} intensity={1.5} castShadow />
        <Ball ref={ballRef} />
        <CameraFollow target={ballRef} />
        <Floor />
        <Arena />
      </Canvas>
    </div>
  )
}

export default Game

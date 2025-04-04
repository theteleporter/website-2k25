import { PerspectiveCamera } from "three"

import { ICameraConfig } from "@/components/navigation-handler/navigation.interface"

export const calculatePlanePosition = (cameraConfig: ICameraConfig) => {
  const [px, py, pz] = cameraConfig.position
  const [tx, ty, tz] = cameraConfig.target
  const direction = {
    x: tx - px,
    y: ty - py,
    z: tz - pz
  }
  const scale =
    1 / Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
  return [
    px + direction.x * scale,
    py + direction.y * scale,
    pz + direction.z * scale
  ] as [number, number, number]
}

export const calculateMovementVectors = (
  basePosition: [number, number, number],
  cameraConfig: ICameraConfig
) => {
  const cameraPos = cameraConfig.position

  // Direction from camera to plane
  const directionVector = {
    x: basePosition[0] - cameraPos[0],
    z: basePosition[2] - cameraPos[2]
  }

  // Normalize
  const length = Math.sqrt(directionVector.x ** 2 + directionVector.z ** 2)

  // Right vector (perpendicular to direction)
  return {
    x: -directionVector.z / length,
    z: directionVector.x / length
  }
}

type Position = { x: number; z: number }

export const calculateNewPosition = (
  currentPos: Position,
  targetPos: Position,
  smoothFactor = 1
): Position => ({
  x: currentPos.x + (targetPos.x - currentPos.x) * smoothFactor,
  z: currentPos.z + (targetPos.z - currentPos.z) * smoothFactor
})

export const calculateViewDimensions = (
  camera: PerspectiveCamera,
  distance: number,
  cameraConfig: ICameraConfig
) => {
  const fovRadians = ((cameraConfig.fov ?? 55) * Math.PI) / 180
  const height = 2 * Math.tan(fovRadians / 2) * distance
  const width = height * camera.aspect
  return { width, height }
}

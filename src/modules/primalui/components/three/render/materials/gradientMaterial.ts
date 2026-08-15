import { uniform, mix, uv, sin, time, positionLocal, vec3, max  } from "three/tsl";
import { Color, MeshBasicNodeMaterial, MeshStandardNodeMaterial } from "three/webgpu";

const topColor = uniform(new Color("#ff4fd8"))
const bottomColor = uniform(new Color("#f7a8df"))
const paletteStartColor = uniform(new Color("#000000"))
const paletteMiddleColor = uniform(new Color("#aae8ff"))
const paletteEndColor = uniform(new Color("#c5fe9e"))

const material = new MeshStandardNodeMaterial()

// UV coordinates describe a point on the surface from 0 to 1.
const gradientFactor = uv().y;
const horizontalFactor = uv().x

// Shared animated time drives all moving waves at the same speed.
const animationSpeed = 0.5
const waveFrequency = 3
const animatedTime = time.mul(animationSpeed)

// Base color wave: vertical coordinate becomes a repeating 0..1 factor.
const waveInput = gradientFactor.mul(Math.PI * 2).mul(waveFrequency)
const animatedGradientFactor = (sin(waveInput.add(animatedTime)).add(1).div(2))

const paletteFactor  = animatedGradientFactor
const paletteColor = mix(paletteStartColor, paletteMiddleColor, paletteFactor)


// Geometry displacement: move vertices along Z while keeping X/Y unchanged.
const displacementFrequency = 0.2;
const waveAmplitude = 0.2
const displacementInput = positionLocal.x.mul(displacementFrequency).add(animatedTime)
const waveOffset = sin(displacementInput).mul(waveAmplitude)

// Highlight masks: two diagonal waves crossing in opposite directions.
const highlightColor = uniform(new Color("#fff0fb"))
const highlightInput  = gradientFactor.add(horizontalFactor).mul(Math.PI * 2).add(animatedTime)
const highlightSoftFactor = sin(highlightInput).add(1).div(2)
const highlightFactor = highlightSoftFactor.mul(highlightSoftFactor )


const highlightSecondInput  = gradientFactor.sub(horizontalFactor).mul(Math.PI * 2).add(animatedTime)
const highlightSecondSoftFactor = sin(highlightSecondInput).add(1).div(2)
const highlightSecondFactor = highlightSecondSoftFactor.mul(highlightSecondSoftFactor )

const combinedHighlightFactor =  max(highlightFactor, highlightSecondFactor)

// Lift highlighted areas slightly so the bright parts affect shape too.
const highlightLiftStrength = 0.05
const highlightLift = combinedHighlightFactor.mul(highlightLiftStrength)
const highlightOffset =  waveOffset.add(highlightLift)
const wavePosition = vec3(positionLocal.x, positionLocal.y, highlightOffset)

// First mix builds the base gradient, second mix adds the highlight layer.
const baseColor = mix(topColor, bottomColor, animatedGradientFactor)




const finalColor = mix(baseColor, highlightColor, combinedHighlightFactor.mul(0.25))
material.colorNode = finalColor



material.positionNode = wavePosition


// const baseMetalness = 0.6
// const highlightMetalness = 1.0
// const animatedMetalness = mix(baseMetalness, highlightMetalness, highlightFactor)
// material.metalnessNode = animatedMetalness
material.metalness = 0.5

// Highlighted areas become smoother by lowering roughness there.
const baseRoughness  = 0.4
const highlightRoughness  = 0.08
const roughnessNode  = mix(baseRoughness, highlightRoughness, combinedHighlightFactor.mul(0.25))
material.roughnessNode = roughnessNode

export { material }

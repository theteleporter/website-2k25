import { fragmentOn } from "basehub"

import {
  arcadeFragment,
  carFragment,
  characterFragment,
  inspectableFragment,
  lampFragment,
  mapFragment,
  modelsItemFragment,
  physicsParamsFragment,
  sceneFragment,
  sfxFragment
} from "./fragments"

const pagesFragment = fragmentOn("Pages", {
  inspectables: inspectableFragment
})

const assetsFragment = fragmentOn("ThreeDInteractions", {
  map: mapFragment,
  sfx: sfxFragment,
  basketball: modelsItemFragment,
  basketballNet: modelsItemFragment,
  contactPhone: modelsItemFragment,
  arcade: arcadeFragment,
  scenes: sceneFragment,
  outdoorCars: carFragment,
  characters: characterFragment,
  lamp: lampFragment,
  physicsParams: physicsParamsFragment
})

interface Query {
  pages: typeof pagesFragment
  threeDInteractions: typeof assetsFragment
}

export const assetsQuery: Query = {
  pages: pagesFragment,
  threeDInteractions: assetsFragment
}

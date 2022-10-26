import * as THREE from 'three';

export function randRange(numA, numB){
  return ((numB-numA)*Math.random())+numA
}

export function randRotation(item, a){
  let axi = ["x", "y", "z"];
  let axiCount = Math.ceil(randRange(1,3));
  let axis;

  for (let index = 0; index < axiCount; index++) {
    axis = axi[index];
    axi.splice(axi.indexOf(axi[index]), 1)

    item.rotation.axis += a*-0.003
  }
}


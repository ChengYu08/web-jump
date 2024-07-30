import {
  SphereGeometry,
  Mesh,
  MeshLambertMaterial,
  TextureLoader,
  MeshBasicMaterial,
} from "three";
// import { earth } from "../res/dataUrl";

import earth from "../images/earth.webp";
import Box from "./Box";

// import planetTexture from "../res/earth_cover.png";
export default class EarthSphere extends Box {
  name = "EarthSphere";

  constructor(prev) {
    // 在这里初始化您的构造逻辑，如果有需要的话
    super(prev);
  }

  initBox() {
    const radius = 14; // 球体半径，您可以根据需要调整
    const widthSegments = 32; // 横向分割数量
    const heightSegments = 32; // 纵向分割数量
    const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
    const material = new MeshLambertMaterial({
      map: new TextureLoader().load(earth),
    });

    // 生成网格
    this.mesh = new Mesh(geometry, material);
  }
}

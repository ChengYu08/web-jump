import Box from "./Box";
import { BoxGeometry, Mesh, MeshLambertMaterial, TextureLoader } from "three";
import { recreateCubeUV, LEFT, TOP, BEHIND } from "../util/MapUtil";
import { molds } from "../res/dataUrl";

export default class MoldsSphere extends Box {
  constructor(prev) {
    super(prev);
  }

  initBox() {
    const geometry = new BoxGeometry(25, this.height, 25);
    const material = new MeshLambertMaterial({
      map: new TextureLoader().load(molds),
    });

    geometry.translate(0, this.height / 2, 0);

    // 裁剪贴图
    recreateCubeUV(428, 428, geometry, LEFT, 0, 0, 280, 148);
    recreateCubeUV(428, 428, geometry, TOP, 0, 428, 280, 148);
    recreateCubeUV(428, 428, geometry, BEHIND, 280, 148, 428, 428, true);

    // 生成网格
    this.mesh = new Mesh(geometry, material);
  }
}

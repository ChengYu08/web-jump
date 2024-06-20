import {
  SphereGeometry,
  Mesh,
  MeshLambertMaterial,
  TextureLoader,
} from "three";
import { earth } from "../res/dataUrl";
import Box from "./Box";
export default class EarthSphere extends Box {
  constructor(prev) {
    // 在这里初始化您的构造逻辑，如果有需要的话
    super(prev);
  }

  initBox() {
    const radius = 12.5; // 球体半径，您可以根据需要调整
    const widthSegments = 32; // 横向分割数量
    const heightSegments = 32; // 纵向分割数量
    const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
    const material = new MeshLambertMaterial({
      map: new TextureLoader().load(earth),
    });

    // 直接使用纹理，未进行裁剪操作，因为球体贴图应用方式与立方体贴图不同
    // 如果需要对球体纹理进行特定区域映射，可能需要更复杂的UV坐标调整

    // 生成网格
    this.mesh = new Mesh(geometry, material);
  }
}

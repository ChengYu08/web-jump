import Stage from "./Stage";
import BoxGroup from "./BoxGroup";
import LittleMan from "./LittleMan";
import { setFrameAction } from "../util/TweenUtil";
import {
  Mesh,
  PlaneGeometry,
  ShadowMaterial,
  Points,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
} from "three";

import { FAR } from "../config/constant";
export default class JumpGame {
  constructor() {
    // 舞台
    this.stage = null;
    // 盒子组
    this.boxGroup = null;
    // 小人
    this.littleMan = null;
    // 游戏初始化
    this.init();
  }

  init() {
    // 初始化舞台
    this.stage = new Stage();
    this.initStageBg();
    // 初始化盒子
    this.initBoxes();
    // 初始化小人
    this.initLittleMan();

    // 每次动画后都要渲染
    setFrameAction(this.stage.render.bind(this.stage));
  }

  initBoxes() {
    this.boxGroup = new BoxGroup();

    // 初始化首个盒子
    this.boxGroup.createBox();
    // 初始化第二个盒子
    this.boxGroup.createBox();
    // 盒子加入场景
    this.boxGroup.enterStage(this.stage);
  }

  initLittleMan() {
    // 小人初始化
    this.littleMan = new LittleMan(this.stage, this.boxGroup);
    // 将小人给盒子一份，方便盒子移动的时候带上小人
    this.boxGroup.setLittleMan(this.littleMan);
    // 加入舞台
    this.littleMan.enterStage(this.stage);

    // 更新盒子和小人的位置
    this.boxGroup.updatePosition({
      duration: 0,
    });
  }

  // 星星背景
  initStageBg() {
    // 创建一个足够大的地面
    // 由于视角是 45 度向下看，地面会比实际的大，这里简单处理下
    const geometry = new PlaneGeometry(2 * FAR, 2 * FAR, 1, 1);
    // ShadowMaterial 阴影材质, 此材质可以接收阴影
    // transparent： 透明，在非透明对象之后渲染
    // opacity: 透明度
    const material = new ShadowMaterial({ transparent: true, opacity: 0.5 });

    this.plane = new Mesh(geometry, material);
    // 接收阴影
    this.plane.receiveShadow = false;

    // 旋转 -90，此时地面处在 x-z 平面
    this.plane.rotation.x = -Math.PI / 2;
    // 创建星空背景
    const geometry2 = new BufferGeometry();

    // 使用Float32Array来存储星星的位置、颜色和大小信息
    const vertices = [];
    const colors = [];
    const sizes = [];

    // 假设我们创建1000颗星星
    for (let i = 0; i < 300; i++) {
      // x, y, z位置随机
      vertices.push(
        Math.random() * 200 - 100,
        Math.random() * 200 - 150,
        Math.random() * 200 - 160
      );

      colors.push(255, 255, 255);

      // 随机大小，范围可以自定义
      sizes.push(Math.random() * 0.1 + Math.random() * 0.8);
    }

    geometry2.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );
    geometry2.setAttribute(
      "color",
      new BufferAttribute(new Float32Array(colors), 3)
    );
    geometry2.setAttribute(
      "size",
      new BufferAttribute(new Float32Array(sizes), 1)
    );

    // 使用PointsMaterial并开启vertexColors属性以使用顶点颜色
    const material2 = new PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true, // 根据距离相机的距离调整大小
      transparent: true,
      opacity: 0.5,
    });

    const stars = new Points(geometry2, material2);
    this.plane.add(stars);
    this.stage.scene.add(this.plane);
  }

  start() {
    this.stage.render();
    window.callAppMethod("start", {});
  }
}

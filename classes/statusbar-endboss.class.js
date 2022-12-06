class StatusbarEndboss extends DrawableObject {

  y = 0;
  x = 235;
  width = 200;
  height = 60;
  percentage = 100;


  IMAGES_HEALTH_BOSS = [
    'img/7_statusbars/2_statusbar_endboss/blue/0.png',
    'img/7_statusbars/2_statusbar_endboss/blue/20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/60.png',
    'img/7_statusbars/2_statusbar_endboss/blue/80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/100.png'
  ];


  constructor() {
    super().loadImages(this.IMAGES_HEALTH_BOSS);
    this.setPercentage(100);
  }


  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH_BOSS[this.resolveImageIndexFromHeartAndEndboss()];
    this.img = this.imageCache[path];
  }
}
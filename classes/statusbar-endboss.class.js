class StatusbarEndboss extends DrawableObject {

  y = 0;
  x = 500;
  width = 200;
  height = 60;
  percentage = 100;


  IMAGES_HEALTH_BOSS = [
    'img/7_statusbars/2_statusbar_endboss/blue/0.png',
    'img/7_statusbars/2_statusbar_endboss/blue/20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/60.png',
    'img/7_statusbars/2_statusbar_endboss/blue/80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/100.png',
  ];


  constructor() {
    super().loadImages(this.IMAGES_HEALTH_BOSS);
    this.setPercentage(100);
  }


  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH_BOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }


  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
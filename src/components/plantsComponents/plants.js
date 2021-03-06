class Plants {
    constructor(context, damage, health, recharge, cost, pointX, pointY) {
        this.context = context;
        this.damage = damage;
        this.health = health;
        this.recharge = recharge;
        this.cost = cost;
        this.positionOfCreate = {};
        this.positionX = pointX;
        this.positionY = pointY;
        this.chose = 0;
        this.positionOfBullet = [];
        this.frame = 0;
        this.frameSpeed = 0;
    }

    create(image, pointX, pointY){
        this.context.drawImage(image, pointX, pointY);
    }

    init() {
        this.positionOfCreate.pointX = Math.floor((this.positionX - 40)/72);
        this.positionOfCreate.pointY = Math.ceil((this.positionY - 80)/115);
    }

    drawSeed(img, pointX, pointY) {
        this.context.drawImage(img, pointX, pointY);
    }

    award(image, pointX, pointY) {
        this.context.drawImage(image, pointX, pointY);
    }
}

export { Plants };
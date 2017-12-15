import {Peashooter} from "../../plantsComponents/peashooter";
import {Zombie} from "../../zombiesComponents/Zombie";
import {levelImages} from "../../imgComponents/levelImages";
import {BetweenLevels} from "./BetweenLevels";
import {commonImages} from "../../imgComponents/commonImages";
import {Sunflower} from "../../plantsComponents/sunflower";
import {Sun} from "../../otherComponents/sun";
import {Bullet} from "../../plantsComponents/bulletNormal";
import {Lawnmower} from "../../otherComponents/lawnmover";
import {buttonAudio} from '../../audioComponents/audioButton';
import {gameAudioStates} from '../../audioComponents/audioGameState';
import {zombyAudioWave} from '../../audioComponents/audioZombyWave';
import {zombyAudioGroan} from '../../audioComponents/audioZombyGroan';
import {zombyAudioChomp} from '../../audioComponents/audioZombyChomp';
import {zombyAudioFalling} from '../../audioComponents/audioZombyFalling';
import {sunAudioPoints} from '../../audioComponents/audioSunPoints';
import {plantAudio} from '../../audioComponents/audioPlants';
import {resources} from '../../menuComponents/resources';
import {store} from '../../menuComponents/store';
import {audioPlayer} from '../../audioComponents/audioPlayer';
import {MenuPage} from '../../menuComponents/menu_page';



class LevelOne {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.backgroundPositionX = 0;
        this.animationPositionX = 0;
        this.numberOfSuns = 150;
        this.chose = 0;
        this.toPlantBind = this.toPlant.bind(this);
        this.createPlantLogoBind = this.createPlantLogo.bind(this);
        this.calculatePlantUnitBind = this.calculatePlantUnit.bind(this);
        this.receivingSunsBind = this.receivingSuns.bind(this);
        this.drawOtherElementsBind = this.drawOtherElements.bind(this);
        this.drawGardenBind = this.drawGarden.bind(this);
        this.createPlantUnitBind = this.createPlantUnit.bind(this);
        this.openFireBind = this.openFire.bind(this);
        this.levelCompleteBind = this.levelComplete.bind(this);
        this.awardingEventBind = this.awardingEvent.bind(this);
        this.awardingBind = this.awarding.bind(this);
        this.openMenuRestartBind = this.openMenuRestart.bind(this);
        this.openMenuQuitBind = this.openMenuQuit.bind(this);
        this.changeVolumeBind = this.changeVolume.bind(this);
        this.goToMenuOfGameBind = this.goToMenuOfGame.bind(this);
        this.peashooter = null;
        this.sunflower = null;
        this.levelTimeLinePosition = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.positionToCreateX = 0;
        this.positionToCreateY = 0;
        this.plants = [];
        this.positionOfPlant = [];
        this.suns = [];
        this.firstPlant = 0;
        this.chosenSuns = [];
        this.zombies = [];
        this.zombiesC = [];
        this.lawnmower = null;
        this.lawnmowers = [];
        this.zombiesLength = 0;
        this.checkComingZombie = 0;
        this.levelUp = 0;
        this.stopLevel = 0;
        this.once = 0;
        this.stopAnimation = 0;
        this.sunflower = new Sunflower(this.context);
        this.menu = commonImages.menu;
        this.menuOpen = 0;
        this.frameWaiting = 0;
        this.commingZombieTimer = 0;
        this.sunTimer = 0;
        this.sunDestroyTimer = 0;
        this.zombieAttack = 0;
        this.openFireTimer = 0;
        this.awardTimer = 0;
        this.peashooterRechargeTimer = 360;
        this.seedPacket = [];
        this.reastartdialogOpen = 0;
        this.quitDialogOpen = 0;
        this.knobPositionX = 450;
        this.knobPositionY = 205;
        this.buttonAudio = buttonAudio;
        this.gameAudioStates = gameAudioStates;
        this.zombyAudioWave = zombyAudioWave;
        this.zombyAudioGroan = zombyAudioGroan;
        this.zombyAudioChomp = zombyAudioChomp;
        this.zombyAudioFalling = zombyAudioFalling;
        this.sunAudioPoints = sunAudioPoints;
        this.plantAudio = plantAudio;
        this.elemLeft = this.canvas.offsetLeft;
        this.elemTop = this.canvas.offsetTop;
        this.audioPlayer = audioPlayer;
           
    }

    startGame() {
        this.context.font = '24px Arial';
        this.context.textAlign = 'center';
        this.context.fillstyle = 'black';
            
        this.audioPlayer(this.gameAudioStates.gameprocess);
        this.gameAudioStates.gameprocess.loop = true;
       
            
        this.levelTimeLinePosition = 0;

        commonImages.arrowTop.startY = 100;
        commonImages.arrowTop.endY = 85;
        commonImages.arrowTop.direction = 'bottom';

        this.peashooter = new Peashooter(this.context);
        for (let i = 0; i < 1; i++) {
            this.lawnmower = new Lawnmower(this.context, -40, 255);
            this.lawnmowers.push(this.lawnmower);
        }
        this.lawnmower = new Lawnmower(this.context, -40, 255);
        this.context.drawImage(levelImages.backgroundOne, 0, 0);
        requestAnimationFrame(this.levelOverview.bind(this));
        this.createZombie();
        this.sortZombieView();
        this.createSeedPacket();
    }

    createSeedPacket() {
        this.seedPacket.push(this.peashooter);
        this.seedPacket.forEach((seed) => seed.init());
    }

    drawSeedPacket() {
        this.seedPacket.forEach((seed, i) =>{
        this.context.drawImage(seed.packet, 97+(i*60), 9);
        });
    }

    createZombie() {
        for (let i = 0; i < 5; i++) {
            let zombie = new Zombie(this.context);
        zombie.setState(1);
        zombie.positionOfCreate();
        this.zombies.push(zombie);
    }
        this.zombiesLength = this.zombies.length;

    } // TODO AllUnitInTheMap.createZombie()

    sortZombieView() {
    this.zombies = this.zombies.slice().sort((a,b) => {
      let c = a.positionY;
      let d = b.positionY;
      if ( c < d) {
        return -1;
      } else if( c > d ) {
        return 1;
      }
      return 0;
    });
  } //TODO AllUnitInTheMap.sortZombieView()

  levelOverview() {
    if (this.backgroundPositionX > -600) {
      this.backgroundPositionX -= 10;
    } else {
      this.frameWaiting++;
    }
    this.context.drawImage(levelImages.backgroundOne, this.backgroundPositionX, 0);
    if (this.backgroundPositionX < -320) {
      this.zombies.forEach((elem) => { // TODO AllUnitInTheMap.levelOverview
        if (!this.frameWaiting) {
          elem.positionX -= 10;
        }
        elem.create();
      });
    }
    if (this.frameWaiting === 120) {
      requestAnimationFrame(this.returnOnGarden.bind(this, levelImages.backgroundOne));
    } else {
      requestAnimationFrame(this.levelOverview.bind(this, levelImages.backgroundOne));
    }
  }



  returnOnGarden() {
    this.backgroundPositionX += 10;
    this.context.drawImage(levelImages.backgroundOne, this.backgroundPositionX, 0);
    if (this.backgroundPositionX < -220) {
      this.zombies.forEach((elem) => { // TODO AllUnitInTheMap.returnOnGarder();
        elem.positionX += 10;
        elem.create();
      });
      requestAnimationFrame(this.returnOnGarden.bind(this, levelImages.backgroundOne));
    } else {
      requestAnimationFrame(this.drawGardenBind);
    }
  }

  drawGarden() {
    this.context.drawImage(levelImages.backgroundTwo, 0, 0, this.animationPositionX, 600, -220, 0, this.animationPositionX, 600);
    if (this.animationPositionX < 1390) {
      this.animationPositionX += 10;
      requestAnimationFrame(this.drawGardenBind);
    } else {
      requestAnimationFrame(this.drawOtherElementsBind);
      this.startLevel();
      this.canvas.addEventListener('mousemove', (e) => {
        if (e.layerX > 660 && e.layerX < 770 && e.layerY > 0 && e.layerY < 28){
          this.menu = commonImages.menuHover;
        } else {
          this.menu = commonImages.menu;
        }
      });
      this.canvas.addEventListener('click', () => {
        if(this.menu === commonImages.menuHover) {
          if (this.menuOpen) {
            this.menuOpen = 0
          } else {
            this.menuOpen = 1;
          }
        }
      })
    }
  }

  drawOtherElements() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(levelImages.backgroundTwo, 0, 0, this.animationPositionX, 600, -220, 0, this.animationPositionX, 600);
    this.context.drawImage(commonImages.seedBank, 10, 0);
    this.context.drawImage(commonImages.sunBank, 10, 0);
    this.context.fillText(`${this.numberOfSuns}`, 48.5, 59);
    this.context.drawImage(this.menu, 660, -5);
    this.drawSeedPacket();


    this.lawnmowers.forEach((lawnmower) => lawnmower.draw());
    this.zombieComing();
    this.chosePlant();
    this.drawPlant();
    this.createPlantLogo();
    this.drawSun();
    this.peashooterRechargeTimer++;
    if (this.firstPlant){
      this.fallOfSuns();
    }
    if ((this.checkComingZombie) && (this.zombies.length > 0)){
      this.startComingZombie();
    }
    if ((this.plants.length > 0) && this.zombiesC.length) {
      this.openFire();
    }

    this.levelProgress();
    this.choseSun();
    this.demoFirstArrow();

    if (this.menuOpen) {
      this.showMenu();
    }
    
    if (this.restartDialogOpen) {
        this.menuRestartDraw();
    }
    if (this.quitDialogOpen) {
        this.menuQuitDraw();
    }
    if (this.levelUp && !this.stopAnimation) {
      this.levelComplete();
    }
    if (!this.stopLevel) {
      requestAnimationFrame(this.drawOtherElementsBind);
    }
  }

  levelComplete() {
    this.sunflower.award();
    this.context.drawImage(commonImages.arrowBottom, this.sunflower.startX, this.sunflower.endY);
    if (!this.once) {
      this.once = 1;
      this.canvas.addEventListener('click', this.awardingEventBind);
    }
    this.hint(this.sunflower);
  }



  awardingEvent(e) {
    if (e.layerX > this.sunflower.startX && e.layerX < this.sunflower.startX+50  && e.layerY > this.sunflower.endY+70 && e.layerY < this.sunflower.endY + 140) {
      this.awarding();
    }
  }

  awarding(){
    this.sunflower.award();
    this.stopAnimation = 1;
    if (this.sunflower.startX > 376) {
      this.sunflower.startX -= ((this.sunflower.startX - 376) / 10) + 1;
      requestAnimationFrame(this.awardingBind);
    } else if (this.sunflower.startX < 374) {
      this.sunflower.startX += ((374-this.sunflower.startX)/10)+1;
      requestAnimationFrame(this.awardingBind);
    } else {
      this.context.drawImage(commonImages.starburst, 107, 6);
      this.sunflower.award();
      if (this.awardTimer === 60){
        this.stopLevel = 1;
        this.sunflower.init();
        this.canvas.removeEventListener('mousemove', this.calculatePlantUnitBind);
        this.canvas.removeEventListener('click', this.awardingEventBind);
        const betweenLevel = new BetweenLevels(this.canvas, this.context, this.sunflower.packet, 1);
        betweenLevel.create();
        betweenLevel.start();
      } else {
        this.awardTimer++;
        requestAnimationFrame(this.awardingBind);
      }
    }
  }


  zombieComing() { //TODO AllUnitInTheMap.zombieComing();
    if (this.lawnmowers.length > 0) { //
      this.lawnmowers.forEach((lawnmower) => lawnmower.activated());
    }
    this.zombiesC.forEach((elem, i, arr) => {
      this.lawnmowers.forEach((lawnmower, i, arr) => { //
        if (lawnmower.pointX > elem.positionX && elem.positionY+55 > lawnmower.pointY && elem.positionY+45 < lawnmower.pointY) {
          lawnmower.used = 1;
          elem.health = 0;
          if (lawnmower.pointX > 790) {
            arr.splice(i, 1);
          }
                }
            });
            if (elem.health < 1) {
                this.audioPlayer(this.zombyAudioFalling.zombyfalling1);
        elem.zombiesDead();
        if (elem.timerDied > 59) {
          let temp = arr[i];
          arr[i] = arr[arr.length - 1];
          arr[arr.length - 1] = temp;
          arr.pop();
        }
      } else {
        if (this.plants.some((plant, i, arr) => {
            if (plant.positionX-20 > elem.positionX && plant.positionX - 90 < elem.positionX && plant.positionY < elem.positionY+70 && plant.positionY > elem.positionY+60){
              this.audioPlayer(this.zombyAudioChomp.chomp);
              this.audioPlayer(this.zombyAudioChomp.chomp2);
              this.audioPalyer(this.zombyAudioChomp.chompSoft);
              this.zombieAttack++;
              if (this.zombieAttack > 42){
                plant.health -= 1;
                this.zombieAttack = 0;
                if (plant.health < 1) {
                  this.positionOfPlant.splice(i, 1);
                  arr.splice(i, 1);
                }
              }
              return true;
            } else {
              return false;
            }
          })){
          elem.attack();
        } else {
          elem.walk();
        }
      } //TODO over here
      if (this.zombies.length < 1 && elem.health < 1 && arr.length < 1) {
        this.levelEnd(elem.positionX, elem.positionY);
      }
    });
  }

  levelEnd(pointX, pointY) {
    this.gameAudioStates.gameprocess.pause();
    this.sunflower.createAwardPosition(pointX, pointY);
    this.levelUp = 1;
    this.levelComplete(pointX);
    this.sunflower.state = 'once';
    this.sunflower.direction = 'top';
  }

  levelProgress () {
    if (this.checkComingZombie) {
      this.context.drawImage(commonImages.levelTimeLine, 600, 555);
      this.context.drawImage(commonImages.levelTimeLineProcess, 0, 0, this.levelTimeLinePosition + 18, 26, 758.55-this.levelTimeLinePosition , 568, this.levelTimeLinePosition + 18, 26);
      if (this.levelTimeLinePosition < 131) {
        this.levelTimeLinePosition += 0.06;
      }
    }
  }

  demoFirstArrow() {
    if (((!this.firstPlant) || (this.plants.length < 1 && this.numberOfSuns > 100)) && (this.seedPacket.every((seed) => !seed.chose))) {
      this.context.drawImage(commonImages.arrowTop, 98, commonImages.arrowTop.startY);
      this.hint(commonImages.arrowTop);
    }
  }


  hint (pointer){
    if (!this.once) {
      if (pointer.direction === 'top'){
        pointer.startY += 1;
        if (pointer.startY > pointer.endY + 15) {
          pointer.direction = 'bottom';
        }
      } else if (pointer.direction === 'bottom') {
        pointer.startY -= 1;
        if (pointer.startY < pointer.endY) {
          pointer.direction = 'top';
        }
      }
    }
  }

  chosePlant() {
    this.seedPacket.forEach((seed, i) => {
      if (seed.chose || this.numberOfSuns < seed.cost - 1) {
        seed.choice(97+(i*60), 9);
      } else {
        seed.cancelChoice(97+(i*60), 9);
      }
    });
  }

  drawPlant() {
    this.plants.forEach((elem) => {
      elem.build();
      this.zombiesC.forEach((zombie) => {
        for (let i = 0; i < elem.positionOfBullet.length; i++) {
          if (elem.positionOfBullet[i].pointX > zombie.positionX+60 && elem.positionOfBullet[i].pointX < zombie.positionX+85) {
            elem.positionOfBullet[i].hit = 1;
            if (elem.positionOfBullet[i].frameBulletSpeed === 3) {
              this.audioPlayer(this.zombyAudioFalling.bonk);
              zombie.health -= 1;
            }
          }
        }
      });
      elem.useOfAbility();
    });
  }   //TODO AllUnitInTheMap.drawPlant()

  drawSun() { //TODO AllUnitInTheMap.drawSun()
    this.suns.forEach((elem) => {
      elem.fall();
    });
  }

  choseSun() {    // TODO AllUnitInTheMap.choseSun()
    this.chosenSuns.forEach((elem, i, arr) => {
      elem.chose();
      if (elem.startX < 10){
        arr.splice(i, 1);
        this.numberOfSuns += 25;
      }
    });
  }



  startLevel() {
    this.canvas.addEventListener('click', this.toPlantBind);
  }

  toPlant(e) {
    if (this.seedPacket.every((seed) => (!seed.chose))) {
      this.seedPacket.find((seed, i) => {
          if ((e.layerX > (97 + 60 * i)) && (e.layerX < (97 + (50 * (i + 1)))) && (e.layerY > 9) && (e.layerY < 74) && this.numberOfSuns > seed.cost - 1) {
            seed.chose = 1;
            this.audioPlayer(this.plantAudio.seedlift);
            this.positionX = e.layerX - seed.calculateWidth() / 2;
            this.positionY = e.layerY - seed.calculateHeight() / 2;
            this.canvas.addEventListener('mousemove', this.calculatePlantUnitBind);
            return true;
          }
        }
      )
    } else {
      this.seedPacket.find((seed, i) => {
        if ((e.layerX > (97+60*i)) && (e.layerX < (97 + (50*(i+1)))) && (e.layerY > 9) && (e.layerY < 74)) {
          if (seed.chose) {
            seed.chose = 0;
            this.canvas.removeEventListener('mousemove', this.calculatePlantUnitBind);
            return true;
          }
        }
      })
    }

  }

  createPlantLogo() {
    this.seedPacket.forEach((seed) => {
      if (seed.chose === 1) {
        seed.create(this.positionX, this.positionY);
        for (let i = 0; i < 10; i++) {
          if ((this.positionX > (i * 72)) && (this.positionX < ((i + 1) * 72)) && (this.positionY > 230) && (this.positionY < 340)) {
            this.peashooter.create(40 + i * 72, 270);
            this.positionToCreateX = 40 + i * 72;
            this.positionToCreateY = 270;
            this.canvas.addEventListener('click', this.createPlantUnitBind);
          }
        }
      }
    });
  }

  calculatePlantUnit(e) {
    this.positionX = e.layerX - this.peashooter.calculateWidth() / 2;
    this.positionY = e.layerY - this.peashooter.calculateHeight() / 2;
  }

  createPlantUnit() {
    this.audioPlayer(this.plantAudio.plant1);
    let plant;
    this.seedPacket.forEach((seed) => {
      if (seed.chose) {
        plant = new seed.name(this.context, this.positionToCreateX, this.positionToCreateY)
      }
    });
    if (plant) {
      plant.init();
      let length = this.positionOfPlant.length;
      let checkUniq = 1;
      if (this.positionX < 730 && this.positionY > 120 && this.positionY < 435) {
        for (let i = 0; i < length; i++) {
          if (this.positionOfPlant[i].pointX === plant.positionOfCreate.pointX && this.positionOfPlant[i].pointY === plant.positionOfCreate.pointY) {
            checkUniq = 0;
          }
        }
        if (checkUniq) {
          this.plants.push(plant);
          this.positionOfPlant.push(plant.positionOfCreate);
          this.seedPacket.find((seed) => {
            if (seed.chose) {
              seed.chose = 0;
              this.canvas.removeEventListener('mousemove', this.calculatePlantUnitBind);
              return true;
            }
          });
          this.numberOfSuns -= plant.cost;
          if (!this.firstPlant) {
            this.firstPlant = 1;
            this.fallOfSuns();
          }
          if ((this.plants.length > 1) && (!this.checkComingZombie)) {
            this.checkComingZombie = 1;
            this.commingZombieTimer = 600;
            this.startComingZombie();
            this.audioPlayer(this.zombyAudioGroan.groan3);
            this.audioPlayer(this.zombyAudioGroan.groan5);
            this.audioPlayer(this.zombyAudioGroan.groan6);
          }
        }
      }
    }
    this.canvas.addEventListener('click', this.receivingSunsBind);
    this.canvas.removeEventListener('click', this.createPlantUnitBind);

  }

  startComingZombie() {
    if (this.zombies.length > 0) {
      if (this.commingZombieTimer > 300) {
        if (this.zombies.length >= Math.ceil(this.zombiesLength/2)) {
          this.zombies[this.zombies.length - 1].positionX = 710;
          this.zombies[this.zombies.length - 1].positionY = 205;
          this.zombiesC.push(this.zombies.pop());
        }
        this.commingZombieTimer = 0;
      } else if (this.zombies.length < Math.ceil(this.zombiesLength/2) && this.commingZombieTimer > 90) {
        this.zombies[this.zombies.length - 1].positionX = 710;
        this.zombies[this.zombies.length - 1].positionY = 205;
        this.zombiesC.push(this.zombies.pop());
        this.commingZombieTimer = 0;
      } else {
        this.commingZombieTimer++;
      }
    }
  }



  openFire() {
    if (this.openFireTimer === 90){
      this.plants.forEach((elem) => {
        if (this.zombiesC.some((zombie) => { return (zombie.positionX < 690 && zombie.positionX > elem.positionX-35) })) {
          const bullet =  new Bullet(elem.positionX,elem.positionY);
          elem.positionOfBullet.push(bullet);
        }
      });
      this.openFireTimer = 0;
    } else {
      this.openFireTimer++;
    }

  }


  fallOfSuns() {
    if (this.sunTimer < 300 && !this.levelUp) {
      this.sunTimer++;
    } else if (!this.levelUp){
      const sun = new Sun(this.context);
      sun.create();
      this.suns.push(sun);
      this.sunTimer = 0;
    }
    this.destroySuns();
  }

  destroySuns() {
    if (this.suns.length > 2 && this.sunDestroyTimer > 450) {
      this.suns.shift();
      this.sunDestroyTimer = 0;
    } else {
      this.sunDestroyTimer++;
    }
  }

  receivingSuns(e){
    this.suns.forEach((elem, i, arr) => {
      if ((e.layerX > elem.startX) && (e.layerX < elem.startX + 75) && (e.layerY > elem.startY) && (e.layerY < elem.startY + 75)){
          this.audioPlayer(this.sunAudioPoints.sunpoints);
          this.chosenSuns.push(elem);
          arr.splice(i, 1);
      }
    });
  }

    showMenu() {
        this.context.drawImage(commonImages.menuWindow, 188, 30);
        this.context.drawImage(commonImages.restartButton, 230, 445);
        this.context.drawImage(commonImages.quitButton, 397, 445);
        this.context.drawImage(commonImages.sliderKnob, this.knobPositionX, this.knobPositionY);
        this.canvas.addEventListener('click', this.changeVolumeBind);
        this.canvas.addEventListener('click', this.openMenuRestartBind);
        this.canvas.addEventListener('click', this.openMenuQuitBind); 
    }
  
    openMenuRestart(e) {
      if (this.outsideArea(e,230,390,445,500)) return;
    
        this.audioPlayer(this.buttonAudio.tap);
        this.audioPlayer(this.buttonAudio.tap2);
        this.audioPlayer(this.buttonAudio.bleep);
        this.restartDialogOpen = 1;
    }
  
    menuRestartDraw() {
        this.context.drawImage(resources.get('img/dialog_window/quit_menu.png'),170, 180, 450, 350);
        this.context.drawImage(commonImages.restart1, 325, 250);
        this.context.drawImage(commonImages.restart2, 205, 350);
        this.context.drawImage(commonImages.restartButton, 210, 460);
        this.context.drawImage(commonImages.cancelButton, 420, 460);
        this.canvas.addEventListener('click', this.returnToGameBind);
        this.canvas.addEventListener('click', this.restartCurrentLevelBind);
        this.canvas.removeEventListener('click', this.changeVolumeBind);
        this.canvas.removeEventListener('click', this.openMenuQuitBind);  
    }
    
    
  
    openMenuQuit(e) {
        if (this.outsideArea(e,397,555,445,500)) return;
        this.audioPlayer(this.buttonAudio.tap);
        this.audioPlayer(this.buttonAudio.tap2);
        this.audioPlayer(this.buttonAudio.bleep);
        this.quitDialogOpen = 1;    
    }
  
    menuQuitDraw() {
        this.context.drawImage(resources.get('img/dialog_window/quit_menu.png'),170, 180, 450, 350);
        this.context.drawImage(commonImages.quit1, 350, 250);
        this.context.drawImage(commonImages.quit2, 210, 350);
        this.context.drawImage(commonImages.quitButton, 210, 460);
        this.context.drawImage(commonImages.cancelButton, 420, 460);
        this.canvas.addEventListener('click', this.returnToGameBind);
        this.canvas.addEventListener('click', this.goToMenuOfGameBind);
        this.canvas.removeEventListener('click', this.changeVolumeBind);
        this.canvas.removeEventListener('click', this.openMenuRestartBind);
               
    }
    
    goToMenuOfGame(e) {
        if (this.outsideArea(e, 210, 370, 460, 500)) return;
        this.audioPlayer(this.buttonAudio.tap);
        this.audioPlayer(this.buttonAudio.tap2);
        this.audioPlayer(this.buttonAudio.bleep);
        this.canvas.removeEventListener('mousemove', this.calculatePlantUnitBind);
        this.canvas.removeEventListener('click', this.toPlantBind); 
        this.canvas.removeEventListener('click', () => {
            if (this.menu === commonImages.menuHover) {
                if (this.menuOpen) {
                    this.menuOpen = 0
                } else {
                    this.menuOpen = 1;
                }
            }
        });
        this.gameAudioStates.menupage.loop = true;
        this.audioPlayer(this.gameAudioStates.menupage);
        this.menupage = new MenuPage();
    }
    
    
  
    outsideArea(e, x1, x2, y1, y2) {
        let x = e.pageX - this.elemLeft, y = e.pageY - this.elemTop;
        return x < x1 || x > x2 || y < y1 || y > y2;
    }
    
   
    changeVolume(e) {
        if (this.outsideArea(e, 320, 460, 180, 230)) return;
        this.knobPositionX = e.pageX - this.elemLeft - 5;
        this.knobpositionY = e.pageY - this.elemTop - 5;
        if (this.knobPositionX  <= 460 && this.knobPositionX > 420) {
            store.setVolume(0.5);
        } else if (this.knobPositionX  <= 420 && this.knobPositionX > 380) {
            store.setVolume(0.3);
        } else if (this.knobPositionX  <= 380 && this.knobPositionX > 340) {
            store.setVolume(0.2);
        } else if (this.knobPositionX  <= 340 && this.knobPositionX > 320) {
            store.setVolume(0.1);
        } else if (this.knobPositionX <= 320) {
            store.setVolume(0);
        }
        this.gameAudioStates.gameprocess.volume = Number(store.getVolume());        
    }   
   
}

export { LevelOne };








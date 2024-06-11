var organisms = [[],[], [], [], [],[],[],[],[], []];
      organisms[0][0] = new create_organisms("", "", 10, 10, 10, 10);
      for(var j = 0; j < 1; j++) {
          organisms[1][j] = new create_organisms("", "", 10, 10, 10, 10);  
      }
      
      function damage(stat, mental, target, ranged) {
          accuracystat = getModOfStat(stat);
          dexpenalty = 0;
          crouch_mod = 0;
          t_crouch_mod = 0;
          t_cover_mod = 0;
          knowledgeable = false;
          frightened_mod = 0;
          if(mental >= 30) {
              knowledgeable = true;
          }
          if(target.mental<=mental) {
              frightened_mod = floor((target.mental-mental)/-10)-1;
          }
          if(this.crouching <= -1) {
              crouch_mod = -2;
          }
          if(target.crouching == -1) {
              crouch_mod = -2;
          } else if(target.crouching == -2) {
              crouch_mod = -2;
              cover_mod = -2;
          }
          if((this.sped+this.ment+frightened_mod)>=(this.ofns*2)) {
              if((this.ment>target.ment) && (this.sped>target.ment)) {
                  dexpenalty = target.sped;
              }
          } else {
              if(this.ofns+frightened_mod>target.ment) {
                  dexpenalty = target.sped;
              }
          }
          if(!ranged) {
              if(getDist(this.x, this.y, this.z, target.x, target.y, target.z) <= size*1.5) {
                  if((accuracystat-crouch_mod+frightened_mod+10) >= (getModOfStat(target.sped)-dexpenalty+t_crouch_mod)) {
                      if(((accuracystat*2)+frightened_mod) >= getModOfStat(target.dfse)) {
                          characters = splice([indexOf(target), 1];
                      }
                  } else {
                      if(((accuracystat-cover_mod)+frightened_mod) >= (getModOfStat(target.sped)-dexpenalty+t_crouch_mod)) {
                          if((accuracystat+frightened_mod) >= getModOfStat(target.dfse)) {
                              characters = splice([indexOf(target), 1];
                          }
                      }
                  }
              }
          } else if(getDist(this.x, this.y, this.z, target.x, target.y, target.z) <= size*6) {
              if((accuracystat-crouch_mod+frightened_mod+10) >= (getModOfStat(target.sped)-dexpenalty+(t_crouch_mod*-1))) {
                  if(((accuracystat*2)+frightened_mod) >= getModOfStat(target.dfse)) {
                      characters = splice([indexOf(target), 1];
                  }
              } else {
                  if((accuracystat-+frightened_modcover_mod) >= (getModOfStat(target.sped)-dexpenalty+(t_crouch_mod*-1))) {
                      if((accuracystat+frightened_mod) >= getModOfStat(target.dfse)) {
                          characters = splice([indexOf(target), 1];
                      }
                  }
              }
          }
      }
      
      let size = 8;
      let depth = 512;
      let overlap = 256;
      let treeLine = -64;
      let water = 8;
      let x_coor = 0;
      let y_coor = -256;
      let z_coor = -512;
      let rez1, terrRange, seed;

      function keyPressed() {
        if (keyCode === LEFT_ARROW) {
          x_coor -= 50;
        } else if (keyCode === RIGHT_ARROW) {
          x_coor += 50;
        } else if (keyCode === DOWN_ARROW) {
          z_coor -= 50;
          characters[0][0].crouching = true;
        } else if (keyCode === UP_ARROW) {
          z_coor += 50;
          characters[0][0].crouching = false;
        }
      }
  
      function setup() {
        let canv = createCanvas(1024, 512, WEBGL);
        canv.mousePressed(setup);
        cam = createCamera();
        //noLoop();
        colorMode(HSB,360,100,100,100);
        rez1 = 0.01;
        terrRange = 100;
        seed = millis() * 10000; //to vary noise
        draw();
      }
    
      function draw() {
        cam.camera(x_coor,y_coor,z_coor,0,0,0,0,1,0);
     
        background(220,100,100);
        for (x = -width/2-overlap; x < width/2+overlap; x+=size) {
          for (z=-depth/2-overlap; z <depth/2+overlap; z+=size) {
            y = (noise(x*rez1+seed, z*rez1+seed)-0.5)*terrRange*2;
            stroke(0);
            g = noise(x * rez1+seed+20000,z*rez1+seed+20000)-0.5;
            fill(125+125*g,95+90*g,60+60*g,100) //grass color
            if (y<treeLine) {
              fill (200,20,40); //stone color
            }
            if (y>water) {
              fill(240,100,60,100); //water color
              y = water;
              noStroke();
            }
            push();
            translate(x,y,z);
            box(size); //grass or water
            translate(0,size*3,0);
            fill (200,20,40); //stone color
            box(size,size*5,size); //stone block
            let treeChance = (noise(x * rez1+seed+10000,z*rez1+seed+10000)-0.5)*90;
            if (treeChance > 9.5 && y>treeLine && y<water) {
              translate(0,-size*5,0);
              fill(0,75,30); //trunk color
              cylinder(size/2,size*3);
              translate(-size,-size,-size);
              fill(120,80,30); //leaves
              //sphere(size*2);
              // fill in tree:
              for (i=0;i<2;i++){
                for (j=0;j<3;j++){
                  for (k=0;k<3;k++){
                    box(size);
                    translate(0,0,size)
                  }
                  translate(size,0,-size*3)
                } 
                translate(-size*3,-size,0)
              }
              translate(size,0,size);
              box(size) //cap on tree
            }
            pop();
          }
        }
      }
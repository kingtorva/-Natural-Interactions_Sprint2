//Grab body part x,y locations from Posenet, put into an array, call a function to draw those points, to make trails   


let video;
let pose;
//let img1;
//let img2;
let skeleton;
let angle=0;
let history = [];
let history2 = [];
let history3 = [];
let r=100;
let g=200;
let b=50;
function setup(){
   //b = new Ball();
/////////////////////////////////send to pnet 
    
frameRate(10);     
createCanvas(windowWidth, windowHeight);
noStroke();    
video = createCapture(VIDEO);
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 
//img1 = loadImage('images/hand2.svg');
//img2 = loadImage('images/face.svg');    
video.hide(); 
    
/////////////////////////////////
    
    
rectMode(CENTER);  
angleMode(DEGREES);
    
    
}
////////////////////////////////////////////

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    //console.log(poses);
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
    } 
    
} 

//////////////////////////////////////////////////

/*translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();*/



function draw(){
   //set colour
    for(let i=0;i<10; i++){
    r++;
    g++;
    b++;
    if(r==255){
        r=1;
    }
    if(g==255){
        g=1;
    }
    if(b==255){
        b=1;
    } 


    }
////////////////////////////////////////////////
image(video, 0, 0,width,height);
//TRESHOLD 0 is white - 1 is black
filter(THRESHOLD,1);    

    
    if(pose){
        //noStroke();
    fill(255,255,255,50);    
    stroke(255,255,255);
    

        
        
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
        
    ellipse(pose.nose.x, pose.nose.y, d*3);
   
        let v = createVector(pose.nose.x,pose.nose.y);
        
        history.push(v);
        //console.log("history.length " + history.length);
        let head = history[history.length-1].copy();
        history.push(head);
        //console.log("head " + );
        //head.x += pose.nose.x;
        //head.y += pose.nose.y;
        history.shift();
        
        for(let i = 0;i < history.length-20; i++){
            //console.log("history[i].y " + history[i].y);
            //ellipse(history[i].x, history[i].y, d*3);
            //console.log("i");
         
            drawHeadSpace(history[i].x,history[i].y);
            
        }
       
       
        
    //image(img2,pose.nose.x, pose.nose.y, -150,-150 );    
        
    //image(img1, ((pose.leftWrist.x)-50),pose.leftWrist.y , 150, 150);
    stroke(255,255,255);  
    rect(pose.leftWrist.x,pose.leftWrist.y, 50, 50);

    rect(pose.rightWrist.x,pose.rightWrist.y, 50, 50);

    let v2 = createVector(pose.leftWrist.x,pose.leftWrist.y);
        
        history2.push(v2);
        //console.log("history.length " + history.length);
        let Rhand = history[history2.length-1].copy();
        history2.push(Rhand);
        //console.log("head " + );
        //head.x += pose.nose.x;
        //head.y += pose.nose.y;
        history2.shift();

    for(let i = 0;i < history2.length-20; i++){
        //console.log("history[i].y " + history[i].y);
        //ellipse(history[i].x, history[i].y, d*3);
        //console.log("i");
     
        drawRhandSpace(history2[i].x,history2[i].y);
        
    }
    let v3 = createVector(pose.rightWrist.x,pose.rightWrist.y);
        
    history3.push(v3);
    //console.log("history.length " + history.length);
    let Lhand = history3[history3.length-1].copy();
    history3.push(Lhand);
    //console.log("head " + );
    //head.x += pose.nose.x;
    //head.y += pose.nose.y;
    history3.shift();

for(let i = 0;i < history3.length-20; i++){
    //console.log("history[i].y " + history[i].y);
    //ellipse(history[i].x, history[i].y, d*3);
    //console.log("i");
 
    drawLhandSpace(history3[i].x,history3[i].y);
    
}
    //////////////////////////////////////////////////////////////    
        for(let i=0; i < pose.keypoints.length;i++){
    //for(let i=0; i < 5;i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    //push();
    //console.log("keypoints");
    //translate(x,y);    
     //rotate(angle);   
    //fill(0,255,0);
    //rect(x,y,25,25);
    //angle+=0.01;  
        
        //pop();
    //ellipse(x,y,120,120);
      //box(x,y,50);  
        
    for(let i = 0; i < skeleton.length; i++){
       
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(5);
        stroke(255);
        line(a.position.x, a.position.y,b.position.x, b.position.y );
        fill(127);
        //rect((a.position.x)/2, (a.position.y)/2,(b.position.x)/2, (b.position.y)/2 );
         //rect(a.position.x,b.position.y,10,10);
        }    
    }
}  
    
    
}
//head
function drawHeadSpace(x,y){
   
        fill(r,g,b,50);
        noStroke();
        ellipse(x, y,100);
        //console.log("drawHeadSpace " + x);
             
    } 
    //right hand
function drawRhandSpace(x,y){
    fill(b,g,r,50);
    noStroke();

    ellipse(x, y,50,50,25);
    //console.log("drawHeadSpace " + x);
}
//left hand
function drawLhandSpace(x,y){
    fill(g,r,b,50);
    noStroke();
    
    ellipse(x, y,50,50,25);
    //console.log("drawHeadSpace " + x);
}
/////////////////////////////////////////////////////////////
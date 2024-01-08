status ="";
img ="";
objects = [];
function setup(){
    canvas = createCanvas(600,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
}


function preload(){
    img = loadImage("dog_cat.jpg");
}

function modelloaded(){
    console.log("Model is Loaded");
    status=true;
    
}



function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }

    
}


function draw(){
    image(video,0,0,600,450);
    //fill("#FF0000");
    //text("Dog",160,67)
    //noFill();
    //stroke("#FF0000");
    //rect(150,70,190,350);
   //text("Cat",290,90);
    //rect(280,90,250,350);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0;i < objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill(r,g,b);
            percent = floor( objects[i].confidence*100);

            text(objects[i].label + "," +percent+"%",objects[i].x,objects[i].y);

            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }


}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting the Objects";
}



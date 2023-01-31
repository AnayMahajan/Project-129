song1= "";
song2= "";

leftWristX= 0;
leftWristY=0;
rightWristX= 0;
rightWristY= 0;

scoreLeftWrist= 0;

statusSong1= "";

function setup()
{
    canvas= createCanvas(400, 350);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    posenet= ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses)
}
function modelLoaded()
{
    console.log('Posenet is initialized');
}
function preload()
{
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function draw()
{
    image(video, 0, 0, 400, 350);

    fill('red');
    stroke('red');
    statusSong1= song1.isPlaying();

    if(scoreLeftWrist> 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(statusSong1 == false)
        {
            song1.play();
            document.getElementById('song').innerHTML= "Harry Potter Theme";
        }
    }


}
function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function gotPoses(results)
{
    if(results.length> 0);
    {
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log('leftWristX= '+ leftWristX+' leftWristY= '+ leftWristY+' rightWristX= '+ rightWristX+ ' rightWristY= '+ rightWristY);
    }
}

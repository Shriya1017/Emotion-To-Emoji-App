prediction_1 = "" 
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7nrHpV1X3/model.json',modeloaded);
function modeloaded(){
    console.log('modeloaded');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The 1ST Prediction is"+prediction_1;
    speak_data_2="The 2ND Prediction is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance (speak_data_1+speak_data_2);
    synth.speak(utterThis);
    utterThis.rate=0.5;
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error);

}

else{
    console.log(results);
    document.getElementById("result_emotion_name_1").innerHTML=results[0].label;
    document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();

    if(result[0].label=="happy"){
        document.getElementById("update_emoji_1").innerHTML="&#128522;";

    }

    if(result[0].label=="sad"){
        document.getElementById("update_emoji_1").innerHTML="&#128512;";
        
    }

    if(result[0].label=="angry"){
        document.getElementById("update_emoji_1").innerHTML="&#128532;";
        
    }


    if(result[1].label=="happy"){
        document.getElementById("update_emoji_2").innerHTML="&#128522;";

    }

    if(result[1].label=="sad"){
        document.getElementById("update_emoji_2").innerHTML="&#128512;";
        
    }

    if(result[1].label=="angry"){
        document.getElementById("update_emoji_2").innerHTML="&#128532;";
        
    }
}
}
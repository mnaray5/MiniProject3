function setup(){
    createCanvas(0,0);
}

//console.log(navigator);
lat = lon = 52;
var canvas = document.getElementById("canvas");
var cWidth = cHeight = 0;
var temp = 0;
 
canvas.width  = window.innerWidth-15;
cWidth = canvas.width;
canvas.height = window.innerHeight-20;
cHeight = canvas.height;

colors = ['#97E78E','#8EDAE7','#4554CC','#62B2B2','#A873D0','#D073C6','#E848A5','#DA4069'];


if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success,failure);
}

function failure(){
    console.log("request failed");
}

function success(midiAccess){


    const inputs = midiAccess.inputs;
    inputs.forEach((input)=>{
        input.addEventListener('midimessage', handleInput);
    })
}

function handleInput(input){
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];


    switch(command){
        case 144:
            if(velocity > 0){
                noteOn(note);
            } else {
                noteOff(note);
            }
            break;    
        //case 128:
         //   noteOff(note);
          //  break
    }
}

function noteOn(note){    
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    console.log(`note:${note} //on`);
    if(note == 99){
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);    
        ctx.stroke();
    }
    if(note >=84 && note <=98){
        getLatLong();
        getTemp();
        x = map(temp, -100,120,0, cWidth);
        ctx.beginPath();
        myColor = Math.floor(Math.random()*colors.length);
        ctx.strokeStyle = colors[myColor];
        ctx.moveTo(x,0);
        ctx.lineTo(x,cHeight);
        ctx.stroke();
    } else if (note <=67 && note >=52){
        getLatLong();
        console.log(note + " //ON");
    } else if (note <=51 && note >=36){
        console.log(note + " //ON");
    } else if (note <=83 && note >=68){
        getLatLong();
        getTemp();
        x = map(temp, -100,120,0, cWidth);
        ctx.beginPath();
        myColor = Math.floor(Math.random()*colors.length);
        ctx.strokeStyle = colors[myColor];
        ctx.moveTo(0,x);
        ctx.lineTo(cWidth,x);
        ctx.stroke();
    } else {
        console.log(note + " //ON");
    }
}

function noteOff(note){
    console.log(`note:${note} //off`);
    if(note == 99){
        console.log("RESET");
    } else {
        console.log(note + " //OFF");
    }
}


    function getLatLong(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
           url:'https://random-data-api.com/api/address/random_address',
            //url:'https://api.3geonames.org/?randomland=yes&json=1',
            async:false,
            crossDomain:true,

            complete: function(data){
                if(data.readyState === 4 && data.status === 200){
                    //console.log(data.responseJSON);
                    lat = data.responseJSON.latitude;
                    //console.log(lat);
                    lon = data.responseJSON.longitude;
                    //console.log(lon);
                }
            }
        });
    }

    function getTemp(){
        APIkey = 'b1b767e926b4399c191e6647a278089d';
        units = 'imperial';
        $.ajax({
            type: 'GET',
            dataType: 'json',
            //url:'https://meowfacts.herokuapp.com/',
            //https://randomkey.io/random-data-api/ - use zip?
            url:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`,
            async:false,
            crossDomain:true,

            complete: function(data){
                if(data.readyState === 4 && data.status === 200){
                   temp = data.responseJSON.main.temp;
                   console.log(temp);
                }
            }
        });
    }

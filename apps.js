//console.log(navigator);
lat = lon = 0;
var canvas = document.getElementById("canvas");
 
/* Rresize the canvas to occupy the full page, 
   by getting the widow width and height and setting it to canvas*/
 
canvas.width  = window.innerWidth-15;
canvas.height = window.innerHeight-20;


if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success,failure);
}

function failure(){
    console.log("request failed");
}

function updateDevices(event){
    //console.log(event);
}

function success(midiAccess){
    //console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);

    const inputs = midiAccess.inputs;
    inputs.forEach((input)=>{
        //console.log(input);
        input.addEventListener('midimessage', handleInput);
    })
}

function handleInput(input){
   // console.log(input);
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    /*console.log(command);
    console.log(note);
    console.log(velocity);*/

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
    console.log(`note:${note} //on`);
    if(note >=84 && note <=98){
        document.getElementById("header").innerHTML = "Green";
        document.getElementById("header").style = "color: #598859";
        getLatLong();

    } else if (note <=67 && note >=52){
        document.getElementById("header").innerHTML = "Pink";
        document.getElementById("header").style = "color: palevioletred";
        getLatLong();
        getTemp();
    } else if (note <=51 && note >=36){
        document.getElementById("header").innerHTML = "Yellow";
        document.getElementById("header").style = "color: #f4e777";
    } else if (note <=83 && note >=68){
        document.getElementById("header").innerHTML = "Blue";
        document.getElementById("header").style = "color: cornflowerblue";

    } else {
        document.getElementById("header").innerHTML = "Node 99 is On";
        document.getElementById("header").style = "color: teal";

    }
}

function noteOff(note){
    console.log(`note:${note} //off`);
    if(note == 99){
        document.getElementById("header").innerHTML = "Back to Normal: Launch Pad Demo";
        document.getElementById("header").style = "color: #6dc7c7";

    } else {
        document.getElementById("header").innerHTML = "Launch Pad Demo";
        document.getElementById("header").style = "color: darkorchid";
    }
}

 //api_key - b1b767e926b4399c191e6647a278089d
    //getLatLong();
    //http://www.randomnumberapi.com/
    //google key - AIzaSyAwmFtigB7p9M3YUxUZJl0yp2zoD42Tpg0
    //getTemp();
    function getLatLong(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url:'https://random-data-api.com/api/address/random_address',
            async:false,
            crossDomain:true,

            complete: function(data){
                if(data.readyState === 4 && data.status === 200){
                    lat = data.responseJSON.latitude;
                    console.log(lat);
                    lon = data.responseJSON.longitude;
                    console.log(lon);
                    //console.log(data.responseJSON);
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
                   //Fact = data.responseJSON.weather[0].description;
                   Fact = data.responseJSON.main.temp;
                   console.log(Fact);
                   //document.getElementById("fact").innerHTML = Fact;
                }
            }
        });
    }

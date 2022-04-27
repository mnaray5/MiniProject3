
let device;
function setup(){
    createCanvas(0,0);
}
minT = 0;
maxT = 110;
opt = 0;

var r=confirm("In this page, you will create your own artwork using the launchpad. There are 2 color options:"+
 " utilize the colors of the launchpad buttons, or utilize a set of colors of my choosing! Select 'OK' for launchpad colors, and 'Cancel' for my set");
if (r==true)
  {
  opt = 1;
  }
 else
  {
  opt = 0;
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


colors = ['#0500FF','#0400FF','#0300FF','#0200FF','#0100FF','#0000FF','#0002FF','#0012FF',
          '#0022FF','#0032FF','#0044FF','#0054FF','#0064FF','#0074FF','#0084FF','#0094FF',
          '#00A4FF','#00B4FF','#00C4FF','#00D4FF','#00E4FF','#00FFF4','#00FFD0','#00FFA8',
          '#00FF83','#00FF5C','#00FF36','#00FF10','#17FF00','#3EFF00','#65FF00','#8AFF00',
          '#B0FF00','#D7FF00','#FDFF00','#FFFA00','#FFF000','#FFE600','#FFDC00','#FFD200',
          '#FFC800','#FFBE00','#FFB400','#FFAA00','#FFA000','#FF9600','#FF8C00','#FF8200',
          '#FF7800','#FF6E00','#FF6400','#FF5A00','#FF5000','#FF4600','#FF3C00','#FF3200',
          '#FF2800','#FF1E00','#FF1400','#FF0A00','#FF0000','#FF0010','#FF0020','#FF0030',
          '#FF0040','#FF0050','#FF0060','#FF0070','#FF0080','#FF0090','#FF00A0','#FF00B0',
          '#FF00C0','#FF00D0','#FF00E0','#FF00F0','#FF01F0','#FF02F0','#FF03F0','#FF04F0',
          '#FF05F0','#FF06F0','#FF07F0','#FF08F0','#FF09F0','#FF0AF0','#FF0BF0','#FF0CF0',
          '#FF0DF0','#FF0EF0'];

landColors = ['#361C11','#A98932','#6D392C','#5DA0AF','#C5CBD4','#3BC4D6','#5B4C41','#B4542C',
              '#7C8494','#9A6A4D','#EEF1D0','#6694BC','#898E8E','#D59F20','#DBA46F','#302923',
              '#0B0B14','#E77831','#4B0E0A','#322F35','#8E9A8C','#6C8590','#AC8471','#363A41',
              '#ECB762','#CD7142','#9CAFB5','#203A54','#7C6C84','#94AF7E','#26231A','#8C8C8B',
              '#3F591E','#C4DEEC','#8C745D','#8C745D','#596454','#384F54','#8E9189','#A4ACC4',
              '#C68051','#8C3716','#867745','#908277','#ECDCA4','#91B4C1','#36440C','#3C5474',
              '#B4ACAC','#AFACAB','#C3D2E4','#CED3DF','#D3DCE4','#585E60','#464C4A','#5A483B',
              '#703C11','#84823F','#A48371','#768285','#4C8484','#5C2C44','#A4B4B7','#CA3E11',
              '#A95E40','#656D7B','#B47468','#16645A','#9E511A','#7AA6D3']

cQ1 = ['#C2F3FF', '#61EEFF', '#61C7DD', '#61A1B3', '#C2DDFF', '#61C7FF', '#61A1DD', '#6181B3', 
       '#A18CFF', '#6161FF', '#6161DD', '#6161B3', '#CCB3FF', '#A161FF', '#8161DD', '#7661B3', 
       '#FFB3FF', '#FF61FF', '#DD61DD' ,'#B361B3', '#FFB3D5', '#FF61C2', '#DD61A1', '#B3618C', 
       '#FF7661', '#E9B361', '#DDC261' ,'#A1A161','#61B361', '#61B38C', '#618CD5', '#6161FF',
       '#61B3B3', '#8C61F3', '#CCB3C2', '#8C7681' ,'#FF6161', '#F3FFA1', '#EEFC61', '#CCFF61',
       '#76DD61', '#61FFCC', '#61E9FF', '#61A1FF', '#8C61FF', '#CC61FC', '#EE8CDD', '#A17661',
       '#FFA161', '#DDF961', '#D5FF8C','#61FF61', '#B3FFA1', '#CCFCD5', '#B3FFF6', '#CCE4FF',
       '#A1C2F6', '#D5C2F9', '#F98CFF', '#FF61CC', '#FFC261', '#F3EE61', '#E4FF61'];

if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success,failure);
}

function failure(){
    console.log("request failed");
}

function success(midiAccess){


    const inputs = midiAccess.inputs;
    for(var output of midiAccess.outputs.values()){
        device = output;
        console.log('Output device selected', device);
    }

    inputs.forEach((input)=>{
        input.addEventListener('midimessage', handleInput);
    })
}

function handleInput(input){
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    cColor(99,113);


    switch(command){
        case 144:
            if(velocity > 0){
                noteOn(note);
            } 
            break;    
        //case 128:
         //   noteOff(note);
          //  break
    }
}

function noteOn(note){    
    cColor(99,113);
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    console.log(`note:${note} //on`);
    if(note == 99){
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);    
        ctx.stroke();
        clearAll();
        cColor(99,114);
    }
    else if(note >=84 && note <=98){
        getLatLong();
        getTemp();
        if(temp < minT) minT = temp;
        if(temp > maxT) maxT = temp;
        x = map(temp, minT,maxT,0, cWidth);
        ctx.beginPath();
        if(opt == 0){
            console.log("landColors");
            myColor = Math.floor(Math.random()*landColors.length);
            ctx.strokeStyle = ctx.fillStyle =  landColors[myColor]; 
        } else {
           ctx.strokeStyle = cQ1[note-36]; 
        }
        ctx.moveTo(x,0);
        ctx.lineTo(x,cHeight);
        ctx.lineWidth = 6;
        ctx.stroke();
        colorAll(note, 84, 98); //add and x and y parameter


    }
        else if (note >=52 && note <=67 ){
        getLatLong();
        x = map(lat, -90,90,0, cWidth);
        y = map(lon, -180,180,0, cHeight);
        ctx.beginPath();
        if(opt == 0){
            console.log("landColors");
            myColor = Math.floor(Math.random()*landColors.length);
            ctx.strokeStyle = ctx.fillStyle =  landColors[myColor]; 
        } else {
           ctx.strokeStyle = ctx.fillStyle =  cQ1[note-36]; 

        }
        width = Math.random() * (200 - 20) + 20;
        height = Math.random() * (200 - 20) + 20;
        ctx.fillRect(x,y,width,height);
        ctx.stroke();

        colorAll(note, 52, 67); //add and x and y parameter




    } 
        else if (note >=36 && note <=51 ){
        console.log(note + " //ON");
        getLatLong();
        getTemp();
        x = map(lat, -90,90,0, cWidth);
        y = map(lon, -180,180,0, cHeight);
        if(temp < minT){ minT = temp;}
        if(temp > maxT) {maxT = temp;}
        t = map(temp,minT,maxT, 10, 100);
        ctx.beginPath();
        ctx.arc(x, y, t, 0, 2 * Math.PI);
        if(opt == 0){

            //Two options: map temp from 12-190 and then 0 - length,
            // or map temp from min-max, 12-190 and then 0 - length
            tt = map(temp, minT, maxT, 12, 190);

            myColor = Math.floor(map(tt, 12, 190, 0, colors.length));
            ctx.strokeStyle = ctx.fillStyle =  colors[myColor]; 
        } else {
           ctx.strokeStyle = ctx.fillStyle = cQ1[note-36]; 
        }
        ctx.fill();
        ctx.stroke();
        colorAll(note, 36, 51); //add and x and y parameter


    } //else if (note <=83 && note >=68){
        else if (note >=68 && note <=83 ){
        getLatLong();
        getTemp();
        if(temp < minT) minT = temp;
        if(temp > maxT) maxT = temp;
        x = Math.floor(map(temp, minT,maxT,0, cHeight));
        ctx.beginPath();
        if(opt == 0){
            //Two options: map temp from 12-190 and then 0 - length,
            // or map temp from min-max, 12-190 and then 0 - length
            tt = map(temp, minT, maxT, 12, 190);
            myColor = Math.floor(map(tt, 12, 190, 0, colors.length));
            ctx.strokeStyle = ctx.fillStyle =  colors[myColor]; 
        } else {
           ctx.strokeStyle = cQ1[note-36]; 
        }
        ctx.lineWidth = 6;
        ctx.moveTo(0,x);
        ctx.lineTo(cWidth,x);
        
        ctx.stroke();
        colorAll(note, 68, 83); //add and x and y parameter

    } else {
        console.log(note + " //ON");
        clearAll();
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
            async:false,
            crossDomain:true,

            complete: function(data){
                if(data.readyState === 4 && data.status === 200){
                    lat = data.responseJSON.latitude;
                    lon = data.responseJSON.longitude;
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

    function cColor(key,clr){
        device && device.send([0x90,key,clr]);
    }

   function colorAll(x, s, e){
        if(x%2 == 0){
            for(let i = s; i <= e; i = i+2){
                cColor(i,x);
            }
        } else {
            for(let i = s+1; i <= e; i = i+2){
                cColor(i,x);
            }
        }
    }


    function clearAll(){
        for(let i = 0; i < 100; i++){
            cColor(i,0);
        }
    }

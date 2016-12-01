window.onload = function() {
var menu = document.getElementById('menu');
//menu.innerText = 'OI';

var triangle = document.getElementById('triangle');
var circle = document.getElementById('circle');
var rectangle = document.getElementById('rectangle');
var polygon = document.getElementById('polygon');
var color = document.getElementById('color');
var picker = document.getElementById('picker');
var cont = document.getElementById('cont');
//let cont = document.getElementsByClassName('cont');
var log = document.getElementById('log');
var colorPicker = document.getElementById('colorPicker');
var colorCont = document.getElementById('colorCont');
var addColor = document.getElementById('addColor');
var submitColor = document.getElementById('submitColor');
var error = document.getElementById('error');
let white = document.getElementById('white');
let blue = document.getElementById('blue');
let crimson = document.getElementById('crimson');
let clear = document.getElementById('clear');
let abort = document.getElementById('abort');
let json = document.getElementById('json');
let exportJson = document.getElementById('export');
let importJson = document.getElementById('import');
let exImp = document.getElementById('eximp');
let jsonText = document.getElementById('jsonText');
let submitJson = document.getElementById('submit');
let endPol = document.getElementById('endPol');
    

    
// Visar meny-knapparna

cont.style.display = 'none';
colorCont.style.display = 'none';

menu.addEventListener('click', function(event){
  if (cont.style.display == 'none'){
    cont.style.display = 'inline-flex';
    colorCont.style.display = 'none';
      log.innerText = 'Choose what figure to draw'
  }
  else {
    cont.style.display = 'none';
    colorCont.style.display = 'none';
      log.innerText = 'Click the menu button to start the party!'
  }
});
    
menu.addEventListener('mouseenter', function(event){
    log.innerText = 'Click here to choose what figure to use and start drawing!'
});
    
triangle.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to select triangle';
});    

circle.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to select circle';
});  

rectangle.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to select rectangle';
}); 
    
polygon.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to select polygon';
});
    
color.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to select what color to use';
});

white.addEventListener('mouseenter', function(event){
    log.innerText = 'Select white';
});
    
blue.addEventListener('mouseenter', function(event){
    log.innerText = 'Select blue';
});
    
crimson.addEventListener('mouseenter', function(event){
    log.innerText = 'Select crimson';
});

addColor.addEventListener('mouseenter', function(event){
    log.innerText = 'Enter a HEX color code of your own choice!';
});
    
submitColor.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to activate the entered color!';
});
    
clear.addEventListener('mouseenter', function(event){
    log.innerText = 'Delete all the content of the canvas';
});
    
abort.addEventListener('mouseenter', function(event){
    log.innerText = 'Abort the drawing and delete the uncompleted figure';
});
    
json.addEventListener('mouseenter', function(event){
    log.innerText = 'Click to export or import drawings';
});
    
endPol.addEventListener('mouseenter', function(event){
    log.innerText = 'Click here to complete your polygon!';
});
    
exportJson.addEventListener('mouseenter', function(event){
    log.innerText = 'Export your work!';
});
    
importJson.addEventListener('mouseenter', function(event){
    log.innerText = 'Import other drawings!';
});
    
jsonText.addEventListener('mouseenter', function(event){
    if (isExport == true){
        log.innerText = 'Here is where your code will get your code';
    }
    else if(isImport == true){
        log.innerText = 'Paste your code into this text box!';
    } 
});
    
submitJson.addEventListener('mouseenter', function(event){
    if (isExport == true){
        log.innerText = 'Click here to get your code!';
    }
    else if(isImport == true){
        log.innerText = 'Click here to import your drawings!';
    } 
});
    
    
    

exImp.style.display = 'none';    

json.addEventListener('click', function(event){
    if (exImp.style.display == 'none'){
    exImp.style.display = 'block';
        log.innerText = 'Choose if you want to export or import'
  }
  else {
    exImp.style.display = 'none';
  }
});


// RITA

    
// Välj figur

let isTriangle = false;
let isRectangle = false;
let isCircle = false;
let isPolygon = false;
    
triangle.addEventListener('click', function(event){
    isTriangle = true;
    isRectangle = false;
    isCircle = false;
    isPolygon = false;
    endPol.style.display = 'none';
    log.innerText = 'Click the canvas to start drawing a triangle';
});
    
rectangle.addEventListener('click', function(event){
    isRectangle = true;
    isCircle = false;
    isTriangle = false;
    isPolygon = false;
    endPol.style.display = 'none';
    log.innerText = 'Click the canvas to start drawing a rectangle';
});
    
circle.addEventListener('click', function(event){
    isCircle = true;
    isRectangle = false;
    isTriangle = false;
    isPolygon = false;
    endPol.style.display = 'none';
    log.innerText = 'Click the canvas to mark the middle point of the circle';
});
    
polygon.addEventListener('click', function(event){
    isCircle = false;
    isRectangle = false;
    isTriangle = false;
    isPolygon = true;
    endPol.style.display = 'inline';
    log.innerText = 'Click the canvas to start drawing a polygon';
});
    

    // Utför ritande av figurer
    
let clickCount = 0;
let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');  
c.strokeStyle = 'white';  
let objectList = []; // Lista med figurobjekt som kan exporteras med Json
let polAbort = false;

    // Funtioner för att skapa figurobjekt

function Rectangle(x1, y1, x2, y2, col){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.y3 = y1;
    this.x3 = x2;
    this.y4 = y2;
    this.x4 = x1;
    this.type = 'Rectangle';
    this.color = col;
};
    
function Triangle(x1, y1, x2, y2, x3, y3, col){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.type = 'Triangle';
    this.color = col;
};
    
function Circle(centerX, centerY, radius, col){
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.type = 'Circle';
    this.color = col;
};
    
function Polygon(points) {
	this.type = 'Polygon';
	this.punkter = [];
    for (let i = 0; i<points.length; i++){
        this.punkter.push(points[i]);
    }
};
    
    
    // Triangle-variabler
    
let triX1 = 0;
let triY1 = 0;
let triX2 = 0;
let triY2 = 0;
let triX3 = 0;
let triY3 = 0;
    

//Circle-varibaler
    
let cX1 = 0;
let cY1 = 0;
let cX2 = 0;
let cY2 = 0;
let cRadius = 0;
    

// Rectangle-variabler
    
let rX1 = 0;
let rY1 = 0;
let rX2 = 0;
let rY2 = 0;
//c.lineTo(50, 70);
//c.stroke();
    
    // Polygon-variabler

let pX1 = 0;
let pY1 = 0;
let pxTemp = 0;
let pyTemp = 0;
let cords = [];
//let tempCords = [];
    
    
// DISTANCE BETWEEN TWO POINTS

function distance(x1, x2, y1, y2){
	return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
}


    // Rita ut figurerna
   
canvas.addEventListener('mouseenter', function(event){
    if (isTriangle == true || isCircle == true || isPolygon == true || isRectangle == true){
        log.innerText = 'Click where you want your figure to start';
    }
    else {
        log.innerText = 'Choose what figure to use!';
    } 
});
    
canvas.addEventListener('click', function(event){
    if (isTriangle == true){
    let col = c.strokeStyle;
        if (clickCount === 0){
        c.beginPath();
        let r = event.target.getBoundingClientRect();
        triX1 = event.clientX - r.left;
        triY1 = event.clientY - r.top;
        c.moveTo(triX1, triY1);
        clickCount++;
        //log.innerText = objectList;
        log.innerText = 'Click a second time to mark the second corner';
            //console.log('objectList:' + objectList); 
      }
      else if (clickCount < 2){
            
        let r = event.target.getBoundingClientRect();
        triX2 = event.clientX - r.left;
        triY2 = event.clientY - r.top;
        c.lineTo(triX2, triY2);
        c.stroke();
        clickCount++;
        //log.innerText = event.clientX + ', '+ event.clientY + ' ClickCount: '+ clickCount;
          log.innerText = 'Complete the triangle by marking the third corner';
          //console.log('objectList:' + objectList);
      }
      else if (clickCount == 2) {
        let r = event.target.getBoundingClientRect();
        triX3 = event.clientX - r.left;
        triY3 = event.clientY - r.top;
        c.lineTo(triX3, triY3);
        c.closePath();
        c.stroke();
          let fig = new Triangle(triX1, triY1, triX2, triY2, triX3, triY3, col);
          objectList.push(fig);
        clickCount = 0;
      log.innerText = 'Choose a different figure or make another triangle!';
          //console.log('objectList:' + objectList);
      }
  
    }
    else if (isCircle == true){
        let col = c.strokeStyle;
        if (clickCount == 0){
            c.beginPath();
            let r = event.target.getBoundingClientRect();
            cX1 = event.clientX - r.left;
            cY1 = event.clientY - r.top;
            clickCount++;
            log.innerText = 'Click to mark where the radius ends';
            //console.log('objectList:' + objectList);
        }
        else if (clickCount < 2){
            let r = event.target.getBoundingClientRect();
            cX2 = event.clientX - r.left;
            cY2 = event.clientY - r.top;
            let radius = distance(cX1, cX2, cY1, cY2);
            c.arc(cX1, cY1, radius, 0, 2*Math.PI); // Formel för cirkel
            c.stroke();
            log.innerText = cX1 + ', '+ cY1;
            clickCount = 0;
            let fig = new Circle(cX1, cY1, radius, col);
            objectList.push(fig);
            log.innerText = 'Choose a different figure or make another circle!';
            //console.log('objectList:' + objectList);
        }
    }
    else if (isRectangle == true){
        let col = c.strokeStyle;
        if (clickCount == 0){
           c.beginPath();
            let r = event.target.getBoundingClientRect();
            rX1 = event.clientX - r.left;
            rY1 = event.clientY - r.top; 
            clickCount++;
            console.log('objectList:' + objectList);
            log.innerText = 'Complete the rectangle by marking the opposite corner';
        }
        else if (clickCount < 2){
            let r = event.target.getBoundingClientRect();
            rX2 = event.clientX - r.left;
            rY2 = event.clientY - r.top;
            let minX = Math.min(rX1, rX2);
            let minY = Math.min(rY1, rY2);
            let width = distance(rX1, rX2, rY1, rY1);
            let height = distance(rX2, rX2, rY2, rY1);
            c.strokeRect(minX, minY, width, height);
            //log.innerText = cX1 + ', '+ cY1;
            clickCount = 0;
            let fig = new Rectangle(rX1, rY1, rX2, rY2, col);
            objectList.push(fig);
            log.innerText = 'Choose a different figure or make another rectangle!';
            console.log('objectList:' + objectList);
        }
    }
    else if (isPolygon == true){
        if(clickCount == 0){
            c.beginPath();
            //console.log('cords');
            //console.log(cords);
            
            let r = event.target.getBoundingClientRect();
            pX1 = event.clientX - r.left;
            pY1 = event.clientY - r.top;
            c.moveTo(pX1, pY1);
            cords.push({x: pX1, y: pY1});
            
            clickCount++;
            log.innerText = 'Add another corner or click the end button';
        }
        else if (clickCount > 0 && polAbort == false){
            //console.log('another click');
            let r = event.target.getBoundingClientRect();
            pxTemp = event.clientX - r.left;
            pyTemp = event.clientY - r.top;
            c.lineTo(pxTemp, pyTemp);
            c.stroke();
            cords.push({x: pxTemp, y: pyTemp});
            
            clickCount++;
            log.innerText = 'Add another corner or click the end button';
        }
        
    }
  
});
    
    
    // Avslutar polygonen
    
endPol.addEventListener('click', function(event){
    polAbort = true;
    c.closePath();
    c.stroke();
    let fig = new Polygon(cords);
    let col = c.strokeStyle;
    fig.color = col;
    objectList.push(fig);
    clickCount = 0;
    cords = [];
    //console.log('slutför objekt-cords');
    //console.log(cords);
    polAbort = false;
    log.innerText = 'Choose a different figure or make another polygon!';
    //console.log(objectList);
})    
    



// VÄLJ FÄRG

white.addEventListener('click', function(event){
    c.strokeStyle = 'white';
    log.innerText = 'Selected color is white';
});

blue.addEventListener('click', function(event){
    c.strokeStyle = 'blue';
    log.innerText = 'Selected color is blue';
});

crimson.addEventListener('click', function(event){
    c.strokeStyle = 'crimson';
    log.innerText = 'Selected color is crimson';
});

    
color.addEventListener('click', function(event){
  if (colorCont.style.display == 'none'){
    colorCont.style.display = 'inline';
      log.innerText = 'Choose what color to draw with';
  }
  else if (cont.style.display == 'none'){
    colorCont.style.display = 'none';
  }
  else {
    colorCont.style.display = 'none';
  }
  
});


submitColor.addEventListener('click', function(event){
  log.innerText = 'Nice color dude!';
  submitColor.disabled = false;
  if (isHex(addColor.value)){
    c.strokeStyle = addColor.value;
  }
  else {
    //addColor.value = 'NOT VALID HEX CODE';
    submitColor.disabled = true;
  }
})

addColor.addEventListener('keyup', function(event){
  //console.log(addColor.value.length + addColor.value);
  submitColor.disabled = true;
  if (isHex(addColor.value)){
    submitColor.disabled = false;
    log.innerText = 'Add color by clicking the button';
  }
  else {
    //addColor.value = 'NOT VALID HEX CODE';
    submitColor.disabled = true;
    log.innerText = 'Entered code is not valid!';
  }
})


// Undersöker om valid HEX-kod.
function isHex(str){
  let inv = 'ghijklmnopqrstuvxyzåäö';
  lowstr = str.toLowerCase();
    //console.log(lowstr.length);
    for (let i = 0; i < inv.length; i++){
      if (lowstr.indexOf(inv.charAt(i)) > -1){
        return false;
      }
    }
  if (lowstr.charAt(0) !== '#' || lowstr.length > 7){
    return false;
  }
  else {
  return true;
  }
  
  
}
   
    
    
// CLEAR & ABORT
    
clear.addEventListener('click', function(event){
    c.clearRect(0, 0, canvas.width, canvas.height)
    objectList = [];
    cords = [];
    
    log.innerText = objectList;
    clickCount = 0;
    log.innerText = 'Get back to drawing mate!';
});
    

abort.addEventListener('click', function(event){
    c.closePath();
    c.stroke();
    clickCount = 0;
    cords = [];
    //console.log('cords abort');
    //console.log("cords har längden ", cords.length, ' och är: ', cords);
    //console.log(tempCords);
    c.clearRect(0, 0, canvas.width, canvas.height)
    log.innerText = 'Get back to drawing mate!';
    //console.log(c);
    
    
    for (let i = 0; i < objectList.length; i++){
        
        //console.log(objectList[i]);
        let x = objectList[i];
        let p = x.punkter; // p = lista med kordinat-objekt, x = objekt
        //console.log(p);
        if (x.type == 'Triangle'){
            c.strokeStyle = x.color;
            c.beginPath();
            c.moveTo(x.x1, x.y1);
            c.lineTo(x.x2, x.y2);
            c.lineTo(x.x3, x.y3);
            c.closePath();
            c.stroke();
            clickCount = 0;
        }
        else if (x.type == 'Circle'){
            c.strokeStyle = x.color;
            c.beginPath();
            c.arc(x.x, x.y, x.radius, 0, 2*Math.PI); // Formel för cirkel
            c.stroke();
            clickCount = 0;
        }
        else if (x.type == 'Rectangle'){
            c.strokeStyle = x.color;
            c.beginPath();
            let minX = Math.min(x.x1, x.x2);
            let minY = Math.min(x.y1, x.y2);
            let width = distance(x.x1, x.x2, x.y1, x.y1);
            let height = distance(x.x2, x.x2, x.y2, x.y1);
            c.strokeRect(minX, minY, width, height);
            let fig = new Rectangle(x.x1, x.y1, x.x2, x.y2);
            //objectList.push(fig);
            clickCount = 0;
        }
        else if (x.type = 'Polygon'){
            //console.log('xtype: ' + x.type +' ,i: '+ i);
            c.strokeStyle = x.color;
            
            
            c.beginPath();
            //console.log('p0x: ' + p[0].x + ' ,p0y: ' + p[0].y);
            c.moveTo(p[0].x, p[0].y);
            
            //console.log('x:' + x);
            //console.log('p[0]:' + p[0].x);
            //console.log('cords:' + cords);
            //console.log('objectlist:' + objectList);
            for (let j = 0; j < p.length; j++){
                //console.log('cords loop');
                //console.log(cords);
                let pj = p[j];
                c.lineTo(pj.x, pj.y);
                //tempCords.push({x: pj.x, y: pj.y});
                
                //console.log('pjx: ' + p[j].x + ', pjy: ' + p[j].y + ', j: ' + j);
                
            }
            c.closePath();
            c.stroke();
            //console.log('p efter sista loop:' + p);
            
            
            //let fig = new Polygon(tempCords);
            
            //fig.color = c.strokeStyle;
            //console.log(cords);
            //objectList.push(fig);
            //console.log(objectList);
        }
    }
    
});
    
    
    
// JSON

    let isExport = false;
    let isImport = false;
    submitJson.style.display = 'none';
    
exportJson.addEventListener('click', function(event){
    
    jsonText.style.display = 'block';
    jsonText.placeholder = "Your code will appear hear...";
    //jsonText.innerText = 'Hey';
    log.innerText = objectList;
    submitJson.style.display = 'block';
    submitJson.value = 'Get your drawings!';
    isExport = true;
    isImport = false;
    //console.log('isExport:' + isExport);
    //console.log('objectList:' + objectList);
    log.innerText = 'Click the button to get your code!';
});

    
importJson.addEventListener('click', function(event){
    jsonText.style.display = 'block';
    jsonText.value = "";
    jsonText.placeholder = "Your JSON code here...";
    submitJson.style.display = 'block';
    submitJson.value = 'Add your drawings!';
    isExport = false;
    isImport = true;
    log.innerText = 'Paste the code to import your work!';
    
});
    
    
submitJson.addEventListener('click', function(event){
    //console.log('objectList:' + objectList);
    
    if (isExport == true){
        log.innerText = objectList;
        let expList = JSON.stringify(objectList);
        jsonText.value = expList;
        log.innerText = 'There is your code pal!';
        
    }
    else if (isImport == true){
        let tempCords = [];
        //console.log('tempCords');
        //console.log(tempCords);
        let impList = JSON.parse(jsonText.value);
        for (let i = 0; i < impList.length; i++){
            let x = impList[i];
            if (x.type == 'Triangle'){
            c.strokeStyle = x.color;
            c.beginPath();
            c.moveTo(x.x1, x.y1);
            c.lineTo(x.x2, x.y2);
            c.lineTo(x.x3, x.y3);
            c.closePath();
            c.stroke();
            let fig = new Triangle(x.x1, x.y1, x.x2, x.y2, x.x3, x.y3, x.color);
          objectList.push(fig);
            clickCount = 0;
        }
        else if (x.type == 'Circle'){
            c.strokeStyle = x.color;
            c.beginPath();
            c.arc(x.x, x.y, x.radius, 0, 2*Math.PI); // Formel för cirkel
            c.stroke();
            let fig = new Circle(x.x, x.y, x.radius, x.color);
            objectList.push(fig);
            clickCount = 0;
        }
        else if (x.type == 'Rectangle'){
            c.strokeStyle = x.color;
            c.beginPath();
            let minX = Math.min(x.x1, x.x2);
            let minY = Math.min(x.y1, x.y2);
            let width = distance(x.x1, x.x2, x.y1, x.y1);
            let height = distance(x.x2, x.x2, x.y2, x.y1);
            c.strokeRect(minX, minY, width, height);
            let fig = new Rectangle(x.x1, x.y1, x.x2, x.y2, x.color);
            objectList.push(fig);
            clickCount = 0;
        }
        else if (x.type == 'Polygon'){
            //console.log('DEBUG cords: '+cords.length, cords)
            //cords = [];
            //console.log('DEBUG cords: '+cords.length, cords)
            //console.log('EMPTY: '+[].length, [])
            
            c.strokeStyle = x.color;
            let p = x.punkter;
            c.beginPath();
            c.moveTo(p[0].x, p[0].y);
            //console.log('x:' + x);
            //console.log('p[0]:' + p[0].x);
            //console.log('cords:' + cords);
            //console.log('objectlist:' + objectList);
            for (let j = 0; j < p.length; j++){
                let pj = p[j];
                c.lineTo(pj.x, pj.y);
                tempCords.push({x: pj.x, y: pj.y});
                
            }
            c.closePath();
            c.stroke();
            
            
            let fig = new Polygon(tempCords);
            let col = c.strokeStyle;
            fig.color = col;
            objectList.push(fig);
            tempCords = [];
            //console.log('fig:' +fig);
        }
        }
        jsonText.value = '';
        log.innerText = 'Nice work!';
    }
});
    
    
}


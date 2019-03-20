let c = document.querySelector("#main"); //getting canvas
let ctx = c.getContext("2d"); //getcontext from canvas


// arrays to keep pixels values
let pixelOriginal; 
let pixelChange;

//img object
let image = new Image();
image.src = "./853.jpg";   

//change image onLoad
image.addEventListener('load', function () {
    ctx.drawImage(image, 0,0); //drawing image in canvas
    pixelOriginal = ctx.getImageData(0, 0, c.width, c.height); //get image pixels
});


// contrast function
function contrast() {
    pixelOriginal = ctx.getImageData(0, 0, c.width, c.height); 
    pixelChange = ctx.getImageData(0, 0, c.width, c.height);

    let cv = parseFloat(document.querySelector("#contrastIp").value); //get value from input 
    let f = (259 * (cv + 255)) / (255 * (259 - cv)); //factor 

    for(let i=0; i < pixelChange.data.length; i+=4) {  //loop through all pixels on image 
        pixelChange.data[i] = truncate((f*pixelOriginal.data[i]-128) + 128); 
        pixelChange.data[i+1] = truncate((f*pixelOriginal.data[i+1]-128) + 128);
        pixelChange.data[i+2] = truncate((f*pixelOriginal.data[i+2]-128) + 128);
        pixelChange.data[i+3] = 255;
    }
    console.log(f);
    ctx.putImageData(pixelChange, 0,0); //insert changed pixels to canvas
}

// brightness function
function brightness() {
    pixelOriginal = ctx.getImageData(0, 0, c.width, c.height); 
    pixelChange = ctx.getImageData(0, 0, c.width, c.height);

    let b = parseFloat(document.querySelector("#brightnessIp").value); //get value from input 

    for(let i=0; i < pixelChange.data.length; i+=4) {  //loop through all pixels on image 
        pixelChange.data[i] = pixelOriginal.data[i]-b; 
        pixelChange.data[i+1] = pixelOriginal.data[i+1]-b; 
        pixelChange.data[i+2] = pixelOriginal.data[i+2]-b; 

    }

    ctx.putImageData(pixelChange, 0,0); //insert changed pixels to canvas
}

function truncate(value) { 
    if(value < 0) value = 0;
    else if(value > 255) value = 255;

    return value;
}
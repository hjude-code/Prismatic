let prism
let randomImage

let values = {
  offset:0.5,
  speed:0,
  gap:0
}

function preload(){
  randomImage = loadImage("../Resources/Assets/gerbera-8220025_1920.jpg")
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  
  prism = new cell({
    image:randomImage
  })
  
  let gui = new dat.GUI()
  let cellControls = gui.addFolder("Cell")
  cellControls.add(values, "offset", -1, 1)
  cellControls.add(values, "speed", -1, 1)
  cellControls.add(values, "gap", 0, 1).onChange(()=>{prism.updateGraphic(values.gap)})
 
  prism.createGraphic()
  prism.createCell()
  prism.positionCellGraphic(0.5)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  background(150)
  

  
  prism.positionCellGraphic(values.offset)
  prism.drawCell()
  
  values.offset += 0.1 * values.speed
  
  if(values.offset > 1 || values.offset < -1){
    values.offset = 0
  }

  
}
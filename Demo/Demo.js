let prism
let randomImage

let values = {
  offset:0.5,
  speed:0,
  gap:0,
  posX:0,
  posY:0,
  size:window.innerWidth/2,
  angleTop:0,
  angleBottom:0
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
  cellControls.add(values, "posX", -windowWidth, windowWidth)
  cellControls.add(values, "posY", 0, windowHeight)
  cellControls.add(values, "size", 10, windowWidth)
  cellControls.add(values, "gap", 0, 1).onChange(()=>{prism.updateGraphic(values.gap)})
  cellControls.add(values, "angleTop", -45, 45).onChange(()=>{prism.updateGraphic(values.gap)}).onChange(()=>{
    prism.setClipMask(values.angleTop, values.angleBottom)
  })
  cellControls.add(values, "angleBottom", -45, 45).onChange(()=>{prism.updateGraphic(values.gap)}).onChange(()=>{
    prism.setClipMask(values.angleTop, values.angleBottom)
  })
 
  prism.createGraphic()
  prism.createCell()
  prism.positionCellGraphic(0.5)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  clear()
  
  prism.positionCellGraphic(values.offset)
  prism.drawCell({
        position:{
            x:values.posX,
            y:values.posY
        },
        size:{
            w:values.size
        }

    })

    
  
  values.offset += 0.1 * values.speed
  
  if(values.offset > 1 || values.offset < -1){
    values.offset = 0
  }

}
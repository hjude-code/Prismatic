let testCell
let testPrism
let randomImage

let values = {
  offset:0.5,
  speed:0,
  gap:0,
  posX:0,
  posY:0,
  size:window.innerWidth/2,
  angleTop:0,
  angleBottom:0,
  timeOffset:0
}

function preload(){
  randomImage = loadImage("../Resources/Assets/gerbera-8220025_1920.jpg")
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  
  testCell = new cell({
    image:randomImage
  })

  testPrism = new prism()
  testPrism.build({
    image:randomImage
  })
  
  let gui = new dat.GUI()
  let cellControls = gui.addFolder("Cell")
  cellControls.add(values, "offset", -1, 1)
  cellControls.add(values, "speed", -1, 1)
  cellControls.add(values, "posX", -windowWidth, windowWidth)
  cellControls.add(values, "posY", 0, windowHeight)
  cellControls.add(values, "size", 10, windowWidth)
  cellControls.add(values, "gap", 0, 1).onChange(()=>{testCell.updateGraphic(values.gap)})
  cellControls.add(values, "angleTop", -45, 45).onChange(()=>{testCell.updateGraphic(values.gap)})
  cellControls.add(values, "angleBottom", -45, 45).onChange(()=>{testCell.updateGraphic(values.gap)})

  let prismControls = gui.addFolder("Prism")
  prismControls.add(values, "timeOffset", -2, 2)
 
  testCell.createGraphic()
  testCell.createCell()
  testCell.positionCellGraphic(0.5)

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  clear()
  
//   testCell.drawCell({
//         position:{
//             x:values.posX,
//             y:values.posY
//         },
//         size:{
//             w:values.size
//         },
//         clip:{
//             top:values.angleTop,
//             bottom:values.angleBottom
//         },
//         offset:values.offset

//     })

    testPrism.drawPrism({
        position:{
            x:values.posX,
            y:values.posY
        },
        size:{
            w:values.size
        },
        offset:values.offset,
        gap:values.gap,
        timeOffset:values.timeOffset
    })
  
  values.offset += 0.1 * values.speed
  
  if(values.offset > 1 || values.offset < -1){
    values.offset = 0
  }

}
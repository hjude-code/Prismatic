class cell{
    constructor({
      image,
      gapPercent = 0.1,
      size = [100],
      position=[100,100]
    } = {}){
      this.image = image
      this.gapPercent = gapPercent
      this.gap
      this.GraphicRowHeight
      this.aspectRatio
      this.graphic
      this.cell
    }
    
    createGraphic(){
      this.graphic = createGraphics(0,0)
      this.graphic.resizeCanvas(this.image.width, this.image.height*2)
      
      this.setGap(this.gapPercent)
      
      this.graphic.image(this.image, 0, 0)
      this.graphic.image(this.image, 0, this.graphicRowHeight)
    }
    
    setGap(gapPercent){
      this.gap = this.image.height*gapPercent
      this.graphicRowHeight = this.image.height + this.gap
    }
    
    updateGraphic(gapPercent){
      
      this.setGap(gapPercent)
      this.graphic.clear()
      this.graphic.image(this.image, 0, 0)
      this.graphic.image(this.image, 0, this.graphicRowHeight)
    }
    
    
  
    createCell(){
      this.cell = createGraphics(this.image.width, this.image.height)
      this.cell.image(this.graphic, 0, 0)

      this.aspectRatio = this.image.height/this.image.width
      console.log(this.aspectRatio)
    }
    
    positionCellGraphic(offset = 0.5){
      
      offset = (offset%11)
  
      let graphicX = 0
      
      if(offset<=0){
        graphicX = lerp(-this.image.height, this.gap, Math.abs(offset))
      }
      if(offset>0){
        graphicX = lerp(this.gap, -this.image.height, offset)
      }
      
      this.cell.clear()
      this.cell.image(this.graphic, 0, graphicX);
    }
    
    drawCell(x=0, y=0, size=100){

      let w
      let h

      if(typeof size == "number"){
        w = size
        h = w*this.aspectRatio
      }else if(size.length == 1){
        w = size[0]
        h = w*this.aspectRatio
      }else if(size.length == 2){
        w = size[0]
        h = size[1]
      }

      image(this.cell, x, y, w, h)
    }
  }
  
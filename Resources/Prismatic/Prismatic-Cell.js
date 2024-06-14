class cell{
    constructor({
      image,
      gapPercent = 0
    } = {}){
      this.image = image
      this.gapPercent = gapPercent
      this.gap
      this.GraphicRowHeight
      this.aspectRatio
      this.graphic
      this.cell
      this.size = {}
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

      this.setSize(this.image.width, this.image.height)

      
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

    setSize(width, height){
      
      if(width && height){
        this.size.w = width
        this.size.h = height
      }

      if(width && !height){
        this.size.w = width
        this.size.h = this.size.w*this.aspectRatio
      }
    }
    
    drawCell({
      position={x:0, y:0}, size={w:10}
    }){

      this.setSize(size.w, size.h)

      image(this.cell, position.x, position.y, this.size.w, this.size.h)
    }
  }
  
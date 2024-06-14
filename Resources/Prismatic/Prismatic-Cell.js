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
      this.clipMask
      this.angleTop = 0
      this.angleBottom = 0
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

      this.setSize(this.image.width, this.image.height)
      this.setClipMask()
      
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
      this.applyClipMask()
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

    calculatePeakLength(angle){
      let b = this.image.width
      let radians = angle * Math.PI / 180
      let sinA = Math.sin(radians)
      return b * sinA
    }

    setClipMask(angleTop, angleBottom){
      this.angleTop = angleTop
      this.angleBottom = angleBottom

      this.clipMask = {
        ceiling:{
          yMin:0,
          yMax:this.calculatePeakLength(Math.abs(this.angleTop))
        },
        floor:{
          yMin:this.image.height,
          yMax:this.image.height - this.calculatePeakLength(Math.abs(this.angleBottom)),
        }
      }

      if(this.angleTop < 0){
        this.clipMask.ceiling.x1 = 0
        this.clipMask.ceiling.x2 = this.image.width
      }else{
        this.clipMask.ceiling.x1 = this.image.width
        this.clipMask.ceiling.x2 = 0
      }
      if(this.angleBottom > 0){
        this.clipMask.floor.x1 = 0
        this.clipMask.floor.x2 = this.image.width
      }else{
        this.clipMask.floor.x1 = this.image.width
        this.clipMask.floor.x2 = 0
      }
    }  
    applyClipMask() {


        this.cell.erase()

          //clip ceiling
          this.cell.beginShape()
            this.cell.vertex(this.clipMask.ceiling.x1, this.clipMask.ceiling.yMin)
            this.cell.vertex(this.clipMask.ceiling.x2, this.clipMask.ceiling.yMin)
            this.cell.vertex(this.clipMask.ceiling.x2, this.clipMask.ceiling.yMax)
          this.cell.endShape(CLOSE)


        //clip floor
          this.cell.beginShape()
            this.cell.vertex(this.clipMask.floor.x1, this.clipMask.floor.yMin)
            this.cell.vertex(this.clipMask.floor.x2, this.clipMask.floor.yMin)
            this.cell.vertex(this.clipMask.floor.x2, this.clipMask.floor.yMax)
          this.cell.endShape(CLOSE)
        this.cell.noErase()

    }

    drawCell({
      position={x:0, y:0}, size, clip, offset, gap
    } = {}){

      if(size){
        this.setSize(size.w, size.h)
      }

      if(clip){
        this.setClipMask(clip.top, clip.bottom)
      }

      if(gap){
        this.updateGraphic(gap)
      }

      this.positionCellGraphic(offset)

      image(this.cell, position.x, position.y, this.size.w, this.size.h)
    }
  }
  
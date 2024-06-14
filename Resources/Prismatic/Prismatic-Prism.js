class prism {
    constructor({count=2} = {}){
        this.cell,
        this.count = count
    }

    build(cellParams){
        this.cell = new cell(cellParams)
        this.cell.createGraphic()
        this.cell.createCell()

        
    }

    drawPrism({
        position={x:0, y:0},
        size={w:100},
        offset,
        gap,
        timeOffset=0
    }={}){

        timeOffset = lerp(-1, 1, timeOffset)

        let cellParams = {
            position:position,
            size:size,
            offset:offset,
            gap:gap
        }

        for(let i = 0; i < this.count; i++){


            this.cell.drawCell(cellParams)

            cellParams.position.y += this.cell.size.h + (gap*this.cell.size.h)
            
            cellParams.offset += 0.1 * timeOffset
  
            if(cellParams.offset > 1 || cellParams.offset < -1){
                cellParams.offset = 0
            }
        }
    }
}
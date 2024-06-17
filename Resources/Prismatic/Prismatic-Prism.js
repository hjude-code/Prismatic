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

    setCount(newCount){
        this.count = Math.abs(newCount)
    }

    drawPrism({
        position={x:0, y:0},
        size={w:100},
        offset,
        gap,
        timeOffset=0,
        clip
    }={}){

        timeOffset = lerp(-1, 1, timeOffset)

        let cellParams = {
            position:position,
            size:size,
            offset:offset,
            gap:gap,
            clip:clip
        }

        for(let i = 0; i < this.count; i++){


            this.cell.drawCell(cellParams)

            cellParams.position.y += this.cell.size.h + (gap*this.cell.size.h)

            cellParams.offset += timeOffset
        }
    }
}
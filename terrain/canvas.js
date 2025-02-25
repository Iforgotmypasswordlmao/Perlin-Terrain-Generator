export class Canvas
{
    constructor(canvasHTMLElement, dimensions)
    {
        this.canvas = canvasHTMLElement;
        this.context = this.canvas.getContext('2d');
  
        this.pixel = {
            'height': this.canvas.height/dimensions['height'], 
            'width': this.canvas.width/dimensions['width']
        };
    };

    draw(x, y, colour)
    {
        this.context.fillStyle = colour;
        
        this.context.fillRect(
            x*this.pixel['width'],
            y*this.pixel['height'],
            this.pixel['width'],
            this.pixel['height']
        );
    };

    clear()
    {
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )
    }
};
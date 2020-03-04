class Canvas {

    constructor () {
        
        this.canvas=document.getElementById("signaturePad"); 
        this.initCanvas(); // allows to strat drawing on the canvas
        this.showCanvas(); // shows to canvas when clicking on continue
      
    }

    showCanvas() {

        let form=document.getElementById("reservationForm"); // sets on local storage the name and last name submitted on the form when clicking on réserver Button
        form.addEventListener("submit", () => {
        
            localStorage.setItem("lastName", form.elements.lastName.value);
            localStorage.setItem("firstName", form.elements.firstName.value);
           
        });

        let continueButton=document.getElementById("continue");
        continueButton.addEventListener("click", (e) => {
            this.canvas.style.display="block";
            e.preventDefault()
            // avoids the page from being refreshed when submitting the continue button
       
            this.canvas.addEventListener("click", () => { //shows the buttons to submit reseravtion or clear if the canvas is signed
                document.getElementById("submit").style.display="block";
                document.getElementById("clear").style.display="block";

            });    
            this.canvas.addEventListener("touchmove", () => { //shows the buttons to submit reseravtion or clear if the canvas is signed
                document.getElementById("submit").style.display="block";
                document.getElementById("clear").style.display="block";
            }); 

        });
            
   

       
        let clearButton=document.getElementById("clear"); 
        clearButton.addEventListener("click", (e) => {
            e.preventDefault() // avoids the page from being refreshed when submitting the clear button
        
        });


    }

    

    moveDrawLine = (event) => {
        let canvas=event.currentTarget, ctx= null, pos= null;
        if(!canvas.bDraw){
            return false;
        }
        //canvas proprieties
        pos=this.getPosition(event, canvas);
        ctx=canvas.getContext("2d");
        ctx.strokeStyle= "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.posX, canvas.posY);
        ctx.lineTo(pos.posX, pos.posY);
        ctx.stroke();
        
        canvas.posX = pos.posX;
        canvas.posY = pos.posY; 
    }
    
    getPosition(event, canvas){ // mouse position
        let Rect = canvas.getBoundingClientRect();
        let eventElt = event.changedTouches? event.changedTouches[0]:event;
        return {
            posX : (eventElt.clientX - Rect.left) / (Rect.right - Rect.left) * canvas.width,
            posY : (eventElt.clientY - Rect.top) / (Rect.bottom - Rect.top) * canvas.height
        };
    }

    downDrawLine = (event) => { 
        let pos=this.getPosition(event, this.canvas);
        this.canvas.posX=pos.posX;
        this.canvas.posY=pos.posY;
        this.canvas.bDraw=true; // allows to draw on the canvas
        this.canvas.addEventListener("mousemove",this.moveDrawLine); // when you move the mouse on the canvas to make the signature
        this.canvas.addEventListener("mouseup", this.upDrawLine); // when you unclink on the mouse to stop drawing the signature
        this.canvas.addEventListener("touchmove",this.moveDrawLine); 
        this.canvas.addEventListener("touchend", this.upDrawLine);
    }

    upDrawLine = (event) => {
        let canvas=event.currentTarget;
        canvas.bDraw=false; // stop the drawing on the canvas
    }

    initCanvas() {
        this.canvas.bDraw=false;
        this.canvas.addEventListener("mousedown",this.downDrawLine); //when you click on the canvas to start your signature
        this.canvas.addEventListener("touchstart", this.downDrawLine);
        this.clearCanvas();
    }  
    
    clearCanvas() {
        let elt = document.getElementById("clear");
        elt.addEventListener("click", () => {
            this.canvas.getContext("2d").clearRect(0, 0,this.canvas.width, this.canvas.height);
            document.getElementById("submit").style.display="none"; // makes the submition and clear  buttons desapear if the signature is erased
            document.getElementById("clear").style.display="none";
            
        });
        
    }
}

new Canvas();
    


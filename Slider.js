class Slider {
  
    constructor() {
        this.slideIndex=0; //Index of the first slide
        this.intervalId=setInterval(this.showSlides.bind(this), 5000); //makes the slides change every 5s
        this.showSlides(); //makes the slides appearone by one on the website
        this.nextSlide(); //when called goes to the next slide
        this.previousSlide(); //when called comes back to the previous slide
        this.pauseSlides(); //when called pauses the slide at the index that is showing
        this.playSlides(); //when called plays the slide from when it was stopped
        

    }

    showSlides() {
       let slides = document.getElementsByClassName("slide");
       for(let i=0; i<slides.length; i++) {
           slides[i].style.display="none"; //makes all slides desappear in order to make them appear one by one
       }
       this.slideIndex++; //makes the next slide appear
       if (this.slideIndex>slides.length) {
           this.slideIndex=1; //index of the last slide
        } 
       slides[this.slideIndex-1].style.display="block"; //makes the slide first slide appear in case we arrive at the last one
    }

    nextSlide() {
        const elt = document.getElementById("rightButton");
        elt.addEventListener("click", this.showSlides.bind(this));
        document.addEventListener("keydown", function(e){ 
            let x = e.keyCode;
            if (x===39) //right arrow on the keyboard
                this.showSlides();
            else if (x===37) //left arrow on the keyboard
                this.invertedShowSlides();

        }.bind(this));
 
    }

    invertedShowSlides() {
        let slides = document.getElementsByClassName("slide");
        for(let i=0; i<slides.length; i++) {
            slides[i].style.display="none";
        }
        this.slideIndex--; //shows previous slide
        if (this.slideIndex<=0) {
            this.slideIndex=slides.length
        }
        slides[this.slideIndex-1].style.display="block"; //makes the last slide appear in case we arrive at the first one
    }

    previousSlide() {
        const elt = document.getElementById("leftButton");
        elt.addEventListener("click", this.invertedShowSlides.bind(this));
        
    }

    pauseSlides() {
        const elt = document.getElementById("pauseButton"); 
        elt.addEventListener("click", this.stopSlides.bind(this)); 
    }

    stopSlides() {
        clearInterval(this.intervalId); //clearInterval pauses the setInterval 
        document.getElementById("pauseButton").style.display="none"; //changes the play/pause button
        document.getElementById("playButton").style.display="block";
    }

    playSlides() {
        const elt = document.getElementById("playButton");
        elt.addEventListener("click", this.unstopSlides.bind(this));
    }

    unstopSlides() {
        this.intervalId=setInterval(this.showSlides.bind(this), 5000); //reactivates the setInterval
        document.getElementById("playButton").style.display="none"; //changes the play/pause button
        document.getElementById("pauseButton").style.display="block";
    }
}

new Slider();



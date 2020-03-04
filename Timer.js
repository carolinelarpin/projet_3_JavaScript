class Timer {

    constructor() {
        this.timerInit(); //Start the timer at 20:00 by default
        this.intervalId;
        if (sessionStorage.getItem("timer") !== null) {
            this.intervalId=setInterval(this.startTimer, 1000); //set the decreasing time at 1s if the timer has already been started
        }
    }

    timerInit() {
        const elt = document.getElementById("submit"); //Shows the timer when cliking on Réserver button
        if(sessionStorage.getItem("stationName") !== null) {
            this.showStationAndClientInformation();
        }
        elt.addEventListener("click",this.showStationAndClientInformation); //shows the information stored : station name and name and last name of the person
        elt.addEventListener("click",this.initTimerTime); // start to decrease the time if the timer hasn't been started yet
        
    }

    showStationAndClientInformation() {
        let stationName = document.getElementsByClassName("stationName")[0];
        document.getElementsByClassName("stationName")[1].innerHTML= sessionStorage.getItem("stationName");
        if(sessionStorage.getItem("stationName") === null || stationName !== sessionStorage.getItem("stationName") && stationName.innerHTML !== "") {
            sessionStorage.setItem("stationName",  document.getElementsByClassName("stationName")[0].innerHTML); // set the station name on session storage
        }
        let stationNameSession=sessionStorage.getItem("stationName");
        document.getElementsByClassName("stationName")[1].value=stationNameSession;//shows the station name that has been selected
        document.getElementById("thirdSection").style.display="block";   //shows the whole timer section set in HTML file
        
        document.getElementsByClassName("lastName")[1].innerHTML=localStorage.getItem("lastName"); // get the name and last name from the local storage
        document.getElementsByClassName("firstName")[1].innerHTML=localStorage.getItem("firstName");
    }

    startTimer= () => {
        let presentTime = sessionStorage.getItem("timer"); //makes the timer start from when it was on session storage
        let timeArray = presentTime.split(/[":"]+/); //makes an array split in minutes and seconds
        let m=timeArray[0];
        let s= timeArray[1]-1;
        if (m==0 && s==0) {
            clearInterval(this.intervalId);
            document.getElementById("expirationOfRevervation").style.display="block"; // makes the sentence letting know that the reservation is expired
            document.getElementById("thirdSection").style.display="none"; // makes desapear the timer section
            sessionStorage.clear(); 
        }
        else if (s<0) {
            s = 59;
            m=m-1; 
        }
        else if (s < 10 && s >= 0) {
            s = "0" + s; // makes that all seconds will always have 2 numbers , as an example : 02s instead of 2s
        }
            
        document.getElementById("timerTime").innerHTML=m+":"+s;  
        sessionStorage.setItem("timer", document.getElementById("timerTime").innerHTML); 
        let timer=sessionStorage.getItem("timer");
        document.getElementById("timerTime").innerHTML=timer;
    }

    initTimerTime= () => {
        document.getElementById("timerTime").innerHTML= 20 + ":" + "0"+0o0; 
        sessionStorage.setItem("timer", document.getElementById("timerTime").innerHTML);
        
    }
    
}

new Timer ();
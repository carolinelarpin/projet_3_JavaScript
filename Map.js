class Map {

    constructor() {
        this.mymap=this.showMap(); //Allows to show the map from leaflet
        this.showMapData(); // Allows to show the map data from JC Decaux
       
        
    }

    showMap() {
        let mymap = L.map('mapid').setView([49.441317,1.0560683], 13); // Zooms the map on Rouen City
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1Ijoia3Jvb2xpbmUiLCJhIjoiY2s0MDVlMjVoMDBjZzNscnp1YjJ5bHRzeSJ9.AIFKhbO_Kzm7k81Zg4jIBA'
        }).addTo(mymap);
        return mymap;
    }

    async getMapData() { // Allows to get the map data from JC Decaux API 
        let response = await fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=rouen&apiKey=9b56c2906db218a034e6bf804aafbe28b5f96d21`);
        let data = await response.json();
        return data;
    }

    async showMapData() {
        
        let stations=await this.getMapData();
        for (let station of stations){ //including the differents markers for diferents situations on the station
            let greenMarker= L.icon ({iconUrl: "leaflet-color-markers-master/img/marker-icon-green.png"}),
            orangeMarker = L.icon({iconUrl: "leaflet-color-markers-master/img/marker-icon-orange.png"}),
            redMarker =  L.icon({iconUrl: "leaflet-color-markers-master/img/marker-icon-red.png"}),
            blackMarker = L.icon ({iconUrl: "leaflet-color-markers-master/img/marker-icon-black.png"});
            let marker;
            if(station.available_bikes>1){
                marker = L.marker([station.position.lat, station.position.lng], {icon: greenMarker}).addTo(this.mymap);
            
            } else if (station.available_bikes===1){
                marker = L.marker([station.position.lat, station.position.lng], {icon: orangeMarker}).addTo(this.mymap);
            
            } else if (station.available_bikes===0 || station.status==="CLOSED"){
                marker = L.marker([station.position.lat, station.position.lng], {icon: redMarker}).addTo(this.mymap); 
            
            } else if (station.available_bikes_stands===0){
                marker = L.marker([station.position.lat, station.position.lng], {icon: blackMarker}).addTo(this.mymap);
                    
            }

            marker.addEventListener("click", function() {
                let popup = L.popup();
                popup.setContent("Bienvenue à la station " + station.name);
                marker.bindPopup(popup).openPopup();
                document.getElementsByClassName("stationName")[0].innerHTML= station.name; //information on the station that is shown on the website
                document.getElementById("stationAddress").innerHTML= station.address;
                document.getElementById("availableBikeStands").innerHTML= station.available_bike_stands;
                document.getElementById("availableBikes").innerHTML= station.available_bikes;
                let formElements = document.getElementsByClassName("formText");  // makes the first part of the form appear
                for(let i=0; i<=formElements.length-1; i++) {
                    formElements[i].style.display="block";

                }

                document.getElementsByClassName("formSubmit")[0].style.display="block";

                if (localStorage.getItem("lastName") !== null){ // gets from the localStorage the name and last name submitted on a previous connection to the page
                    document.getElementsByClassName("lastName")[0].value=localStorage.getItem("lastName");
                }
                if (localStorage.getItem("firstName") !== null){
                    document.getElementsByClassName("firstName")[0].value=localStorage.getItem("firstName");
                }
                
                
            
            }); 
        }
    }       
}

new Map();


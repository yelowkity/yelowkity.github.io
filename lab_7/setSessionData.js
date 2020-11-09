const main = document.getElementById("main");
const inputBox = document.getElementById('busroute');

function getBusRoute() {
  let busRoute = inputBox.value; // Your code here

  if ((typeof busRoute !== "undefined") & (busRoute !== "")) {

   

    //add in the bus route to the url
    let found = false;
    fetch("js/routes.json")
      .then((response) => {
        return response.json();
      })
      .then((route) => {
        const routes = route.routes;
        for (let x=0; x<routes.length; x++){
          if (routes[x].id == busRoute){
            //get the lat, long
            const bounds = routes[x]['bounds'];
            sessionStorage.setItem('title', routes[x]['long_name']);
            sessionStorage.setItem('lat_max', bounds[0]);
            sessionStorage.setItem('lat_min', bounds[1]);
            sessionStorage.setItem('lon_max', bounds[2]);
            sessionStorage.setItem('lon_min', bounds[3]);
            console.log('found and saved info')
            found = true;
          }

          main.innerHTML = "Valid bus route found!";
        }
        if (found == false){
          main.innerHTML = "Invalid bus route";
        }
      })
      .catch((err) => {
        console.log(err);
        main.innerHTML = "Invalid bus route";
      });
  } else {
    main.innerHTML = "No value provided";
  }
}

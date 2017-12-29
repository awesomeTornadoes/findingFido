/***************************************
 * We'll have to find a way to get this whole HTML into the page, or
 * call this function in the HTML. I'm not sure how to do it in just
 * the javascript side.
 * Here's the general idea of what I was thinking:
 * We'll only have one location loaded at a time
 * When you hover over one of the options on the list, it loads the map for that location
 * So we'll have to change the center of the circle based on what we pull from the database
 **************************************/

// <!DOCTYPE html>
//   <html>
//   <head>
//     <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
//     <meta charset="utf-8">
//     <title>Circles</title>
//     <style>
//     #map {
//       height: 100%;
//     }

//     html,
//     body {
//       height: 100%;
//       margin: 0;
//       padding: 0;
//     }
//     </style>
//   </head>
//   <body>
//     <div id="map"></div>
//       <script>
        // Idea: Render this in the page within a component that has a "location" key
        const NOLA = {lat: 29.9699644, lng: -90.1139725 };
        function initMap() {
          // Create the map.
          const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: NOLA,
            mapTypeId: 'terrain',
          });

        // Create the circle
        const circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map,
          center: NOLA,
          radius: 500,
        });
      };   
//     </script>
//     <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTNJqnyPGnW1OLfIN_0-Wopw8X3jcoOo&callback=initMap">
//     </script>
//   </body>
// </html>

/**
 * Groups music tracks by year and returns sorted titles
 * @param {Array} tracks - Array of track objects
 * @returns {Object} - Object with years as keys and sorted title arrays as values
 */
function getMusicTitlesByYear(tracks) {
    // Your implementation here
    //create object
    if(tracks.length == 0){
        const myObject = {};
        return myObject;
    }
    const myObject = {};
    //for loop to add element to an object
    //for loop to iterate trough an array(tracks) to check the objects
    //objects with the same key are added to one array
    for(let i = 0; i < tracks.length; i++){
        if(typeof tracks[i].year != "number" && tracks[i].year==null) {
            continue;
        }  
        //create new key and value 
        const dynamicKey = tracks[i].year; // A new or existing key
        const newElement = tracks.title;

        // Ensure the property is an array (or initialize as a new array) and push the element
        myObject[dynamicKey] = myObject[dynamicKey] || [];
        myObject[dynamicKey].push(newElement);
        myObject[dynamicKey].sort();
        
    }

    return myObject;
}

/**
 * Filters tracks by criteria and adds decade information
 * @param {Array} tracks - Array of track objects
 * @param {Object} criteria - Filter criteria (minYear, maxYear, artist)
 * @returns {Array} - Filtered and transformed track objects
 */
function filterAndTransformTracks(tracks, criteria) {
    // Your implementation here
    //create array for adding filtered objects
    const arr = [];
    //array.push(object) is adding an object to the array
    //filter by artist, minYear, maxYear, minYear and maxYear, minYear and artist, maxYear and artist, no criteria

    // get the decade
function getDecade(date) {
  // Get the full 4-digit year (e.g., 2025)
  
  // Calculate the start year of the decade (e.g., 2020)
  // Math.floor(2025 / 10) * 10 = 2020
  const decadeStartYear = Math.floor(date / 10) * 10;
  
  // Optionally, return a formatted string like "2020s"
  return decadeStartYear; 
}



    const objectLength = Object.keys(criteria).length;


    //Identification of artist, minYear, maxYear, minMaxyear, artist and minyear, artist and maxYear
const l = tracks.length;
       //no criteria
       // add decades
       if(objectLength == 0){

        for(let i = 0; i < l; i++){
            tracks[i].decade = getDecade(tracks[i].year);
            arr.push(tracks[i]);
        }
        return arr;
      }
      // by artist
      else if('artist' in criteria&&objectLength==1){
        for(let i = 0 ; i < l; i++){
        if(criteria.artist.toLowerCase() == tracks[i].artist.toLowerCase()){
            tracks[i].decade  = getDecade(tracks[i].year);
            arr.push(tracks[i]);
        }
        }
        return arr;

      }
      // by minyear
      else if('minYear' in criteria && objectLength==1){
        for(let i =0; i < l; i++){
            if(criteria.minYear <= tracks[i].year){
                tracks[i].decade = getDecade(tracks[i].year);
                arr.push(tracks[i]);
            }

        }
        return arr;
      }
      // by maxyear
      else if('maxYear' in criteria&&objectLength==1){
                for(let i =0; i < l; i++){
            if(criteria.maxYear>=tracks[i].year){
                tracks[i].decade = getDecade(tracks[i].year);
                arr.push(tracks[i]);
            }

        }
        return arr;
      }
      //by minmaxyear
      else if('minYear' in criteria && 'maxYear' in criteria){
                for(let i =0; i < l; i++){
            if((tracks[i].year>=criteria.minYear) && (tracks[i].year<=criteria.maxYear)){
                tracks[i].decade = getDecade(tracks[i].year);
                arr.push(tracks[i]);
            }

        }
        return arr;
      }
      else if('minYear' in criteria&& 'artist' in criteria){
                for(let i =0; i < l; i++){
            if(criteria.minYear<=tracks[i].year&&criteria.artist.toLowerCase() == tracks[i].artist.toLowerCase()){
                tracks[i].decade = getDecade(tracks[i].year);
                arr.push(tracks[i]);
            }

        }
        return arr;
        //by min year and artist
      }
      else if('maxYear' in criteria&& 'artist' in criteria)
      {
        //by maxyear and artist
                for(let i =0; i < l; i++){
            if(criteria.maxYear>=tracks[i].year&&criteria.artist.toLowerCase() == tracks[i].artist.toLowerCase()){
                tracks[i].decade = getDecade(tracks[i].year);
                arr.push(tracks[i]);
            }

        }
        return arr;

      }


}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};
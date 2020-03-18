/*
https://www.youtube.com/channel/UC8p19gUXJYTsUPEpusHgteQ/featured
https://www.chicagocomputerclasses.com/youtube-learn-google-spreadsheets/

How to install:
https://youtu.be/93JfUPdnLhE

Dependencies:
https://github.com/agershun/alasql
*/
function SUPERSQL(sqlAsString,dataAsArray1,...dataAsArrays) {
  
  let sqlData = [arrayToObjectOfArrays(dataAsArray1)];
  
  // If range/array convert to array of objects otherwise keep as is 
  dataAsArrays.forEach(ar => Array.isArray(ar) ? sqlData.push(arrayToObjectOfArrays(ar)) : sqlData.push(ar));
  
  let res = alasql(sqlAsString,sqlData);
    
  if(res.length === 0){
     // Check if results exist and return error if no results were found.
     throw new Error("Statement Returns No Results");
  } else {
    // Return the array of results
    
    //create unique list of columns ans tore in keysArray variable
    let keys = new Set();
    res.forEach(r => Object.keys(r).forEach(k => keys.add(k)));
    let keysArray = [...keys];
    
    // create array of arrays as results
    let newRes = res.map(r => keysArray.map(k => r[k]));
    
    //add header row
    newRes.unshift(keysArray);
    
    return newRes;
  
  }
  
}


let arrayToObjectOfArrays = function(data){

   data = data.filter(r => !r.every(c => c==""));

   let headers = data.shift();
  
    return data.map(r => {
      
        let obj = {};
        
        r.forEach((cell,i) => {
          obj[headers[i]] = cell;
        })
        
        return obj;
    
    });   

}

function isValidJsBasicsIdentifier(name) {
    
    let valueafter;
    valueafter=name.trim();
    if (valueafter.length===0){
       //console.log("invalid");
        return false;    
    }
    if (valueafter==="let"||valueafter==="const"||valueafter==="var"||valueafter==="class"||valueafter==="function"||valueafter==="return")
    {
        //console.log("invalid");
        return false; 
    }

   if( valueafter.at(0)==="_"||valueafter.at(0)==="$")
   {
   // console.log("valid");
    return true;
   }

   const numvalid=!/^\d/.test(valueafter);
   if (numvalid!==true){
    //console.log(numvalid);
        return false;
   }


   const isValid = /^[a-zA-Z0-9_$]+$/.test(valueafter);
   if (isValid){
    //console.log(isValid); // true
    return true;
    }

}


isValidJsBasicsIdentifier("_1login")
isValidJsBasicsIdentifier("$submit")
isValidJsBasicsIdentifier("1login")
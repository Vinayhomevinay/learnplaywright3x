function normalizeJsBasicsLabel(label)
{
    let valueafter;
    valueafter=label.trim();
    valueafter=valueafter.toLowerCase();    

    const hasSpecial = /[^a-zA-Z0-9]/.test(valueafter);
    if (hasSpecial){
         valueafter = valueafter.replace(/[^a-zA-Z0-9]/g, "-");    
    }

    if (valueafter.length>0)
    {
    valueafter="js-basic"+"-"+valueafter;
    }
    else
    {
      valueafter="js-basic"+valueafter;  
    }   

    const final = valueafter
    .replace(/-+/g, "-")        // collapse repeated hyphens into one
.replace(/^-|-$/g, "");     // remove a hyphen at the start or end
        //console.log(final);

return final; 
}

 normalizeJsBasicsLabel(" Login Button ")
 normalizeJsBasicsLabel(" ")
normalizeJsBasicsLabel("User Profile: Edit!")
normalizeJsBasicsLabel("---Search@@Box---")


function getJsBasicsKeywordMeaning(term)
{
    let valueafter;
    valueafter=term.trim();
    valueafter=valueafter.toLowerCase();  

    if (valueafter==="node")
    {
        return "runtime";
    }
    else if (valueafter==="v8")
    {
         return "engine";
    }
    else if(valueafter==="npm")
    {
        return "package-manager";
    }
    else 
    {
        return "unknown";
        }

}
 


getJsBasicsKeywordMeaning("NODE")
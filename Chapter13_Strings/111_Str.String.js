// Searching & Checking

let url = "https://staging.vwo.com/api/login?retry=true";
// includes()
console.log(url.includes("staging"));;  
console.log(url.includes("production"));

// startsWith / endsWith
url.startsWith("https");
url.startsWith("http://"); 
url.endsWith("true"); 

// indexOf / lastIndexOf
console.log(url.indexOf("a"));
console.log(url.lastIndexOf("a"));
console.log(url.indexOf("nothere"));

// ASCII -> A -> 65
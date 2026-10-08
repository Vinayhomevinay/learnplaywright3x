function countPassingJsBasicsChecks(results) {

    let valuafter;
    let count=0;
    valueafter=results.map(item_score=>item_score.toLowerCase());
    valueafter= valueafter.map(item_score=>item_score.trim());

    for(let i=0;i<valueafter.length;i++)
    {
        if ( valueafter[i].includes("pass"))
            
                count=count+1;
        
    }
   return count;
  // write your code here
}

 countPassingJsBasicsChecks(["login-pass","api-fail","logout-pass"])
 //countPassingJsBasicsChecks(["one-fail","two-skip"])
 //countPassingJsBasicsChecks(["SETUP PASS","CONFIG PASS"])
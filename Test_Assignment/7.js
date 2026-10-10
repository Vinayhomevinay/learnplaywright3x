function summarizeJsBasicsResults(results)
{
    //write your code here 
    let valueafter;
    let valuepass;
    let valuefail;
    let totalcount;

    valueafter=results.map(item_score=>item_score.toLowerCase());
    valuepass=valueafter.filter(item_score=>item_score.includes("pass")).length;
    valuefail=valueafter.filter(item_score=>item_score.includes("fail")).length;
    totalcount=valueafter.length;
    valueskip=valueafter.filter(item_score=>item_score.includes("skip")).length;

   console.log({
            total:totalcount,
            passed:valuepass,
            failed:valuefail,
            skipped:valueskip
    });

}

summarizeJsBasicsResults([])
// summarizeJsBasicsResults(["login-pass","api-fail","profile-skip"])
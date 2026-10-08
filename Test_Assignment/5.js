function filterSupportedJsBasicsTopics(topics) {
  // write your code here

    let valueafter;
    valueafter = topics.map(item_score=>item_score.toLowerCase());
    valueafter= valueafter.map(item_score=>item_score.trim());

   let finalarr=[];

   for (let i=0;i<valueafter.length;i++)
   {
        if (valueafter[i]==="node"||valueafter[i]==="npm"||valueafter[i]==="v8")

            {
            
                finalarr.push(valueafter[i]);
            
            }

            }
        const uniqueArr = [...new Set(finalarr)];

        console.log(uniqueArr[0]);
        console.log(uniqueArr[1]);

  return uniqueArr;

}

filterSupportedJsBasicsTopics(["node","runtime","node"])
//filterSupportedJsBasicsTopics(["NpM","node","v8"])
filterSupportedJsBasicsTopics(["NODE"," v8 ","NODE"])

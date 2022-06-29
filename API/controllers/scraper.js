const e = require("express");
const puppeteer = require("puppeteer");



exports.Default = function (req, res) {
  res.send(req.body.username);
};

exports.Scraper = function( req, res){
    Scrape(res);
}






async function Scrape(res) {
    let url="https://www.expressen.se/";
    const browser = await puppeteer.launch({}); // initiate a new browser instance
    const page = await browser.newPage(); // define the page
    
    await page.goto(url);
   

    
    let allelements = await page.evaluate(() => {
        
        let elements =  document.getElementsByTagName("a");
        
        
        for(var l = 0; l < elements.length; l++){
            if(elements[l].href.includes("sport")){
                return elements[l].href;
            }
        }
        
        //return links;
        // if(elements==false){
        //     return false;
        // }

    
    });


    res.send(allelements)

    console.log(allelements)



    // if(find(browser,page,url,0)){
    //     console.log("ligma")
    //     res.send("Success")

    // }else{
    //     console.log("sugma")
    //     res.send("Failed")
    // }
    
}

// function find(browser,page, url,timer){ //find the link to news or sport 
//     // do something
//     let allaelem= null;
//     let neededa= null;
//      try{
        
//     }catch(err){
//         console.log(err)

//     }
    
    
//     console.log(neededa)

//     console.log(timer)

//     if(timer>10){
//         return false;
//        }
    
//    if(url.includes("sport")){
//     return true;
//    }

//    else{
//     return find(browser, page, url, ++timer);
//    }

// }
const puppeteer = require("puppeteer");
const { spawn } = require("child_process");
const { link } = require("fs");
const { url } = require("inspector");
const { timeStamp } = require("console");
const { stringify } = require("querystring");
// const spacy = require('sv_core_news_lg');
// const spacy = require('spacy');

exports.Default = function (req, res) {
    res.send(req.body.username);
  };

exports.Scraper = async function(req, res){
    await Scraper(res);
  };

exports.newsScraper = async function(req, res){
    await newsScraper(res);
};

exports.py = async function(req, res){
    await py(res);
};

exports.end = async function(req, res){
    await end(res);
};

exports.links = async function(req, res){
    await links(res);
};




async function Scraper(res, req){
    // Website to scrape (This is only page 1)
    const url = "https://www.aftonbladet.se/";
    // Use puppeteer to scrape the website
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(url);

    let findnews = await page.evaluate(() => {
        
        let elements =  document.getElementsByTagName("a");
        
        
        for(var l = 0; l < elements.length; l++){
            if(elements[l].href.includes("sport")){
                return elements[l].href;
            }
        }
        
    });

    await page.goto(findnews);



    let news;

    try {
        news = await page.evaluate(() => {
            let arr = [];
            let temp = [];
            let div1 = document.getElementsByClassName('css-1i1gwlz');

            for (var element of div1) {
                let anchor = element.getElementsByTagName('a');
                let img = element.getElementsByTagName('img');
                let plus = element.getElementsByClassName('svg-symbol css-huzvao');

                for (var hrefLink of anchor) {
                    temp.push(hrefLink.href);
                }
                for (var pic of img) {
                    temp.push(pic.src);
                }

                for (var p of plus) {
                    temp.push('1');
                }

                if (temp.length < 3) {
                    temp.push('0');
                }

                arr.push(temp);
                temp = [];
            }
            return arr;
        });

    } catch(err){
        console.log("Article not found", err);
    }

    await page.close();
    await browser.close();
    news = news.slice(1);
    console.log(news);
    // res.send(news);
    res.send(news);
}

// News = [link, image, plus, title, date, category, text]
async function newsScraper(res, req) {
    let urls = [];
    // Website to scrape
    urls = await Scraper(res, req);

    // Use puppeteer to scrape the website
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    let articles = [];

    for (let i = 0; i < urls.length; i++) {
        await page.goto(urls[i][0]);
        let news2 = [];

        try {
            news2 = await page.evaluate(() => {
                let contents = [];
                let txt = [];

                let title = document.getElementsByTagName('h1');
                let time = document.getElementsByClassName('css-1saok50');
                let sport = document.getElementsByClassName('css-j3zi70');
                let text = document.getElementsByClassName('css-1dznooa');

                // Check if the article contains time
                if (time.length == 0) {
                    contents.push(title[0].innerText);
                } else {
                    contents.push(title[0].innerText);
                    contents.push(time[0].innerText);
                    contents.push(sport[0].innerText);
                    
                    for (var element of text) {
                        txt.push(element.innerText);
                    }
                    let comb = txt.join(" ");
                    contents.push(comb);
                }
                
                return contents;
            });

        } catch(err){
            console.log("Not found", err);
        }

        news2.splice(0, 0, urls[i][0]);
        news2.splice(1, 0, urls[i][1]);
        news2.splice(2, 0, urls[i][2]);
        console.log(news2);
        articles.push(news2);
    }

    await page.close();
    await browser.close();
    console.log(articles);
    // res.send(articles);
    return articles;
}

// async function py(res, req) {
//     let text = [];
//     text = await newsScraper(res, req);

//     for (let i = 0; i < text.length; i++) {
//         const python = spawn('python', ['H:/code/visual_studio_code/nlp/sp.py', text[i][5]]);
//         python.stdout.on('data', (data) => {
//             text[i][5] = data.toString();
//         });

//         python.stderr.on('data', (data) => {
//             console.log('Failed');
//         });

//         python.on('close', (code) => {
//             console.log('Success' + text[i][5]);
//         });
//     }
//     return text;
// }

// async function end(res, req) {
//     let all = [];
//     all = await py(res, req);
//     res.send(all);
//     return all;
// }

async function links(res, req) {
    let urls = ["https://www.expressen.se/", "https://www.dn.se/", "https://www.gp.se/", "https://www.svt.se/", "https://www.aftonbladet.se/", "https://www.sydsvenskan.se/"];
    
    let sport = "fotboll";

    const start=  Date.now();

    let links=[];



    
    
    for (const url of urls){
        links.push(getthelinks(url,sport));
    }
    
    const link= await Promise.all(links);

    const finish=  (Date.now() -start);

    console.log(finish)



    res.send(link)
}

async function getthelinks(urls,sport){
    let sports="fotboll";
    console.log(sports)
    var findsport;

    // this part finds the link for sport section

    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(urls);

    

    let findnews = await page.evaluate(() => {      
        
        
        let elements =  document.getElementsByTagName("a");
        
        
        for(var l = 0; l < elements.length; l++){
            if(elements[l].href.includes("sport")){
                return elements[l].href;
            }
        }
        
    });

    await page.goto(findnews);
    
    // find the given sport

    try{
        
        findsport = await page.evaluate((sports) => {      
            let elements =  document.getElementsByTagName("a");
        
        
            for(var l = 0; l < elements.length; l++){
                if(elements[l].href.includes(sports)){
                    return elements[l].href;
                }
            }       
        });
        
    } catch(err){
        console.log("Sport wasn't found", findnews);
        findsport=null;
        return null;
    }
 
    

    //await page.goto(findsport);
    

    // this part scraper every link 
    let news = [];

    try {
    news = await page.evaluate(() => {
        let link = [];
        let main = document.getElementsByTagName("main");

        for (var element of main) {
        let anchor = element.getElementsByTagName("a");
        for (var hrefLink of anchor) {
            link.push(hrefLink.href);
        }
        }

        return link;
    });
    } catch (err) {

    console.log("Not found", err);
    }



    console.log(news);
    
    await page.close();
    await browser.close();


    return news;

}

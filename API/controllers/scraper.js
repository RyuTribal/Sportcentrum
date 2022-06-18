const puppeteer = require("puppeteer");

exports.Default = function (req, res) {
    res.send(req.body.username);
  };

exports.Scraper= async function(req, res){
    await Scraper(res);
  };

exports.newsScraper= async function(req, res){
    await newsScraper(res);
};

async function Scraper(res, req){
    // Website to scrape (This is only page 1)
    const url = "https://www.aftonbladet.se/sportbladet/fotboll";
    // Use puppeteer to scrape the website
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(url);
    let news;

    try {
        news = await page.evaluate(() => {
            let links = [];
            // Get all the links on the page
            let div1 = document.getElementsByClassName('css-1i1gwlz');
            // for (let i = 0; i < div1.length; i++) {
            //     let anchor = div1[i].getElementsByTagName('a')[0];
            //     links.push(anchor.href);
            // }
            for (var element of div1) {
                let anchor= element.getElementsByTagName('a');
                
                for (var hrefLink of anchor) {
                    // Add a if statement to check if the link is a plus only link
                    links.push(hrefLink.href);
                }
            }
            return links;
        });

    } catch(err){
        console.log("Article not found", err);
    }

    // res.send(news);
    console.log(news);
    await page.close();
    await browser.close();
    return news;
}

async function newsScraper(res, req) {
    let urls = [];
    // Website to scrape
    urls = await Scraper(res, req);

    // Use puppeteer to scrape the website
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    let articles = [];

    for (let i = 0; i < urls.length; i++) {
        await page.goto(urls[i]);
        let news2 = [];

        try {
            news2 = await page.evaluate(() => {
                let contents = [];
                // let title = document.getElementsByTagName('h1');
                // let time = document.getElementsByClassName('css-4legg0');
                // let sport = document.getElementsByClassName('css-j3zi70');
                // contents.push(title[0].innerText);
                
                // let text = document.getElementsByClassName('css-1dznooa');
                // for (var element of text) {
                    // contents.push(element.innerText);
                // }
                // return contents;
            });

        } catch(err){
            console.log("Not found", err);
        }

        console.log(news2[0]);
        articles.push(news2);
    }

    let comb = articles[2].join(" ");
    res.send(comb);
    // res.send(articles[2]);
    await page.close();
    await browser.close();
    return articles;
}

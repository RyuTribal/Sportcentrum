const Parser = require("rss-parser");
const puppeteer = require("puppeteer");


exports.Default = function (req, res) {
  res.send(req.body.username);
};

exports.GetRss = function (req, res) {
  get(res);
};

exports.Scrape = function (req, res) {
  scrape(res);
};

//



async function get(res) {
  //commentet out url for testing
  // Make a new RSS Parser
  const parser = new Parser();
  //const parser2 = new Parser();
  const url = "https://www.maif.se/";
  // Get all the items in the RSS feed
  let feed = null;

  let feeding = true;

  if (feeding) {
    try {
      feed = await parser.parseURL(url + "feed/"); // footboll
      feeding = false;
    } catch (err) {
      console.log("Can't Scrape : ", url);
    }
  }
  if (feeding) {
    try {
      const browser = await puppeteer.launch({}); // initiate a new browser instance
      const page = await browser.newPage(); // define the page
      await page.goto(url);

      const f = await page.$("#js-news-rssbutton");
      let link = await page.evaluate((f) => f.href, f);

      feed = await parser.parseURL(link); // footboll
      await page.close();
      await browser.close();

      feeding = false;
    } catch (err) {
      console.log("Can't Scrape : ", url, " Error number 2");
    }
  }
  if (feeding) {
    try {
      const browser = await puppeteer.launch({}); // initiate a new browser instance
      const page = await browser.newPage(); // define the page
      await page.goto(url+"nyheter/");

      let rsslink = await page.evaluate(() => {
        
        let elements = document.getElementsByClassName("fa fa-rss")[0].parentNode.href;
        
        return elements;
    });
      
    console.log(rsslink);

      feed = await parser.parseURL(rsslink); // footboll
      await page.close();
      await browser.close();

      
      feeding = false;
      console.log("Succsess");
    } catch (err) {
      console.log("Can't Scrape : ", url, " Error number 3", err);
    }
  }
  
  let items = [];
 if(!feeding){
     // Add the items to the items array
  await Promise.all(
    feed.items.map(async (currentItem) => {
      // Add a new item if it doesn't already exist
      if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
        items.push(currentItem);
      }
    })
  );

  items.sort(function (a, b) {
    var dateA = new Date(a.isoDate),
      dateB = new Date(b.isoDate); //sorting by IsoDate
    return dateA - dateB;
  });

  // Save the file
  return res.json(JSON.stringify(items));
 }
 
 return res.json(url+" Wasn't scraped successfully")

}

function isEquivalent(a, b) {
  // Create arrays of property names
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);

  // if number of properties is different, objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    // if values of same property are not equal, objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // if we made it this far, objects are considered equivalent
  return true;
}

async function GetWebsitelink(res, lagar) {
  const browser = await puppeteer.launch({}); // initiate a new browser instance
  const page = await browser.newPage(); // define the page
  page.setDefaultNavigationTimeout(0); 
  await page.goto(lagar);
  let elements=[];

  //var links = page.$$eval('tr', eachTr=> eachTr.find(e=>e.innerText.includes('Webbplats')).querySelector('a'));
  //const [links] = await page.$x("//tr[contains(., 'Webbplats')]").querySelector('a');

  try{
    elements = await page.evaluate(() => {
      // find all tr elements
      return (
        // do whatever you want to do with this
        [...document.querySelectorAll("tr")]
  
          // check which one of them includes the word
          .find((e) => e.innerText.includes("Webbplats"))
  
          // get the link inside
          .querySelector("a").href
      );
    });
  
  } catch(err){
    console.log("Couldn't find the link for the website:", lagar);
  }
  
  console.log(elements);


  //res.send(elements);

  await page.close();
  await browser.close();

  const parser = new Parser();
  //const parser2 = new Parser();
  //const url = "https://www.laget.se/KOPINGFF";
  // Get all the items in the RSS feed
  let feed = null;

  let feeding = true;

  if (feeding) {
    try {
      feed = await parser.parseURL(elements + "feed/"); // footboll
      feeding = false;
      elements=elements+"feed/";
    } catch (err) {
      console.log("Can't Scrape : ",elements );
    }
  }
  if (feeding) {
    try {
      const browser = await puppeteer.launch({}); // initiate a new browser instance
      const page = await browser.newPage(); // define the page
      await page.goto(elements);

      const f = await page.$("#js-news-rssbutton");
      let link = await page.evaluate((f) => f.href, f);

      feed = await parser.parseURL(link); // footboll
      await page.close();
      await browser.close();
      elements=link;

      console.log("balls");
      feeding = false;
    } catch (err) {
      console.log("Can't Scrape : ", elements, " Error number 2");
    }
  }
  if (feeding) {
    try {
      const browser = await puppeteer.launch({}); // initiate a new browser instance
      const page = await browser.newPage(); // define the page
      await page.goto(elements+"nyheter/");

      let rsslink = await page.evaluate(() => {
        
        let elements = document.getElementsByClassName("fa fa-rss")[0].parentNode.href;
        
        return elements;
    });
      
    console.log(rsslink);

      feed = await parser.parseURL(rsslink); // footboll
      await page.close();
      await browser.close();

      
      feeding = false;
      console.log("Succsess");
    } catch (err) {
      console.log("Can't Scrape : ", elements, " Error number 3", err);
    }
  }
  if (feeding) {
    try {
      feed = await parser.parseURL(elements + "nyheter/feed/"); // footboll
      feeding = false;
      elements=elements+"nyheter/feed/";
    } catch (err) {
      console.log("Can't Scrape : ",elements,"error 4" );
    }
  }
  
  if(!feeding){
    return {elements: elements, scraped: true};
  }

  return {elements: elements, scraped: false}; 


  //get(res, elements);
}

async function scrape(res) {
  const browser = await puppeteer.launch({}); // initiate a new browser instance
  const page = await browser.newPage(); // define the page
  page.setDefaultNavigationTimeout(0); 

  await page.goto(
    "https://www.wikiwand.com/sv/Lista_%C3%B6ver_fotbollsklubbar_i_Sverige"
  );
  var lagar = []; //links for lagar
  let rss_links=[];

  // let ligma = await page.evaluate(()=> {
  //     find all tr elements
  //         return [...document.querySelectorAll('li')]

  //         check which one of them includes the word
  //         .find(e=>e.className.includes('int-link tooltipstered'))

  //         get the link inside
  //         .querySelector('a')

  //         do whatever you want to do with this
  //         .href
  //     })

  // console.log(ligma);

  // for (i = 1; i < 10; i++) {
  //   var element = await page.waitForSelector(
  //     "#section_Allsvenskan_2022 > ul > li:nth-child(" + i + ") > a"
  //   );
  //   var links = await page.evaluate((element) => element.href, element);
  //   var text = await page.evaluate((element) => element.text, element);
  //   lagar.push(links);
  //   names.push(text);
  // }

  try{
    lagar = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName('int-link');
      for (var element of elements){
          data.push(element.href);
          if(data.length>10){
            break;
          }
        }
      return data;
  });
  } catch(err){
    console.log("Something went wrong");
  }
  
 


  console.log(lagar);

  await page.close();
  await browser.close();

  for(var element of lagar){
    rss_links.push(await GetWebsitelink(res, element));
  }

  res.send(rss_links);
  //await GetWebsitelink(res, lagar, names);
}

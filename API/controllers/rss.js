const Parser = require("rss-parser");

exports.Default = function(req, res){
    res.send(req.body.username);
};

exports.GetRss = function(req, res){
    get(res);
}; 

async function get(res){
       
 
       // Make a new RSS Parser
       const parser = new Parser();

       // Get all the items in the RSS feed
       const feed = await parser.parseURL("https://rss.aftonbladet.se/rss2/small/pages/sections/sportbladet/fotboll/"); // https://www.reddit.com/.rss
   
       let items = [];
   
   
       // Add the items to the items array
       await Promise.all(feed.items.map(async (currentItem) => {
   
           // Add a new item if it doesn't already exist
           if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
               items.push(currentItem);
           }
   
       }));
   
       // Save the file
       return   res.json(JSON.stringify(items));
       
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
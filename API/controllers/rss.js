exports.Default = function(req, res){
    res.send('It works');
    res.json({errorCode: 300, errorMessage: "No user found"});
};

exports.GetRss = function(req, res){
    res.send('Rss gotten');
};
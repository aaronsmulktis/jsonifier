var express = require('express');
var app = express();
var vids = "http://gdata.youtube.com/feeds/api/playlists/PLUfG5WpANuJpIm62ldjjpunTRb3hABEA4?v=2&alt=jsonc";
var request = require('superagent');
var port = 8080;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://dev.galoremag.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

function process(arr) {
	return arr.map(function(item) {
		return {
			url: 'www.youtube.com/watch?v=' + item.video.id,
			_id: item.id,
			title: item.video.title
		}
	});
}

app.get('/vids', function (req, res) {
	request.get(vids).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var vids = process(response.body.data.items);
			res.status(200).send(vids);
		}
	});
});

app.listen(port, function() {
	console.log("Node app is running at localhost:" + port);
});
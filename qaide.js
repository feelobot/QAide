var request = require("request");
var qaide = require('commander');
var GitHubApi = require("github");
var sys = require('sys');
var exec = require('child_process').exec;
var config = require('./config')

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

lighthouse_authenticate = {
  'auth' : {
    'user' : config.lighthouse_username, 
    'pass' : config.lighthouse_pass, 
    'sendImmediately' : true
  }
};

github.authenticate({
  type: "basic",
  username: config.github_username,
  password: config.github_pass
});

var deploy = "cd  " + config.shipit_dir + " && " + deploy

qaide
  .version('0.0.1')
  .option('-t, --tickets <tickets>' , 'the tickets to qa', list)
  .option('-e, --environment', 'Specify the staging environment to deploy to')
  .option('-u, --user' , 'the user to deploy as')  
  .option('-o, --options', 'other deploy options i.e. MIGRATIONS=1')
  .parse(process.argv);

qaide.tickets.forEach(val,index,array) {
	url = config.ticket_url + val
	request(url, lighthouse_authenticate, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    qaide.list.forEach(val,index,array) {
	    	var pull = body.match(val).pop();
	    }
	    var pull = body.match(regex).pop();
	    function puts(error, stdout, stderr) { sys.puts(stdout) }
	    var pullNumber = pull.slice(-4);
	    pull_requests_to_qa += pullNumber
	  }
	  else console.log(response.statusCode + " Error for " + url)
	  
	  github.pullRequests.get({
	    user: "br",
	    repo: "breport",
	    number: pullNumber
		},
	  function(err, res) {
		  var branch = res["base"]["ref"]
		  console.log(branch)
	  });
	});
}



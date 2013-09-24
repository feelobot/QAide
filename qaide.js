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

var deploy = "cd  " + config.shipit_dir + " && "

qaide
  .version('0.0.1')
  .option('-t, --ticket [number]' , 'the ticket to qa')
  .option('-e, --environment', 'Specify the staging environment to deploy to')
  .option('-u, --user [value]' , 'the user to deploy as')  
  .option('-o, --options', 'other deploy options i.e. MIGRATIONS=1')
  .parse(process.argv);

var ticket_url = config.lighthouse_url + qaide.ticket
console.log(ticket_url);

function puts(error, stdout, stderr) { 
  sys.puts(stdout) 
}

request(ticket_url, lighthouse_authenticate, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	if (body.match(config.projects["api"])) {
      var last_api = body.match(config.projects["api"]).pop()
      var pull_requests_num = last_api.match(/[0-9]+/)[0]
      console.log(pull_requests_num);
      var base_branch = "master"
      exec("cd ~/Documents/code/api/ && git checkout " + base_branch + " && git pull origin " + base_branch + " && echo y | gitc qa " + pull_requests_num,puts);
    }
    if (body.match(config.projects["breport"])) {
      var last_breport = body.match(config.projects["breport"]).pop()
      var pull_requests_num = last_breport.match(/[0-9]+/)[0]
      console.log(pull_requests_num);
      github.pullRequests.get({
        user: "br",
        repo: "breport",
        number: pull_requests_num
      },
      function(err, res) {
        var base_branch = res["base"]["ref"]
        console.log(base_branch);
        var head_branch_unformatted = res["head"]["label"]
        var developer = head_branch_unformatted.match(/([a-zA-Z]+)/)[0]
        var dev_branch = head_branch_unformatted.match(/\:(.*)/)[0].slice(1)
        head_branch = developer + "/" + dev_branch
        console.log(head_branch);
        exec("cd ~/Documents/code/breport/ && git checkout " + base_branch + " && git pull origin " + base_branch + " && echo y | gitc qa " + pull_requests_num,puts);
      });
    }
  }
 	else console.log(response.statusCode + " Error for " + url)
});	
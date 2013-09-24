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
  sys.puts(stderr)
}

request(ticket_url, lighthouse_authenticate, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	if (body.match(config.projects["api"])) {
      var last_api = body.match(config.projects["api"]).pop()
      var branch = get_branch_name(last_api)
      //exec("cd ~/code/breport/ && git checkout " + branch + " && git pull origin " + branch //+ " gitc qa " + pull_requests_num, puts);
    }
    if (body.match(config.projects["breport"])) {
      var last_breport = body.match(config.projects["breport"]).pop()
      pull_requests_num = last_breport.match(/[0-9]+/)[0]
      console.log(pull_requests_num);
      github.pullRequests.get({
        user: "br",
        repo: "breport",
        number: pull_requests_num
      },
      function(err, res) {
        var base_branch = res["base"]["ref"]
        var head_branch = res["head"]["label"]
        console.log(developer)
        console.log(head);

        console.log(branch);
        var qa_branch = "qa_" + base_branch + "_" + qaide.user
        exec("cd ~/Documents/code/breport/ && git checkout " + base_branch + " && git pull origin " + base_branch + " && git branch -D " + qa_branch " && git checkout -b " + qa_branch + " && git merge " + head_branch + " && git push -u origin " + qa_branch", puts);
      });
    }
  	else { 
  		console.log("Project Undefined");
  	}
  }
 	else console.log(response.statusCode + " Error for " + url)
});	
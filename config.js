var config = {}

config.github_username = process.env.GITHUB_USER || '';
config.github_pass = process.env.GITHUB_PASS || '';

config.lighthouse_username = process.env.LIGHTHOUSE_USER || '';
config.lighthouse_pass = process.env.LIGHTHOUSE_PASS || '';

module.exports = config;

var github_url = "https://github.com/br/"
var ticket_url = "https://bleacherreport.lighthouseapp.com/projects/6296/tickets/"
var shipit_dir = "~/code/shipit"

var pull_requests = {
	/https:\/\/github.com\/br\/breport\/issues\/([0-9]+)/g,
	/https:\/\/github.com\/br\/api\/issues\/([0-9]+)/g
}
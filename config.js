var config = {}

config.github_username = process.env.GITHUB_USER || '';
config.github_pass = process.env.GITHUB_PASS || '';

config.lighthouse_username = process.env.LIGHTHOUSE_USER || '';
config.lighthouse_pass = process.env.LIGHTHOUSE_PASS || '';
config.github_url = "https://github.com/br/"
config.lighthouse_url = "https://bleacherreport.lighthouseapp.com/projects/6296/tickets/"
config.shipit_dir = "~/code/shipit"

config.projects = {
	"api" : /https:\/\/github.com\/br\/api\/pull\/([0-9]+)/g,
	"breport" : /https:\/\/github.com\/br\/breport\/pull\/([0-9]+)/g
}
module.exports = config;


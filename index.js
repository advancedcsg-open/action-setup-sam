const core = require('@actions/core')
const os = require('os')
const { execSync } = require('child_process')

const run = async () => {
  try {
    const platform = os.platform()
    core.info(`Installation platform is ${platform}`)

    if (platform === 'linux') {
      execSync('sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"')
      core.addPath('/home/linuxbrew/.linuxbrew/bin')
      core.info(execSync('brew shellenv'))
      core.exportVariable('HOMEBREW_PREFIX', '/home/linuxbrew/.linuxbrew')
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

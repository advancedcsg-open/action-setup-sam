const core = require('@actions/core')
const os = require('os')
const { execSync } = require('child_process')

const run = async () => {
  try {
    const platform = os.platform()
    core.info(`Installation platform is ${platform}`)

    if (platform === 'linux') {
      execSync('sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"')
      core.info(execSync('test -d ~/.linuxbrew && ~/.linuxbrew/bin/brew shellenv'))
    }

    core.addPath()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

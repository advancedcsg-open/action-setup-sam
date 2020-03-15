const core = require('@actions/core')
const os = require('os')
const { execSync } = require('child_process')

const run = async () => {
  try {
    const platform = os.platform()
    core.info(`Installation platform is ${platform}`)

    if (platform === 'linux') {
      // install hombrew
      core.startGroup('installing linuxbrew...')
      execSync('sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"')

      // add brew to path
      core.addPath('/home/linuxbrew/.linuxbrew/sbin')
      core.addPath('/home/linuxbrew/.linuxbrew/bin')

      // set brew environment variables
      core.exportVariable('HOMEBREW_PREFIX', '/home/linuxbrew/.linuxbrew')
      core.exportVariable('HOMEBREW_CELLAR', '/home/linuxbrew/.linuxbrew/Cellar')
      core.exportVariable('HOMEBREW_REPOSITORY', '/home/linuxbrew/.linuxbrew/Homebrew')
      core.endGroup()

      // install SAM CLI use brew
      core.startGroup('installing SAM cli...')
      execSync('brew tap aws/tap')
      execSync('brew install aws-sam-cli')
      core.endGroup()

      execSync('sam --version')
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

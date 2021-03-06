import chalk from 'chalk'

import exit from '../util/exit'
import wait from '../cli/output/wait'
import ok from '../cli/output/ok'
import notok from '../cli/output/notok'
import error from '../cli/output/error'

import nettestHelp from '../cli/output/nettest-help'
import rightPad from '../cli/output/right-pad'
import sleep from '../util/sleep'

import NettestBase from './base'

class WebConnectivity extends NettestBase {
  static get name() { return 'Web Connectivity' }
  static get shortDescription() { return 'Test for web censorship' }

  async run(argv) {
    let currentUrl
    if (argv.file) {
      // Handle testing input file
    } else {
      currentUrl = argv._.slice(1)
      if (currentUrl.length == 0) {
        console.log(
          error(
            'Your must specify either a URL or an input file'
          )
        )
        return exit(1)
      }
    }

    const testDone = wait(`testing ${currentUrl}`)
    await sleep(10000)
    testDone()

    console.log(ok(`${currentUrl} is OK`))
    console.log(notok(`${currentUrl} is NOT OK`))

    return exit(0)
  }

  static get help() {
    const meta = {
      name: WebConnectivity.name,
      shortDescription: WebConnectivity.shortDescription
    }
    return nettestHelp(meta, 'webConnectivity', [
      {
        option: '-h, --help',
        description: 'Display usage information'
      },
      {
        option: `-f, --file ${chalk.bold.underline('FILE')}`,
        description: 'The path to a list of websites to test'
      }
    ])
  }
}
export default WebConnectivity

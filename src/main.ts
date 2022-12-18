import * as core from '@actions/core'
import * as io from '@actions/io'
import * as glob from '@actions/glob'

import path from 'path'

import {TARGET_SOURCE_PATHS,TARGET_DEST_PATH} from './types/inputs'

async function run(): Promise<void> {
  try {
    switch (process.platform) {
      case 'win32': {
        throw new Error('Unsupported platform: ${process.platform}')
      }
      case 'darwin': {
        throw new Error('Unsupported platform: ${process.platform}')
      }
    }

    await io.mkdirP(TARGET_DEST_PATH)

    const options = {recursive: true, force: false}

    const test = TARGET_SOURCE_PATHS.map(foo => {
      const bar = path.join(foo, "manifest.json")
      return bar
    })

    core.info(`got: ${test}`)

    // for (const p of TARGET_SOURCE_PATHS) {
    //   // const base_dir = path.basename(p)
    //   const foo = path.join(p, "manifest.json")
    //   const globber = await glob.create(foo)
    //   const files = await globber.glob()

    //   for (const f of files) {
    //     core.info(`got: ${f}`)
    //   }
      
    //   // await io.cp(p, `${TARGET_DEST_PATH}/${base_dir}`, options)
    // }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

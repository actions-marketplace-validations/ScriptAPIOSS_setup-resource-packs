import * as core from '@actions/core'
import * as io from '@actions/io'

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

    for (const p of TARGET_SOURCE_PATHS) {
      const base_dir = path.basename(p)
      
      await io.cp(p, `${TARGET_DEST_PATH}/${base_dir}`, options)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

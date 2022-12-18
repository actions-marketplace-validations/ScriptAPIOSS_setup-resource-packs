import * as core from '@actions/core'
import * as io from '@actions/io'
import * as glob from '@actions/glob'

import path from 'path'

import {TARGET_SOURCE_PATHS, TARGET_DEST_PATH} from './types/inputs'
import { PassThrough } from 'stream'

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

    const pack_paths = TARGET_SOURCE_PATHS.map(foo => {
      const bar = path.join(foo, 'manifest.json')
      return bar
    })

    const globber = await glob.create(pack_paths.join('\n'))
    for await (const manifest of globber.globGenerator()) {
      const dir_name = path.dirname(manifest)
      const base_dir = path.basename(dir_name)

      await io.cp(dir_name, `${TARGET_DEST_PATH}/${base_dir}`, options)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

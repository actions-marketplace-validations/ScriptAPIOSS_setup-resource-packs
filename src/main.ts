import * as core from '@actions/core'
import * as io from '@actions/io'
import * as glob from '@actions/glob'

import path from 'path'
import { readFile } from 'fs/promises'

import {TARGET_SOURCE_PATHS, TARGET_DEST_PATH} from './types/inputs'
import {Manifest} from './types/manifests'

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

    const pack_paths = TARGET_SOURCE_PATHS.map(t => {
      const tm = path.join(t, 'manifest.json')
      return tm
    })

    const discovered = new Array<{pack_id: string, version: Array<number>}>()

    const globber = await glob.create(pack_paths.join('\n'))
    for await (const manifest of globber.globGenerator()) {
      const parsed_manifest: Manifest = JSON.parse(await readFile(manifest, 'utf8'))

      core.debug(`Discovered manifest: ${parsed_manifest.header.uuid} [${parsed_manifest.header.version}]`)

      discovered.push({pack_id: parsed_manifest.header.uuid, version: parsed_manifest.header.version})

      const dir_name = path.dirname(manifest)
      const base_dir = path.basename(dir_name)

      await io.cp(dir_name, `${TARGET_DEST_PATH}/${base_dir}`, options)
    }

    core.setOutput("DISCOVERED_MANIFESTS", discovered)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

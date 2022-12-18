import * as core from '@actions/core'

export const TARGET_SOURCE_PATHS = core.getMultilineInput('TARGET_SOURCE_PATHS')
export const TARGET_DEST_PATH = core.getInput('TARGET_DEST_PATH')

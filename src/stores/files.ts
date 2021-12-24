import { computed } from 'nanostores'
import { textFiles } from './text-files'

export interface File {
  path: string
}

export const files = computed(textFiles, (files) =>
  files.map((file) => ({ path: file.path })),
)

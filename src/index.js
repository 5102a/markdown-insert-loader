import { getOptions } from 'loader-utils'
import { validate } from 'schema-utils'

import schema from './options.json'
import normalizeFallback from './normalizeFallback'

export default function loader(content, map, meta) {
  const options = getOptions(this) || {}

  content = content.toString()
  validate(schema, options, {
    name: 'Markdown Comment Loader',
    baseDataPath: 'options',
  })

  let header = '',
    footer = ''

  if (options.header !== undefined) {
    if (typeof options.header === 'function') {
      header += options.header(content)
    } else {
      header += options.header
    }
    header += '\n\n'
  }

  if (options.footer !== undefined) {
    footer += '\n\n'
    if (typeof options.footer === 'function') {
      footer += options.footer(content)
    } else {
      footer += options.footer
    }
  }

  const result = header + content + footer

  // 直接生成markdown文件
  if (options.generate) {
    const {
      loader: fallbackLoader,
      options: fallbackOptions,
    } = normalizeFallback(options.fallback, options)

    // file-loader
    const fallback = require(fallbackLoader)

    const fallbackLoaderContext = Object.assign({}, this, {
      query: fallbackOptions,
    })
    return fallback.call(fallbackLoaderContext, result)
  }

  // 下一步loader处理
  return result
}

export const raw = true

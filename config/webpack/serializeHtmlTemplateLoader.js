const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')
const escapeStringRegexp = require('escape-string-regexp')

const schema = {
  type: 'object',
  properties: {
    serializeFuncPath: {
      type: 'string',
    },
    replaceableVariables: {
      type: 'object',
    },
  },
}

function interpolateData(data, replacements) {
  let interpolatedData = data

  Object.keys(replacements).forEach((key) => {
    const value = replacements[key]
    interpolatedData = interpolatedData.replace(
      new RegExp(`%${escapeStringRegexp(key)}%`, 'g'),
      value,
    )
  })

  return interpolatedData
}

function serializeHtmlTemplateLoader(source) {
  const options = getOptions(this)

  validateOptions(schema, options, 'HTML Template Loader')

  const { serializeFuncPath, replaceableVariables } = options
  const serializeFunc = require(serializeFuncPath)

  return `module.exports = ${serializeFunc(interpolateData(source, replaceableVariables))}`
}

module.exports = serializeHtmlTemplateLoader

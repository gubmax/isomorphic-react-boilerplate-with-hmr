const { protocol, host, port } = require('../../config/settings')

function serializeHtmlTemplateFunc(template) {
  const updatedTemplate = template
    .replace(
      /<\/head>/,
      `<script type="text/javascript" id="state">
          window.INITIAL_STATE = \${JSON.stringify(initialState).replace(/</g, '\\\\u003c')};
          document.getElementById('state').remove();
        </script>
        <style>\${criticalStyles}</style>
      </head>`,
    )
    .replace(
      /<div id="root"><\/div>/,
      '<div id="root">${initialHtml}</div>', // eslint-disable-line no-template-curly-in-string
    )
    .replace(
      /<\/body>/,
      `<script type="text/javascript" src="${protocol}://${host}:${port}/bundle.js"></script></body>`,
    )

  return `
    function (initialHtml, criticalStyles, initialState) {
      return \`${updatedTemplate}\`
    }
  `
}

module.exports = serializeHtmlTemplateFunc

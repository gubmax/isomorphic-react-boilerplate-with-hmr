const { APP_PROTOCOL, APP_HOST, APP_PORT } = process.env

function serializeHtmlTemplateFunc(template) {
  const updatedTemplate = template
    .replace(
      /<\/head>/,
      `<script type="text/javascript" id="state">
          window.INITIAL_STATE = \${JSON.stringify(initialState).replace(/</g, '\\\\u003c')};
          document.getElementById('state').remove();
        </script>
      </head>`,
    )
    .replace(
      /<div id="root"><\/div>/,
      '<div id="root">${initialHtml}</div>', // eslint-disable-line no-template-curly-in-string
    )
    .replace(
      /<\/body>/,
      `<script type="text/javascript" src="${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}/bundle.js"></script></body>`,
    )

  return `
    function (initialHtml, initialState) {
      return \`${updatedTemplate}\`
    }
  `
}

module.exports = serializeHtmlTemplateFunc

import { PROTOCOL, HOST, PORT_APP } from '@config/env'

const getHtmlTemplate = (initialHtml, initialState) => `
  <!doctype html>
  <html lang="ru">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Isomorphic react boilerplate</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script type="text/javascript" id="state">
        window.INITIAL_STATE = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};
        document.getElementById('state').remove();
      </script>
    </head>
    <body>
      <div id="root">${initialHtml}</div>
      <script src="${PROTOCOL}://${HOST}:${PORT_APP}/bundle.js"></script>
    </body>
  </html> 
`

export default getHtmlTemplate

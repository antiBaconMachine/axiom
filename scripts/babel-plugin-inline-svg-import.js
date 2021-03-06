const { extname, dirname } = require('path');
const { readFileSync } = require('fs');
const resolveFrom = require('resolve-from');
const SVGO = require('svgo');
const svgo = new SVGO({
  plugins: [
    { removeAttrs: ['id'] },
    { removeComments: true },
    { removeDefs: true },
    { removeDesc: true },
    { removeDoctype: true },
    { removeDimensions: true },
    { removeTitle: true },
  ],
});


/**
 * Credit to Shopify Polaris for the approach.
 * https://github.com/Shopify/polaris/blob/master/config/rollup/plugins/icon.js
 */
const VIEWBOX_REGEX = /viewBox="([^"]*)"/;
const SVG_REGEX = /(<svg[^>]*>|<\/svg>)/g;
const FILL_REGEX = /fill="[^"]*"/g;

module.exports = () => ({
  visitor: {
    CallExpression(path, state) {
      const callee = path.get('callee');

      if (callee.isIdentifier() && callee.equals('name', 'require')) {
        const arg = path.get('arguments')[0];
        const requirePath = arg.node.value;

        if (arg && arg.isStringLiteral() && extname(requirePath) === '.svg') {
          const filePath = state.file.opts.filename;
          const svgPath = resolveFrom(dirname(filePath), requirePath);
          let svgData;

          svgo.optimize(readFileSync(svgPath, 'utf8'), (result) => {
            const viewBox = VIEWBOX_REGEX.exec(result.data)[1];
            const finalSource = result.data.replace(FILL_REGEX, (fill) =>
              fill.includes('#000') ? 'fill="currentColor"' : ''
            );

            svgData = {
              viewBox,
              body: finalSource.replace(SVG_REGEX, ''),
            };
          });

          path.replaceWithSourceString(JSON.stringify(svgData));
        }
      }
    },
  },
});

const template = ({imports, interfaces, componentName, props, jsx}, {tpl}) => {
  const name = String(componentName).replace(/^Svg/, 'Icon')

  return tpl`
${imports};

${interfaces};

const ${name} = (${props}) => (
  ${jsx}
);

${`export default ${name}`};
`
}

module.exports = template
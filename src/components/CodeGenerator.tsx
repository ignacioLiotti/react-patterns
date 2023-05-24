import React from 'react';

interface CodeGeneratorProps {
  data: any;
  indentLevel?: number;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ data, indentLevel = 0 }) => {
  const generateCode = (component: any, level: number): string => {
    const indent = '  '.repeat(level);
    let code = `${indent}<${component.name}`;

    // Add props
    if (component.props) {
      Object.entries(component.props).forEach(([propName, propValue]) => {
        code += ` ${propName}={${JSON.stringify(propValue)}}`;
      });
    }

    code += '>\n';

    // Add children
    if (component.children.length > 0) {
      component.children.forEach((child: any) => {
        code += generateCode(child, level + 1);
      });
    }

    code += `${indent}</${component.name}>\n`;

    return code;
  };

  const generatedCode = generateCode(data, indentLevel);

  return (
    <pre>
      <code>{generatedCode}</code>
    </pre>
  );
};

export default CodeGenerator;

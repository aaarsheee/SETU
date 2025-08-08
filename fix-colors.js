const fs = require('fs');
const path = require('path');

// Map of custom colors to standard Tailwind colors
const colorMap = {
  'primary-50': 'blue-50',
  'primary-100': 'blue-100',
  'primary-200': 'blue-200',
  'primary-300': 'blue-300',
  'primary-400': 'blue-400',
  'primary-500': 'blue-500',
  'primary-600': 'blue-600',
  'primary-700': 'blue-700',
  'primary-800': 'blue-800',
  'primary-900': 'blue-900',
  'secondary-50': 'green-50',
  'secondary-100': 'green-100',
  'secondary-200': 'green-200',
  'secondary-300': 'green-300',
  'secondary-400': 'green-400',
  'secondary-500': 'green-500',
  'secondary-600': 'green-600',
  'secondary-700': 'green-700',
  'secondary-800': 'green-800',
  'secondary-900': 'green-900',
};

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.keys(colorMap).forEach(oldColor => {
    const newColor = colorMap[oldColor];
    const regex = new RegExp(oldColor, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, newColor);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated colors in: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      replaceColorsInFile(fullPath);
    }
  });
}

// Process the frontend src directory
processDirectory('./frontend/src');
console.log('Color replacement complete!');

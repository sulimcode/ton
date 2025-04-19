// Файл для помощи в сборке проекта с Node.js 18.x
// Этот скрипт должен быть запущен на Vercel перед основной сборкой

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Node.js version helper script started');
console.log('Current Node.js version:', process.version);

// Проверяем, запущен ли скрипт на Vercel
const isVercel = process.env.VERCEL || process.env.VERCEL_DEPLOYMENT;
console.log('Running on Vercel:', isVercel ? 'Yes' : 'No');

if (isVercel) {
  // Создаем конфигурационные файлы для Node.js 18.x
  try {
    // Создаем .npmrc с указанием версии Node.js
    fs.writeFileSync('.npmrc', 'engine-strict=true\nnode-version=18.18.0\n');
    console.log('Created .npmrc file with Node.js 18.x setting');
    
    // Создаем или обновляем файлы .nvmrc и .node-version
    fs.writeFileSync('.nvmrc', '18.18.0');
    fs.writeFileSync('.node-version', '18.x');
    console.log('Created Node.js version files');
    
    // Создаем файл .vercel/project.json
    const vercelDir = path.join(process.cwd(), '.vercel');
    if (!fs.existsSync(vercelDir)) {
      fs.mkdirSync(vercelDir, { recursive: true });
    }
    
    const projectConfig = {
      "projectId": "prayer-times-app",
      "orgId": "prayer-times-team",
      "settings": {
        "framework": "vite",
        "devCommand": "npm run dev",
        "installCommand": "npm install",
        "buildCommand": "npm run build",
        "outputDirectory": "dist",
        "nodeVersion": "18.x"
      }
    };
    
    fs.writeFileSync(
      path.join(vercelDir, 'project.json'),
      JSON.stringify(projectConfig, null, 2)
    );
    console.log('Created .vercel/project.json with Node.js 18.x setting');
    
  } catch (error) {
    console.error('Error creating Node.js version configuration files:', error);
    process.exit(1);
  }
}

console.log('Node.js version helper script completed');
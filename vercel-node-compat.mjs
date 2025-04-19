// Файл для обеспечения совместимости с Node.js 18.x на Vercel
// Этот файл должен быть импортирован в начале серверных исходных файлов

import { getDirname } from './dirname-polyfill.mjs';

// Полифилы и адаптеры для совместимости Node.js 18.x
const nodeMajorVersion = parseInt(process.versions.node.split('.')[0], 10);

if (nodeMajorVersion < 20) {
  console.log(`Node.js ${process.versions.node} detected, applying compatibility patches`);
  
  // Полифил для fetch API (только если отсутствует нативная реализация)
  if (typeof globalThis.fetch !== 'function') {
    try {
      const nodeFetch = require('node-fetch');
      globalThis.fetch = nodeFetch.default || nodeFetch;
      globalThis.Headers = nodeFetch.Headers;
      globalThis.Request = nodeFetch.Request;
      globalThis.Response = nodeFetch.Response;
      console.log('Installed polyfill for fetch API');
    } catch (error) {
      console.error('Failed to install fetch API polyfill:', error);
    }
  }
  
  // Добавляем глобальный полифил для import.meta.dirname
  if (typeof import.meta === 'object' && import.meta.dirname === undefined) {
    Object.defineProperty(import.meta, 'dirname', {
      get() {
        return getDirname(import.meta.url);
      }
    });
    console.log('Installed global polyfill for import.meta.dirname');
  }
}

export default {
  dirname: typeof import.meta === 'object' ? import.meta.dirname : null,
  nodeMajorVersion
};
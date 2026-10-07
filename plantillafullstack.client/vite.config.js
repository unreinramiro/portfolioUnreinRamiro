import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

export default defineConfig(({ mode }) => {
  let httpsConfig = false;

  // Solo generar/cargar certificado SSL local si estamos ejecutando en desarrollo local
  if (mode === 'development') {
    const baseFolder =
      env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

    const certificateName = "plantillafullstack.client";
    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true });
    }

    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
      if (
        0 !==
        child_process.spawnSync(
          'dotnet',
          [
            'dev-certs',
            'https',
            '--export-path',
            certFilePath,
            '--format',
            'Pem',
            '--no-password',
          ],
          { stdio: 'inherit' }
        ).status
      ) {
        console.warn("No se pudo generar el certificado HTTPS local.");
      }
    }

    if (fs.existsSync(keyFilePath) && fs.existsSync(certFilePath)) {
      httpsConfig = {
        key: fs.readFileSync(keyFilePath),
        cert: fs.readFileSync(certFilePath),
      };
    }
  }

  return {
    plugins: [plugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5231',
          changeOrigin: true,
          secure: false,
        },
      },
      port: parseInt(env.DEV_SERVER_PORT || '55432'),
      https: httpsConfig,
    },
  };
});
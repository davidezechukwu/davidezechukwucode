const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

import { ApplicationConfig, DecodeApiNodeApplication } from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new DecodeApiNodeApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/healthstatus/check to get a Health Check`);

  return app;
}

if (require.main === module) {
  // Run the application
  var applicationConfig: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),      
      host: process.env.HOST,
      basePath: process.env.LOOPBACK_CORE_API_PATH,
      cors: {
        origin: process.env.LOOPBACK_CORE_CORS_ALLOW_ORIGIN,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,
      },
      expressSettings: {
        'x-powered-by': false,
        env: 'production',
      },
      requestBodyParser: { json: { limit: process.env.LOOPBACK_CORE_MAX_REQUEST } },
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
    fileStorageDirectory: path.resolve(process.cwd(), process.env.CAKE_UPLOAD_PATH)
  };

  main(applicationConfig).then(app => {    
  }).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { Middleware, RestApplication, RestBindings } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import multer from 'multer';
import { MySequence } from './sequence';
import { FILE_UPLOAD_SERVICE, LOGGING_COMPONENT, STORAGE_DIRECTORY } from './binding-keys';
import { LoggingComponent } from '@loopback/logging';
import { CakeMultiPartFormDataPrser } from './parsers/cake-multipart-form-data-parser'
import { FileUtils } from './utils';
export { ApplicationConfig };

export class DecodeApiNodeApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(applicationConfig: ApplicationConfig = {}) {
    super(applicationConfig);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      // Customize ControllerBooter Conventions here
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.sequence(MySequence);    
    this.static('/', path.join(__dirname, '../public'));
    this.static('/storage/uploads', path.join(__dirname, './storage/uploads'));    
    this.bodyParser(CakeMultiPartFormDataPrser); 
    this.ConfigureDebugging(applicationConfig);
    this.ConfigureSwagger(applicationConfig);
    this.ConfigureFileUpload(applicationConfig);
    this.ConfigureLogging(applicationConfig);
  }

  protected ConfigureSwagger(applicationConfig: ApplicationConfig) {
    this.configure(RestExplorerBindings.COMPONENT).to({ path: process.env.LOOPBACK_CORE_EXPLORER_PATH });
    this.component(RestExplorerComponent);
  }

  protected ConfigureDebugging(applicationConfig: ApplicationConfig) {
    this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({ debug: process.env?.DEBUG?.toUpperCase() === 'FALSE' });
  }

  protected ConfigureLogging(applicationConfig: ApplicationConfig) {
    this.configure(LOGGING_COMPONENT).to({
      enableFluent: false, 
      enableHttpAccessLog: true,
    });
    this.component(LoggingComponent);
    const log: Middleware = async (middlewareCtx, next) => {
      const { request } = middlewareCtx;
      console.log('Request: %s %s', request.method, request.originalUrl);
      try {        
        const result = await next();        
        console.log(
          'Response received for %s %s',
          request.method,
          request.originalUrl,
        );
        return result;
      } catch (err) {
        // Catch errors from downstream middleware
        console.error(
          'Error received for %s %s',
          request.method,
          request.originalUrl,
        );
        throw err;
      }
    };
    this.middleware(log);
  }

  protected ConfigureFileUpload(applicationConfig: ApplicationConfig) {
    let destination = "";
    if (path.isAbsolute(applicationConfig.fileStorageDirectory)) {
      destination = applicationConfig.fileStorageDirectory;
    }
    else {
      destination = path.join(__dirname, applicationConfig.fileStorageDirectory);      
    }
    this.static(process.env.CAKE_IMAGES_ROUTE!, destination);

    this.bind(STORAGE_DIRECTORY).to(destination);
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        filename: (request: any, file: any, cb: any) => {
          let parsedPath = path.parse(file.originalname);
          let safeName = FileUtils.StripOutFilenameInvalidCharacters(parsedPath.name);
          safeName = safeName.toLowerCase();
          cb(null, `${safeName}-${Date.now()}${parsedPath.ext}`);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
  }
}

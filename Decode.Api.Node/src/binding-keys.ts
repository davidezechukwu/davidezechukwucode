import { BindingKey } from '@loopback/core';
import { WinstonLogger, LoggingComponent } from '@loopback/logging';
import { FileUploadHandler } from '../src/types/file-upload-handler';


export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>('services.FileUpload');
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');
export const WINSTON_LOGGER = BindingKey.create<WinstonLogger>('logging.winston.logger');
export const LOGGING_COMPONENT = BindingKey.create<LoggingComponent>('components.LoggingComponent');



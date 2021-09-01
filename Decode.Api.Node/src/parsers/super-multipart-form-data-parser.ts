import { BindingKey, inject } from '@loopback/core';
import {
  Request,
  RequestBody,
  BodyParser
} from '@loopback/rest';
import { WinstonLogger, logInvocation } from '@loopback/logging';
import multer from 'multer';
import { FileUploadHandler } from '../types/file-upload-handler';

export abstract class SuperMultiPartFormDataPrser implements BodyParser {
  constructor(protected fileUploadHandler: FileUploadHandler) {
  }

  name = Symbol('stream');

  supports(mediaType: string) {
    // Return `false` so that this parser can only be trigged by the
    // `{x-parser: 'stream'}` extension in the request body spec
    return false;
  }
  
  async parse(request: Request): Promise<RequestBody> {
    
    throw "Unexpected";
  }

  protected static GetFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
        FieldName: f.fieldname,
        OriginalFileName: f.originalname,
        Encoding: f.encoding,
        MimeType: f.mimetype,
        Size: f.size,
        DestinationFileName: f.filename,
        DestinationFolder: f.destination,
        DestinationPath: f.path
      });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    //log if needed
    return { files, fields: request.body };
  }
}

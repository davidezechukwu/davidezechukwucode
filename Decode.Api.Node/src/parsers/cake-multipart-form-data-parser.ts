import { inject } from '@loopback/core';
import { Request, RequestBody } from '@loopback/rest';
import { FileUploadHandler } from '../../src/types/file-upload-handler';
import { SuperMultiPartFormDataPrser } from './super-multipart-form-data-parser';
import { FILE_UPLOAD_SERVICE } from '../binding-keys'
import { ErrorHandlingUtils } from '../utils';

export class CakeMultiPartFormDataPrser extends SuperMultiPartFormDataPrser {
  constructor(
    @inject(FILE_UPLOAD_SERVICE)
    fileUploadHandler: FileUploadHandler) {
    super(fileUploadHandler);
  }
  async parse(request: Request): Promise<RequestBody> {
    return new Promise<RequestBody>((resolve, reject) => {
      this.fileUploadHandler(request, {} as any, err => {
        if (err) {
          reject(err);
        }
        else {
          var res = SuperMultiPartFormDataPrser.GetFilesAndFields(request);          
          var body = res.fields;
          if (res.files.length > 1) {
            reject(ErrorHandlingUtils.CreateRejection(500, CakeMultiPartFormDataPrser.constructor.name, "parse failed because multiple file uploads were detected, and this was not asked for"));
          }
          if (res.files.length === 1) {
            body.ImageUrl = (res.files[0] as { DestinationFileName: string }).DestinationFileName
          }          
          resolve({
            value: body,
            coercionRequired: true
          });
        }
      });
    });
  }
}

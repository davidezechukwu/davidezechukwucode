// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  BindingScope,
  config,
  ContextTags,
  injectable,
  Provider,
} from '@loopback/core';
import multer from 'multer';
import { FILE_UPLOAD_SERVICE } from '../binding-keys';
import { FileUploadHandler } from '../types/file-upload-handler';
/**
 * A provider to return an `Express` request handler from `multer` middleware
 */
@injectable({
  scope: BindingScope.TRANSIENT,
  tags: { [ContextTags.KEY]: FILE_UPLOAD_SERVICE },
})
export class FileUploadProvider implements Provider<FileUploadHandler> {
  constructor(@config() private options: multer.Options = {}) {
    if (!this.options.storage) {
      // Default to in-memory storage
      this.options.storage = multer.memoryStorage();
    }
  }

  value(): FileUploadHandler {
    return multer(this.options).any();
  }
}

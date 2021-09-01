import { inject } from '@loopback/core';
import fs from 'fs';
import {Count,CountSchema,Filter,FilterExcludingWhere,repository,Where,IsolationLevel} from '@loopback/repository';
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response  } from '@loopback/rest';
import { intercept } from '@loopback/core';
import { SuperController } from './super.controller';
import { Cake } from '../models';
import { CakeRepository } from '../repositories';
import { FILE_UPLOAD_SERVICE } from '../binding-keys'
import { CakeMultiPartFormDataPrser } from '../parsers/cake-multipart-form-data-parser';
import { CakeInterceptor } from '../interceptors/cake.interceptor';
import { FileUploadHandler } from '../../src/types/file-upload-handler';
import { FileUtils, ErrorHandlingUtils } from '../utils';
import { IDFromPath } from './../utils/http-method-decorators'
import * as WebContracts from 'decode.web.contracts.typescript';

var postSchema = getModelSchemaRef(Cake, { title: 'CakePostRequestObject', exclude: ['ID'] });
var putSchema = getModelSchemaRef(Cake, { title: 'CakePutRequestObject' });
var patchSchema = getModelSchemaRef(Cake, { title: 'CakePatchRequestObject', partial: true });
var patchAllSchema = getModelSchemaRef(Cake, { title: 'CakePatchAllRequestObject', partial: true });
(postSchema!.definitions!.CakePostRequestObject.properties!.ImageUrl as { type: string }).type = 'string';
(postSchema!.definitions!.CakePostRequestObject.properties!.ImageUrl as { format: string }).format = 'binary';
(putSchema!.definitions!.CakePutRequestObject!.properties!.ImageUrl as { type: string }).type = 'string';
(putSchema!.definitions!.CakePutRequestObject!.properties!.ImageUrl as { format: string }).format = 'binary';
patchSchema!.definitions!.CakePatchRequestObject!.required = ['ID'];
(patchSchema!.definitions!.CakePatchRequestObject!.properties!.Name as { nullable?: boolean }).nullable = true;
(patchSchema!.definitions!.CakePatchRequestObject!.properties!.YumFactor as { nullable?: boolean }).nullable = true;
(patchSchema!.definitions!.CakePatchRequestObject!.properties!.Comment as { nullable?: boolean }).nullable = true;
(patchSchema!.definitions!.CakePatchRequestObject!.properties!.ImageUrl as { nullable?: boolean }).nullable = true;
(patchSchema!.definitions!.CakePatchRequestObject!.properties!.ImageUrl as { type: string }).type = 'string';
(patchSchema!.definitions!.CakePatchRequestObject!.properties!.ImageUrl as { format: string }).format = 'binary';
patchAllSchema!.definitions!.CakePatchAllRequestObject!.description = 'Omit the ID attribute to create a new cake; include the ID property to update an existing cake.'


@intercept(CakeInterceptor.BINDING_KEY)
export class CakeController extends SuperController {
  constructor(
    @repository(CakeRepository)
    protected cakeRepository: CakeRepository,
    @inject(FILE_UPLOAD_SERVICE)
    protected fileUploadHandler?: FileUploadHandler    
  ) {
    super();
  }

  @post('/cakes', {
    responses: {
      '200': {
        description: 'Cake model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cake) } },
      }
    }
  })
  @response(200, {
    description: 'Cake model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Cake) } },
  })
  async create(
    @requestBody({
      description: 'Please provide fields needed to Create a cake',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': CakeMultiPartFormDataPrser,
          schema: postSchema
        }
      }
    })
    cake: Omit<Cake, 'ID'>
  ): Promise<Cake> {    
    return this.cakeRepository.create(cake);
  }

  @get('/cakes/count')
  @response(200, {
    description: 'Returns the number of cakes on the system',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Cake) where?: Where<Cake>,
  ): Promise<Count> {
    return this.cakeRepository.count(where);
  }

  @get('/cakes')
  @response(200, {
    description: 'Returns the details(as array) of all the matching cakes on our system ',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cake, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Cake) filter?: Filter<Cake>,
  ): Promise<Cake[]> {
    return new Promise<Cake[]>((resolve, reject) => {
      this.cakeRepository.find(filter).then(cakes => {
        cakes.forEach(cake => {
          cake.ImageUrl = FileUtils.GetClientPath(process.env.CAKE_IMAGES_PATH!, cake.ImageUrl);
        });
        resolve(cakes);
      }).catch(reason => {
        reject(ErrorHandlingUtils.CreateRejection(500, this.constructor.name, 'find failed because of ' + reason));
      });
    });
  }

  @get('/cakes/{id}')
  @response(200, {
    description: 'Returns the details of the cake matching with the provided {id}',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cake, { includeRelations: true }),
      },
    },
  })
  async findById(
    @IDFromPath('id') id: WebContracts.IDType,
    @param.filter(Cake, { exclude: 'where' }) filter?: FilterExcludingWhere<Cake>
  ): Promise<Cake> {
    return new Promise<Cake>((resolve, reject) => {
      this.cakeRepository.findById(id, filter).then(cake => {
        cake.ImageUrl = FileUtils.GetClientPath(process.env.CAKE_IMAGES_PATH!, cake.ImageUrl);
        resolve(cake);
      }).catch(reason => reject(reason));
    });
  }

  @patch('/cakes/{id}')
  @response(204, {
    description: 'One or more details about the matching cake was successfully updated',
  })
  async updateById(
    @IDFromPath('id') id: WebContracts.IDType,
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': CakeMultiPartFormDataPrser,
          schema: patchSchema
        }
      }
    })
    cake: Partial<Cake> & Pick<Cake, "ID">,
  ): Promise<void> {
    if (cake.ImageUrl != null) {
      return new Promise<void>((resolve, reject) => {
        this.cakeRepository.findById(cake.ID).then(exitingCake => {
          this.cakeRepository.updateById(id, cake).then(() => {
            if (exitingCake) {
              var toDelete = cake.ImageUrl = FileUtils.GetServerPath(process.env.CAKE_UPLOAD_PATH!, exitingCake.ImageUrl);
              fs.unlink(toDelete, (err) => {
                if (err) {
                  this.Logger.error(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateById completed successfully but was unable to delete the file: ${toDelete}`));
                }
                resolve();
              })
            }
          }).catch(reason => {
            reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateById failed because of ` + reason));
          });
        }).catch(reason => {
          reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateById failed because of ` + reason));          
        });
      });
    } else {
      return this.cakeRepository.updateById(id, cake);
    }
  }

  @patch('/cakes')
  @response(200, {
    description: 'Returns the number of cakes that were either created or updated',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody.array(
      patchAllSchema,
      {
        description: 'An array of cakes to be batch updated or created. This call is not indempotent. ' +
          'Swagger (and OpenAPI) does not currently support the arbitrary uploading of a number of files(an array of files). ' +
          'There is an open feature request at https://github.com/OAI/OpenAPI-Specification/issues/254. ' +
          'Even though the primitive XHTTPRequest object (AJAX) can handle PATCHES, PUT, OPTIONS etc ' +
          'Browsers only support GET and POST methods via the HTML FORM element. ' +
          'Hence, for now whilst using Swagger, you can use a string array of Cake objects as a workaround for patching an arbitrary number of cakes. ' +
          'However, you must ensure that the file set in ImageUrl exists on the server. ' +
          'Transactional support (i.e Commit or or Cancel All)  is provided when using an RDBMS or Datastore that supports Transactions', required: true
      }
    )
    cakes: Partial<Cake>[],
    @param.where(Cake) where?: Where<Cake>
  ): Promise<Count> {
    return new Promise<Count>((resolve, reject) => {
      let newCakes: Partial<Cake>[] = cakes.filter(cake => !cake.ID);
      let cakesToUpdate: Partial<Cake>[] = cakes.filter(cake => cake.ID);
      let imagestoDelete: string[] = [];
      cakesToUpdate.forEach(cakeToUpdate => {
        imagestoDelete.push(FileUtils.GetServerPath(process.env.CAKE_UPLOAD_PATH!, (cakeToUpdate as Cake).ImageUrl));
      });

      if (process!.env?.STORAGE_SUPPORTS_TRANSACTION!.toUpperCase() === "TRUE") {
        this.cakeRepository.beginTransaction(IsolationLevel.SERIALIZABLE).then(transaction => {
          Promise.all([
            this.cakeRepository.createAll(newCakes, { transaction: transaction }),
            this.cakeRepository.updateAll(cakes[0], where, { transaction: transaction }),
            transaction.commit()
          ]).then((completedTransaction) => {
            let count = completedTransaction[0].length + completedTransaction[1].count;
            imagestoDelete.forEach(imagetoDelete => {
              fs.unlink(imagetoDelete, (err) => {
                if (err) {
                  this.Logger.error(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateAll completed successfully but was unable to delete the file: ${imagetoDelete}`));
                }
                resolve({ count });
              })
            });
          }).catch(reason => {
            if (transaction.isActive()) {
              transaction.rollback();
            }
            reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateAll failed because of ` + reason));
          });
        }).catch(reason => {
          reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateAll failed because of ` + reason));
        });
      }
      else {
        let allUpdates = [];
        allUpdates.push(this.cakeRepository.createAll(newCakes));
        cakesToUpdate.forEach(cake => { allUpdates.push(this.cakeRepository.replaceById(cake.ID!, cake)) });
        Promise.all(allUpdates).then((completed) => {
          let count = completed[0].length + completed.length - 1;
          imagestoDelete.forEach(imagetoDelete => {
            fs.unlink(imagetoDelete, (err) => {
              if (err) {
                this.Logger.error(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateAll completed successfully but was unable to delete the file: ${imagetoDelete}`));
              }
              resolve({ count });
            });
          });
        }).catch(reason => {
          reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `updateAll failed because of ` + reason));
        });
      }
    });
  }

  @put('/cakes/{id}')
  @response(204, {
    description: 'All the details about the matching cake were successfully updated',
  })
  async replaceById(
    @IDFromPath('id') id: WebContracts.IDType,
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': CakeMultiPartFormDataPrser,
          schema: putSchema
        }
      }
    })
    cake: Cake | Partial<Cake> & Pick<Cake, "ID">
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.cakeRepository.findById(cake.ID).then(existingCake => {
        this.cakeRepository.replaceById(id, cake).then(() => {
          if (existingCake) {
            var toDelete = FileUtils.GetServerPath(process.env.CAKE_UPLOAD_PATH!, existingCake.ImageUrl);
            fs.unlink(toDelete, (err) => {
              if (err) {
                this.Logger.error(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `replaceById completed successfully but was unable to delete the file: ${toDelete}`));
              }
              resolve();
            })
          }
          else {
            resolve();
          }
        }).catch(reason => {
          reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `replaceById failed because of ` + reason));
        });
      }).catch(reason => {
        reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `replaceById failed because of ` + reason));
      });
    });
  }

  @del('/cakes/{id}')
  @response(204, {
    description: 'The matching cake was successfully deleted, together with the cake image',
  })
  async deleteById(
    @IDFromPath('id') id: WebContracts.IDType
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.cakeRepository.findById(id).then(existingCake => {
        this.cakeRepository.deleteById(id).then(() => {
          if (existingCake) {
            var toDelete = FileUtils.GetServerPath(process.env.CAKE_UPLOAD_PATH!, existingCake.ImageUrl);
            fs.unlink(toDelete, (err) => {
              if (err) {
                this.Logger.error(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `deleteById completed successfully but was unable to delete the file: ${toDelete}`));
              }              
              resolve();              
            })
          }
        }).catch(reason => {
          reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `deleteById failed because of ` + reason));
        });
      }).catch(reason => {
        reject(ErrorHandlingUtils.CreateRejection(500, Cake.constructor.name, `deleteById failed because of ` + reason));
      });
    });
  }
}


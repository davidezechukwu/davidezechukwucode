import {Entity, model, property} from '@loopback/repository';
import * as WebContracts from 'decode.web.contracts.typescript';

@model({ settings: { strict: true } })
export class Cake extends Entity implements WebContracts.ICakeModel {
  @property({
    id: true,
    type: WebContracts.IDTypeName,
    required: false,
    generated: true,
    jsonSchema: {
      description: "ID is auto-generated, designed to be either numeric or non-numeric and it is based on WebContracts.IDType"
    }
  })
  ID: WebContracts.IDType;
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description: `Name is a string and should not be no more than ${WebContracts.ICakeModelConstants.NAME_LENGTH} characters`,
      maxLength: WebContracts.ICakeModelConstants.NAME_LENGTH,
      errorMessage: {
        minLength: `Name should not exceed ${WebContracts.ICakeModelConstants.NAME_LENGTH} characters.`
      }
    }
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description: `Comment is a string and should not be no more than ${WebContracts.ICakeModelConstants.COMMENT_LENGTH} characters`,
      maxLength: WebContracts.ICakeModelConstants.COMMENT_LENGTH,
      errorMessage: {
        minLength: `Comment should not exceed ${WebContracts.ICakeModelConstants.COMMENT_LENGTH} characters.`
      }
    }
  })
  Comment: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description: `INPUT<type=file> on POSTs, PUTs, and indempotent PATCHes otherwise it is the full path to the Image when doing non-indemptotent PATCHes. Filename should not be no more than ${WebContracts.ICakeModelConstants.IMAGE_URL_LENGTH} characters`,
      maxLength: WebContracts.ICakeModelConstants.IMAGE_URL_LENGTH,
      errorMessage: {
        minLength: `ImageUrl should not exceed ${WebContracts.ICakeModelConstants.IMAGE_URL_LENGTH} characters.`
      }
    }
  })
  ImageUrl: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      description: `YumFactor is a number. YumFactor should be between ${WebContracts.ICakeModelConstants.YUM_FACTOR_MIN} and ${WebContracts.ICakeModelConstants.YUM_FACTOR_MAX} inclusive`,
      minimum: WebContracts.ICakeModelConstants.YUM_FACTOR_MIN,
      maximum: WebContracts.ICakeModelConstants.YUM_FACTOR_MAX,      
      errorMessage: {
        minimum: `YumFactor should not be less than ${WebContracts.ICakeModelConstants.YUM_FACTOR_MIN}.`,
        maximum: `YumFactor should not more than ${WebContracts.ICakeModelConstants.YUM_FACTOR_MAX}.`,        
      }
    }
  })
  YumFactor: number;


  constructor(data?: Partial<Cake>) {
    super(data);
  }  
}
  

export interface CakeRelations {
  // describe navigational properties here
}

export type CakeWithRelations = Cake & CakeRelations;

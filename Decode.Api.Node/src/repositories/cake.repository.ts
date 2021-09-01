import {inject} from '@loopback/core';
import { DefaultTransactionalRepository} from '@loopback/repository';
import {CakeDataSource} from '../datasources';
import {Cake, CakeRelations} from '../models';

export class CakeRepository extends DefaultTransactionalRepository<
  Cake,
  typeof Cake.prototype.ID,
  CakeRelations
> {
  constructor(
    @inject('datasources.Cake') dataSource: CakeDataSource,
  ) {
    super(Cake, dataSource);    
  }
}

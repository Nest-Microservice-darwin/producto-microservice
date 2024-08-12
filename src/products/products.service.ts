/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';


@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    //console.log('Databse Connected');
    this.logger.log('Databse Connected Product');
  }
  create(createProductDto: CreateProductDto) {
    return  this.product.create({
      data: createProductDto
    });
    //return 'This action adds a new product';
  }

  async findAll(paginationDto: PaginationDto) {
    //return `This action returns all products`;
    
    const { page, limit } = paginationDto;
    // total pagina
    const totalPages = await this.product.count({ where: { available:true} });
    // numeros de paginas
    const lastPage = Math.ceil( totalPages / limit );


    return {
      data: await  this.product.findMany(
        {
        skip:(page -1 ) * limit,
        take:limit,
        where: {
          available: true
        }

      }),
      meta: {
        total: totalPages,
        page:page,
        lastPage:lastPage
      }
    }
    ;
  }

  async findOne(id: number) {
    //return `This action returns a #${id} product`;
    const product = await  this.product.findFirst(
       {where:{id, available: true}
     });

     if (!product) {
      // se puede manejar este  Exception throw new NotFoundException(`Product with  id #${id} not found`)
      //throw new RpcException(`Product with  id #${id} not found`)
      throw new RpcException({ 
        message :`Product with  id #${id} not found`,
        status : HttpStatus.BAD_REQUEST
      })
     }

     return product;



  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id:__, ...data} = updateProductDto;
    
    
    await this.findOne(id);

    return this.product.update({ 
      where: {id},
    //data: updateProductDto,
    data: data,
    
  })
}

  async remove(id: number) {
    
    await this.findOne(id);
    /*
    return this.product.delete({
      where: {id}
   });
   */
   const  product = this.product.update({ 
    where: { id},
    data: {
      available: false
   }
   });
   return product;

    } 
   }
/* eslint-disable prettier/prettier */
import { Controller,   ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  //create(@Body() createProductDto: CreateProductDto) {
  @MessagePattern({cmd: 'create_product'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
    //return createProductDto;
  }

  //@Get()
  //findAll( @Query() paginationDto: PaginationDto ) {
  @MessagePattern({cmd: 'find_all_products'})
  findAll( @Payload() paginationDto: PaginationDto ) {
    //return paginationDto;
    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  @MessagePattern({cmd: 'find_one_product'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_products'})
  //pdate(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  update(
    @Payload() updateProductDto: UpdateProductDto, 
    //@Param('id', ParseIntPipe) id: number, 
    //@Body() updateProductDto: UpdateProductDto) {

    //return this.productsService.update(+id, updateProductDto);
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
    /*return { 
      id, updateProductDto
    }*/
    }
  

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_products'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}

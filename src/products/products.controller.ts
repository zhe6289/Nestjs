import { Controller, Get, Post, Delete, Header, Body, Param } from '@nestjs/common'
import { ProductService } from './products.service';
import { CreateProduct } from './products.swagger';
import { ApiCreatedResponse, ApiProperty, ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  @ApiBody({
    description: 'The product has been successfully created.',
    type: CreateProduct,
  })  
  addProduct (
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('expiredate') prodDate: string,
  ) : any {
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice, prodDate);
    return { id: generatedId };
  };

  @Get()
  @ApiCreatedResponse({ description: 'Get Product' })
  getAllProducts() {
    return this.productsService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId)
  }

  @Post(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number    
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return this.productsService.getProducts()
  }

  @Post('delete/:id')
  removeProduct(
    @Param('id') prodId: string
  ) {
    this.productsService.deleteProduct(prodId)
    return this.productsService.getProducts()
  }
}

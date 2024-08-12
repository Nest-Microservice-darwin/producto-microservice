/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

/* eslint-disable prettier/prettier */
export class PaginationDto{
    
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number=1;

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    
    limit?: number=10;
}
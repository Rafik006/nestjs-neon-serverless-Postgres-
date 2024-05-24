import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      return await this.databaseService.employee.create({
        data: createEmployeeDto,
      });
      
    } catch (error) {
      return this.handleDatabaseError(error)
    }
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    try {
      if (role)
        return  await this.databaseService.employee.findMany({
          where: {
            role,
          },
        });
      return await this.databaseService.employee.findMany();
      
    } catch (error) {
      return this.handleDatabaseError(error)

    }
  }

  async findOne(id: number) {
  try {
    return await this.databaseService.employee.findUnique({ where: { id } });
  } catch (error) {
    return this.handleDatabaseError(error)
  }
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    try {
      return await this.databaseService.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
      
    } catch (error) {
      return this.handleDatabaseError(error)
    }
  }

  async remove(id: number) {
   try {
    return await this.databaseService.employee.delete({where:{id}})
   } catch (error) {
    return this.handleDatabaseError(error)
   }
}
 handleDatabaseError(error:any){
  if(error instanceof Prisma.PrismaClientKnownRequestError ){
    if(error.code==="P2002"){
      throw new HttpException("Unique Constraint failed ",HttpStatus.BAD_REQUEST)
    }
  }
  throw new HttpException("Database Error",HttpStatus.INTERNAL_SERVER_ERROR)
 }
}
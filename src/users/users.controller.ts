import { Body, Controller, Delete, Get, Param, Patch, Post,ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
        /*
    get /users
    get /users/:id
    post /users
    patch /users/:id
    delete /users/:id
    */
   @Get()
   findAllUser(@Query("role") role?:'INTERN'|'ENGINEER'|"ADMIN"){
    return this.userService.findAll(role)
   }
   @Get(":id")
   findOneUser(@Param("id",ParseIntPipe)id :number){
    return this.userService.getOneUser(id)
   }
   @Post()
   addUser(@Body()createUserDto:CreateUserDto){
    return this.userService.adduser(createUserDto)
   }
   @Delete(":id")
   deleteUser(@Param("id",ParseIntPipe)id:number){
    return this.userService.deleteUser(id)
   }
   @Patch(":id")
   updateUser(@Param('id',ParseIntPipe) id :number ,@Body() updateUserDto:UpdateUserDto){
    return this.userService.updateOne(id,updateUserDto)
   }
}

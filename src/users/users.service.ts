import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];
  async findAll(role?:"INTERN"|"ENGINEER"|"ADMIN") {
   
    
    if(role){
        const users= this.users.filter(user=>user.role===role)
        if(!users.length)throw new NotFoundException("User role not Found")
        return users
    }
    return this.users
  }
  async getOneUser(id: number) {
   const user= this.users.find((user) => user.id === id);
   if(!user)throw new NotFoundException("user not found")
   return user
  }
  async updateOne(id: number, updateUserDto:UpdateUserDto) {
    const updatedUsers = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
    }
    return user
    });
    this.users=updatedUsers
    return this.users
  }
  async deleteUser(id:number){
    return this.users=this.users.filter(user=>user.id!==id)
  }
  async adduser(createUserDto:CreateUserDto){
    const highestId=this.users.sort((a,b)=>b.id-a.id)
    const newUser={
        id:highestId[0].id+1,
        ...createUserDto
    }
    this.users.push(newUser)
    return this.users
  }
}

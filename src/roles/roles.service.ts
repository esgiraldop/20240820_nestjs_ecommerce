import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetRoleByIdService {

    constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}

    async getRoleById(id:number):Promise<Role>{
        return this.roleRepository.findOne({where:{id}})
    }
}

@Injectable()
export class RolesService{
    constructor(private getRoleByIdService:GetRoleByIdService){}

    async getRoleById(id:number):Promise<Role>{
        return this.getRoleByIdService.getRoleById(id)
    }
}
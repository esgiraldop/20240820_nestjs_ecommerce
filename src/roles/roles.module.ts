import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { GetRoleByIdService, RolesService } from './roles.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    providers: [RolesService, GetRoleByIdService],
    exports: [RolesService, GetRoleByIdService]
})
export class RolesModule {}

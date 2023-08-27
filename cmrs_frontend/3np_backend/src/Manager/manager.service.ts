import { Controller, Injectable,NotFoundException,UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ManagerDto, NoticePostDTO,SafetyPostDTO,InvestigationTeamDTO } from './manager.dto';
import { InvestigationTeamEntity, ManagerEntity, NoticePostEntity, SafetyPostEntity, managerProfile } from "./manager.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class ManagerService{
  constructor(
    @InjectRepository(ManagerEntity)private managerRepo: Repository<ManagerEntity>,
    @InjectRepository(NoticePostEntity)private noticepostRepo: Repository<NoticePostEntity>,
    @InjectRepository(SafetyPostEntity)private safetypostRepo: Repository<SafetyPostEntity>,
    @InjectRepository(InvestigationTeamEntity)private investigationteamRepo: Repository<InvestigationTeamEntity>,
    @InjectRepository(managerProfile)private managerProfileRepo: Repository<managerProfile>,
    private mailerService: MailerService
) 
{ }

      // NoticePostInfo:NoticePostDTO
      //SafetyPostInfo:NoticePostDTO


      // async create(data:ManagerDto):Promise<ManagerEntity>{ 
      //   const salt=await bcrypt.genSalt();
      //   data.M_Password=await bcrypt.hash(data. M_Password,salt);
      //   return this.managerRepo.save(data);
      // }  

  
    async create(data:ManagerDto):Promise<ManagerEntity>{
 
      const salt=await bcrypt.genSalt();
    
      data.M_Password=await bcrypt.hash(data.M_Password,salt);
     
      return this.managerRepo.save(data);
    }


      async updateManagerById(id: number, data: ManagerDto): Promise<ManagerEntity> {
        await this.managerRepo.update(id, data);
        return this.managerRepo.findOneBy({ ManagerID:id });
      }



    // async AddNoticePost(data: NoticePostDTO): Promise<NoticePostEntity> {
    //   return this.noticepostRepo.save(data);
    // }

    async AddNoticePost(data:NoticePostDTO):Promise<NoticePostEntity>{
 
      return this.noticepostRepo.save(data);
    }

  
    async AddSafetyPost(data: SafetyPostDTO): Promise<SafetyPostEntity> {
      return this.safetypostRepo.save(data);
    }

    async AddInvestigationTeam(data: InvestigationTeamDTO): Promise<InvestigationTeamEntity> {
      return this.investigationteamRepo.save(data);
    }
    async getManagerProfilebyid(id): Promise<ManagerEntity[]> {
      const managerProfiles = await this.managerRepo.find({
        where: { ManagerID: id },
        relations: ['managerProfile'],
      });
    
      if (!managerProfiles || managerProfiles.length === 0) {
        throw new NotFoundException('Manager profile not found');
      }
  
      managerProfiles.forEach(manager => {
        manager.M_Password = undefined;
      });
    
      return managerProfiles;
    }

    // async signin(session,data) {
    //   if(session.ManagerID){
    //     return 0;
    //   }
    //   const mydata = await this.managerRepo.findOneBy({ ManagerID: data.ManagerID });
    // const match =  bcrypt.compare(data.password,mydata.M_Password);
    //   if(mydata && match){
    //     return 1;
    //   }
    //   return 0;
    // }

    async signin(session,data) {
      if(session.ManagerID){
        return 0;
      }
      const mydata = await this.managerRepo.findOneBy({ ManagerID: data.ManagerID });
     const match =  bcrypt.compare(data.password,mydata.M_Password);
      if(mydata && match){
        return 1;
      }
      return 0;
    }
    
  
// async sendEmail(data){
//    return  await this.mailerService.sendMail({
//            to: 'hussainrayied9@gmail.com',
//            subject: 'contacting Admin ',
//            text: 'I am trying to contact admin.', 
//          });
   
//    }
async sendEmail(data){
  return  await this.mailerService.sendMail({
          to: 'hussainrayied9@gmail.com',
          subject: 'contact admin ',
          text: 'I am trying to contact admin.', 
        });
  
  }

  async changePassword(ManagerID: number, newPassword: string): Promise<ManagerEntity> {
    const manager = await this.managerRepo.findOneBy({ManagerID:ManagerID});
    if (!manager) {
      throw new NotFoundException('manager not found');
    }
    manager.M_Password = newPassword;
  return this.managerRepo.save(manager);
  }  


  }


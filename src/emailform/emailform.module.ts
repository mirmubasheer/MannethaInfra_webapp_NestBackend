import { Module } from '@nestjs/common';
import { EmailFormController } from './emailform.controller';
import { EmailFormService } from './emailform.service';

@Module({
  controllers: [EmailFormController],
  providers: [EmailFormService],
})
export class EmailFormModule {}
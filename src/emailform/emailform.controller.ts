import { Body, Controller, Post } from '@nestjs/common';
import { EmailFormDto } from './dto/email-form.dto';
import { EmailFormService } from './emailform.service';

@Controller('emailform')
export class EmailFormController {
  constructor(private readonly emailFormService: EmailFormService) {}

  @Post()
  async sendEmail(@Body() emailFormDto: EmailFormDto) {
    return this.emailFormService.sendEmail(emailFormDto);
  }
}
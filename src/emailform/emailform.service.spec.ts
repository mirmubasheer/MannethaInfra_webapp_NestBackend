import { Test, TestingModule } from '@nestjs/testing';
import { EmailFormService } from './emailform.service';

describe('EmailformService', () => {
  let service: EmailFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailFormService],
    }).compile();

    service = module.get<EmailFormService>(EmailFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

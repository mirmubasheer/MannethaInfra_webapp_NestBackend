import { Test, TestingModule } from '@nestjs/testing';
import { EmailFormController } from './emailform.controller';

describe('EmailformController', () => {
  let controller: EmailFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailFormController],
    }).compile();

    controller = module.get<EmailFormController>(EmailFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

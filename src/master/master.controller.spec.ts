import { Test, TestingModule } from '@nestjs/testing';
import { MastersController } from './master.controller';
import { MastersService } from './master.service';

describe('MasterController', () => {
  let controller: MastersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MastersController],
      providers: [MastersService],
    }).compile();

    controller = module.get<MastersController>(MastersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PoliesController } from './polies.controller';
import { PoliesService } from './polies.service';

describe('PoliesController', () => {
  let controller: PoliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliesController],
      providers: [PoliesService],
    }).compile();

    controller = module.get<PoliesController>(PoliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

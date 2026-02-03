import { Test, TestingModule } from '@nestjs/testing';
import { PoliesService } from './polies.service';

describe('PoliesService', () => {
  let service: PoliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliesService],
    }).compile();

    service = module.get<PoliesService>(PoliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

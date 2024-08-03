import { Test, TestingModule } from '@nestjs/testing';
import { GenerateParamsStrService } from './generate-params-str.service';

describe('GenerateParamsStrService', () => {
  let service: GenerateParamsStrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateParamsStrService],
    }).compile();

    service = module.get<GenerateParamsStrService>(GenerateParamsStrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

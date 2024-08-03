import { Test, TestingModule } from '@nestjs/testing';
import { AutoCompleteService } from './auto-complete.service';

describe('AutoCompleteService', () => {
  let service: AutoCompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoCompleteService],
    }).compile();

    service = module.get<AutoCompleteService>(AutoCompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

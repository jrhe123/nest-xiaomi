import { Test, TestingModule } from '@nestjs/testing';
import { ManageController } from './manage.controller';

describe('ManagerController', () => {
  let controller: ManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageController],
    }).compile();

    controller = module.get<ManageController>(ManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

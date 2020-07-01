
import { BoxsController } from './boxs.controller';
import { BoxsService } from './boxs.service';

describe('BoxsController', () => {
    let BoxsController: BoxsController;
    let BoxsService: BoxsService;

    beforeEach(() => {
        BoxsService = new BoxsService();
        BoxsController = new BoxsController(BoxsService);
    });

    describe('findAll', () => {
        it('should return an array of Boxs', async () => {
            const result = ['test'];
            jest.spyOn(BoxsService, 'findAll').mockImplementation(() => result);

            expect(await BoxsController.findAll()).toBe(result);
        });
    });
});
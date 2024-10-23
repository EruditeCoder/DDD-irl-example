import express from 'express';
import { KitchenLookupController } from "./service/kitchen/controllers/kitchen-lookup.controller";
import { CustomerLookupController } from "./service/user/controllers/customer-lookup.controller";
import { ApiError } from "./utils/shared/api-error";

const app = express();

app.use(express.json());

app.get('/kitchen', async (req: any, res: any) => {
  const kitchenId = req.query.kitchenId;
  const kitchenName = req.query.kitchenName;

  let useMock = false;

  if (kitchenId === 'lookupWithFoundKitchen'
    || kitchenName === 'lookupWithFoundKitchen') {
    useMock = true;
  }

  const controller = new KitchenLookupController(useMock);

  const isValid = await controller.validate({ kitchenId, kitchenName });

  if (!isValid) {
    res.status(400).send(new ApiError(400, 'Bad request, check query parameters'));
    return;
  }

  const kitchen = await controller.process({ kitchenId, kitchenName });

  res.status('code' in kitchen ? kitchen.code : 200).send(kitchen);
});

app.post('/kitchen', async (req: any, res: any) => {
  res.send('Not implemented yet')
});

app.delete('/kitchen/:id', async (req: any, res: any) => {
  res.send('Not implemented yet')
});

app.get('/customer', async (req: any, res: any) => {
  const customerId = req.query.customerId;
  let useMock = false;

  if (customerId === 'lookupWithFoundCustomer') {
    useMock = true;
  }

  const controller = new CustomerLookupController(useMock);

  const isValid = await controller.validate(customerId);

  if (!isValid) {
    res.status(400).send(new ApiError(400, 'Bad request, check query parameters'));
    return;
  }

  const customer = await controller.process(customerId);

  res.status('code' in customer ? customer.code : 200).send(customer);
});

app.listen(7000, () => {
  console.log('Server listening on port 7000');
});

import { Brand } from './brand.model';

export async function getBrand(req: any, res: any) {
  const list = await Brand.find({}, {}, {});
  res.json(list);
}

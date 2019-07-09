import { Client } from '../../models';

export default {
  getOneById: async (req, res) => {
    const { clientId } = req.params;
    const client = await Client.getById(clientId);
    res.json({ found: !!client.id, client });
  },
  getAllByName: async (req, res) => {
    const { name } = req.params;
    const clients = await Client.getAllByName(name);
    res.json({ found: clients.length > 0, clients });
  },
};

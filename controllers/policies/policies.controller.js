import { Policy } from '../../models';

export default {
  getUserById: async (req, res) => {
    const { policyId } = req.params;
    const policy = new Policy(policyId);
    const client = await policy.getLinkedUser();
    res.json({ found: !!client.id, client });
  },
  getAllByName: async (req, res) => {
    const { name } = req.params;
    const policies = await Policy.getAllByUserName(name);
    res.json({ found: policies.length > 0, policies });
  },
};

import companyRelations from '@/data/relations.json';

export default (req, res) => {
    const { id } = req.query;

    const relations = companyRelations.find((company) => company.local_organization_id.id === id)?.relations;
    res.status(200).json({ data: relations });
};

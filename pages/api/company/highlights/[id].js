import companyHighlights from '@/data/highlights.json';

export default (req, res) => {
    const { id } = req.query;

    const highlights = companyHighlights.find((company) => company.local_organization_id.id === id)?.highlights;

    res.status(200).json({ data: highlights });
};

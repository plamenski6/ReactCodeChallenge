import companies from '@/data/companies.json';
import { matchSorter } from 'match-sorter';

export default (req, res) => {
    const { query } = req.query;

    let searchResults = [];

    if (query !== '') {
        searchResults = matchSorter(companies, query, {
            keys: ['company_name', 'local_organization_id.id', 'phone.phone_number', 'email.email'],
        });
    }

    const responseData = searchResults.map((result) => ({
        company_name: result.company_name,
        local_organization_id: result.local_organization_id,
        score: result.score,
        risk_assessment: result.risk_assessment,
        risk_assessment_code: result.risk_assessment_code,
        email: result.email,
        phone: result.phone,
        webpage: result.webpage,
        address: result.address,
        company_type: result.company_type,
        number_of_employees: result.number_of_employees,
        status: result.status,
        status_code: result.status_code,
    }));

    res.status(200).json({
        data: responseData,
        count: responseData.length,
    });
};

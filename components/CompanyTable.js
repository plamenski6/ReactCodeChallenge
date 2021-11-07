import {
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    styled,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../styles/company.module.scss';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CompanyTable = ({ companyInfo }) => {
    return (
        <>
            <TableContainer component={Paper} className={`${styles.table} mx-auto shadow`}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell className="text-secondary fw-bold">VAT</TableCell>
                            <TableCell align="right" className="fw-bold py-2">
                                {companyInfo.vat ? (
                                    <CheckCircleIcon className="text-success" />
                                ) : (
                                    <CancelIcon className="text-danger" />
                                )}
                            </TableCell>
                        </StyledTableRow>
                        {companyInfo.score && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Score:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.score}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.status && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Status:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.status}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.company_type.long && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Type:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.company_type.long}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.main_industry_code.code && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Industry code:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.main_industry_code.code}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.registered_capital.value && companyInfo.registered_capital.currency && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Registered capital:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.registered_capital.value} {companyInfo.registered_capital.currency}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.date_of_incorporation && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Date of incorporation:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.date_of_incorporation}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.local_organization_id.id && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Local Organization ID:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.local_organization_id.id}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        {companyInfo.risk_assessment && (
                            <StyledTableRow>
                                <TableCell className="text-secondary fw-bold">Risk assessment:</TableCell>
                                <TableCell align="right" className="fw-bold">
                                    {companyInfo.risk_assessment}
                                </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {companyInfo.company_secondary_names && (
                <Accordion className={`${styles.table} mx-auto mt-0 shadow`}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <p className={`${styles['secondary-names']} text-secondary fw-bold my-1`}>
                            Company secondary names
                        </p>
                    </AccordionSummary>
                    <AccordionDetails>
                        {companyInfo.company_secondary_names.map((obj, index) => (
                            <h6 key={index}>{obj.name}</h6>
                        ))}
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    );
};

export default CompanyTable;

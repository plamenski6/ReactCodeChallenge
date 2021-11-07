import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, styled } from '@mui/material';
import { setManagementData } from './utils/setManagementData';

const managementRoles = [
    'MANAGEMENT',
    'ADMINISTRATION',
    'CHIEF EXECUTIVE OFFICER',
    'BOARD OF DIRECTORS',
    'CHAIRMAN',
    'DEPUTY CHAIRMAN',
    'DEPUTY',
    'STAKEHOLDER',
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Management = ({ relations }) => {
    const { management, boardOfDirectors } = relations;
    const managementData = setManagementData(managementRoles, [...management, ...boardOfDirectors]);
    const keys = managementData.length > 0 && Object.keys(managementData[0]);

    return (
        <div>
            {managementData.length > 0 ? (
                <TableContainer component={Paper} className="shadow">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {keys.map((key) => (
                                    <TableCell key={`only keys ${key}`} className="fw-bold">
                                        {key}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managementData.map((data, i) => (
                                <StyledTableRow key={i}>
                                    {keys.map((key) => (
                                        <TableCell key={key}>{data[key]}</TableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h4>There is no relations</h4>
            )}
        </div>
    );
};

export default Management;

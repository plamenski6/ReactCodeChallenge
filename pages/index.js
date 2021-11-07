import Link from 'next/link';
import { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';
import styles from '../styles/home.module.scss';

export default function Home() {
    const [state, setState] = useState({
        inputValue: '',
        companyInfo: null,
        isLoading: false,
        error: false,
    });

    const inputHandler = (e) => {
        setState((prevState) => ({ ...prevState, inputValue: e.target.value }));
    };

    const fetchCompany = async () => {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        try {
            if (state.inputValue.trim() !== '') {
                let submitValue = state.inputValue.trim();
                submitValue = submitValue.replaceAll(/\+/gi, '%2B');
                const response = await fetch(`/api/search?query=${submitValue}`);
                const result = await response.json();
                setState({ inputValue: '', companyInfo: result.data, isLoading: false });
            } else {
                alert('First you must enter something');
                setState((prevState) => ({ ...prevState, isLoading: false }));
            }
        } catch (err) {
            setState((prevState) => ({ ...prevState, isLoading: false, error: true }));
        }
    };

    return (
        <Container fixed className="my-5">
            <h1 className="mb-5 text-center">
                Search for companies by name, CVR (Local Organization ID), phone number or email
            </h1>
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                <TextField
                    label="Enter here"
                    variant="standard"
                    value={state.inputValue}
                    onChange={inputHandler}
                    className={`${styles.input} me-0 me-sm-3 mb-3 mb-sm-0`}
                />
                <Button variant="contained" onClick={fetchCompany}>
                    Search
                </Button>
            </div>
            <Grid container className="mt-5" spacing={3}>
                {!state.isLoading ? (
                    <>
                        {!state.error ? (
                            <>
                                {state.companyInfo && (
                                    <>
                                        {state.companyInfo.length > 0 ? (
                                            <>
                                                {state.companyInfo.map((company, index) => {
                                                    return (
                                                        <Grid item xs={12} md={6} key={index}>
                                                            <Link
                                                                href={`/company/${company.local_organization_id.id}`}
                                                                passHref
                                                            >
                                                                <Card className="border shadow">
                                                                    <CardActionArea>
                                                                        <CardContent>
                                                                            <Typography
                                                                                gutterBottom
                                                                                variant="h5"
                                                                                component="div"
                                                                            >
                                                                                {company.company_name}
                                                                            </Typography>
                                                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    color="text.secondary"
                                                                                >
                                                                                    STATUS:{' '}
                                                                                    <span className="text-primary">
                                                                                        {company.status}
                                                                                    </span>
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    color="text.secondary"
                                                                                >
                                                                                    WEBPAGE:{' '}
                                                                                    <span className="text-primary">
                                                                                        {company.webpage}
                                                                                    </span>
                                                                                </Typography>
                                                                            </div>
                                                                        </CardContent>
                                                                    </CardActionArea>
                                                                </Card>
                                                            </Link>
                                                        </Grid>
                                                    );
                                                })}
                                            </>
                                        ) : (
                                            <div className="my-5 w-100 text-center">
                                                <h2>No companies found</h2>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="my-5 w-100 text-center">
                                    <h2>An error occurred</h2>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="my-5 w-100 text-center">
                        <CircularProgress />
                    </div>
                )}
            </Grid>
        </Container>
    );
}

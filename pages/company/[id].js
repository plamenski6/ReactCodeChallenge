import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, CircularProgress } from '@mui/material';
import Management from '@/components/Management';
import { companyRelations } from '@/requests';
import CircleIcon from '@mui/icons-material/Circle';
import CompanyTable from '@/components/CompanyTable';
import styles from '../../styles/company.module.scss';

export default function Company() {
    const router = useRouter();
    const { id } = router.query;

    const [state, setState] = useState({ companyInfo: null, relations: null, isLoading: true, error: false });

    useEffect(() => {
        if (id !== undefined) {
            const urls = [`/api/company/basics/${id}`, `/api/company/highlights/${id}`];

            Promise.all(
                urls.map((url) =>
                    fetch(url)
                        .then((res) => res.json())
                        .then((res) => res.data),
                ),
            )
                .then((data) => {
                    setState((prevState) => ({ ...prevState, companyInfo: data, isLoading: false }));
                })
                .catch((err) => {
                    setState((prevState) => ({ ...prevState, isLoading: false, error: true }));
                });

            companyRelations({ id }).then((res) => {
                setState((prevState) => ({ ...prevState, relations: res, isLoading: false }));
            });
        }
    }, [id, setState]);

    const highlightsNegative = [];
    const highlightsPositive = [];
    const highlightsNeutral = [];

    if (state.companyInfo) {
        for (const key in state.companyInfo[1]) {
            if (state.companyInfo[1][key].classification === 'negative') {
                highlightsNegative.push(state.companyInfo[1][key]);
            } else if (state.companyInfo[1][key].classification === 'positive') {
                highlightsPositive.push(state.companyInfo[1][key]);
            } else {
                highlightsNeutral.push(state.companyInfo[1][key]);
            }
        }
    }

    highlightsNegative.sort((a, b) => a.weight - b.weight);
    highlightsPositive.sort((a, b) => a.weight - b.weight);
    highlightsNeutral.sort((a, b) => a.weight - b.weight);
    const highlights = highlightsNegative.concat(highlightsPositive, highlightsNeutral);

    return (
        <>
            {!state.isLoading ? (
                <>
                    {!state.error ? (
                        <>
                            {state.companyInfo && (
                                <Container fixed className="my-5 text-center">
                                    <h1 className="pb-3 m-0">{state.companyInfo[0].company_name}</h1>
                                    <div
                                        className={`${styles['heading-border-bottom']} border-bottom border-dark w-50 mx-auto`}
                                    ></div>
                                    <h3 className="mt-5 mb-3">General company information</h3>
                                    <div className="d-flex justify-content-center">
                                        {state.companyInfo[0].phone.phone_number && (
                                            <p className="me-2 mb-2">
                                                <span className="fw-bold">Phone:</span>{' '}
                                                <a href={`tel: ${state.companyInfo[0].phone.phone_number}`}>
                                                    {state.companyInfo[0].phone.phone_number}
                                                </a>
                                            </p>
                                        )}
                                        {state.companyInfo[0].email.email && (
                                            <p className="ms-2 mb-2">
                                                <span className="fw-bold">Email:</span>{' '}
                                                <a href={`mailto: ${state.companyInfo[0].email.email}`}>
                                                    {state.companyInfo[0].email.email}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                    <p className="mb-4">
                                        <span className="fw-bold">Address:</span>{' '}
                                        <span>
                                            {state.companyInfo[0].address.country},{' '}
                                            {state.companyInfo[0].address.municipality},{' '}
                                            {state.companyInfo[0].address.city}, {state.companyInfo[0].address.street},{' '}
                                            {state.companyInfo[0].address.number},{' '}
                                            {state.companyInfo[0].address.zipcode}
                                        </span>
                                    </p>
                                    <CompanyTable companyInfo={state.companyInfo[0]} />
                                    <h3 className="mt-5 mb-4">Highlights</h3>
                                    <div className="text-start">
                                        {highlights &&
                                            highlights.map((highlight, index) => (
                                                <p key={index}>
                                                    <span className="fw-bold">{index + 1}.</span>{' '}
                                                    {highlight.classification === 'negative' ? (
                                                        <span className="text-danger">
                                                            {highlight.title} - {highlight.message}
                                                        </span>
                                                    ) : highlight.classification === 'positive' ? (
                                                        <span className="text-success">
                                                            {highlight.title} - {highlight.message}
                                                        </span>
                                                    ) : (
                                                        <span className="text-warning">
                                                            {highlight.title} - {highlight.message}
                                                        </span>
                                                    )}
                                                </p>
                                            ))}
                                    </div>
                                    <div className={`${styles.fieldset} border text-start p-2 ms-auto`}>
                                        <p className="fw-bold">Legend</p>
                                        <p className="m-0">
                                            Negative: <CircleIcon className="text-danger" />
                                        </p>
                                        <p className="m-0">
                                            Positive: <CircleIcon className="text-success" />
                                        </p>
                                        <p className="m-0">
                                            Neutral: <CircleIcon className="text-warning" />
                                        </p>
                                    </div>
                                    <h3 className="mt-5 mb-4">Relations</h3>
                                    <div>{state.relations ? <Management relations={state.relations} /> : null}</div>
                                </Container>
                            )}
                        </>
                    ) : (
                        <>
                            <div className={`${styles.spinner} d-flex justify-content-center align-items-center`}>
                                <h2>An error occurred</h2>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className={`${styles.spinner} d-flex justify-content-center align-items-center`}>
                    <CircularProgress />
                </div>
            )}
        </>
    );
}

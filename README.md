# Get started

Run the following commands in your terminal.

Clone the repo

```bash
git clone https://github.com/RisikaApS/ReactCodeChallenge
```

Install dependencies

```bash
yarn

# or if you prefer to use npm
npm install
```

Run the project

```bash
yarn dev

# or
npm run dev
```

It should now be running on `http://localhost:3000`.

# Introduction to the task

This task was created using **Next.js**. What you have to build doesn't really have anything to do with it per se, but it might still be a good idea to give their documentation a quick look. If you want to create a link between pages, they have a `<Link />` component you can use instead of the regular `<a />` tag (although a regular link still works fine).

Next.js uses **Server Side Rendering (SSR)** or **Static Site Generation (SSG)**, so there might be some pitfalls with certain styling solutions, e.g. if you are using **Material UI** you would have to wrap the component with `<NoSsr>` for the styles to apply if you are using `useStyles()`.

Just something to keep in mind.

**Next.js documentation**\
https://nextjs.org/docs/getting-started

# The task

This task is expected to take about **2-5 hours** (TODO: figure out if this is true).

**Dependencies**\
You are allowed to use whatever dependency you want to solve this. As an example, you could choose to use **Tailwind** to style the app, **react-query** for data fetching, and **date-fns** to format dates – it's all up to you.

**API**\
It will be on http://localhost:3000/api when you start the project. We have included some documentation for the API that is running locally when you start the project. You can see that here: [API Documentation](#api).

**Where your code goes**\
There are only **two** files you really need to touch: `pages/index.js` and `pages/company/[id].js`. The latter files is using square brackets because of how the routing works in Next.js (dynamic routing). You can read more about how this works here: https://nextjs.org/docs/basic-features/pages

## Search for a company

As a user, it's quite crucial to be able to search for stuff. That's why your first task is to create a search functionality. This would consist of the following:

1. A search bar the user can type in
2. The search results displayed in a user friendly way

## Show company information

When you have searched for a company, it would be nice if you could click on the search result to get more information about it.

Your second task will be to display the detailed company information. The sections we think would be relevant for you to show are the following:

1. **General company information**. This is some of the core company information.
2. **Highlights**. Some highlights that are generated based on their data.
3. **Relations**. Will display the relations to this company.

### General company information

These are the fields we think would be the most relevant for you to display in this section.

-   vat (if they are registered for VAT)
-   email
-   phone
-   score
-   address
-   status
-   company_name
-   company_type
-   main_industry_code
-   registered_capital
-   date_of_incorporation
-   local_organization_id
-   company_secondary_names
-   risk_assessment

You can display any of the other data points available, but the ones stated above are required.

### Highlights

Each highlight is given a classification: **positive**, **negative**, or **neutral**.

They also have a **weight** so they can be sorted by priority (the lower the weight, the higher the priority).

Your task for this section is to:

1. Sort the highlights first by **classification** in the order **negative**, **positive**, and then **neutral**. Then they should be sorted by **weight**, so the the highest priority is first within each classification.
2. Display the **title**, **message** and make them visually distinct by **classification** (e.g. different color and icon).

### Relations

For this task, most of the component is already build. The column that shows seniority needs a small change though: when the seniority is 12 or more months, it should be displayed in years (rounded to nearest whole, e.g. 1.5 years become 2 years).

The styling also most likely doesn't match yours, so your task is to tweak the styling a bit so it looks consistent with the rest of your design.

# API

We have provided you with an API you can use to fetch data. You don't have to touch this at all, but feel free to do so if you want. The files for the API are located under `pages/api`.

When you start the project, the API will be running along side the rest of the frontend. This means that the API will be under: `http://localhost:3000/api`, unless any of the defaults are changed.

## Searching for companies

An endpoint that allows you to search for companies by **name**, **CVR (Local Organization ID)**, **phone number**, and **email**.

**Request**\
`GET /api/search?query={name-cvr-phone-or-email}`

### Example

This is what searching for "risika" would look like.

**Request**\
`GET /api/search?query=risika`

**Response**

```json
{
    "data": [
        {
            "company_name": "RISIKA A/S",
            "local_organization_id": {
                "id": "37677892",
                "country": "DK"
            },
            "score": 4,
            "risk_assessment": "Medium",
            "risk_assessment_code": "MEDIUM",
            "email": {
                "email": "contact@risika.dk",
                "hidden": false
            },
            "phone": {
                "hidden": false,
                "phone_number": "+4542905757"
            },
            "webpage": "risika.dk",
            "address": {
                "city": "København K",
                "coname": null,
                "number": "26B, st.",
                "street": "Kronprinsessegade",
                "country": "DK",
                "zipcode": 1306,
                "municipality": "København",
                "postdistrict": "København K"
            },
            "company_type": {
                "long": "Aktieselskab",
                "short": "A/S"
            },
            "number_of_employees": {
                "interval": "20-49",
                "specific": 22
            },
            "status": "Active",
            "status_code": "ACTIVE"
        }
    ],
    "count": 1
}
```

## Getting basic company information

An endpoint that provides you with the core information for the company. This includes information like **company name**, **address**, **Risika Score**, **industry**, etc.

**Request**\
`GET /api/company/basics/{local-organization-id}`

### Example

This is what getting the basic company data for Risika looks like (CVR: 37677892).

**Request**\
`GET /api/company/basics/37677892`

**Response**

```json
{
    "data": {
        "vat": true,
        "bank": {
            "company_name": null,
            "local_organization_id": {
                "id": null,
                "country": "DK"
            }
        },
        "email": {
            "email": "contact@risika.dk",
            "hidden": false
        },
        "phone": {
            "hidden": false,
            "phone_number": "+4542905757"
        },
        "score": 4,
        "address": {
            "city": "København K",
            "coname": null,
            "number": "26B, st.",
            "street": "Kronprinsessegade",
            "country": "DK",
            "zipcode": 1306,
            "municipality": "København",
            "postdistrict": "København K"
        },
        "purpose": "Selskabets formål er at etablere og drive en online kreditvurderingsplatform",
        "webpage": "risika.dk",
        "status_code": "ACTIVE",
        "company_name": "RISIKA A/S",
        "company_type": {
            "long": "Aktieselskab",
            "short": "A/S"
        },
        "audit_selected": true,
        "financial_year": {
            "end": "--12-31",
            "start": "--01-01"
        },
        "powers_to_bind": "Selskabet tegnes af en direktør i forening med et medlem af bestyrelsen eller af den samlede bestyrelse",
        "holding_company": false,
        "last_report_date": "2019-12-31",
        "financial_reports": true,
        "status_valid_from": "2016-07-01",
        "main_industry_code": {
            "code": "829100",
            "isic": {
                "code": "8291",
                "section": "N",
                "description": "Activities of collection agencies and credit bureaus"
            },
            "nace": {
                "code": "8291",
                "section": "N",
                "description": "Activities of collection agencies and credit bureaus"
            },
            "section": "N",
            "description": "Inkassovirksomhed og kreditoplysning"
        },
        "registered_capital": {
            "value": 557574,
            "currency": "DKK"
        },
        "number_of_employees": {
            "interval": "20-49",
            "specific": 22
        },
        "risk_assessment_code": "MEDIUM",
        "date_of_incorporation": "2016-04-30",
        "local_organization_id": {
            "id": "37677892",
            "country": "DK"
        },
        "company_secondary_names": [
            {
                "name": "Globus Platform ApS",
                "valid_to": "2017-05-17",
                "valid_from": "2017-01-14"
            },
            {
                "name": "Global Business Platform ApS",
                "valid_to": "2017-05-17",
                "valid_from": "2016-04-30"
            }
        ],
        "advertisement_protection": true,
        "secondary_industry_codes": [
            {
                "isic": {
                    "code": "6202",
                    "section": "J",
                    "description": "Computer consultancy and computer facilities management activities"
                },
                "nace": {
                    "code": "6202",
                    "section": "J",
                    "description": "Computer consultancy activities"
                },
                "section": "J",
                "priority": 2,
                "group_name": "Computerprogrammering, konsulentbistand vedrørende informationsteknologi og lignende aktiviteter",
                "industry_code": "620200",
                "industry_description": "Konsulentbistand vedrørende informationsteknologi"
            },
            {
                "isic": {
                    "code": "6311",
                    "section": "J",
                    "description": "Data processing, hosting and related activities"
                },
                "nace": {
                    "code": "6311",
                    "section": "J",
                    "description": "Data processing, hosting and related activities"
                },
                "section": "J",
                "priority": 1,
                "group_name": "Databehandling, webhosting og lignende serviceydelser; webportaler",
                "industry_code": "631100",
                "industry_description": "Databehandling, webhosting og lignende serviceydelser"
            }
        ],
        "status": "Active",
        "risk_assessment": "Medium"
    }
}
```

## Getting highlights for a company

This will give you the highlights for a company. This is some key information about the company, e.g. they could be quite young, maybe they belong to an industry with a lot of bankruptcies, could also be that they use an auditor.

Each highlight is give a classification: **positive**, **negative**, or **neutral**.

They also have a **weight** so they can be sorted by priority.

**Request**\
`GET /api/company/highlights/{local-organization-id}`

### Example

This is what the highlights for Risika would look like (CVR: 37677892)

**Request**\
`GET /api/company/highlights/37677892`

**Response**

```json
{
    "data": {
        "age": {
            "title": "Young company",
            "message": "The company is less than 5 years old. Our analysis shows that the risk is higher on companies that are less than 5 years old. The credit score has been affected negatively.",
            "description": "Warning of higher risk if the company is started within 5 years.",
            "classification": "negative",
            "weight": 1900,
            "data": null
        },
        "industry_risk": {
            "title": "Industry risk",
            "message": "The company is in an industry with low bankruptcy risk.",
            "description": "The information is available if the company is in an industry with high or low bankruptcy risk.",
            "classification": "positive",
            "weight": 2010,
            "data": null
        },
        "address": {
            "title": "Change of address",
            "message": "This company has changed address within the last 3 years.",
            "description": "The company have changed address within the last 3 years.",
            "classification": "neutral",
            "weight": 3700,
            "data": null
        },
        "change_in_management": {
            "title": "Changes in management",
            "message": "This company had changes in the management and/or the board within the last year.",
            "description": "There have been many changes in the management and/or the board within the last year.",
            "classification": "neutral",
            "weight": 3600,
            "data": null
        },
        "change_in_employees": {
            "title": "Change in number of employees",
            "message": "Number of employees has increased the last 3 years.",
            "description": "Number of employees has consistently changed over the last 3 years.",
            "classification": "positive",
            "weight": 2500,
            "data": null
        },
        "three_years_profitloss": {
            "title": "Profit or loss streak",
            "message": "This company has had losses the past 3 years.",
            "description": "Results the last 3 years.",
            "classification": "negative",
            "weight": 1450,
            "data": null
        },
        "intangible_assets": {
            "title": "Large proportion of intangible assets",
            "message": "Intangible assets represents more than 50% of the total equity which may mean a higher financial risk.",
            "description": "Warning if the value of intellectual property represents over 50% of equity in the company. This is a potentially risk factor.",
            "classification": "negative",
            "weight": 1950,
            "data": null
        },
        "type_of_auditor_assistance": {
            "title": "Level of audit",
            "message": "The latest financial statement have been audited by a registered auditor.",
            "description": "Warning about the level of involvement from an auditor in the creation of the financial statement.",
            "classification": "neutral",
            "weight": 1255,
            "data": null
        },
        "connected_bankruptcies": {
            "title": "Analysis of bankruptcies",
            "message": "We found 2 bankruptcies or enforced closures among the people related to this company. It did not affect the overall credit score.",
            "description": "Amount of historical bankruptcies with the people associated with the company (executives, board of directors etc.).",
            "classification": "negative",
            "weight": 1150,
            "data": {
                "4000397851": [20043679],
                "4000456851": [25921542]
            }
        },
        "return_on_assets": {
            "title": "Return on assets",
            "message": "The company is within the bottom 10% of return on assets in its industry.",
            "description": "Highlights if the return on assets is within the top or bottom 10% among the company industry.",
            "classification": "negative",
            "weight": 1750,
            "data": null
        }
    }
}
```

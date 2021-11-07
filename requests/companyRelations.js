/*************
 * Relations *
 *************/

const CHAIRMAN = 'CHAIRMAN';
const VICE_CHAIR = 'DEPUTY CHAIRMAN';
const BOARD_MEMBER = 'BOARD OF DIRECTORS';
const SUBSTITUTE = 'DEPUTY';

const CEO = 'CHIEF EXECUTIVE OFFICER';
const MANAGEMENT = 'MANAGEMENT';
const STAKEHOLDER = 'STAKEHOLDER';
const BRANCH_MANAGER = 'BRANCH MANAGER';

/*******************
 * Other constants *
 *******************/

/***********
 * Helpers *
 ***********/

/**
 * Removes all the inactive functions.
 *
 * @param {object} relation The relations filter to only active functions.
 * @returns {object} The relation with active functions only.
 */
const activeFunctions = (relation) => ({
    ...relation,
    functions: relation.functions.filter((fn) => fn.valid_to === null),
    inactiveFunctions: relation.functions.filter((fn) => fn.valid_to !== null),
});

/**
 * Checks if the relation has one of the given roles.
 *
 * @param  {...string} roles The roles to check if the relation has.
 * @returns {boolean} Whether the relation contains one of the roles.
 */
const hasRoles =
    (...roles) =>
    (relation) => {
        return (
            !!relation.functions.filter((fn) => roles.includes(fn.function)).length ||
            !!relation.inactiveFunctions.filter((fn) => roles.includes(fn.function)).length
        );
    };

/*********************
 * Extract relations *
 *********************/

const getBoardOfDirectors = (relations) => {
    const isChairman = hasRoles(CHAIRMAN);
    const isViceChair = hasRoles(VICE_CHAIR);
    const isBoardMember = hasRoles(BOARD_MEMBER);
    const isSubstitute = hasRoles(SUBSTITUTE);

    const activeRelations = relations.map(activeFunctions);

    return [
        ...activeRelations.filter(isChairman).map((relation) => ({ ...relation, label: 'president' })),
        ...activeRelations.filter(isViceChair).map((relation) => ({ ...relation, label: 'vice_president' })),
        ...activeRelations.filter(isBoardMember).map((relation) => ({ ...relation, label: 'board_member' })),
        ...activeRelations.filter(isSubstitute).map((relation) => ({ ...relation, label: 'substitute' })),
    ];
};

const getManagement = (relations) => {
    const isCEO = hasRoles(CEO);
    const isManagement = hasRoles(MANAGEMENT);
    const isStakeholder = hasRoles(STAKEHOLDER);
    const isBranchManager = hasRoles(BRANCH_MANAGER);

    const activeRelations = relations.map(activeFunctions);

    return [
        ...activeRelations.filter(isCEO).map((relation) => ({ ...relation, label: 'ceo' })),
        ...activeRelations.filter(isManagement).map((relation) => ({ ...relation, label: 'management' })),
        ...activeRelations.filter(isStakeholder).map((relation) => ({ ...relation, label: 'stakeholder' })),
        ...activeRelations.filter(isBranchManager).map((relation) => ({ ...relation, label: 'branch_manager' })),
    ];
};

const companyRelations = ({ id }) => {
    return fetch('/api/company/relations/' + id)
        .then((data) => data.json())
        .then(({ data }) => {
            return {
                boardOfDirectors: getBoardOfDirectors(data),
                management: getManagement(data),
            };
        });
};

export default companyRelations;

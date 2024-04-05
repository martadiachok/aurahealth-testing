const baseUrl = 'https://www.aurahealth.io/';

export const url = {
    main: baseUrl,
    signUp: `${baseUrl}signup?`,
    homePage: `${baseUrl}aura`, 
};

export const endpoints = {
    signUpPage: {
        recommendedItemList: `${baseUrl}auraServices/lists/recommend`,
    },
    components: {
        login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0LrsrMjanxYWJEJJgIb3vf2Zj7WXqvws',
    }
};
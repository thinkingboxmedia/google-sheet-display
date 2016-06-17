import Treeful from 'treeful';

export default class Sheet {
    constructor() {
        const CLIENT_ID = '678991547747-lfcd22t3d8t2poeh6gos6ksr53h7o6ui.apps.googleusercontent.com';
        const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        const SHEET_ID = '1jm77HKUY2CLxSUnvnkS4vb2TXMNqi7_tzwZeiPDXpCk';
        const RANGE = 'A2:C';

        Treeful.addNode('projects');

        this.loadScript = (url) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                const waitForAuth = () => {
                    if(!gapi.auth) {
                        setTimeout(waitForAuth, 100);
                    } else {
                        checkAuth();
                    }
                };
                waitForAuth();
            };
            document.getElementsByTagName("head")[0].appendChild(script);
        };

        const checkAuth = () => {
            gapi.auth.authorize({
                client_id: CLIENT_ID,
                scope: SCOPES,
                immediate: true
            }, handleAuthResult);
        };

        const handleAuthResult = (authResult) => {
            if(authResult && !authResult.error) {
                loadSheetsApi();
            } else {
                triggerAuth();
            }
        };

        const triggerAuth = () => {
            gapi.auth.authorize({
                client_id: CLIENT_ID,
                scope: SCOPES,
                immediate: false
            }, handleAuthResult);
        };

        const loadSheetsApi = () => {
            var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
            gapi.client.load(discoveryUrl).then(getData);
        };

        const getData = () => {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: SHEET_ID,
                range: RANGE,
            }).then((response) => {
                Treeful.setData('projects', response.result.values);
            }, (response) => {
                console.error(new Error('Error: ' + response.result.error.message));
            });
        };
    }
}
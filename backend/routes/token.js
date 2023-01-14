const fetch = require('cross-fetch');
const router = require('express').Router();

// import fetch from "node-fetch";
router.route('/').post((req, res) => {
    const clientId = 'c337eec4-4d39-4907-93cc-50c5e564a0f4';
    const clientSecret = 'rqT8Q~DYlYbRGqW.m-hENEPFABjX0~vOd879zdog';
    // const appScope = [];
    const token = req.body.token;
    if (!token) {
        res.status(500).send('No Token!');
        return;
    }
    /* Rabia Williams & Bob German, November 3, 2021, TeamsAuth, https://github.com/OfficeDev/TeamsAuth.git */
    var oboPromise = new Promise((resolve, reject) => {
        const url = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
        const params = {
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "client_id": clientId,
            "client_secret": clientSecret,
            "scope": [
                'User.Read',
            ],
            "requested_token_use": "on_behalf_of",
            "assertion": token
        };
        fetch.fetch(url, {
            method: "POST",
            body: toQueryString(params),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            console.log('result of login', result);
            if (result.status !== 200) {
                result.json().then(json => {
                    reject({ "error": json["error"] });
                });
            } else {

                result.json().then(json => {
                    resolve(json);
                });
            }
        });
    });
    oboPromise.then((result) => {
        console.log('\x1b[36m%s\x1b[0m', ' Oh my heavens, it is the access token! ');
        console.log("-----------------------------------------");
        console.log(result["access_token"]);
        console.log("\x1b[32m", "-----------------------------------------");

        //graph call using the access token
        fetch("https://graph.microsoft.com/v1.0/me/",
            {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "authorization": "bearer " + result["access_token"]
                },
                mode: 'cors',
                cache: 'default'
            })
            .then(res => res.json())
            .then(json => {
                res.send(json);
            });

    }, (err) => {
        console.log(err); // Error: 
        res.send(err);
    });
});
function toQueryString(queryParams) {
    let encodedQueryParams = [];
    for (let key in queryParams) {
        encodedQueryParams.push(key + "=" + encodeURIComponent(queryParams[key]));
    }
    return encodedQueryParams.join("&");
};
module.exports = router;
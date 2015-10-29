
var config = { };

// should end in /

config.rootUrl  = process.env.ROOT_URL                  || 'http://52.68.245.78:8934/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '1463592137273147',
    appSecret:      process.env.FACEBOOK_APPSECRET      || 'ccb55c1ea2831d1b7a4c6f4e2ccf0bb4',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'sale­s­in­form',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;

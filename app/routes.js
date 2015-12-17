var passportConf = require('./config/passport'),

    /**
     * Controllers (route handlers).
     */
    homeController = require('./controllers/home'),
    userController = require('./controllers/user'),

    apiController = require('./controllers/api');

module.exports = function(app){

    app.get('/', passportConf.isAuthenticated, homeController.index);

    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);

    app.get('/logout', userController.logout);

    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);

    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);

    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);

    app.get('/account', passportConf.isAuthenticated, userController.getAccount);
    app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

    app.get('/api', passportConf.isAuthenticatedToApi, apiController.index);

}

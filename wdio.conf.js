exports.config = {
    specs: [
        ['./features/**/registration.feature', './features/**/makingorder.feature']
    ],

    exclude: [

    ],

    capabilities: [{
        maxInstances: 5,

        browserName: 'chrome',
        acceptInsecureCerts: true
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'https://demo.nopcommerce.com/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['chromedriver'],

    framework: 'cucumber',

    reporters: ['spec'],

    cucumberOpts: {

        require: ['./features/**/step-definitions/steps.js'],

        backtrace: false,

        requireModule: [],

        dryRun: false,

        failFast: false,

        snippets: true,

        source: true,

        strict: false,

        tagExpression: '',

        timeout: 60000,

        ignoreUndefinedDefinitions: true
    },
}

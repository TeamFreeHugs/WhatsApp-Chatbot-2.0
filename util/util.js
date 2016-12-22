function isDevelopment() {
    return process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === undefined;
}

function isProduction() {
    return !isDevelopment();
}

module.exports = {isProduction,isDevelopment}

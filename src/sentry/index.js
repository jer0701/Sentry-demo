import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';

function install() {
    const dsn = `https://f5f39ecb816f441a9a9f7f1340c08f7f@sentry.io/1385355`;
    if (dsn) {
        Raven.config(dsn).install();
    } else {
        // eslint-disable-next-line no-console
        console.warn('未指定 SENTRY_DSN 参数，将无法正确收集错误日志');
    }
}

function middleware(options = {}) {
    return createRavenMiddleware(Raven, options);
}

export default {
    install,
    middleware,
};

// const Sentry = require("@sentry/node")
// const { ProfilingIntegration } = require("@sentry/profiling-node")
// const _ = require("@sentry/tracing");
// const {
//     NotFoundError,
//     ValidationError,
//     AuthorizeError
// } = require("./app-errors")

module.exports = (app) => {
    // Sentry.init({
    //     dsn: "https://446507204e2d732a9dcd4a871f636404@o4505939899252736.ingest.sentry.io/4505939911245824",
    //     integrations: [
    //         // enable HTTP calls tracing
    //         new Sentry.Integrations.Http({ tracing: true }),
    //         // enable Express.js middleware tracing
    //         new Sentry.Integrations.Express({ app }),
    //         new ProfilingIntegration()
    //     ],
    //     // Performance Monitoring
    //     tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in cvTemplateion!
    //     // Set sampling rate for profiling - this is relative to tracesSampleRate
    //     profilesSampleRate: 1.0 // Capture 100% of the transactions, reduce in cvTemplateion!
    // })

    app.use((error, req, res, next) => {
        // let reportError = true
        // const commonError = [NotFoundError, ValidationError, AuthorizeError]
        // commonError.forEach((typeOfError) => {
        //     if (error instanceof typeOfError) {
        //         reportError = false
        //     }
        // })

        // if (reportError) {
        //     Sentry.captureException(error)
        // }
        const statusCode = error.statusCode || 500
        const data = error.data || error.message
        return res.status(statusCode).json(data)
    })
}

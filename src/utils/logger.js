const morgan = require("morgan")

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

module.exports = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        "-",
        tokens["response-time"](req, res),
        "ms",
        tokens.body(req, res)

    ].join(" ")
})
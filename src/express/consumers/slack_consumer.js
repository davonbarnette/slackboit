class SlackConsumer {
    static onChallenge(req, res) {
        const {body} = req;
        const {token, challenge} = body;

        if (token && challenge) res.status(200).json({challenge})
    }
}

module.exports = SlackConsumer;
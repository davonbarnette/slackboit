const Register = require('../../register');
const UserFactory = require('../../factories/user_factory');
const SlackMessageFactory = require('../../factories/slack_message_factory');
const IDoThings = require('../../utils/idothings');
const USERS_BY_ID = require('../../utils/users');
const path = require('path');
const Slackboit = require('../../slackboit');
const Store = require('../../store');

class SlackConsumer {

    static onGetMockTemplate(req, res){
        res.sendFile(path.join(__dirname, '..', '..', '/assets/templates/mock_message/index.html'))
    }

    static onChallenge(req, res) {
        const {body} = req;
        const {token, challenge} = body;

        if (token && challenge) res.status(200).json({challenge})
    }

    static reboot(req, res){
        if (Store.slackboitedGoodbye){
            Slackboit.startEmUp();
            res.status(200).json({message:'you did it'});
        }
        else res.status(200).json({message:'slackboit is not ded yet, cannot reboot'})

    }

    static onGetFunctions(req, res){
        return res.status(200).send(Register);
    }

    static onGetUsers(req, res){
        return res.status(200).send(USERS_BY_ID);
    }

    static sanitize(s){
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

    static async onPostMessage(req, res){
        let { text, user_id, fn_name } = req.body;

        if (!text || !user_id || !fn_name) res.status(400).send({message:"Message, user, and function name are required."});
        text = SlackConsumer.sanitize(text);
        let [registerItem] = Register.filter(item => item.name === fn_name);
        if (!registerItem) res.status(400).send({message:"Function name provided does not match current register."});

        let user = new UserFactory(user_id);
        let slackMessage = new SlackMessageFactory(user_id, text);

        let post = await registerItem.function(null, user, slackMessage);
        if (!post) return res.status(500).send({message:"Could not execute function. Probably causes: Your function did not return a Post Object from the provided text or you are using a database call/the bot in your function (not allowed)"});
        if (post.spongebobify !== false) post.message = IDoThings.spongebobMemeify(post.message);
        return res.status(200).send(post);
    }
}

module.exports = SlackConsumer;
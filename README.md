# Slackboit

A for-the-bois application that runs on Slack.

## Create A New Function
### Step 1: Setup your GitHub repository

1. Download and install [GitHub Desktop](https://desktop.github.com/), a client to manage git repositories.
2. Make sure Davon has invited you to be a collaborator. You must have a GitHub account to become a collaborator.
3. Clone the repository.
    1. Open GitHub Desktop, and in the top-left corner, click the Current Repository button.
    2. Click the `Add` button, and hit `Clone Repository...`.
    3. Search for the `slackboit` repository in the list, and choose the `Local Path` (where you want to the repository to exist).
    4. Open up your IDE of choice, and open the folder that you just saved the GitHub repository to.

You should now have a working repository.

### Step 2: Create your function.

Before we create your function, you need to know a little bit about how Slackboit works. Whenever you send a message in Slack, Slackboit receives that message
and sequentially runs through an array of functions. You can find these functions in `src/register.js`. Slackboit runs through _each_ of these functions, whether or not
your specific criteria are met. There is a way to make sure that no functions run after yours, but we'll get into that later.

Your functions will **always** receive a slackMessage (take a look at the src/example_objects/message.js to see what properties a message contains), pretty much abstracting you away from having to know how the
application as a whole works. You'll see that when we go to the first step.

#### Step 2.1
In your IDE, navigate to and open your specific function file. Since I'm Davon, I'll go into `src/functions/yeetus.js`.

#### Step 2.2
Copy the example function into your file nested *within* the class.
```
    static exampleFunction(bot, user, slackMessage){
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,

            // Check out https://api.slack.com/methods/chat.postMessage for a list of potential parameters. You can do
            // stuff like change the icon url, e.g. {icon_url:'https://myicon.com/icon.png'}
            params: {},

            //stop: false, // [Default: true] This tells slackboit to avoid running any functions after this one
            //spongebobify: false, // [Default: true] If you want to spongebobify your string in a weird way, set this to false
            //channel: false, // [Default: <Current Channel>] If you want to send your message to a custom channel
        };

        const acknowledge = 'slackboit';
        const message = 'example message';
        if (text.startsWith(acknowledge)) {
            // Start custom logic


            // End custom logic


            // Alter the post object's message (post.message)
            post.message = message;

            // Return the post object so slackboit knows what to do with it
            return post;
        }
    }
```
2. Follow the directions at the top of the file in order to create your new function.


### Step 3: Register your function.
In `register.js`, register your function. Remember we talked about the array of functions that Slackboit runs through -
this is the one. Follow the same pattern the other entries have (command, function, description), and it will register
it under the Slackboit help desk, or if you just insert the function itself, then that also works. Read the top of the file for more details.
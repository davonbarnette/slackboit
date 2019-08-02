# Slackboit

A for-the-bois application that runs on Slack.

## Update: Slackboit Version 2.0 - August 2, 2019
In order to get Slackboit to work on the web, and to have a more robust way of dealing with chaining functions,
we had to go through a slight re-architecture of code. Changes listed below:
1. We no longer use `bot.postMessage`, and now *return* a `post` object. You are still able to use `bot` but please do not use it to post your message. Please refer to the documentation below about the `post` object.
2. All functions now pass `params` by adding it to the `post` object. This is where you'll attach your `icon_url` if you have one. Options for this are located in the `post` object.
3. All functions are now spongebobified by default. Options for this are located in the `post` object.
4. All functions will automatically post to the channel in which the slack message originated (no more having to pass in `channel` when posting a message). Options for this are located in the `post` object.
5. You no longer have to return `"stop"` to stop subsequent functions from running - this is now located in the `post` object.
6. Each function is now passed `bot`, `user`, and `slackMessage` *only*. The `slackMessage` argument contains all of the stuff you're used to (`text`, `channel`, etc.). We use object destructuring to get the data from the `slackMessage`. Check the example function for more details.
7. Speaking of, we removed the `exampleFunction` and the directions from your file (no more wall of text on your file, yeet) to this documentation page.

## Setup your GitHub repository

1. Download and install [GitHub Desktop](https://desktop.github.com/), a client to manage git repositories.
2. Make sure Davon has invited you to be a collaborator. You must have a GitHub account to become a collaborator.
3. Clone the repository.
    1. Open GitHub Desktop, and in the top-left corner, click the Current Repository button.
    2. Click the `Add` button, and hit `Clone Repository...`.
    3. Search for the `slackboit` repository in the list, and choose the `Local Path` (where you want the repository to exist on your local computer).
    4. Open up your IDE or text editor of choice, and open the folder that you just saved the GitHub repository to.

You should now have a working repository.

## Create A New Function
Before we create your function, you need to know a little bit about how Slackboit works. Whenever you send a message in Slack, Slackboit receives that message
and sequentially runs through an array of functions. You can find these functions in `src/register.js`. Slackboit runs through _each_ of these functions, whether or not
your specific criteria are met. There is a way to make sure that no functions run after yours, but we'll get into that later.

### Step 1: Create your function in your file.

Your functions will **always** receive a `slackMessage` (take a look at the example_objects/message.js to see what properties a slackMessage contains), a `bot`, and a `user` object - pretty much abstracting you away from having to know how the
application as a whole works. You'll see that when we actually create our new function.

1. In your IDE, navigate to and open your specific function file. Since I'm Davon, I'll go into `src/functions/yeetus.js`.
2. Copy the example function below into your file (`src/functions/<YOUR_NAME>.js`) nested *within* the class.
    ```
   /* 
    * Incoming arguments to your example function:
    * 1. bot: The slack bot API abstraction. https://github.com/mishk0/slack-bot-api for more details. After a recent update, you really don't need this any longer, but I kept it here just for more usability in the future.
    * 2. user: The entire user object. Check /example_objects/slack_user.js for more details.
    * 3. slackMessage: The entire slack message object. Check /example_objects/message.js for more details.
    */
   
    static exampleFunction(bot, user, slackMessage){
        // This is called object destructuring. slackMessage is an object, and we are pulling the properties below (text, channel, etc.) out of it.
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;
    
        // Think of this post object as your configuration. This will let Slackboit know exactly what you want to do. As more functionality is added
        // you'll see more options appear below.
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
        if (text.startsWith(acknowledge)) {
            // Start custom logic
    
    
            // End custom logic
    
    
            // Alter the post object's message (post.message)
            post.message = 'example message';
    
            // Return the post object so slackboit knows how to handle your function
            return post;
        }
    }
    ```
3. Change the name of your function to anything of your choosing (e.g. `exampleFunction(...)` > `deletusTheYeetus(...)`).
4. Pre-configure your post by altering the `post` object. There are directions in the example function. For more clarification refer to the `Post Object` section below.
5. Change the `const acknowledge = 'slackboit'` to the word or phrase you want to acknowledge.
6. Create a conditional to check whether you want to send a message or not. In the example function, I've added a `text.startsWith()`, but you can do anything, e.g. `text.endsWith()`, `text.includes()`, etc.
7. Add any logic you need to execute in order to get your desired functionality.
8. Change the message by modifying the `post.message` field. Most of the time, you'll do this in the custom logic by: `post.message = "your new message"`.
9. Return the `post` object so that Slackboit knows what to do with it. This is the most important part. You *must* return the `post` object.

### Step 2: Register your function.
In `register.js`, register your function. Remember we talked about the array of functions that Slackboit runs through -
this is the one. Follow the same pattern the other entries have (command, function, description), and it will register
it under the Slackboit help desk, or if you just insert the function itself, then that also works. Read the top of the file for more details.

#### Example Register object
```
{
    acknowledge: 'slackboit',
    name: 'The Original Meme',
    command: 'slackboit [PHRASE]',
    description: 'Spongeboit',
    function: Yeetus.spongebobMeme,
}
```
| Field         | Required      | Description  | Type |
| ------------- |-------------  | -----        |-------  |
| function          | Yes           | Your function. You must pass the *function* (correct: `Yeetus.spongebobMeme`) not the *call of the function* (wrong: `Yeetus.spongebobMeme()`). | `function`|
| command          | Yes           | This is so people know what to type to execute your command. | `string`|
| acknowledge          | No           | Current, we don't do anything with this, but it's best practice just to put your acknowledge strings in here.| `string` or array of `string`s|
| name          | No           | This is mostly for the Slackboit help desk, so people can identify what your function is.| `string` |
| description          | No           | A description of your function. | `string`|

## The Post Object
The `post` object you see in your function is mainly for configuration. It tells Slackboit what to do with your function. Below are the
fields that are currently available.

#### Example post object
```
let post = {
    message: null,
    
    // Check out https://api.slack.com/methods/chat.postMessage for a list of potential parameters. You can do
    // stuff like change the icon url, e.g. {icon_url:'https://myicon.com/icon.png'}
    params: {},
    
    //stop: false, // [Default: true] This tells slackboit to avoid running any functions after this one
    //spongebobify: false, // [Default: true] If you want to spongebobify your string in a weird way, set this to false
    //channel: false, // [Default: <Current Channel>] If you want to send your message to a custom channel
};
```

| Field         | Required      | Description  | Default |
| ------------- |-------------  | -----        |-------  |
| message          | Yes           | The message you want to send to Slack. If no message is passed, your function will not do anything.| `null`|
| params          | No           | These are Slack specific parameters. Navigate to [Slack Message Parameters](https://api.slack.com/methods/chat.postMessage) for a list of potential parameters.| `{}` |
| stop          | No           | Setting this to false will allow Slackboit to run through functions after yours.| `true`|
| spongebobify          | No           | Whether or not your function will spongebobify the entire output. In general, you won't have to mess with this because all functions should be spongebobified by default, but if you want to turn of spongebobifying so you can spongebobify it yourself, then disable this.| `true`|
| channel          | No           | By default, your post will be posted to the channel in which the slackMessage originated from. If you want to set a custom channel (must be the id of the channel), then you can do so here.| `<Current Channel>`|


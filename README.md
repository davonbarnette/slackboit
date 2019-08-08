# Slackboit

A for-the-bois application that runs on Slack.

## Documentation
[Getting Started](https://slackboitdocs.davon.dev/getting-started)

[Implementing a New Function](https://slackboitdocs.davon.dev/implement-your-function)

[Testing your New Function](https://slackboitdocs.davon.dev/testing-your-function)

[Changelogs](https://slackboitdocs.davon.dev/changelogs)

## Update: Slackboit Version 2.0 - August 2, 2019
In order to get Slackboit to work on the web, and to have a more robust way of dealing with chaining functions,
we had to go through a slight re-architecture of code. Changes listed below:
1. We no longer use `bot.postMessage`, and now *return* a `post` object. You are still able to use `bot` but please do not use it to post your message. Please refer to the documentation below about the `post` object.
2. All functions now pass `params` by adding it to the `post` object. This is where you'll attach your `icon_url` if you have one. Options for this are located in the `post` object.
3. All functions are now `spongebobified` by default. Options for this are located in the `post` object.
4. All functions will automatically post to the channel in which the slack message originated (no more having to pass in `channel` when posting a message). Options for this are located in the `post` object.
5. You no longer have to return `"stop"` to stop subsequent functions from running - this is now located in the `post` object.
6. Each function is now passed `bot`, `user`, and `slackMessage` *only*. The `slackMessage` argument contains all of the stuff you're used to (`text`, `channel`, etc.). We use object destructuring to get the data from the `slackMessage`. Check the example function for more details.
7. Speaking of, we removed the `exampleFunction` and the directions from your file (no more wall of text on your file, yeet) to this documentation page.
8. You'll see that I've already gone ahead and changed your functions to correctly use the new architecture. If you currently have code you haven't committed, you will most likely have `Merge Conflicts`. Please let me know if this is the case.

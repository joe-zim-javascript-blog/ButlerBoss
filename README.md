# ButlerBoss Repo
This project is (will be?) a web-based dashboard for managing Minecraft servers

## Take Note
This repository is no longer active. **Note**, this project *is* still being worked on, but until it is ready to be shown to the world, I am using a separate private repository on BitBucket. Once it is done, this repo will be replaced with that.

## Notable Differences
The project has taken a completely different course than what you currently see here, at least in the form of technologies:

1. No Bower. I'm just gonna stick with NPM, especially with the 3.0 changes making their structure similar, there isn't any real point to using Bower any more.
2. Browserify and Babel. I'll be using ES2015 code because it's so much better. Browserify will be used to gather my node_modules into my built script. No longer using RequireJS. If I need lazy loading, I can use SystemJS, but the app should be relatively small so including everything into a single script shouldn't be an issue.
3. I'll probably be moving away from Lodash templates to something else just because I'm not required to use all of Lodash because or the separate NPM modules they have. The primary reason I used Lodash templates is because I already had them included, so I didn't want to waste the bytes.
4. Gulp/Webpack/Broccoli/Brunch instead of Grunt. The more advanced my builds got, the more I disliked Grunt, so I've moved on. I've primarily used Gulp, but I'm investigating Webpack, Broccoli, and Brunch to see what seems like the best fit for me.
5. Ampersand instead of Backbone/MarionetteJS. Ampersand makes good use of small NPM modules and has more capability baked in than Backbone. MarionetteJS still has a few things that I like, but they shouldn't be difficult to mix into Ampersand on my own.
6. No Twitter Bootstrap. This project is a bit of a learning experience in responsive design and I want to do things slightly differently than Bootstrap and I want to be able to see all the facets of Responsive design from the ground up. There will probably be other CSS libraries/frameworks throw in, but I want to limit them. Also, I'll be using a flavor of BEM for my CSS along with [mixing in whatever else make sense](http://www.sitepoint.com/atomic-oobemitscss/).
7. Probably no Testem. I'm still looking around at options, but whatever I choose, it'll be integrated into the build system. Jasmine will probably remain my unit testing framework because we're starting to use it at work, though [Tape](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4) is starting to make an impression on me.
8. Folder structure will be quite different.

Feel free to go to [my JavaScript blog](http://www.joezimjs.com) to try to contact me or use an issue on here if you want to discuss why I'm making all of these changes.

## Set Up
This project may not even work properly any more, but if you wanna try, then follow these steps.

* clone repo
* run `npm install`
* run `bower install`
* run `grunt`
* run `node butlerboss`

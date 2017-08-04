# ButlerBoss Repo
This project is (will be?) a web-based dashboard for managing Minecraft servers

## Take Note
This repository is no longer active. **Note**, this project *is* still being worked on, but until it is ready to be shown to the world, I am using a separate private repository on BitBucket. Once it is done, this repo will be replaced with that.

## Notable Differences
The project has taken a completely different course than what you currently see here, at least in the form of technologies:

1. No Bower. I'm moving to webpack (seen later) and it works better with npm... plus npm has gotten a lot better since this project started.
2. I'll be using ES2015+ thanks to Babel
3. I'll probably be moving away from Lodash templates to something else just because I'm not required to use all of Lodash because or the separate NPM modules they have. The primary reason I used Lodash templates is because I already had them included, so I didn't want to waste the bytes.
4. Webpack will replace RequireJS and Grunt. The more advanced my builds got, the more I disliked Grunt, so I've moved on and my current preference is webpack.
5. VueJS instead of Backbone/MarionetteJS. I've worked a lot with Vue lately and it is just far superior to working with Backbone and Marionette.
6. No Twitter Bootstrap. This project is a bit of a learning experience in responsive design and I want to do things slightly differently than Bootstrap and I want to be able to see all the facets of Responsive design from the ground up. There will probably be other CSS libraries/frameworks throw in, but I want to limit them. Also, I'll be using CSS Modules and a very scalable system, which [I've written about on AppendTo](https://appendto.com/2017/07/maintainable-optimized-css-css-modules/).
7. Testing will be done with the technologies that get pre-packaged with Vue-CLI.

Feel free to go to [my JavaScript blog](http://www.joezimjs.com) to try to contact me or use an issue on here if you want to discuss why I'm making all of these changes.

## Set Up
This project may not even work properly any more, but if you wanna try, then follow these steps.

* clone repo
* run `npm install`
* run `bower install`
* run `grunt`
* run `node butlerboss`

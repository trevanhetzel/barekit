Bare Ninja
==========

Bare Ninja is a front-end project starter meant to be a starting point and structural guide rather than a full framework. It's bare enough to not interfere with your custom styles or scripts, but yet has enough functioning modules to jumpstart a project in no time.

_Disclaimer: This is an [appendTo](http://appendto.com) Labs project and as such there is no promise of support or even future development of this project. We are working on this project to meet a need at appendTo and sharing it in the spirit of open source software. If it helps you or your team meet needs as well, that is awesome – however, use at your own risk._

# Getting Started

The best way to get Bare Ninja up and running on a project is to install via [Bower](http://bower.io/). You shouldn't ever touch the source anyway, so with Bower it's easy to get the latest updates.

First, make sure you have Bower installed. Then you can add this line to a `bower.json` file `"bare-ninja": ""` (version number to come) or simply do a `bower install bare-ninja`.


### JavaScript

Getting up and running with the Bare Ninja JavaScript modules is very simple. You first need to reference the latest jQuery file (also installable via Bower), and then reference the `bare-ninja.min.js` file at the bottom of your HTML page (before the closing body tag).

If you installed jQuery and Bare Ninja using Bower, the paths would look something like this:

```
<script src="bower_components/jquery/dist/jquery.min.js">
<script src="bower_components/bare-ninja/js/bare-ninja.min.js">
```

### CSS

The Bare Ninja CSS can be used in a few different ways. The core code comes with both a Sass and Stylus version, so the ideal way is to `@import` the bare-ninja.scss or bare-ninja.styl file from your main Sass or Stylus stylesheet.

Again, if you installed via Bower, the `@import` rule would look something like this:

```
// Import Bare Ninja
@import "bower_components/bare-ninja/css/bare-ninja";
```

Using Bare Ninja in this way allows you to compile it using your own preferred pre-processor, task runner, compression style, etc.

The other way to use the Bare Ninja CSS is, of course, to just reference it directly in your markup.

```
<link rel="stylesheet" href="bower_components/bare-ninja/css/bare-ninja.css">
```

# Usage

For details on using Bare Ninja, visit the website at [a2labs.github.io/bare-ninja](http://a2labs.github.io/bare-ninja)

# License

This project is submitted under an MIT license. Please read our [LICENSE](https://github.com/a2labs/bare-ninja/blob/master/LICENSE) file. All source code is copyright appendTo unless noted otherwise.
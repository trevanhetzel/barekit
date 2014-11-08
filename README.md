BareKit
==========

### [Visit website for full usage docs](http://trevanhetzel.github.io/barekit)

BareKit is a front-end project starter meant to be a starting point and structural guide rather than a full framework. It's bare enough to not interfere with your custom styles or scripts, but yet has enough functioning modules to jumpstart a project in no time.

_The project creator and lead for BareKit is [Trevan Hetzel](http://appendto.com/team/trevan-hetzel/) ([trevanhetzel](https://github.com/trevanhetzel)) . Use [Github issues](http://github.com/trevanhetzel/barekit) and pull requests or reach out to Trevan directly for support and contributions to BareKit._

# Getting Started

The best way to get BareKit up and running on a project is to install via [Bower](http://bower.io/). You shouldn't ever touch the source anyway, so with Bower it's easy to get the latest updates.

First, make sure you have Bower installed. Then you can add this line to a `bower.json` file `"barekit": "~0.7.0"` or simply do a `bower install barekit`.


### JavaScript

Getting up and running with the BareKit JavaScript modules is very simple. You first need to reference the latest jQuery file (also installable via Bower), and then reference the `barekit.min.js` file at the bottom of your HTML page (before the closing body tag).

If you installed jQuery and BareKit using Bower, the paths would look something like this:

```
<script src="bower_components/jquery/dist/jquery.min.js">
<script src="bower_components/barekit/js/barekit.min.js">
```

### CSS

The BareKit CSS can be used in a few different ways. The core code comes with both a Sass and Stylus version, so the ideal way is to `@import` the barekit.scss or barekit.styl file from your main Sass or Stylus stylesheet.

Again, if you installed via Bower, the `@import` rule would look something like this:

```
// Import BareKit
@import "bower_components/barekit/css/barekit";
```

Using BareKit in this way allows you to compile it using your own preferred pre-processor, task runner, compression style, etc.

The other way to use the BareKit CSS is, of course, to just reference it directly in your markup.

```
<link rel="stylesheet" href="bower_components/barekit/css/barekit.css">
```

# Usage

For details on using BareKit, visit the website at [trevanhetzel.github.io/barekit](http://trevanhetzel.github.io/barekit)
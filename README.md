Bare Ninja
==========

Bare Ninja is a front-end project starter meant to be a starting point and structural guide rather than a full framework. It's bare enough to not interfere with your custom styles or scripts, but yet has enough functioning modules to jumpstart a project in no time.

_Disclaimer: This is an [appendTo](http://appendto.com) Labs project and as such there is no promise of support or even future development of this project. We are working on this project to meet a need at appendTo and sharing it in the spirit of open source software. If it helps you or your team meet needs as well, that is awesome – however, use at your own risk._

## Getting Started

Bare Ninja is meant to be used very flexibly in a "pick and choose" manner. It comes with everything you need to get a project started right out of the box, but can be used in an existing project however you please.

The ideal way to get started with Bare Ninja is to to simply clone the repo. A Bower, Grunt and `package.json` file are in the root directory, so running a `npm install && bower install` will get the few dependencies installed in a snap.

## Usage

### CSS
...
### JavaScript

#### Accordion

```js
$('#my-element').bnAccordion({
    "multiExpand": true
});
```

#### Dropdown Nav

```js
$('#my-element').bnDropdownNav({
    "click": false
});
```

#### Modal

```js
$('#my-element').bnModal({
    "modalId": "example-modal"
});
```

#### Off-Canvas

```js
$('#my-element').bnOffCanvas();
```

#### Tabs

```js
$('#my-element').bnTabs();
```

#### Toggle

```js
$('#my-element').bnToggle({
    "toggle": "toggle-example"
});
```

## Compiling
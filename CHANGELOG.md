<a name="0.5.1"></a>
## v0.5.1 (In progress)


#### Bug Fixes

* Tidied up checkboxes and radios to be formatted/positioned correctly by default ([d2aa4a34](https://github.com/a2labs/barekit/commit/d2aa4a3472bd959b2d6fb211a05038dca2df31da))
* Fixed z-index issue with modals ([62fddc1f](https://github.com/a2labs/barekit/commit/62fddc1f5c6d9318cb69b167e5c89166843e3665))
* Allow multiple modals on the same page ([607af9cd](https://github.com/a2labs/barekit/commit/607af9cd49da3c1f3e1e774f12550c16d4f1ed24))


#### Features

* Support for two off-canvas elements ([52a76560](https://github.com/a2labs/barekit/commit/52a7656034e6d26328597ae77ac5831e3417e7cf))
* Added ability to input custom value to breakpoint mixin ([2372edc0](https://github.com/a2labs/barekit/commit/2372edc07b9082bf7ef6c2a90f93e19ade26855f))
* Added `.editorconfig` file. ([26175e87](https://github.com/a2labs/barekit/commit/26175e87d9ad1b2df8dbecdeb4e418fe27d4f73e))


#### Breaking Changes

* **Grid class names have changed** ([6b3b0dba](https://github.com/a2labs/barekit/commit/6b3b0dbafdeea83c5a6707d068273b5a6a799184))

Previously, BareKit was using some very generic selectors to select all elements that start with `sm`, `md` and `lg` and give them some box model properties (`float` and `padding`). This caused some trouble, so I decided to separate out those box model properties to their own new class: `has-gutter`. This way, you can still use classes like `sm-6` for widths, but aren't tied down to the padding and float if you don't want to be.

So if you want to still use the "grid" (not just the width classes), a line that previously looked like this:

```
<div class="sm-12 md-6 lg-1" style="background: #e1e1e1">1</div>
```

will now need to look like this:

```
<div class="sm-12 md-6 lg-1 has-gutter" style="background: #e1e1e1">1</div>
```

* **Off-canvas class names have changed** ([52a76560](https://github.com/a2labs/barekit/commit/52a7656034e6d26328597ae77ac5831e3417e7cf))

In order to support two off-canvas elements instead of one, the class names needed to set up off-canvas have changed. 

This:

```
<div class="off-canvas-contain right-align">
    <section class="off-canvas">
        I am content off-canvas.
    </section>

    <section class="off-canvas-content">
        <a href="#" class="off-canvas-trigger">Trigger</a>
        <p>I am the main content of the page that gets pushed over when the off-canvas is open. I also contain the off-canvas trigger.</p>
    </section>
</div>
```

Now needs to look like this:

```
<div class="off-canvas-contain">
    <section class="off-canvas-left">
        I am content off-canvas.
    </section>

    <section class="off-canvas-right">
        I am content off-canvas.
    </section>

    <section class="off-canvas-content">
        <a href="#" class="off-canvas-trigger-left">Left trigger</a>
        <a href="#" class="off-canvas-trigger-right">Right trigger</a>
        <p>I am the main content of the page that gets pushed over when the off-canvas is open. I also contain the off-canvas trigger.</p>
    </section>
</div>
```

`right-align` and `left-align` classes have been removed from the `.off-canvas-contain` element and `-right`/`-left` have been appended to the `.off-canvas` and `.off-canvas-trigger` elements.
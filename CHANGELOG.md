<a name="0.7.0"></a>
## v0.7.0

#### Bug Fixes

* Added back in defaults to breakpoints to allow the overriding of them in a settings file ([906089e3](https://github.com/trevanhetzel/barekit/commit/906089e39a70d08081d36839bfdea385fe31c174))
* Added direct child selector to improve nesting in tabs ([71981377](https://github.com/trevanhetzel/barekit/commit/71981377c019288e92b41c0a5dd0785eabd199ef))
* Prevent default for non-absolute links in accordion ([b5417a2c](https://github.com/trevanhetzel/barekit/commit/b5417a2cfe0356324ea0180c54d0bcb402722e70))
* Added direct child trigger selector to trigger only true accordion "triggers" ([1b3a2dde](https://github.com/trevanhetzel/barekit/commit/1b3a2dde2fc2b7381838b9d35f6f8e7a80c4a8d3))

#### Features

* Added Docco task ([eb883e59](https://github.com/trevanhetzel/barekit/commit/eb883e59a52bc7559a6f93ac038177690befd2a2))

#### Breaking Changes

* A new default class of `df-` has been added to the grid. The `sm-` classes have been moved inside a media query, so using `sm-` as your default class will no longer kick in until the viewport has reached the value of the `$small` breakpoint. ([a2d2116b](https://github.com/trevanhetzel/barekit/commit/a2d2116b59fc1454b3feb9c050f818af29a5ed81))

<a name="0.6.2"></a>
## v0.6.2

#### Bug Fixes

* Fix modal background issue ([0e3d60b1](https://github.com/trevanhetzel/barekit/commit/0e3d60b1085a237d2fc57ad4c06007a8d78e87e6))
* Change the default dropdown behavior to trigger on hover instead of click ([ed2e206a](https://github.com/trevanhetzel/barekit/commit/ed2e206aaca6c95816e799e67ab455ff5e71b7eb))

#### Features

* Added QUnit (no tests have been written yet) ([c977f7d6](https://github.com/trevanhetzel/barekit/commit/c977f7d6116ae0e4b1ca0f7705200e492170b4ec))

#### Breaking Changes

* JavaScript has been re-organized. Compiled JS is still in the `js` folder (along with a new unminified version), but source JS has moved to a `src` folder ([c977f7d6](https://github.com/trevanhetzel/barekit/commit/c977f7d6116ae0e4b1ca0f7705200e492170b4ec))

<a name="0.6.1"></a>
## v0.6.1

#### Bug Fixes

* Fix to allow `.off-canvas-trigger-` child elements to trigger the off-canvas module.

<a name="0.6.0"></a>
## v0.6.0

#### Bug Fixes

* Tidied up checkboxes and radios to be formatted/positioned correctly by default ([d2aa4a34](https://github.com/trevanhetzel/barekit/commit/d2aa4a3472bd959b2d6fb211a05038dca2df31da))
* Fixed z-index issue with modals ([62fddc1f](https://github.com/trevanhetzel/barekit/commit/62fddc1f5c6d9318cb69b167e5c89166843e3665))
* Allow multiple modals on the same page ([607af9cd](https://github.com/trevanhetzel/barekit/commit/607af9cd49da3c1f3e1e774f12550c16d4f1ed24))


#### Features

* Support for two off-canvas elements ([52a76560](https://github.com/trevanhetzel/barekit/commit/52a7656034e6d26328597ae77ac5831e3417e7cf))
* Added ability to input custom value to breakpoint mixin ([2372edc0](https://github.com/trevanhetzel/barekit/commit/2372edc07b9082bf7ef6c2a90f93e19ade26855f))
* Added `.editorconfig` file. ([26175e87](https://github.com/trevanhetzel/barekit/commit/26175e87d9ad1b2df8dbecdeb4e418fe27d4f73e))
* Toggle "triggers" now get an active class (`toggle-trigger-shown`) added when toggled.
* Can now specify that a toggled element be hidden when clicking anywhere else on the page (new data attr: `closeOnClick`) ([56a12737](https://github.com/trevanhetzel/barekit/commit/56a127377bb08d2b83707b72e02ee2e63e446cb0))


#### Breaking Changes

* **Grid class names have changed** ([6b3b0dba](https://github.com/trevanhetzel/barekit/commit/6b3b0dbafdeea83c5a6707d068273b5a6a799184))

Previously, BareKit was using some very generic selectors to select all elements that start with `sm`, `md` and `lg` and give them some box model properties (`float` and `padding`). This caused some trouble, so I decided to separate out those box model properties to their own new class: `has-gutter`. This way, you can still use classes like `sm-6` for widths, but aren't tied down to the padding and float if you don't want to be.

So if you want to still use the "grid" (not just the width classes), a line that previously looked like this:

```
<div class="sm-12 md-6 lg-1" style="background: #e1e1e1">1</div>
```

will now need to look like this:

```
<div class="sm-12 md-6 lg-1 has-gutter" style="background: #e1e1e1">1</div>
```

* **Off-canvas class names have changed** ([52a76560](https://github.com/trevanhetzel/barekit/commit/52a7656034e6d26328597ae77ac5831e3417e7cf))

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

<a name="0.5.0"></a>
## v0.5.0

Initial release
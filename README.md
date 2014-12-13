Takeflight Default Static Build
===============================
This is the default static site build template for Takeflight projects. Currently it just builds out a static build folder.
The docs will eventually include our style guides and recomended reading material. Please do make issues/branch if you 
think a feature is missing or have a suggestion for the styleguides.

```
npm install
npm start
```

Features:

- Serves files
- Watches files 
    - No livereload (complain if you want it and we'll add a flag)
- Javascript
    - Browserify
    - ES6 via traceur
    - Shim non-commonjs modules (example in package.json/src/javascript/app.js)
    - JShint
- Jade
- Scss
    - Autoprefixer
    - Minifies
    - Pixrem
    - Sourcemaps 
- Image compression

Takeflight Docs
===============================
TODO: Decide on some sort of docstring standard. 

Inline Docs
---------------
Do use @todo.
Try to use the following to further qualify the @todo:

- ``` @hack ``` - If it is a browser hack include which browser (eg FF33) and if available the bug report (eg bugzilla:1054353)
- ``` @cleanup ``` - Sometimes when time is short you have to do something in a quicker way not a better way. If this is the case ALWAYS leave an @cleanup so we can jump there when we have time
- ``` @performance ``` - If you identify a performance bottleneck but because of a necessity or time restrictions you cant address it at the time add this tag.
- ``` @needstest ``` - If something can/should be tested but time doesnt permit then leave this tag.
- ``` @makemodule ``` - If a piece of functionality can be split out into an npm/pypy module then tag it thusly.

Takeflight HTML(Jade) Styleguide
================================
```
.story.story__reading-mode
    .story--header(style="background-image:url('theurl.jpg');")
        .reading-wrap
            .story--meta
                h1.story--title Little red riding hood gets got
                h2.story--subtitle ...And the grizzly international political situation that unfolded because of it.
                include components/social
    .story--content
        .reading-wrap
            .richtext
                p Steam aged marshmellows in a fine-mesh strainer with rum for about an hour to perfect their bitterness.
                p Small meatloaf can be made aged by soaking with maple syrup.
                blockquote For a bitter large paste, add some emeril's essence and celery.
```

Takeflight HTML Accessibility
================================

Logo Markup
-----------

```
a.logo(href="/", title="Return to the homepage")
  img(src="/images/logo.gif" alt="Client logo")

h1.visuallyhidden Welcome to Clients’s website
```

See [this CSS wizardry article](http://csswizardry.com/2010/10/your-logo-is-an-image-not-a-h1/) for a write up

*Note: the .visuallyhidden class is a helper that makes content invisable to the eye but readable by braile and screen readers.

Navigation Markup
-----------------

```
nav.primary-navigation
    a.primary-navigation--item(href="#1", title="The Title") The Link
    a.primary-navigation--item(href="#2", title="The Title") The Link
```

See [this post by Chris Coyer](http://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/) for more details/justification.

*Note: if you need to support IE8 (re js event attachment bugs) use div(role="navigation") instead.

Takeflight CSS Styleguide
===============================
Styles here are heavily inspired by BEM - with a few subtle changes. If your not familiar with it give [this post a read.](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

We differ in one way - for we use `--` for blocks and `__` for modifiers. This is because `_`'s require pressing shift as well.

A contrived example:

```
.component {
    &--block {}
        &--block__modifier {}
        
    &__component-modifier {}
}
```

A real world example - with some notes:

1. Try to nest as little as possible. As a rule of thumb 3 selectors deep is far enough (excluding :before/:hover)
2. Even if element isn't styled include it for context - its not included in the output.
3. Represent the HTML hierarchy with indents.
4. Inside a 'content' zone is the only place you should be styling elements based on their name (read: richtext/wysiwyg) 
5. Unfortunately because we use libsass we can only nest parent modifiers 1 deep - so we have to put up with this. This would be nice to change. Discuss.
6. Use REM's everywhere. A pixel fallback is automatically added during compilation.

```
.story {
    @include clearfix();
    position: relative;
    // #1
    &--header {
        height: 650px;
        background-size: cover;
    }
        // #2
        &--meta {} 
            // #3
            &--title {
                margin-bottom: 0.2rem;
                @include font-size(40px);
                font-family: $heading-font;
                font-weight: 200;
            }
            &--subtitle {
                @include font-size(16px);
                text-transform: uppercase;
                font-family: $ui-font;
                font-weight: 400;
            }

    &--content {
        @include clearfix();
        &.story__has-sidebar {
            padding: 5rem;
            width: 65%;
            float: left;
        }
        // #4
        img {
            max-width: 100%;
            height: auto;
        }
    }

    &__reading-mode {
        // #5
        .story--meta {
            position: absolute;
            bottom: 25px;
            left: 0;
        }

        .story--content {
            color: $mineshaft;
            background: $desertstorm;
        }

        .story--title,
        .story--subtitle {
            // #6
            padding: 0.625rem;
            float: left;
            clear: both;
        }
    }
}
```

Takeflight JavaScript Styleguide
================================
Coming soon - see [issue #6](https://bitbucket.org/takeflight/static-template/issue/6/javascript-style-paradime) for discussions.

Some preferred JavaScript libraries:

- Complex/responsive sliders - [idangerous swiper](http://www.idangero.us/sliders/swiper/)
- Basic animations (where not possible with CSS) - [velocity.js](http://julian.com/research/velocity/)
- Intensive animations - [greensock framework](http://greensock.com/)
- Responsive lightwindow (jQuery dep) - [lightGallery](http://sachinchoolur.github.io/lightGallery/index.html)
- Custom select box - [fancySelect](https://github.com/octopuscreative/FancySelect)
- Charts/graphs - [chartistjs](http://gionkunz.github.io/chartist-js/)

JavaScript libraries we need to find:

- Super simple/light slider/carousel

Good reads
================================

CSS
===
[Atomic CSS](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)
[Discussing utility classes](http://davidtheclark.com/on-utility-classes/)
[Writing scalable CSS - a reading list](https://github.com/davidtheclark/scalable-css-reading-list)
[CSS specificity explained](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/)
[Great list of styleguide resources and examples](http://styleguides.io/)

Animation Performance
---------------------
[Understanding browser layers](http://www.html5rocks.com/en/tutorials/speed/layers/)
[High performance animations](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)  - This is very palatable and quite short.

Design Tooling
==============
[Exporting SVGs from Illustrator for icon fonts](http://www.sitepoint.com/create-an-icon-font-illustrator-icomoon/)
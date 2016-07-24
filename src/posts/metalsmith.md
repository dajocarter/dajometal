---
title: 'My Metalsmith Worflow'
description: 'My Metalsmith Workflow'
published: 2016-06-06T12:00:00-04:00
layout: post.hbs
---

I knew I wanted to use a static site generator for this website but picking one can be kinda overwhelming. [Look for yourself](https://www.staticgen.com/). I tried the Jekyll + GitHub Pages route once, but in all honesty, I forgot my workflow after leaving it alone for a few months. If I can't come back to a project after months of being away, then the workflow is too tough to keep. That's when I came across Metalsmith.

## Why Metalsmith

[Metalsmith](http://www.metalsmith.io/) is "an extremely simple, *pluggable* static site generator". The emphasis is because Metalsmith works by reading all of the files in a source directory, manipulating them with a series of plugins, and then returning the result. It's really just like using [Gulp](http://gulpjs.com/), but i        nstead of `.pipe()`, you'll see `.use()`. Since I'm already familiar with using Gulp, this felt like the most convenient and configurable option to go with.

## Getting Started

Installation is just easy as using the damn thing: `npm i metalsmith`. Now, there's several paths you can take from the start. One is to let Metalsmith handle everything from asset optimizations to file generation. Another is to use a Metalsmith plugin called [Gulpsmith](https://github.com/pjeby/gulpsmith) which allows you to use Metalsmith plugins in Gulp, and vice versa. The path I chose was to let Gulp handle asset optimization and Metalsmith handle generating the HTML. Needless to say, I'll cover what I did but I'll try to sprinkle in an alternative method here or there.

The first thing you'll want to do is create two directories, `src` and `assets`. If Metalsmith is going to be handling your asset optimization then `assets` will be a child of `src`, otherwise it will be a sibling directory.
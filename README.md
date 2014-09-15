![Build status](https://travis-ci.org/vinceallenvince/bitshadowitems.svg?branch=master)

# bitshadowitems

This is a work in progres...

Components for Bit-Shadow Machine simulations.

##Install

To include bitshadowitems as a component in your project, use the node module.

```
npm install bitshadowitems --save
```

You can also use the [standalone version](https://github.com/vinceallenvince/bitshadowitems/releases/latest) and reference the js file from your document.

```
<html>
  <head>
    <script src="scripts/bitshadowitems.min.js" type="text/javascript" charset="utf-8"></script>
  </head>
  ...
```

##Usage

Please review [the docs](http://vinceallenvince.github.io/bitshadowitems/doc/) for more details.

##Building this project

This project uses [Grunt](http://gruntjs.com). To build the project first install the node modules.

```
npm install
```

Next, run grunt.

```
grunt
```

To run the tests, run 'npm test'.

```
npm test
```

To check test coverage run 'grunt coverage'.

```
grunt coverage
```

A pre-commit hook is defined in /pre-commit that runs jshint. To use the hook, run the following:

```
ln -s ../../pre-commit .git/hooks/pre-commit
```

A post-commit hook is defined in /post-commit that runs the Plato complexity analysis tools. To use the hook, run the following:

```
ln -s ../../post-commit .git/hooks/post-commit
```

View the [code complexity](http://vinceallenvince.github.io/bitshadowitems/reports/) report.

# The Session patterns

A collection of front-end patterns for [The Session](https://thesession.org/) built with [Fractal](https://github.com/frctl/fractal/).

## Installation

You’ll need to have [Node](https://nodejs.org/) installed on your local machine. It will need to be at least version five. You can [download the latest stable build from the Node website](https://nodejs.org/).

If you haven’t already installed the Fractal command line helper on your machine, do that:

```shell
npm i @frctl/fractal -g
```

(If for some reason that doesn’t work, you might have to run the command with `sudo` in front of it.)

If you haven’t already installed the Grunt command line helper on your machine, do that:

```shell
npm i grunt-cli -g
```
(Again, if there’s a problem, try using `sudo`.)

Then:

1. Clone this repository into a location of your choosing.
2. Open the project folder in your command line tool of choice.
3. Install the dependencies: `npm install`
4. Run the Grunt tasks with `grunt` (use `grunt watch` if you plan to change any patterns).
5. Run `fractal start`

You should now be able to open localhost:3000 in a browser to see the pattern library.

See the [Fractal documentation](https://github.com/frctl/fractal/tree/master/docs) for more details and usage information.

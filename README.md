# Svg Spriter

The purpose of this web app is to provide a way to create sprite from a list of svg files.

## Prerequisites

* Software
	* [Node](https://nodejs.org/en/)
    * [NPM](https://www.npmjs.com/)
    * [Grunt](https://gruntjs.com/)

## Getting Started
Download the package, go to the installer folder then under __your os folder*__, launcher the *installer* then the *run* files.

Only windows installer are available yet

> ### In case it went wrong or other os:
> The installer will go to your __project root folder__ and run __npm install__.
Then, it will go to the child folder __[root]\public\generator\grunt\sprite__ and run __npm install__.

> Finally, change the __NODE_ENV__ value to __production__, and enter the following command:

```
node bin\www
```

The __run__ file will launch the node process, keep it running in order to let the web site up and running.

By default, the web site will be accessible by the following url: http://localhost:3000
To change that, go to the __bin\www file__.

## How to use

### SVG Spriter Website
![SVG Spriter Website](/assets.readme/SVG_SPRITE_GENERATOR_ws.png "SVG Spriter Website")

Upload the __svg files__ you want to sprite, then click on __generate__

It will upload the files under the folder: __[root]\public\generator\svgs\session_guid\\__

And generate the content under a temporary folder: __[root]\public\generator\releases\sprite\_[timestamp]\\__

* Features:
  * Switch to black/white background
  * New Session: will erase all current uploaded svg files and create a new spriting session.
 
* Parameters:
  * prefix css/less class name
  * in between svg padding

### The result

A zip file will be generated, with the following content:

```
zip
 +--style
 |  +--less
 |  | +--icons.less
 |  +--svg
 |  | +--icons.svg
 |  +--icons.css
 +--icons.html
```

##### Description:

* __icons.html__: An HTML sprite preview, to see the sprite result and how it could be used (scaling, etc)
![HTML sprite preview](/assets.readme/SVG_CSS_sprite_preview_svg-sprite.png "HTML sprite preview")

* __style__
  * __icons.css__: stylesheet file that consumes the svg sprite (released from less file)
  * __less__
    * __icons.less__:  less file that consumes the svg sprite
  * __svg__
    * ![sprite file](/assets.readme/sprite.png "sprite sprite file")
    __icons.svg__: The actual svg sprite 
  
## External tools

This aggregate software is using the following community *grunt* library:

* [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress)
* [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
* [grunt-svg-sprite](https://www.npmjs.com/package/grunt-svg-sprite)

---

### ENJOY !
# Svg Spriter

The purpose of this web app is to provide a way to create sprite from a list of svg files.
For those of you that are willing to optimize your web site.

## How it works

## Prerequisites

* Software
	* [Node](https://nodejs.org/en/)
    * [NPM](https://www.npmjs.com/)
    * [Grunt](https://gruntjs.com/)

## Getting Started
Download the package, go to the installer folder then under your os folder, launcher the *installer* then the *run* files

> ##### In case it went wrong:
> The installer will go to your __project root folder__ and run __npm install__.
Then, it will go to the child folder __[root]\public\generator\grunt\sprite__ and run __npm install__.

The __run__ file will launch the node process, keep it running in order to let the web site up and running.

By default, the web site will be accessible with the following url: http://localhost:3000

## How to use

#### SVG Spriter Website
![SVG Spriter Website](../github.resume/SVG_SPRITE_GENERATOR_ws.png "SVG Spriter Website")

Upload the __svg files__ you want to sprite, then click on __generate__
* Features:
  * Switch to black/white background
  * New Session: will erase all current uploaded svg files and create a new spriting session.
 
* Parameters:
  * prefix css/less class name
  * in between svg padding

#### The result:

A zip file with the following content will be generated:

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

* icons.html: An HTML sprite preview, to see the sprite result and how it could be used (scaling, etc)
![HTML sprite preview](../github.resume/SVG_CSS_sprite_preview_svg-sprite.png "HTML sprite preview")

* style
  * icons.css: stylesheet file that consumes the svg sprite (released from less file)
  * less 
    * icons.less:  less file that consumes the svg sprite
  * svg
    * ![sprite file](../github.resume/sprite.png "sprite sprite file")
    icons.svg: The actual svg sprite 
  
## External tools

This aggregate software is using the following community *grunt* library:

* [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress)
* [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
* [grunt-svg-sprite](https://www.npmjs.com/package/grunt-svg-sprite)

---

> NOTE: I use Visual Studio to create this, so the folder structure might not be usual (www file, bin folder, etc)

### ENJOY !




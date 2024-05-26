
# Staunton Makerspace Website

The website is servered from our makerspace cloud server, along with the wiki.

## Running locally
To run the website locally and make changes you will need to have NPM installed.
Once installed, simploy run 

```bash
npm -i
npm run start
```
then visit http://localhost:8080/

## Making Changes
If you want to make changes, you can find all the text used on the website in the src/pages.
If you want to dig deeper, the site is created with a project called [eleventy](https://www.11ty.dev/) - a static
site generator.  It is possible to change everything about the templates, images, pages, 
navigation etc... if you read up on that project.

## Publishing Changes
Our webssite is served from our makerspace cloud server.  Please contact one of our IT folks (currently,
Dan, Paulson, or Aaron) to get access to the server. 

From there, you can just copy the generated files (in _site) to the right location on the server 
(/var/www/www.stauntonmakerspace.org).  I use rsync to do this, and run the following command:
``` bash
rsync -r _site/ makerspace:/var/www/www.stauntonmakerspace.org
```

## Venture
We used the Venture template to originally create the site.  This is a fork of their repository, please see the
parent repo for more information about Venture.

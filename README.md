
# Staunton Makerspace Website

The website is servered from our makerspace cloud server, along with the wiki.

## Running locally
To run the website locally and make changes you will need to have NPM installed.
Once installed, simploy run 

```bash
npm i
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


# [Mark Anderson](https://www.facebook.com/mark.anderson.768312/) is a local photographer and videographer with a gifted eye.  He's genersouly made dozens of excellent videos for us over the last year.  Here is a small showcase of some of the great videos he
has made about our space and membership.
for 

## We painted our building over the summer of 2026 - Thank you to the Ferguson Mueller Fund, and Osmond of OC Painting (1.540-435-3344) for helping make this possible!
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/fb7ce855f2a5eacaf64277bb2f659b84/watch

## A groovy overview of the inside of the Makerspace in the summer of 2026.
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/b648e37fe82b301d5f0845e36714f7ea/watch

## Jim describes the Plasma Cutter he build 2 years ago, and shows off what it can do.
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/c5dd1a6e388fd7b780d713d9be02effa/watch

## This ardvark demonstrates the joy in bringing little delightful things to life.
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/eae588481a49a951c6c9b87f094a108c/watch

## Taling to Leo, a new member of the space, will give a sense of what it is like here. 
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/1a8700b698bca4fac971274680530ddd/watch

## Mark Anderson has a gift for making every project look like a masterwork.  Thank you Mark.
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/d3f2dd80b594d700577514fa40cb1f01/watch

## The digital graphics guild allows you to rapidly make all kinds of cool merchandise. 
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/4ea83e083056253a1f17e0e4dbffbd38/watch

## Building a harp with Valya
https://customer-5tjrqsqy6jf89xdw.cloudflarestream.com/8a3f854b732a76a7455c3bd540fb80b7/watch

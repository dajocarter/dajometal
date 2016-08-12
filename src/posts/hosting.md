---
title: 'Hosting My Static Site'
description: 'Why I chose Netlify to host my static site over Pubstorm, Surge, and GitHub.'
published: 2016-08-12T22:00:00-04:00
layout: post.hbs
---

So you've built a static site, but now you need somewhere to host it. Luckily, hosting options for static sites are cheap and plenty due to their size, simplicity, and security. I had some time to compare a few options and decided to document my choices. The hosting providers I looked at were GitHub Pages, Surge, PubStorm, and Netlify. Let me know if there are any others I should have taken a look at! I ended up choosing Netlify as my hosting provider and this post explains that decision.

## Why Not ________?

Because I said so. No Mom, it's because Netlify *really is* better than the other options. Let's go through the hosting providers and see why I *didn't* pick them. The first provider I looked at was [GitHub Pages](https://pages.github.com/). That's because I was already using them with a Jekyll site and it's **FREE**! I didn't go with them because the lack of ability to customize. Sure, I can use a custom domain, but I can't get SSL on it. I also don't like to have separate branches for the build and source directories, but that's more of a personal preference (and probably a lack of git skills). I enjoy being able to push my updates and seeing them deploy instantly, but I found other options that do just that.

In my search for a hosting provider, I was first led to [Surge](https://surge.sh) and their simple, single-command publishing. After installing with `npm`, just `cd` into any directory you want to host and run `surge`. Now you have a website running on a random subdomain of theirs in a matter of seconds. They're a great option for spinning something up and seeing how it looks, but I didn't get what I wanted from them out of a hosting provider. They offer custom domains for free, but you'll have to chalk up $13/mo for SSL on that custom domain and not get that much more. While I may not have went with them, they did open my eyes to this kind of simple deployment.

The next provider I looked at was [PubStorm](https://pubstorm.com). They stepped it up a notch by offering SSL for free on your custom domain, *but* they took a step back with a PubStorm watermark (they do fade it out after about 30 seconds). Another advantage of PubStorm is its price. Their only paid tier is $5/mo and you get a few upgrades but nothing to write home to mom about. I'd honestly just stay on the free tier. So PubStorm was a step in the right direction, but I still felt limited.

## Why Netlify?

When I eventually came across [Netlify](https://www.netlify.com) I was rather impressed by them compared to their competitors. They have a sufficient amount of posts on their blog, and the most dense documentation of the bunch which means more customization. Their UI is nice and easy to work with, and the features they offer improved my development process. With all of this considered, I feel like they give me the most bang for my buck.

Netlify makes sure deployment is one less thing to worry about. They have an **awesome** new feature that deploys any branch to a unique URL. Now when I need to add a new feature, I create a new branch, push my changes, check the result on a unique domain, merge the changes, and have it deployed instantly. What's even better is that they use *atomic* deploys so you're site doesn't look out of sorts during the build, unlike uploading over (S)FTP. One of my favorite features is their sexy Slack notifications.

![Netlify Slack Notifications](/img/slack-notifications.png "Netlify Slack Notifications")

This is not only a cool feature, but it also speeds up my development process. Usually, I set up a local domain, a staging domain, and a live domain, then set up some continuous development with [Codeship](https://codeship.com) and try my best to keep it all maintained. Although it's been life saving in most instances, it's certainly a huge headache to deal with. Netlify solved this problem for me by creating the one-off unique URLS for staging that I can quickly assess by clicking the link on my Slack notifications. Once I deem it a success, I can merge the changes and be confident the live version is up-to-date and looks good :sunglasses:

Not to keep harping, but those are just the features I'm currently using. Other awesome stuff includes being able to modify your headers for cache control, snippet injection for things like Google Analytics, and unlimited rollbacks for versioning. They'll even handle all of your form submissions and send you notifications of your entries in Slack and/or email. Say whaaat? They also optimize all of your assets for you. Goodbye Gulp! If that's *still* not enough, you can also create webhooks for API integration. This also means you can hook up your site to Zapier which opens up a whole can of worms in regards to integration.

To summarize, PubStorm and Surge are both great options for spinning up a quick website for development purposes. However, Netlify is the **best** option for hosting a static production site. Do you agree or disagree? Hit me up on [Twitter](https://twitter.com/dajocarter) (or somewhere else) if you'd like to discuss more about this!
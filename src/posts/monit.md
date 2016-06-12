---
title: 'Using Monit and Slack to monitor your server'
description: 'Using Monit to monitor a Ubuntu server and send alerts to a Slack channel.'
published: 2016-06-08
featImg: 'slack.png'
layout: post.hbs
---

This is the introductory sentence. Something about needing to monitor your servers. This post will show you how to install Monit on a Ubuntu server to send alerts to you on Slack. If you're not using Slack, this post is still applicable as intructions for installation.

## Installing Monit
This is as easy as `sudo apt-get install monit`. Just a heads-up to ServerPilot users, you'll have to SSH in to your server as `root` or another user with root/sudo priviledges. If you do SSH in as root, you can leave off all of the `sudo`s. 

Now that Monit is installed, the next step is to turn it on so `cd /etc/monit`. If you `ls` here, you'll see the following directory structure:
```
/etc/monit/
|-conf.d
|-monitrc
|-monitrc.d
  |-blah
  |-blah
  |-blah
|-templates
  |-blah
  |-blah
  |-blah
```
## Configure Monit
The first thing we'll need to do is edit the `monitrc` file so `sudo nano monitrc`. Now scroll down and uncomment the following lines:
```
set httpd port 2812 and
use address localhost
allow localhost
```
Then scroll down to just under the Services section and uncomment the part about checking general system resources. **Be sure** to change `myhost.mydomain.tld` to match your server. So you should have the following lines uncommented:
```
myhost.mydomain.tld
```
Now that Monit is set up, we need to configure it to monitor our chosen services. If you read the `monitrc` file, you would have found that the last line is to include any files in the `conf.d` folder. This is where we'll put our custom services file so `sudo nano conf.d/services`. You can check out Monit's [common](//monit.com/common) configurations but here's my file:
```
pid /var/run/nginx-sp.pid
```
The `-sp` suffix is if you're using ServerPilot, but if you're not just leave it off. If you're in doubt of the name of the pid, just `ls /var/run` to double-check. Once that's done we can check that everything is configured correctly with `sudo monit -t`. If successful, then restart Monit with `sudo service monit restart` and start monitoring your configured services with `sudo monit start all`. Finally, you can double-check that everything is running with `sudo monit status`.

## Send Monit Alerts to Slack
The first thing you'll have to do is set up an Incoming Webhook with your Slack team and copy the url for later. Now we'll configure a payload to send to Slack. So from still within the `/etc/monit` directory, go ahead and `sudo nano slack.sh`. **Be sure** to change the username and emoji name to your choosing.
```
https://slack.com
```
Now we need to make sure that Monit can execute this script so `chmod 744 slack.sh`. Next, we need to tell Monit to run the Slack script when it needs to send an alert so `sudo nano monitrc`. In the section about checking general system resources, replace `then alert` with `then exec "/etc/monit/slack.sh" else if succeeded then exec "/etc/monit/slack.sh"`. At the end it should look like this:
```
myhost.mydomain.tld
if this then exec "/etc/monit/slack.sh" else if succeeded then exec "/etc/monit/slack.sh"
```
Finally, we can make sure everything is configured correctly with `sudo monit -t` and restart Monit to put our changes in to effect with `sudo service monit restart`.

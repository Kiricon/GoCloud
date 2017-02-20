# GoCloud
A online cloud software written in Go.

Okay, neat, it's written in Go, what's the big deal, there are plenty of web apps that act as file explorers. 

Well here's the big deal. Most of those file explorers are usually written in PHP which is ridicously slow.

How slow you may ask? Well when doing my independet testing of a recursive directory walk I often find that the same code written in PHP take 3x longer
than one written in GO.

So writing a file explorer in go means my NAS will be more responsive.


So why Go specifically? Well it's because in most cases you have to make a choice between easy web development and high performance. 

Golang hits that sweat spot. You'll find that the actual server side code is actually extremely small and extremely performant.
And best of all, HAS NO DEPENDENCIES.



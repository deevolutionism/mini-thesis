# SURGE

###What is it?
SURGE is a publicly accessible social media web-based application that encourages sharing of uninhibited thoughts and discussion. 

This project is still under development. This particular version of surge was an attempt to package my application for the Parson's junior level art and technology show, Tangram and for Bryan Ma's code 2 class spring 2016.

SURGE, in its current state, is similar to 4chan in that users sign in with a psuedonym and are essentially anonymous as no other information is required to access the network. This produces a disinhibiting effect where anything can be said without consequence to the original poster. What differentiates this from 4chan is the user interface. When a post is made, it populates a space in what is called the universe - an infinite 2 dimentional plane - where users must navigate by panning around in order to discover content from other users.

###How does it work?

This version of SURGE runs on a node express server which communicates to the client via socket.io. The server also pings the NYT Top Stories API every 24 hours and sends the retrieved data to connecting clients to populate the universe. The interface is built using a combination of P5.js, JQuery, and vanilla javascript. 
 

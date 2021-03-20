# hyperswarm demo

`index.js` doesn't work. browserify bundle has errors from `hyperswarm` 

On peer discovery,

tell them who you follow & the sequence you're up to for each

```
`baz` sends this
{
    following: {
        'foo': 42,
        'bar': 12
    }
}
```
A map of public key to your latest sequence number

need to get the foafs
* When someone tells you who they follow, that's the foaf list if you follow them
  - if I'm following baz, I need foo & bar also
* if baz is in my following list, i want foo and bar too.
* should send any newer msgs for the follows

Need a map of publicKey to thier follow list. That way you can send foafs msgs

-----------------------------------------

`ssc.js` -- demo of ssc + webrtc-swarm

`web.js` -- demo of `hyperswarm-web`

`index.js` -- demo of `hyperswarm` -- doesn't work in browsers




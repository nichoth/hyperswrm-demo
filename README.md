# hyperswarm demo

`index.js` doesn't work. browserify bundle has errors from `hyperswarm` 

On peer discovery,

tell them who you follow & the sequence you're up to for each

```
{
    following: {
        'foo': 42,
        'bar': 12
    }
}
```
A map of public key to your latest sequence number

need to get the foafs
* When someone tells you who they follow, that's the foaf list
* should send you their latest foafs as well?
* should send any newer msgs for the follows

Need a map of publicKey to thier follow list. That way you can send foafs msgs




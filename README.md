『初めてのGraphQL ――Webサービスを作って学ぶ新世代API』  
https://www.oreilly.co.jp/books/9784873118932/  


#### MongoDB

```zsh
$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community

$ mongo

> use photo-share-api-db;
> db.createCollection("photos");
> db.createCollection("users");
> show collections;
photos
users
> show dbs;
admin
config
local
photo-share-api-db 
```

#### githubAuth

https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github

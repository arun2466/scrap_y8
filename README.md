### Clone and  the run below command to install packages
```
npm install
```

### open constants.js file and change database user and password.
```
let DATABASE_USER = "root";
let DATABASE_PASSWORD = "arun";
```
replace "root" & "arun" with your username and password

### First time to create database & tables
```
node db.js
```


### Start tags scraping ( this will scrap tags and insert in tags table )
```
node scrap_tags.js
```

### Start tags games scraping ( this will scrap tags games including pagination and insert in tag_games table )
```
node scrap_tag_games.js
```

### Start will scrap all games details ( this will scrap all games and insert in games table )
```
node scrap_games.js
```
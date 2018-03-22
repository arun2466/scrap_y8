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
node scraps.js
```
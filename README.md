# ms-teams-auto-joiner

ms-teams-auto-joiner joins teams meetings at the given times and automatically leaves then when the number of attendees is below a certain number



# config-json 

## email
email for your teams account

## password
password for your teams account

## max
maximum number of attendees possible in the class

## min
the minimum number of attendees in class if number of attendees go below the min the program will leave the class

## timings
timings of your classes 



# Setup

Clone the repository using git 
```
$ git clone https://github.com/anaadhi/ms-teams-auto-joiner.git
```

open the folder in terminal 

download the required node modules 
```
$ npm i 
```

edit config.json

run the program 
```
node app.js
```

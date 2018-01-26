Link to working code:
        ec2-54-218-123-70.us-west-2.compute.amazonaws.com:3001/testCode/index.html#!/


## pre reqs
Install brew, node, npm & mongo. On OSX the commands below should work.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor #fix all issues
brew update
brew install node
brew install mongodb
```

## download dependencies and run server
From your project folder run the following
```
npm install
npm run start
```
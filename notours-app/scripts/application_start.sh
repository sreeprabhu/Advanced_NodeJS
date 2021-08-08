cd /home/ec2-user/express-app

sudo chmod -R 777 /home/ec2-user/express-app

#add npm and node to the path
export NVM_DIR = "$home/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"   # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"   # loads nvm bash bash_completion

#install node modules
npm install

#start our node app in the background
npm run start:prod > app.out.log 2> app.err.log < /dev/null &
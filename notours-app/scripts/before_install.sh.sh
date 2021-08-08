curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
. ~/.nvm/nvm.sh

DIR="/home/ec2-user/express-app"
if [ -d "$DIR" ]; then
  echo "$DIR exists"
else
  echo "Creating $DIR directory"
  mkdir $DIR
fi
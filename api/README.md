# Into the devContainer

## Install node packages
Run `npm install` into the `/home/dev` directory

## Give right to the scripts
Run `sudo chmod 755 script.sh`

### Create Secrets
Create `/secrets/signing` folder, and run these commands inside (Warning: Leave Passphrase input blank):
`ssh-keygen -t rsa -b 2048 -m PEM -f signing.key`
`openssl rsa -in signing.key -pubout -outform PEM -out signing.pub`

## Run project
Run `./script.sh`
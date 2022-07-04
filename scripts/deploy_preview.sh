if [ $1 ]
then
    echo "Creating preview deploy: $1"
    ./node_modules/.bin/firebase hosting:channel:deploy $1 --expires 1d
else
    echo "Preview channel name required!"
    exit 1
fi

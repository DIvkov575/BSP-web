package out of date 
page misrepresents


v3 todo:
move html -> js
html -> css
implement css framework?
more ts
eslint
bun docker image
google analytics
phone compatibility


"prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
docker build -t dmitriyivkov/bsp-web .
docker run -dp 80:80 dmitriyivkov/bsp-web

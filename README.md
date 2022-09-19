
Docker
docker build -t dmitriyivkov/bsp-web .
docker run -dp 80:80 dmitriyivkov/bsp-web
docker push dmitriyivkov/bsp-web

https://docs.docker.com/engine/reference/commandline/push/
https://labs.play-with-docker.com/p/ccfvlf5d48eg00a5fb7g

docker system prune
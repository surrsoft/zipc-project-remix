docker_up:
	docker-compose up

docker_up_d:
	docker-compose up --build

docker_down:
	docker-compose down && docker-compose down

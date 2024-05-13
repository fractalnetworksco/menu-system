up:
	docker-compose up --build --force-recreate -d
dev:
	docker-compose up --build
exec:
	docker-compose exec django bash
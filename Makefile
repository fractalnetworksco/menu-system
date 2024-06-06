
up:
	docker compose up --force-recreate -d
down:
	docker stop the-little-dooey-backend-1
	docker stop the-little-dooey-frontend-1
dev:
	docker compose up --build --force-recreate -d
exec:
	docker compose exec django bash
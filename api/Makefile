.PHONY: up
up:	
	docker-compose -f docker-compose-dev.yml up -d

.PHONY: network
network:	
	docker network create theseus-network

.PHONY: down
down:
	docker-compose -f docker-compose-dev.yml down
	

.PHONY: reset
reset:
	docker system prune -a -f
	docker volume prune -f
	docker network prune -f

.PHONY: dev
dev: network up
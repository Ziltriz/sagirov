



build:
	cd database
	make up 
	cd ../backend 
	docker compose up -d 
	cd ../frontend
	make up

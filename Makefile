uname_S := $(shell uname -s)

.PHONY: build be-install be-start be-deploy be-remove fe-install fe-start fe-deploy fe-remove deploy

all: build

build: be-install fe-install

setup-stage:
	./scripts/setup_stage.sh

be-install:
	cd backend && npm install

be-start:
	cd backend && npm start

be-deploy:
	cd backend && npm run deploy

be-remove:
	cd backend && npm run remove

fe-install:
	cd frontend && npm install

fe-start:
	cd frontend && npm start

fe-deploy:
	cd frontend && npm run deploy

fe-remove:
	cd frontend && npm run remove

deploy: be-deploy fe-deploy

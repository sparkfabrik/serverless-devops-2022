uname_S := $(shell uname -s)

.PHONY: build fe-install fe-start fe-deploy fe-remove deploy

all: build

build: fe-install

setup-stage:
	./scripts/setup_stage.sh

fe-install:
	cd frontend && npm install

fe-start:
	cd frontend && npm start

fe-deploy:
	cd frontend && npm run deploy

fe-remove:
	cd frontend && npm run remove

deploy: fe-deploy

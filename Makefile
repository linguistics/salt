SHELL := bash
REVISION := $(shell git rev-parse --short HEAD)

all: render

26/node_modules/.bin/tsc:
	cd 26 && npm install

26/server.js: 26/node_modules/.bin/tsc
	cd 26 && node_modules/.bin/tsc

dev:
	cd 26 && (node_modules/.bin/tsc --watch & node server.js & wait)

render: 26/server.js
	cp -R 26/abstracts/ ../salt-gh-pages/26/abstracts/
	cp -R 26/img/ ../salt-gh-pages/26/img/
	VERSION=$(REVISION) node 26/server.js render --out ../salt-gh-pages/26/

publish: ../salt-gh-pages .git/refs/heads/master render
	@echo Using commit hash: $(REVISION)
	cd $<; git add .
	cd $<; git ci -m "Sync gh-pages to master@$(REVISION)"
	cd $<; git push

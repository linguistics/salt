SHELL := bash
REVISION := $(shell git rev-parse --short HEAD)

all: render

26/server.js 26/components.js: 26/server.ts 26/components.tsx
	cd 26 && npx tsc

dev:
	cd 26 && (npx tsc --watch & node server.js & wait)

render: 26/server.js 26/components.js
	cp -R 26/abstracts/ ../salt-gh-pages/26/abstracts/
	cp -R 26/shared/ ../salt-gh-pages/26/shared/
	cp -R 26/img/ ../salt-gh-pages/26/img/
	VERSION=$(REVISION) node 26/server.js render --out ../salt-gh-pages/26/

publish: ../salt-gh-pages .git/refs/heads/master render
	@echo Using commit hash: $(REVISION)
	cd $<; git add .
	cd $<; git ci -m "Sync gh-pages to master@$(REVISION)"
	cd $<; git push

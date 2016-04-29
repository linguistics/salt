SHELL := bash
REVISION := $(shell git rev-parse --short HEAD)

all: render

render:
	cp -R 26/abstracts/ ../salt-gh-pages/26/abstracts/
	cp -R 26/img/ ../salt-gh-pages/26/img/
	VERSION=$(REVISION) node 26/render.js --out ../salt-gh-pages/26/

publish: ../salt-gh-pages .git/refs/heads/master render
	@echo Using commit hash: $(REVISION)
	cd $<; git add .
	cd $<; git ci -m "Sync gh-pages to master@$(REVISION)"
	cd $<; git push

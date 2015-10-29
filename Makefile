REVISION := $(shell git rev-parse --short HEAD)

all: render

render:
	VERSION=$(REVISION) fapply walk 26/ ../salt-gh-pages/26/

publish: ../salt-gh-pages .git/refs/heads/master render
	# Using commit hash: $(REVISION)
	cd $<; git add .
	cd $<; git ci -m "Sync gh-pages to master@$(REVISION)"
	cd $<; git push

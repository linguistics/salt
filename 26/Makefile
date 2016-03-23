SHELL = bash

all: program.html abstracts-all

program.html: program.js program.yaml
	echo '<!-- [ { "apply": "wrap", "filepath": "layout.html", "replace": "{}" }, { "apply": "interpolate", "pattern": "\\{version\\}", "js": "process.env.VERSION" } ] -->' >$@
	react-cli program.js -p <(yaml2json <program.yaml) | htmlfmt >>$@
	echo "<script>window.current_variable = 'p';</script>" >>$@

abstracts-all:
	ls CVS/abstracts/*.pdf | sed 's:CVS/::' | xargs $(MAKE)
	touch program.yaml

abstracts/%.pdf: CVS/abstracts/%.pdf
	gs -q -sDEVICE=pdfwrite -o $@ $<

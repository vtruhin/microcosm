BABEL := node_modules/.bin/babel
SCRIPTS := $(addprefix tmp/,$(shell find src bench -name '*.js*'))
VERSION := $$(node -p "require('./package').version")

all: javascript docs package.json
	@ echo [+] prepared v$(VERSION)

javascript: $(SCRIPTS)
	@ rsync -uraq tmp/src/ build/

tmp/%.js: %.js .babelrc
	@ mkdir -p $(@D)
	@ $(BABEL) -c -s inline $< > $@
	@ echo [+] $(@F)

docs: LICENSE.md README.md
	@ mkdir -p build
	@ cp $^ build/
	@ echo [+] docs

package.json:
	@ mkdir -p build
	@ node -p 'p=require("./package");p.main="microcosm.js";p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > build/package.json
	@ echo [+] package.json

release: clean all
	npm publish build

prerelease: clean all
	npm publish build --tag beta

bench: javascript
	@ node --expose-gc tmp/bench/history-performance
	@ node --expose-gc tmp/bench/dispatch-performance
	@ node --expose-gc tmp/bench/push-performance

clean:
	@ rm -rf build/*
	@ rm -rf tmp/*

.PHONY: all clean bench package.json docs release prerelease

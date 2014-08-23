all: b

.PHONY b:
	browserify js/Main.js > js/ld30_game.js

clean:
	del *~ *.tmp
	del js\ld30_game.js

clean:
	rm -rf node_modules
	cd demo && rm -rf node_modules
	cd example && rm -rf node_modules
install:
	npm install
	cd demo && npm install
	cd example && npm install
start:
	npm run build
	cd demo && npm run start
	cd example && npm run start
deploy:
	npm publish
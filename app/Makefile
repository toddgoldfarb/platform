NPM=meteor npm

run:
	${NPM} start

%.json: %.yml
	yaml2json $< > $@

test-ci:
	${MAKE} lint
#	${MAKE} test

test:
	${NPM} run test

lint:
	${NPM} run lint

deploy:
	${MAKE} deploy-staging

deploy-staging: secrets
	DEPLOY_HOSTNAME=galaxy.meteor.com \
	  METEOR_SESSION_FILE=secrets/meteor_session.json \
	  meteor deploy staging.amplifield.co --owner amplifield11 --settings secrets/staging.settings.json

deploy-production: secrets
	DEPLOY_HOSTNAME=galaxy.meteor.com \
	  METEOR_SESSION_FILE=secrets/meteor_session.json \
	  meteor deploy production.amplifield.co --owner amplifield11 --settings secrets/production.settings.json

deploy-storybook:
	${NPM} run deploy-storybook

storybook:
	${NPM} run storybook

ios-build-staging: secrets mobile-assets
	cp .mobile/staging.mobile-config.js ./mobile-config.js
	rm -rf .meteor/local/cordova-build
	rm -rf ../output
	mkdir -p ../output
	meteor build ../output --server=https://mobile.amplifield.co --mobile-settings=secrets/staging.settings.json
	open ../output/ios/project/reamp.xcodeproj

ios-build-production: secrets mobile-assets
	cp .mobile/production.mobile-config.js ./mobile-config.js
	rm -rf .meteor/local/cordova-build
	rm -rf ../output
	mkdir -p ../output
	meteor build ../output --server=https://production.amplifield.co --mobile-settings=secrets/production.settings.json
	open ../output/ios/project/Amplifield.xcodeproj

mobile-assets:
	${MAKE} -C .mobile/assets

mobile-config:
	cp .mobile/development.mobile-config.js ./mobile-config.js

ios-device: mobile-config mobile-assets
	meteor run ios-device --settings development.settings.json

drop-activations:
	echo 'db.activations.remove({})' | meteor mongo

remove-migration-lock:
	echo 'db.migrations.update({_id:"control"}, {$$set:{"locked":false}});' | meteor mongo

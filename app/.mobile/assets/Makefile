CONVERT=/usr/local/bin/convert

DEVELOPMENT_ICONS=					 \
	out/icon.development.iphone_2x.png		 \
	out/icon.development.iphone_3x.png		 \
	out/icon.development.ipad.png			 \
	out/icon.development.ipad_2x.png		 \
	out/icon.development.ipad_pro.png		 \
	out/icon.development.ios_settings.png		 \
	out/icon.development.ios_settings_2x.png	 \
	out/icon.development.ios_settings_3x.png	 \
	out/icon.development.ios_spotlight.png		 \
	out/icon.development.ios_spotlight_2x.png

STAGING_ICONS=					 \
	out/icon.staging.iphone_2x.png		 \
	out/icon.staging.iphone_3x.png		 \
	out/icon.staging.ipad.png		 \
	out/icon.staging.ipad_2x.png		 \
	out/icon.staging.ipad_pro.png		 \
	out/icon.staging.ios_settings.png	 \
	out/icon.staging.ios_settings_2x.png	 \
	out/icon.staging.ios_settings_3x.png	 \
	out/icon.staging.ios_spotlight.png	 \
	out/icon.staging.ios_spotlight_2x.png

PRODUCTION_ICONS=				 \
	out/icon.production.iphone_2x.png	 \
	out/icon.production.iphone_3x.png	 \
	out/icon.production.ipad.png		 \
	out/icon.production.ipad_2x.png		 \
	out/icon.production.ipad_pro.png	 \
	out/icon.production.ios_settings.png	 \
	out/icon.production.ios_settings_2x.png	 \
	out/icon.production.ios_settings_3x.png	 \
	out/icon.production.ios_spotlight.png	 \
	out/icon.production.ios_spotlight_2x.png

DEVELOPMENT_SPLASHES= \
	out/splash.development.iphone_2x.png \
	out/splash.development.iphone_2x.png \
	out/splash.development.iphone5.png \
	out/splash.development.iphone6.png \
	out/splash.development.iphone6p_portrait.png \
	out/splash.development.iphone6p_landscape.png \
	out/splash.development.ipad_portrait.png \
	out/splash.development.ipad_portrait_2x.png \
	out/splash.development.ipad_landscape.png \
	out/splash.development.ipad_landscape_2x.png

all: out icons splashes

icons: ${DEVELOPMENT_ICONS} ${STAGING_ICONS} ${PRODUCTION_ICONS}
splashes: ${DEVELOPMENT_SPLASHES} ${STAGING_SPLASHES} ${PRODUCTION_SPLASHES}

clean:
	rm -rf out

out:
	mkdir out

# See: http://docs.meteor.com/api/mobile-config.html#App-icons
out/icon.%.iphone_2x.png: icon.%.png
	${CONVERT} $< -resize 120x120 $@ 

out/icon.%.iphone_3x.png: icon.%.png
	${CONVERT} $< -resize 180x180 $@

out/icon.%.ipad.png: icon.%.png
	${CONVERT} $< -resize 76x76 $@

out/icon.%.ipad_2x.png: icon.%.png
	${CONVERT} $< -resize 152x152 $@

out/icon.%.ipad_pro.png: icon.%.png
	${CONVERT} $< -resize 167x167 $@

out/icon.%.ios_settings.png: icon.%.png
	${CONVERT} $< -resize 29x29 $@

out/icon.%.ios_settings_2x.png: icon.%.png
	${CONVERT} $< -resize 58x58 $@

out/icon.%.ios_settings_3x.png: icon.%.png
	${CONVERT} $< -resize 87x87 $@

out/icon.%.ios_spotlight.png: icon.%.png
	${CONVERT} $< -resize 40x40 $@

out/icon.%.ios_spotlight_2x.png: icon.%.png
	${CONVERT} $< -resize 80x80 $@

# See: http://docs.meteor.com/api/mobile-config.html#App-launchScreens

# portrait ratios
portrait.%.png: splash.%.png
	${CONVERT} $< -borderColor black -border 0x200% $@

out/splash.%.iphone_2x.png: portrait.%.png
	${CONVERT} $< -resize 640x - | ${CONVERT} - -gravity Center -crop 640x960+0+0 $@

out/splash.%.iphone5.png: portrait.%.png
	${CONVERT} $< -resize 640x - | ${CONVERT} - -gravity Center -crop 640x1136+0+0 $@

out/splash.%.iphone6.png: portrait.%.png
	${CONVERT} $< -resize 750x - | ${CONVERT} - -gravity Center -crop 750x1334+0+0 $@

out/splash.%.iphone6p_portrait.png: portrait.%.png
	${CONVERT} $< -resize 1242x - | ${CONVERT} - -gravity Center -crop 1242x2208+0+0 $@

out/splash.%.ipad_portrait.png: portrait.%.png
	${CONVERT} $< -resize 768x - | ${CONVERT} - -gravity Center -crop 768x1024+0+0 $@

out/splash.%.ipad_portrait_2x.png: portrait.%.png
	${CONVERT} $< -resize 1536 - | ${CONVERT} - -gravity Center -crop 1536x2048+0+0 $@


# landscape ratios
landscape.%.png: splash.%.png
	${CONVERT} $< -borderColor black -border 200%x0 $@

out/splash.%.iphone6p_landscape.png: landscape.%.png
	${CONVERT} $< -resize x1242 - | ${CONVERT} - -gravity Center -crop 2208x1242+0+0 $@

out/splash.%.ipad_landscape.png: landscape.%.png
	${CONVERT} $< -resize x768 - | ${CONVERT} - -gravity Center -crop 1024x768+0+0 $@

out/splash.%.ipad_landscape_2x.png: landscape.%.png
	${CONVERT} $< -resize x1536 - | ${CONVERT} - -gravity Center -crop 2048x1536+0+0 $@

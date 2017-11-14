/* bender-tags: clipboard,pastefromword */
/* bender-ckeditor-plugins: pastefromword,ajax,basicstyles,bidi,font,link,toolbar,colorbutton,image,pastefromwordimage */
/* bender-ckeditor-plugins: list,liststyle,sourcearea,format,justify,table,tableresize,tabletools,indent,indentblock,div,dialog */
/* bender-include: ../../pastefromword/generated/_lib/q.js,../../pastefromword/generated/_helpers/promisePasteEvent.js */
/* bender-include: ../../pastefromword/generated/_helpers/assertWordFilter.js,../../pastefromword/generated/_helpers/createTestCase.js */
/* bender-include: ../../pastefromword/generated/_helpers/createTestSuite.js,../../pastefromword/generated/_helpers/pfwTools.js */
/* global pfwTools,createTestSuite */

( function() {
	'use strict';

	bender.editor = {
		config: pfwTools.imageDefaultConfig
	};

	bender.test( createTestSuite( {
		browsers: [
			'chrome',
			'firefox'
		],
		wordVersions: [
			'word2013_win',
			'word2016_win',
			'word2011_osx'
		],
		tests: {
			'Simple_offline_image': true,
			'Online_and_offline_image': true,
			'Shapes_and_online_and_offline_image': true,
			'Wrapped_image': true,
			'Link_image': true,
			'Gruped_adjacent_shapes_and_images': true,
			'Image_alternative_text': true,
			'Image_reflection': true,
			'Image_rotation': true
		},
		ignoreAll: CKEDITOR.env.ie,
		includeRTF: true
	} ) );
} )();
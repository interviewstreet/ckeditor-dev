/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* exported initSample */

if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';
function getConfig(){
  // Config used in hackerrank
  return {
    toolbar : [
      ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink"],
      ["Styles","Format", "Font", "FontSize", ],
      {
        name: 'clipboard',
        items: ['Cut','Copy','-','PasteMenu',
        'Undo','Redo', 'Image', 'Table' ]
      },
      ["Source", "CodeSnippet"],
      ["Templates"],
      ["MoreStyles", "TextColor"]
    ],
    toolbarCanCollapse: false,
    autoGrow_onStartup: true,
    extraAllowedContent: 'iframe[*];*{*}',
    allowedContent: true,
    removePlugins: "elementspath,liststyle,link",
    removeDialogTabs: 'link:advanced;link:target;link:upload',
    disableNativeSpellChecker: false,
    bodyClass: 'hrx-version challenge-text ck_table-wrap',
    htmlEncodeOutput: true,
    tabSpaces: 4,
    language:'en',
    defaultLanguage:'en',
    extraPlugins : 'widget,dialog,codesnippet,image2,customlink,templates,autogrow,latex,dropdownmenumanager,menu,menubutton',
    dropdownmenumanager: {
      'PasteMenu': {
        items:[{
          name: 'Paste',
          command: 'paste'
         }, {
           name: 'PasteText',
           label: 'Paste as text',
           command: 'pastetext'
         }, {
           name: 'PasteFromWord',
           label:  'Paste from Word',
           command: 'pastefromword'
         }],
        label: {
          text: 'Paste',
          width: 100,
          visible:true //default value
        },
        iconPath: 'paste', //You can use global icons or absolute path to the icon
        toolbar: 'clipboard', // to specify toolbar group for button  // NOT-needed
      },
      'MoreStyles': {
        items:[
          {
            name: 'TextColor',
            label: 'Text color',
            onClick: function(){
              document.querySelector('.cke_button__textcolor').click(); // Make sure the query selector selects the current element
            },
            command: 'formulaeCmd'
         }, {
           name: 'Latex',
           label: 'Latex',
           command: 'formulaeCmd',
           icon: 'latex'
         }],
        label: {
          text: 'Additional Styles',
          width: 45,
          visible:true //default value
        },
        iconPath: 'kebab', //You can use global icons or absolute path to the icon
        toolbar: 'more'
      },
  }
  }
}
let editor;
var initSample = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

	return function() {
		var editorElement = CKEDITOR.document.getById( 'editor');

		// :(((
		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml(
				'Hello world!\n\n' +
				'I\'m an instance of [url=https://ckeditor.com]CKEditor[/url].'
			);
		}

		// Depending on the wysiwygarea plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
      const config = getConfig();
			editor = CKEDITOR.replace( 'editor', config);
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			editor = CKEDITOR.inline( 'editor', getConfig() );

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
    function getOnChange(name){
      return (evt) => {
        console.log("EVENT", evt);
        console.log("NAME", name);
      }
    }


  function handleBeforeCommandExec(event){
    var commandName = event.data.name;
    // Don't intercept Paste Event here since CKEditor paste seems to be not working https://github.com/ckeditor/ckeditor4/issues/469
    console.log("You have pressed the " + commandName);
  }
  
    editor.on('beforeCommandExec', handleBeforeCommandExec);
    editor.on('paste', getOnChange('paste'))
    
    let oldStyle = editor.applyStyle;

    editor.applyStyle = function(...args){
      const styleDefinition = args[0].getDefinition() || {};
      const styles = styleDefinition.styles;
      console.log({ styles });
      oldStyle.call(this, ...args);
    }
	};


	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();

// %LEAVE_UNMINIFIED% %REMOVE_LINE%

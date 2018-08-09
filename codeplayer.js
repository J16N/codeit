var height = $(window).height();
var heighttext = Math.floor(99 - ((100 * $("#header").height()) / height));

var width = $(window).width();
var widthtext = Math.floor(125 - ((125 * $("header").height()) / width));

var isMobile = false;
var isTablet = false;

if(WURFL.is_mobile)
	isMobile = true;

if(WURFL.form_factor == "Tablet")
	isTablet = true;

$("#alert").hide();

function focus (editor) {
	editor.on("focus", function() {
		$(editor.container).css({
			"box-shadow":"0 0 5px rgba(81, 203, 238, 1)",
			"border":"1px solid rgba(81, 203, 238, 1)"
		});
	});
	editor.on("blur", function() {
		$(editor.container).css({
			"box-shadow":"",
			"border":""
		});
	});
}

var dom = require("ace/lib/dom");

require("ace/commands/default_commands").commands.push({
    name: "Toggle Fullscreen",
    bindKey: "F11",
    exec: function(editor) {
        var fullScreen = dom.toggleCssClass(document.body, "fullScreen");
        dom.setCssClass(editor.container, "fullScreen", fullScreen);
        editor.setAutoScrollEditorIntoView(!fullScreen);
        editor.resize();
    }
})

var htmleditor = ace.edit("htmltext", {
	mode: "ace/mode/html",
	selectionStyle: "text",
	theme: "ace/theme/monokai",
	showPrintMargin: false,
	indentedSoftWrap: true,
	animatedScroll: true,
	wrap: true,
	enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    autoScrollEditorIntoView: true
});

var jseditor = ace.edit("jstext", {
	mode: "ace/mode/javascript",
	selectionStyle: "text",
	theme: "ace/theme/monokai",
	showPrintMargin: false,
	indentedSoftWrap: true,
	animatedScroll: true,
	wrap: true,
	enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

var csseditor = ace.edit("csstext", {
	mode: "ace/mode/css",
	selectionStyle: "text",
	theme: "ace/theme/monokai",
	showPrintMargin: false,
	indentedSoftWrap: true,
	animatedScroll: true,
	wrap: true,
	enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

focus(htmleditor);
focus(jseditor);
focus(csseditor);

htmleditor.focus();

function updateOutput() {

	$("iframe").contents().find("html").html("<html><head><style type='text/css'>" + csseditor.getValue() + "</style></head><body>" + htmleditor.getValue() + "</body></html>");

	document.getElementById("outputpanel").contentWindow.eval(jseditor.getValue());
	
}

$(".btn").click(function() {

	$(this).button('toggle');

	var panelid = $(this).attr("id") + "panel";
	$("#" + panelid).toggleClass("hidden");

	

	var numactivepanels = 4 - $(".hidden").length;
	if ((isMobile || isTablet) && ($(window).width() < $(window).height())) {

		$(".textarea").css("height", (heighttext / numactivepanels) + "vh");
		$("#outputpanel").css("height", (heighttext / numactivepanels) + "vh");

	}

});

if ((isMobile || isTablet) && ($(window).width() < $(window).height())) {

	$(".textarea").css("height", (heighttext / 2) + "vh");
	$("#outputpanel").css("height", (heighttext / 2) + "vh");

	if ($(window).width() > 991)
		$("#alert").show();

} else if ((isMobile || isTablet) && ($(window).width() > $(window).height())) {

	$(".textarea").css("height", (widthtext / 2) + "vh");
	$("#outputpanel").css("height", (widthtext / 2) + "vh");
}

$("#run").click(function() {
	updateOutput();
	$("#run").blur();
	$("#run").button("toggle");
});
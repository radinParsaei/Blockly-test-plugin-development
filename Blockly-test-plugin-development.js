addMenuOption('import.svg', 'Debug Plugin', function() {
  const popup = createPopUpBody(openPopUp())
  popup.innerHTML = '<div id="plugin_debug_editor" class="expand"></div><button class="swal2-confirm swal2-styled" style="margin-left: -2px" id="plugin_debug_run_button">Run</button>'
  var edit = ace.edit("plugin_debug_editor")
  edit.setValue(localStorage.getItem('plugin_DEBUG_code') || '')
  edit.session.selection.moveTo(0, 0)
  document.getElementById('plugin_debug_run_button').addEventListener('click', function() {
    localStorage.setItem('plugin_DEBUG_code', edit.getValue())
    eval(edit.getValue())
  })
  new AceScrollbars(edit)
  edit.setTheme("ace/theme/monokai0")
  edit.session.setMode("ace/mode/javascript0")
  edit.setHighlightActiveLine(false)
  edit.renderer.setShowGutter(true)
  edit.getSession().setUseWorker(false)
  edit.session.setTabSize(2)
  edit.renderer.setAnimatedScroll(true)
  edit.setFontSize(18)
  edit.setShowPrintMargin(false)
  edit.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true,
      copyWithEmptySelection: true,
      cursorStyle: 'smooth',
      fadeFoldWidgets: true
  })
}, 'pkgdbg')

injectCss(`.menuitem#pkgdbg {
  width: 105px;
  max-width: 105px;
  margin-right: 10px;
}`)

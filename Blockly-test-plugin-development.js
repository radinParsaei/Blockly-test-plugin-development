addMenuOption('import.svg', 'Debug Plugin', function() {
  const popup = createPopUpBody(openPopUp())
  popup.innerHTML = '<div id="plugin_debug_editor" class="expand"></div><button class="swal2-confirm swal2-styled" style="margin-left: -2px" id="plugin_debug_run_button">Run</button>'
  var edit = ace.edit("plugin_debug_editor")
  edit.setValue(localStorage.getItem('plugin_DEBUG_code') || '')
  edit.session.selection.moveTo(0, 0)
  document.getElementById('plugin_debug_run_button').addEventListener('click', function() {
    localStorage.setItem('plugin_DEBUG_code', edit.getValue())
    eval(edit.getValue())
    Editor._resetTranslations()
    document.getElementById('menu').innerHTML = `<span class="label" style="font-size: 75%;position: absolute;">Dark Mode</span>
<label class="switch" style="margin-top: 16px">
<input type="checkbox" id="theme" onchange="changeTheme2()">
<span class="slider round"></span>
</label>
<span id="modeContainer">
<button id="gotoblock" class="mode" onclick="goToBlock()">Blocks</button>
<button id="gotocode" class="selected mode" onclick="goToCode()">Code</button>`
    if (Editor.isDark()) {
      document.getElementById('theme').checked = true
    }
    addButtons()
    Blockly.Extensions.unregister('text_indexOf_mutator')
    Blockly.Extensions.unregister('create_instance_mutator')
    Editor.setBlocksEditorGrid({
      spacing : 20,
      length : 2,
      colour : localStorage.getItem('theme') == 'dark'? 'rgba(255, 255, 255, 0.12)':'rgba(150, 150, 150, 0.3)',
      snap : true
    })
    Editor.resetThemes()
    populateDefaultBlocks()
    initBlocks()
    setTimeout(function() {
      Object.keys(localStorage).map((pluginName) => {
        if (pluginName.startsWith('plugin_') && pluginName.endsWith('_code')) eval(localStorage.getItem(pluginName))
      })
      refreshBlockly()
    }, 100)
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

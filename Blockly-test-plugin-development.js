addMenuOption('import.svg', 'Debug Plugin', function() {
  const popup = createPopUpBody(openPopUp())
  popup.innerHTML = '<div id="plugin_debug_editor" class="expand"></div><button class="swal2-confirm swal2-styled" style="margin-left: -2px" id="plugin_debug_run_button">Run</button>'
  var edit = ace.edit("plugin_debug_editor")
  edit.setValue(localStorage.getItem('plugin_DEBUG_code') || '')
  edit.session.selection.moveTo(0, 0)
  document.getElementById('plugin_debug_run_button').addEventListener('click', function() {
    localStorage.setItem('plugin_DEBUG_code', edit.getValue())
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
  const createSnippets = snippets =>
      (Array.isArray(snippets) ? snippets : [snippets])
          .map(({ name, code }) =>
              [
                  'snippet ' + name,
                  code
                      .split('\n')
                      .map(c => '\t' + c)
                      .join('\n'),
              ].join('\n')
          )
          .join('\n')
    edit.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
    })
    setTimeout(function() {
      var snippetManager = ace.require('ace/snippets').snippetManager
      console.log(edit.session.$mode.$id)
      var m = snippetManager.files['ace/mode/javascript0']
      console.log(snippetManager.files)
      m.scope = 'javascript0'
      let snippetText = createSnippets([{'name': 'set all fonts', 'code': 'Editor.setFonts(${0:\'Source Code Pro\'})'},
            {'name': 'add on code executed event', 'code': "Editor.addOnCodeExecutedEvent(function() {\n\talert('code is going to execute!')\n})"}, 
            {'name': 'is a plugin installed', 'code': 'Editor.isPluginInstalled(${0:pluginName})'},
            {'name': 'is dark', 'code': 'Editor.isDark()'},
            {'name': 'require a plugin', 'code': 'Editor.requirePlugin(${0:pluginName})'},
            {'name': 'set blocks editor grid', 'code': "Editor.setBlocksEditorGrid({\n\tspacing : ${1:35},\n\tlength : ${2:9},\n\tcolor : ${3:'gray'},\n\tsnap : ${4:true}\n})"},
            {'name': 'set editor color', 'code': "Editor.setEditorColor(${0:'#f55'})"},
            {'name': 'set theme', 'code': "Editor.setEditorColor(${0:'dark'})"},
            {'name': 'set editor cancel color', 'code': "Editor.setEditorCancelColor(${0:'red'})"},
            {'name': 'add button', 'code': "Editor.addButton(${1:'Logic'}, ${2:'show alert'}, ${3:function() {alert(\"Hello\")}})"},
            {'name': 'get ace editor', 'code': "Editor.getAceEditor()"},
            {'name': 'get Blockly', 'code': "Editor.getBlockly()"},
            {'name': 'get Swal', 'code': "Editor.getSwal()"},
            {'name': 'get code', 'code': "Editor.getCode()"},
            {'name': 'is RTL', 'code': "Editor.isRTL"},
            {'name': 'set direction (rtl, ltr)', 'code': "Editor.setBlocksEditorRTL(${0:false})"},
            {'name': 'change theme(toggle)', 'code': "Editor.changeTheme()"}])
      m.snippetText = snippetText
      m.snippet = snippetManager.parseSnippetFile(snippetText, m.scope)
      snippetManager.register(m.snippet, m.scope)
    }, 100)
}, 'pkgdbg')

injectCss(`.menuitem#pkgdbg {
  width: 105px;
  max-width: 105px;
  margin-right: 10px;
}`)

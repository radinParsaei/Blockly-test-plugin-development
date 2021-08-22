# Plugin development

### Editor.addOnCodeExecutedEvent(callback)
```javascript
Editor.addOnCodeExecutedEvent(function() {
    console.log('code executed')
})
```
this function registers a callback to run when code executed
### Editor.isPluginInstalled(pluginName)
```javascript
Editor.isPluginInstalled('radinParsaei/Blockly-test-plugin-development')
> true
```
returns true or false, true if plugin with that pluginName is installed
### Editor.isDark()
```javascript
Editor.isDark()
> true
```
returns true if the current theme is dark
### Editor.requirePlugin(pluginName, callback)
this function ensures a plugin is installed
### Editor.setBlocksEditorGrid(grid)
```javascript
Editor.setBlocksEditorGrid({
spacing : 35,
length : 9,
color : 'gray',
snap : true
})
```
or:
```javascript
Editor.setBlocksEditorGrid(undefined)
```
This can be used to remove grid

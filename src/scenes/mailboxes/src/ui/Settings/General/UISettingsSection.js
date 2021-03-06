const React = require('react')
const { Toggle, Paper, SelectField, MenuItem } = require('material-ui')
const settingsActions = require('../../../stores/settings/settingsActions')
const styles = require('../settingStyles')
const shallowCompare = require('react-addons-shallow-compare')
const { OSSettings } = require('shared/Models/Settings')

module.exports = React.createClass({
  /* **************************************************************************/
  // Class
  /* **************************************************************************/

  displayName: 'UISettingsSection',
  propTypes: {
    ui: React.PropTypes.object.isRequired,
    os: React.PropTypes.object.isRequired,
    showRestart: React.PropTypes.func.isRequired
  },

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  },

  render () {
    const {ui, os, showRestart, ...passProps} = this.props

    return (
      <div {...passProps}>
        <Paper zDepth={1} style={styles.paper}>
          <h1 style={styles.subheading}>User Interface</h1>
          {process.platform !== 'darwin' ? undefined : (
            <Toggle
              labelPosition='right'
              toggled={ui.showTitlebar}
              label='Show titlebar (Requires Restart)'
              onToggle={(evt, toggled) => {
                showRestart()
                settingsActions.setShowTitlebar(toggled)
              }} />
            )}
          {process.platform === 'darwin' ? undefined : (
            <Toggle
              labelPosition='right'
              toggled={ui.showAppMenu}
              label='Show App Menu (Ctrl+\)'
              onToggle={(evt, toggled) => settingsActions.setShowAppMenu(toggled)} />
          )}
          <Toggle
            toggled={ui.sidebarEnabled}
            label={`Show Sidebar (${process.platform === 'darwin' ? 'Ctrl+cmd+S' : 'Ctrl+alt+S'})`}
            labelPosition='right'
            onToggle={(evt, toggled) => settingsActions.setEnableSidebar(toggled)} />
          <Toggle
            toggled={ui.showAppBadge}
            label='Show app unread badge'
            labelPosition='right'
            onToggle={(evt, toggled) => settingsActions.setShowAppBadge(toggled)} />
          <Toggle
            toggled={os.openLinksInBackground}
            label='Open links in background'
            labelPosition='right'
            onToggle={(evt, toggled) => settingsActions.setOpenLinksInBackground(toggled)} />
          {process.platform === 'darwin' ? (
            <SelectField
              fullWidth
              floatingLabelText='Open at Login'
              onChange={(evt, index, value) => settingsActions.setLoginOpenMode(value)}
              value={os.loginOpenMode}>
              <MenuItem value={OSSettings.LOGIN_OPEN_MODES.OFF} primaryText={'Don\'t open at login'} />
              <MenuItem value={OSSettings.LOGIN_OPEN_MODES.ON} primaryText='Open at login' />
              <MenuItem value={OSSettings.LOGIN_OPEN_MODES.ON_BACKGROUND} primaryText='Open at login (in background)' />
            </SelectField>
          ) : undefined}
        </Paper>
      </div>
    )
  }
})

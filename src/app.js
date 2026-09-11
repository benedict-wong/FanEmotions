import * as guiHTML from './screens/gui.html'

import './styles/main.scss'
import './styles/share.scss'
import './styles/project.scss'

import { ScreenshotShare } from './components/screenshot-share'

// document.body.style.touchAction = 'none'
document.body.insertAdjacentHTML('afterbegin', guiHTML)

const components = {
  'screenshot-share': ScreenshotShare,
}

function registerComponent(name, definition) {
  components[name] = definition

  // Initialize existing elements with this attribute
  document.querySelectorAll(`[${name}]`).forEach((el) => {
    definition.init?.call(el, el.getAttribute(name))
  })

  // Watch for future elements added dynamically
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.hasAttribute(name)) {
          definition.init?.call(node, node.getAttribute(name))
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

Object.entries(components).forEach(([name, definition]) => {
  AFRAME.registerComponent(name, definition)
})

// Check if HMR is enabled
if (module.hot) {
  module.hot.accept() // Accept updates for this module
}

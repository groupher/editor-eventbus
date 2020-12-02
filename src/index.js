import { make, debounce, initEventBus, EVENTS } from '@groupher/editor-utils'
import './index.css'

/**
 * EventBus Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export default class EventBus {
  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return true
  }

  /**
   * @param {{api: object}}  - Editor.js API
   */
  constructor({ api }) {
    this.api = api
    /**
     * Tag represented the term
     *
     * @type {string}
     */

    this.CSS = {
      mentionToolbarBlock: 'cdx-mention-toolbar-block',
      mentionContainer: 'cdx-mention__container',
    }

    this.mentionContainer = make('div', [this.CSS.mentionContainer], {})

    this.eventBus = initEventBus()

    this.eventBus.unsubscribe(EVENTS.KEEP_PARAGRAPH_AFTER_REMOVED)
    this.eventBus.subscribe(
      EVENTS.KEEP_PARAGRAPH_AFTER_REMOVED,
      (type, data) => {
        console.log('in eventbus ..')

        this.api.blocks.insert('paragraph', {}, {}, data, true)
        this.api.caret.setToBlock(data, 'start')
      },
    )
  }

  /**
   * Create button element for Toolbar
   * @ should not visible in toolbar, so return an empty div
   * @return {HTMLElement}
   */
  render() {
    const emptyDiv = make('div')
    return emptyDiv
  }

  surround(range) {}

  checkState(selection) {}

  /**
   * NOTE:  inline tool must have this method
   *
   * @param {Range} range - selected fragment
   */
  // surround(range) {}

  // clear suggestions list

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return '<svg width="34" height="34" xmlns="http://www.w3.org/2000/svg"><path d="M17.78 19.543l3.085 1.78-.825 1.499-1.04-.033-1.03 1.784h-2.075l1.575-2.73-.537-.82.848-1.48zm.578-1.007l3.83-6.687a1.688 1.688 0 0 1 2.303-.626l.003.002a1.725 1.725 0 0 1 .65 2.327l-3.719 6.755-3.067-1.771zm-8.17 3.665h3.662a1.187 1.187 0 0 1 0 2.374h-3.663a1.187 1.187 0 1 1 0-2.374z"/></svg>'
  }
}

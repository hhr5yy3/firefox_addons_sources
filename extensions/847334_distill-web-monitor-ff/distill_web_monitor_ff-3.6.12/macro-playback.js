
class BrowserWrapper {
  pageContext;
  pageLoader;

  constructor(pageContext, pageLoader) {
    this.pageContext = pageContext;
    this.pageLoader = pageLoader;
  }

  async _frame_request(type, data){
    return await this.pageContext.frame_request({
      id: this.pageLoader.id,
      frame: 0,
      input: {
        path: 'performStep',
        data: {
          type,
          data: JSON.stringify(data)
        }
      }
    });
  }

  async click(selector, pos, opts) {
    await this._frame_request('api_click', {selector, pos, opts})
  }

  async waitForDoc(opts) {
    await this._frame_request('api_wait_doc', {opts})
  }

  async select(selector, value, opts) {
    await this._frame_request('api_select', {selector, value, opts})
  }

  async keypress(_code, _count, _opts){
    throw new Error('keypress not allowed in extension')
  }

  async mousemove(selector, pos, opts){
    await this._frame_request('api_mousemove', {selector, pos, opts});
  }

  async drag(_selector, _pos, _targetSelector, _targetPos, _opts){
    throw new Error('drag not implemented in extension');
  }

  async focus(selector, opts){
    await this._frame_request('api_focus', {selector, opts});
  }

  async type(selector, value, opts){
    await this._frame_request('api_type', {selector, value, opts})
  }

  async scroll(selector, left, top, opts) {
    if (isElectron()) {
      await this._frame_request('api_scroll', {selector, left, top, opts})
    } else {
      throw new Error('Scroll is not supported in extension. Use a desktop or cloud monitor instead.')
    }
  }

  async open(url, opts){
    await this._frame_request('api_open', {url, opts})
  }

  async getElementsCount(selector, opts){
    return await this._frame_request('api_get_elements_count', {selector, opts})
  }

  async getElementText(selector, opts){
    return await this._frame_request('api_get_element_text', {selector, opts})
  }

}

function toMacroFormat(steps) {
  return steps.map(step=>{
    let type = step.type.toLowerCase();
    switch (type){
      case 'click':
        return [
          type,
          ['selector', step.data.selector],
          step.data.pos,
          {frame: step.frame || 0}
        ]
      case 'wait_doc':
        return [
          type,
          {frame: step.frame || 0}
        ]
      case 'select':
        return [
          type,
          ['selector', step.data.selector],
          step.data.value,
          {frame: step.frame || 0}
        ]
      case 'keypress':
        return [
          type,
          step.data.code,
          step.data.count,
          {page: step.page || -1}
        ]
      case 'mousemove':
        return [
          type,
          ['selector', step.data.selector],
          step.data.pos,
          {frame: step.frame || 0}
        ]
      case 'drag':
        return [
          type,
          ['selector', step.data.start.selector],
          step.data.start.pos,
          ['selector', step.data.end.selector],
          step.data.end.pos,
          {frame: step.frame || 0}
        ]
      case 'focus':
        return [
          type,
          ['selector', step.data.selector],
          {frame: step.frame || 0}
        ]
      case 'type':
        return [
          type,
          ['selector', step.data.selector],
          step.data.value,
          {frame: step.frame || 0}
        ]
      case 'scroll':
        return [
          type,
          ['selector', step.data.selector],
          step.data.left,
          step.data.top,
          {frame: step.frame || 0}
        ]
      case 'wait_for_duration':
        return [
          type,
          step.data.duration
        ]
      case 'wait_for_element':
        return [
          type,
          ['selector', step.data.selector],
          {frame: step.frame || 0}
        ]
      case 'open':
        return [
          type,
          step.data.url,
          {page: step.page || -1}
        ]
      default:
        throw new Error('Unknown step type: ' + step.type)
    }
  })
}

const MsgType = {
  request: 0,
  response: 1
}

class WindowMessenger {
  constructor (target, clientName) {
    this.sig = 'wm'
    this.listeners = new Map()
    this.handlers = new Map()

    this.targetWindow = target
    this.clientName = clientName
    this.currentId = 0
    this.listenerFunc = this.receiveMessage.bind(this)
    window.addEventListener('message', this.listenerFunc)
  }

  addHandler (comm, func) {
    this.handlers.set(comm, func)
  }

  async receiveMessage (event) {
    if (event.source !== this.targetWindow) return
    const eventData = event.data
    if (eventData['s'] != this.sig) return

    const id = eventData['id']
    const type = eventData['type']
    const comm = eventData['comm']
    const data = eventData['data']

    if (type === MsgType.request) {
      const handler = this.handlers.get(comm)
      if (!handler) return
      
      const result = await handler(data)

      const response = this.getMessage(
        id,
        MsgType.response,
        comm,
        result
      )

      event.source?.postMessage(response, '*')
    } else if (type === MsgType.response) {
      const listener = this.listeners.get(id)
      if (!listener) return
      listener(data)
      this.listeners.delete(id)
    }
  }

  send (comm, data) {
    const id = ++this.currentId

    const promise = new Promise(resolve => {
      this.listeners.set(id, resolve)
    })

    const request = this.getMessage(
      id,
      MsgType.request,
      comm,
      data
    )

    this.targetWindow.postMessage(request, '*')

    return promise
  }

  getMessage (id, type, comm, data) {
    return {
      's': this.sig,
      'id': id,
      'cId': this.clientName,
      'type': type,
      'comm': comm,
      'data': data
    }
  }

  destroy () {
    this.targetWindow = undefined
    window.removeEventListener('message', this.listenerFunc)
  }
}

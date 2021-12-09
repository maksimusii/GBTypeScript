export function renderBlock (elementId: string, html: string) {
  const element = <HTMLElement>document.getElementById(elementId)
  element.innerHTML = html
}

abstract class ToastAction {
  name: string
  constructor(name:string) {
    this.name =name
  }
  handler() {
    return
  }

}

interface ToastMessage {
  type: string | null
  text: string | null
}
export function renderToast (message: ToastMessage | null, action: ToastAction | null): void {
  let messageText = ''
  
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, null)
    }
  }
}
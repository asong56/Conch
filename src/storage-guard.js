export function lockStorage() {
  try { localStorage.setItem   = () => {} } catch (_) {}
  try { sessionStorage.setItem = () => {} } catch (_) {}

  window.XMLHttpRequest = function () {
    return { open() {}, send() {}, setRequestHeader() {} }
  }

  window.fetch = () =>
    Promise.resolve(new Response('', { status: 200 }))

  if (navigator.sendBeacon) navigator.sendBeacon = () => false
}

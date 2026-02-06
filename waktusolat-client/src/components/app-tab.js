export class AppTab extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.showtab)

  }

  showtab = (event) => {
    const tabname = this.getAttribute('name')
    const tabpanels = document.querySelectorAll('app-tab-panel')
    const tabs = document.querySelectorAll('app-tab')

    tabs.forEach(tab => {
      tab.removeAttribute('open')
      this.setAttribute('open', '')
    })

    tabpanels.forEach(panel => {
      panel.removeAttribute('open')
      const panelname = panel.getAttribute('name')
      if(tabname == panelname){
        panel.setAttribute('open', '')
      }

    })
  }

  render() {
    this.shadowRoot.innerHTML = `
  

      <div>${this.title}</div>
      <div></div>
    `

    this.removeAttribute('title')
  }

}

customElements.define('app-tab', AppTab);
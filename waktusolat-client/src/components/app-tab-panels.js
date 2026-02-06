export class AppTabPanels extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
   
  }

  // 2. Define the HTML and CSS
  connectedCallback() {
    this.render()
    const tab = document.querySelectorAll('app-tab')[0]
    const showtab = tab.getAttribute('name')   
    const tabpanels = (document.querySelectorAll('app-tab-panel'))
    tabpanels.forEach(panel => {
      if(panel.getAttribute('name') == showtab){
        tab.setAttribute('open', '')
        panel.setAttribute('open', '')
      }
    })
    
  }

  render() {
    this.shadowRoot.innerHTML = `
      
      <slot></slot>
    `;

  }
}


customElements.define('app-tab-panels', AppTabPanels);
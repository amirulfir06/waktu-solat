export class AppTabPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
   
  }

  // 2. Define the HTML and CSS
  connectedCallback() {
    this.render();
  }

  

  render() {
    this.shadowRoot.innerHTML = `
     
      <slot></slot>     
    `;

    
  }
}

// 4. Register the element
customElements.define('app-tab-panel', AppTabPanel);
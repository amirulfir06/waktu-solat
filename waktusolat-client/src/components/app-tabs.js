export class AppTabs extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
   
  }

  // 2. Define the HTML and CSS
  connectedCallback() {
    this.render()
  }

  increment() {
    this.count++;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      
      <slot></slot>
    `;

    // 3. Add event listeners
    // this.shadowRoot.querySelector('#btn').addEventListener('click', () => this.increment())
  }
}

// 4. Register the element
customElements.define('app-tabs', AppTabs);
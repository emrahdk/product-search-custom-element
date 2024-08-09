class ProductSearch extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
        <div id="search">
          <div class="filters">
            <template id="dropdowns"></template>
            <button id="search-button">5860 results</button>
          </div>
          <div class="stats">
            <div>
              <h1 class="number">1654</h1>
              <p class="desc">On Auction today</p>
            </div>
            <div>
              <h1 class="number">1580</h1>
              <p class="desc">Buy-now on Marketplace</p>
            </div>
            <div>
              <h1 class="number">8467</h1>
              <p class="desc">User logins today</p>
            </div>
          </div>
        </div>
      `;

    const style = document.createElement('style');
    style.textContent = `
        #search {
          display: flex;
          gap: 1rem;
          margin: 1rem;

          .filters {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            row-gap: 1rem;
            column-gap: 2rem;

            #dropdowns {
              display: contents;
            }

            .dropdown {
              position: relative;
              --select-font-size: 0.8rem;
              --select-padding: 0.75rem 0.75rem;

              select {
                width: 100%;
                padding: var(--select-padding);
                font-size: var(--select-font-size);
                border: 1px solid #989898;
                border-radius: 30px;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
              }

              &::after {
                content: "▾";
                position: absolute;
                top: 0;
                right: 0;
                padding: var(--select-padding);
                font-size: var(--select-font-size);
                cursor: pointer;
                pointer-events: none;
              }
            }

            button {
              background-color: #2cffa6;
              border: none;
              border-radius: 30px;
            }
          }

          .stats {
            flex: 1;
            align-items: center;
            justify-content: center;
            display: flex;
            gap: 2rem;

            .number,
            .desc {
              margin: 0;
              text-align: center;
            }
          }
        }

        @media screen and (max-width: 600px) {
          #search {
            flex-direction: column-reverse;

            .stats {
              align-items: flex-start;
            }
          }
        }
      `;

    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));

    // Dynamically create dropdowns
    [
      { name: 'Brand', options: ['Toyota', 'Honda', 'Ford'] },
      { name: 'Model', options: ['Camry', 'Accord', 'Mustang'] },
      { name: 'Fuel type', options: ['Petrol', 'Diesel', 'Electric'] },
      { name: 'Transmission', options: ['Automatic', 'Manual'] },
      {
        name: 'Mileage',
        options: ['0-10,000', '10,000-20,000', '20,000+'],
      },
    ].forEach((dropdown) => {
      const dropdownDiv = document.createElement('div');
      dropdownDiv.classList.add('dropdown');

      const select = document.createElement('select');
      select.innerHTML = `<option>${dropdown.name}</option>`;
      dropdown.options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });

      dropdownDiv.appendChild(select);
      shadow.getElementById('dropdowns').appendChild(dropdownDiv);
    });

    // Add event listener for the button
    shadow.querySelector('#search-button').addEventListener('click', () => {
      window.location.href = '/find-cars';
    });
  }
}

customElements.define('product-search', ProductSearch);

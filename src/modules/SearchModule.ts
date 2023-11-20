import { ProductData } from 'types';

class SearchModule {
  private searchInput: HTMLInputElement;
  private suggestionsList: HTMLDivElement;
  private productList: ProductData[] = [];
  constructor() {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.suggestionsList = document.getElementById('suggestions-list') as HTMLDivElement;
    this.addEventListeners();
    this.fetchProducts();
  }

  private addEventListeners(): void {
    this.searchInput.addEventListener('input', () => this.handleInput());
  }

  private async fetchProducts(): Promise<void> {
    try {
      const response = await fetch('/api/getProducts');
      const products: ProductData[] = await response.json();
      this.productList = products;
     } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  private handleInput(): void {
    const value = this.searchInput.value.trim();

    if (value) {
      const filteredSuggestions = this.productList.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      this.showSuggestions(filteredSuggestions);
    } else {
      this.hideSuggestions();
    }
  }

  private showSuggestions(suggestions: ProductData[]): void {
    this.suggestionsList.innerHTML = suggestions
      .map((product) => `<a href="/product?id=${product.id}" class="suggestion-item">${product.name}</a>`)
      .join('');
    this.suggestionsList.style.display = 'block';
  }

  private hideSuggestions(): void {
    this.suggestionsList.innerHTML = '';
    this.suggestionsList.style.display = 'none';
  }
}

export default SearchModule;

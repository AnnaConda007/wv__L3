 interface Product {
  id: number;
  name: string;
 }

class SearchModule {
  private searchInput: HTMLInputElement;
  private suggestionsList: HTMLDivElement;
  private productList: Product[] = [];
  constructor() {
    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');
    if (searchInput instanceof HTMLInputElement && suggestionsList instanceof HTMLDivElement) {
      this.searchInput = searchInput;
      this.suggestionsList = suggestionsList;
      this.addEventListeners();
      this.fetchProducts();
    } else {
      throw new Error('Cannot initialize search module: required elements not found.');
    }
  }

  private addEventListeners(): void {
    this.searchInput.addEventListener('input', () => this.handleInput());
  }

  private async fetchProducts(): Promise<void> {
    try {
      const response = await fetch('/api/getProducts');
      const products: Product[] = await response.json();
      this.productList = products;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  private handleInput(): void {
    const value = this.searchInput.value.trim();
  
    if (value) {
      const filteredSuggestions = this.productList
        .filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
  
      this.showSuggestions(filteredSuggestions);
    } else {
      this.hideSuggestions();
    }
  }
  

  private showSuggestions(suggestions: Product[]): void {
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

import { Product } from '../types';

export class ProductModel {
  private static instance: ProductModel;
  private products: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      stock: 50,
      category: 'Electronics',
      discount: 10,
      featured: true
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      stock: 30,
      category: 'Electronics',
      discount: 0,
      featured: true
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      description: 'Durable laptop backpack with multiple compartments',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      stock: 100,
      category: 'Accessories',
      discount: 15,
      featured: false
    },
    {
      id: '4',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c',
      stock: 25,
      category: 'Home',
      discount: 0,
      featured: false
    },
    {
      id: '5',
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat with carrying strap',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
      stock: 75,
      category: 'Sports',
      discount: 5,
      featured: false
    },
    {
      id: '6',
      name: 'Gaming Keyboard',
      description: 'Mechanical gaming keyboard with RGB lighting',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
      stock: 40,
      category: 'Electronics',
      discount: 20,
      featured: true
    },
    {
      id: '7',
      name: 'Smartphone',
      description: '5G smartphone with pro camera system',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd',
      stock: 15,
      category: 'Electronics',
      discount: 0,
      featured: true
    },
    {
      id: '8',
      name: 'Running Shoes',
      description: 'Lightweight running shoes with cushioning',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      stock: 60,
      category: 'Sports',
      discount: 25,
      featured: false
    },
    {
      id: '9',
      name: 'Desk Chair',
      description: 'Ergonomic office chair with lumbar support',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1',
      stock: 20,
      category: 'Home',
      discount: 10,
      featured: false
    },
    {
      id: '10',
      name: 'Tablet',
      description: '10-inch tablet with high-resolution display',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
      stock: 35,
      category: 'Electronics',
      discount: 15,
      featured: true
    }
  ];

  private constructor() {}

  public static getInstance(): ProductModel {
    if (!ProductModel.instance) {
      ProductModel.instance = new ProductModel();
    }
    return ProductModel.instance;
  }

  public getAllProducts(): Product[] {
    return this.products;
  }

  public getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.featured);
  }

  public getDiscountedProducts(): Product[] {
    return this.products.filter(product => product.discount > 0);
  }

  public getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  public addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.products.push(newProduct);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return undefined;

    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  public deleteProduct(id: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    return this.products.length !== initialLength;
  }

  public getDiscountedPrice(product: Product): number {
    if (!product.discount) return product.price;
    return product.price * (1 - product.discount / 100);
  }
}
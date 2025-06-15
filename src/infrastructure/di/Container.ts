
import { SupabaseProductRepository } from '../repositories/SupabaseProductRepository';
import { GetProductsUseCase } from '../../domain/usecases/GetProductsUseCase';
import { GetProductByIdUseCase } from '../../domain/usecases/GetProductByIdUseCase';
import { SearchProductsUseCase } from '../../domain/usecases/SearchProductsUseCase';

// Dependency Injection Container
export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerServices(): void {
    // Repositories
    const productRepository = new SupabaseProductRepository();
    this.services.set('ProductRepository', productRepository);

    // Use Cases
    this.services.set('GetProductsUseCase', new GetProductsUseCase(productRepository));
    this.services.set('GetProductByIdUseCase', new GetProductByIdUseCase(productRepository));
    this.services.set('SearchProductsUseCase', new SearchProductsUseCase(productRepository));
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service;
  }
}

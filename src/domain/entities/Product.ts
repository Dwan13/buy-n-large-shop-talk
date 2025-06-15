
export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly imageUrl?: string;
  readonly similarity?: number;
}

export class ProductEntity implements Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: string,
    public readonly imageUrl?: string,
    public readonly similarity?: number
  ) {}

  static fromApiResponse(data: any): ProductEntity {
    return new ProductEntity(
      data.id,
      data.name,
      data.description,
      data.price,
      data.category,
      data.image_url,
      data.similarity
    );
  }

  get isValidPrice(): boolean {
    return this.price > 0;
  }

  get formattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }
}

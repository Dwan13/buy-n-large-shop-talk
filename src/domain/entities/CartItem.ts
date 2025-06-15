
export interface CartItem {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly imageUrl?: string;
  readonly quantity: number;
}

export class CartItemEntity implements CartItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly imageUrl: string | undefined,
    public readonly quantity: number
  ) {}

  get totalPrice(): number {
    return this.price * this.quantity;
  }

  get formattedTotalPrice(): string {
    return `$${this.totalPrice.toFixed(2)}`;
  }

  withQuantity(newQuantity: number): CartItemEntity {
    return new CartItemEntity(
      this.id,
      this.name,
      this.price,
      this.imageUrl,
      newQuantity
    );
  }
}

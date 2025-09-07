import { OrderStatus } from 'common/enums/order.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'users/entities/user.entity';

const money = {
  to: (v: number) => v,
  from: (v: string | null) => (v ? parseInt(v) : null),
};

@Entity()
export class Order {
  @Column()
  id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => OrderItem, (i) => i.order, { cascade: true, eager: true })
  items: OrderItem[];

  @Column({ type: 'numeric', precision: 12, scale: 2, transformer: money })
  total: number;

  @Column()
  currency: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column()
  paymentIntentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class OrderItem {
  @Column()
  id: number;

  @ManyToOne(() => Order, (i) => i.items, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, transformer: money })
  unitPrice: number;

  @Column()
  quantity: number;
}

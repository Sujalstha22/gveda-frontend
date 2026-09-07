import { redirect } from 'next/navigation';

export default function CartPage() {
  redirect('/login?redirect=/checkout');
}

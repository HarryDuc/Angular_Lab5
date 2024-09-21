import { CurrencyPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-b1',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgForOf],
  templateUrl: './b1.component.html',
  styleUrl: './b1.component.css',
})
export class B1Component {
  products: any[] = [
    {
      id: 1,
      title: 'Macbook Pro',
      price: 25000000,
      stock: 5,
      image: './assets/images/1.jpg',
    },
    {
      id: 2,
      title: 'Asus ROG Gaming',
      price: 17000000,
      stock: 6,
      image: './assets/images/2.jpg',
    },
    {
      id: 3,
      title: 'Amazon Kindle',
      price: 15000000,
      stock: 7,
      image: './assets/images/3.jpg',
    },
    {
      id: 4,
      title: 'Another Product',
      price: 18000000,
      stock: 8,
      image: './assets/images/4.jpg',
    },
  ];
  cartItems: any[] = [];
  checkProductStock(itemProduct: any, quantity: number) {
    // Tìm sản phẩm theo id
    const product = this.products.find((p) => p.id === itemProduct.id);
    if (product) {
      // Kiểm tra số lượng tồn kho
      if (quantity == undefined) {
        alert('Chưa nhập số lượng sản phẩm ?');
      } else {
        if (quantity <= product.stock) {
          this.addToCart(itemProduct, quantity);
        } else {
          alert(`Sản phẩm "${product.title}"không đủ hàng. Số lượng tồn kho còn lại là: ${product.stock}.`);
        }
      }
    } else {
      alert('Sản phẩm không tồn tại.');
    }
  }
  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(itemProduct: any, quantity: number) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const cartItem = this.cartItems.find((item) => item.id === itemProduct.id);
    console.log(cartItem);
    if (cartItem) {
      // Nếu đã có sản phẩm trong giỏ hàng, tăng số lượng
      cartItem.quantity += quantity;
      cartItem.totalPrice = cartItem.quantity * cartItem.price;
    } else {
      // Nếu chưa có sản phẩm trong giỏ hàng, thêm sản phẩm mới
      console.log('thêm sản phẩm mới');
      this.cartItems.push({
        id: itemProduct.id,
        title: itemProduct.title,
        price: itemProduct.price,
        quantity: itemProduct.quantity,
        totalPrice: itemProduct.quantity * itemProduct.price,
      });
    }
    // Cập nhật tồn kho sau khi thêm vào giỏ hàng
    const product = this.products.find((p) => p.id === itemProduct.id);
    if (product) {
      product.stock -= quantity;
    }
    console.log('Giỏ hàng hiện tại:', this.cartItems);
    console.log('Tồn kho sản phẩm:', this.products);
  }
  totalItems() {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum += item.quantity;
    })
    return sum;
  }
  removeItem(a: any) {
    this.cartItems.splice(a, 1)
  }
  Total() {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum += item.totalPrice;
    })
    return sum;
  }
}

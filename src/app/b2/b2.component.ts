import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-b2',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './b2.component.html',
  styleUrl: './b2.component.css',
})
export class B2Component {
  @Input() searching: string = ''
  @Output() countEmit = new EventEmitter<number>()
  cartItems: any[] = [];
  itemcount() {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum += item.quantity;
    })
    return sum;
  }
  itemcountEmit() {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum += item.quantity;
    })
    this.countEmit.emit(sum);
  }
  filterName() {
    if (this.searching == null) {
      return this.products;
    } else {
      if (this.searching) {
        //có
        console.log(this.searching);
        console.log(this.searching.toUpperCase().split(' '));
        return this.products.filter((item) => {
          return this.searching
            .toUpperCase()
            .split(' ')
            .every((v) => item.name.toUpperCase().includes(v));
        });
      } else {
        return this.products;
      }
    }
  }
  addToCart(itemProduct: any, quantity: number) {
    const itemCart = this.cartItems.find(item => item.id == itemProduct.id);
    if (itemCart) {
      itemCart.quantity += quantity;
    }else {
      this.cartItems.push({
        id: itemProduct.id,
        name: itemProduct.name,
        image: itemProduct.image,
        price: itemProduct.price,
        quantity: quantity,
      })
    }
    const product = this.products.find(item => item.id == itemProduct.id);
    if (product) {
      product.stock -= quantity
    }
  }
  increment(index: number) {
    const product = this.products.find(item => item.id == this.cartItems[index].id);
    if (product.stock > 0) {
      this.cartItems[index].quantity++
      product.stock--
    }else {
      alert('San pham khong du so luong: ' + product.stock)
    }
  }
  decrement(index: number) {
    const product = this.cartItems.find(item => item.id == this.cartItems[index].id);
    if (product) {
      this.cartItems[index].quantity--;
      product.stock++;
    }
  }
  Remove(index: number) {
    this.cartItems.splice(index, 1)
  }
  sumTotal() {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum += item.quantity * item.price;
    })
    return sum;
  }
  RemoveAll() {
    this.cartItems = [];
  }


  products: any[] = [
    {
      id: 1,
      name: 'Đồng hồ thụy sỹ',
      image: 'assets/images/1001.jpg',
      price: 1200,
      stock: 5,
    },
    {
      id: 2,
      name: 'Dell Star X',
      image: 'assets/images/1003.jpg',
      price: 700,
      stock: 5,
    },
    {
      id: 3,
      name: 'Sony Vaio 2017',
      image: 'assets/images/1004.jpg',
      price: 1700,
      stock: 5,
    },
    {
      id: 4,
      name: 'Máy ảnh Canon',
      image: 'assets/images/1005.jpg',
      price: 300,
      stock: 5,
    },
    {
      id: 5,
      name: 'Vòng cưới France',
      image: 'assets/images/1009.jpg',
      price: 7000,
      stock: 5,
    },
    {
      id: 6,
      name: 'Motorola thế hệ 5',
      image: 'assets/images/1011.jpg',
      price: 900,
      stock: 5,
    },
    {
      id: 7,
      name: 'Mũ cao bồi Mexico',
      image: 'assets/images/1014.jpg',
      price: 100,
      stock: 5,
    },
    {
      id: 8,
      name: 'Nước hoa Korea',
      image: 'assets/images/1023.jpg',
      price: 600,
      stock: 5,
    },
  ];
}

import { Directive, inject, input, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Product } from './product.model';

@Directive({
  selector: 'tr[currencyProvider]',
  standalone: true,
  providers: [CurrencyService]
})
export class CurrencyProviderDirective implements OnInit{
  currencyService = inject(CurrencyService);


  product = input.required<Product>();


  ngOnInit(): void {
    this.currencyService.setState({code: this.product().currencyCode})
  }

}

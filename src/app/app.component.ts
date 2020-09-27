import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agora-vai';

  constructor(private api: ApiService) {

  }

  user = {
    uid: 1,
    name: "Mateus Batista",
    email: "mateus@gmail.com",
    telefone : "32547222"
  }

  
  products = [
    {
      "id": 1,
      "nome": "Coca Cola 750mL",
      "preco": "4.00",
      "obs": ""
    },
    {
      "id": 2,
      "nome": "Skol 1L",
      "preco": "6.00",
      "obs": ""
    },
    {
      "id": 3,
      "nome": "Brahma 1L",
      "preco": "6.50",
      "obs": ""
    },
    {
      "id": 4,
      "nome": "Stella Artois Long Neck",
      "preco": "4.40",
      "obs": ""
    },
    {
      "id": 5,
      "nome": "Stella Artois 750mL",
      "preco": "9.00",
      "obs": ""
    },
    {
      "id": 6,
      "nome": "Brahma Latão 750mL",
      "preco": "4.00",
      "obs": ""
    },
    {
      "id": 7,
      "nome": "Eisenbach",
      "preco": "3.20",
      "obs": "Best beer"
    }
  ]

  selectedPrudctsId = []


  conta: number = 0.00;
  prodClicked = (produc) => {
    //this.router.navigate(['member-detail/'+member.id]);
    this.selectedPrudctsId.push(produc)
    this.setConta(Number(produc.preco))

  }

  setConta(p) {
    this.conta += p
  }

  bill() {
    alert("Conta sendo Fechada, aguarde...")
  }


  create() {

    let prods = []
    for (let index = 0; index < this.selectedPrudctsId.length; index++) {
      console.log(this.selectedPrudctsId[index].id)
      prods.push(this.selectedPrudctsId[index].id)
    }


    let datax =
    {

      "date": "2020-09-27T13:51:24Z",
      "produtos": prods,
      "obs": "geladinha!",
      "usuario": this.user.uid,
      "estabelecimento": 1
    }
    let barInfos = {
      "data" : [
        { name : "mesa_num", "value" : "1" },
        { name : "nome", "value" : this.user.name },
        { name : "message", "value" : "    " },
      ]

    }
    for (let index = 0; index < this.selectedPrudctsId.length; index++) {
      let v: String = this.selectedPrudctsId[index]
      barInfos.data.push({ name : "pedido", value : String(v) })
    }

    this.api.createRequest(datax).subscribe(
      data => {
        console.log(data)
        //alert("Dados Enviados Para AMbev")
        this.selectedPrudctsId = []
      },
      error => {
        alert('Erro')

        console.log("erro aq: " + error);
      }
    )

    this.api.barManagementAdd(barInfos).subscribe(
      data => {
        console.log(data)
        alert("Pedido Efetuado com sucesso")
      },
      error => {
        alert('Erro')

        console.log("erro aq: " + error);
      }
    )

  }

}

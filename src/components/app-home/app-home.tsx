import { Component, State } from '@stencil/core';
import firebase from "@firebase/app";
import '@firebase/database'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @State() llaveros: {
    nombre: string,
    foto: string,
    largo: number,
    ancho: number,
    precio: number,
    tipo: string
  }[];

  componentWillLoad() {
    this.llaveros = [];

    firebase.database().ref('llaveros/').once('value').then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.llaveros = [...this.llaveros, doc.val()];
      });
    });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-list>
          {this.llaveros.map((llavero) => 
            <ion-card class="llavero">
              <ion-img src={llavero.foto}></ion-img>
              <ion-card-header>
                <ion-card-subtitle>{llavero.tipo}</ion-card-subtitle>
                <ion-card-title>{llavero.nombre}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, egestas dapibus platea turpis laoreet est.
                </p>
                <ion-row>
                  <ion-col>
                    <ion-item lines="none">
                      <ion-icon slot="start" name="resize" color="tertiary"></ion-icon>
                      <ion-label color="tertiary">
                        {llavero.largo}x{llavero.ancho} cm
                      </ion-label>
                    </ion-item>
                  </ion-col>
                  <ion-col>
                    <ion-item lines="none">
                      <ion-icon slot="start" name="cash" color="tertiary"></ion-icon>
                      <ion-label color="tertiary">
                        $ {llavero.precio}
                      </ion-label>
                    </ion-item>
                  </ion-col>
                </ion-row>
                <ion-button expand="block" color="secondary">
                  <ion-icon name="cart" slot="start"></ion-icon>
                  ¡Lo quiero!
                </ion-button>
              </ion-card-content>
            </ion-card>
          )}
        </ion-list>
        {/* <ion-button href="/profile/ionic" expand="block">Profile page</ion-button> */}
      </ion-content>
    ];
  }
}

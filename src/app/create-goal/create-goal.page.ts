import {
    Component,
    OnInit
} from '@angular/core';
import {
    ModalController
} from '@ionic/angular';
@Component({
    selector: 'app-create-goal',
    templateUrl: './create-goal.page.html',
    styleUrls: ['./create-goal.page.scss'],
})
export class CreateGoalPage implements OnInit {
    dataInfo = {
        type: "",
        dateSaving: "",
        amount: 0,
        rules: []
    }
    types = [
        'Comprar Algo',
        'Viajar',
        'Hacer algo',
        'Solo Ahorrar'
    ];
    constructor(public modalCtrl: ModalController) {}


    ngOnInit() {}

    cerrar() {
        this.modalCtrl.dismiss();
    }
    save() {
        this.modalCtrl.dismiss(this.dataInfo);
    }
}
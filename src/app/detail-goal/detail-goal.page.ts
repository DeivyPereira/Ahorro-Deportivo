import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    ModalController,
    AlertController
} from '@ionic/angular';

import {
    CreateRulePage
} from '../create-rule/create-rule.page';

@Component({
    selector: 'app-detail-goal',
    templateUrl: './detail-goal.page.html',
    styleUrls: ['./detail-goal.page.scss'],
})
export class DetailGoalPage implements OnInit {
    @Input() index;
    @Input() rules;
    @Input() data;
    types = [
        'Comprar Algo',
        'Viajar',
        'Hacer algo',
        'Solo Ahorrar'
    ];
    typesrules = [
        'Juegue',
        'Gane',
        'Realice un Gol'
    ];
    constructor(public modalCtrl: ModalController) {}
    cerrar() {
        this.modalCtrl.dismiss();
    }
    save() {
        let updateGoal = {
            type: this.data.type,
            dateSaving: this.data.dateSaving,
            amount: this.data.amount,
            rules: this.rules,
            index: this.index
        }
        this.modalCtrl.dismiss(updateGoal);
    }


    async rule(index, item) {
        const modal = await this.modalCtrl.create({
            component: CreateRulePage,
            cssClass: 'my-custom-class',
            componentProps: {
                'data': item,
                'pos': index,
                'rules': this.rules
            }
        });
        modal.onDidDismiss()
            .then((data) => {
                let dat = data['data'];
                if (dat) {
                    let goalsPosition = dat['goals'];
                }
            });
        return await modal.present();
    }

    ngOnInit() {}

}
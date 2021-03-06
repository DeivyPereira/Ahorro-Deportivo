import {
    Component
} from '@angular/core';
import {
    ModalController,
    ActionSheetController,
    AlertController
} from '@ionic/angular';
import {
    CreateGoalPage
} from '../create-goal/create-goal.page';
import {
    CreateRulePage
} from '../create-rule/create-rule.page';
import {
    SimulatePage
} from '../simulate/simulate.page';
import {
    DetailGoalPage
} from '../detail-goal/detail-goal.page';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    goals = [];
    constructor(public modalController: ModalController, public actionSheetController: ActionSheetController, public alertController: AlertController) {}

    async presentActionSheet(i, item) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Opciones',
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Detalle de Meta',
                icon: 'golf-outline',
                handler: () => {
                    this.detail(i, item);
                }
            }, {
                text: 'Agregar Regla',
                icon: 'clipboard-outline',
                handler: () => {
                    this.newRule(i, item)
                }
            }, {
                text: 'Simular',
                icon: 'cog-outline',
                handler: () => {
                    this.simulate(i, item)
                }
            }, {
                text: 'Cerrar',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CreateGoalPage,
            cssClass: 'my-custom-class'
        });
        modal.onDidDismiss()
            .then((data) => {
                const dat = data['data'];
                if (dat.type) {
                    this.goals.push(dat);
                }
            });
        return await modal.present();
    }
    async newRule(index, item) {
        if (item.rules.length >= 5) {
            this.maxRule();
            return;
        }

        const modal = await this.modalController.create({
            component: CreateRulePage,
            cssClass: 'my-custom-class',
            componentProps: {
                'pos': index,
                'rules': item.rules
            }
        });
        modal.onDidDismiss()
            .then((data) => {
                let dat = data['data'];
                let goalsPosition = dat['goals'];
                if (goalsPosition >= 0) {
                    this.goals[goalsPosition].rules.push(dat);
                }
            });
        return await modal.present();
    }

    async detail(index, item) {
        const modal = await this.modalController.create({
            component: DetailGoalPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'index': index,
                'data': item,
                'rules': item.rules,
            }
        });
        modal.onDidDismiss()
            .then((data) => {
                let dat = data['data'];
                if (dat) {
                    this.goals[dat.index] = dat;
                }
            });
        return await modal.present();
    }


    async simulate(index, item) {
        if (item.rules.length <= 0) {
            this.minRules()
            return;
        }
        const modal = await this.modalController.create({
            component: SimulatePage,
            cssClass: 'my-custom-class',
            componentProps: {
                'goals': item,
                'rules': item.rules,
            }
        });
        modal.onDidDismiss()
            .then((data) => {
                let dat = data['data'];
            });
        return await modal.present();
    }
    async maxRule() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            subHeader: 'Maximo de reglas',
            message: '¡Solo puedes generar 5 alertas por meta. alcanzaste tu maximo.!',
            buttons: ['OK']
        });

        await alert.present();
    }
    async minRules() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            subHeader: 'Primero una regla.',
            message: 'Configura una regla para poder simular tu ahorro.',
            buttons: ['OK']
        });

        await alert.present();
    }
}
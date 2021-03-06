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
    ApiService
} from '../services/api.service';
@Component({
    selector: 'app-create-rule',
    templateUrl: './create-rule.page.html',
    styleUrls: ['./create-rule.page.scss'],
})
export class CreateRulePage implements OnInit {
    teams = [];
    dataInfo = {
        team: "",
        events: "",
        amount: 0,
        goals: ""
    }
    types = [{
            'title': 'Juegue',
            'value': 0
        },
        {
            'title': 'Gane',
            'value': 1
        },
        {
            'title': 'Realice un Gol',
            'value': 2
        }
    ];
    @Input() rules;
    @Input() pos;
    @Input() data;
    constructor(public modalCtrl: ModalController, private api: ApiService, public alertController: AlertController) {
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.getTeams();
        if (this.data) {
            this.dataInfo = this.data;
        }

    }
    cerrar() {
        this.modalCtrl.dismiss();
    }

    save() {
        //Confirmamos si esta editando o creando uno nuevo
        if (this.data) { // Editando
            let arrayNws = [...this.rules];
            delete arrayNws[this.pos];
            var arr = arrayNws.filter(item => item);
            const resultado = arr.find(pj => pj.team === this.dataInfo.team && pj.events === this.dataInfo.events);
            if (resultado) {
                this.duplicate();
            } else {
                this.modalCtrl.dismiss(this.dataInfo);
            }
        } else { // Creando uno nuevo
            this.dataInfo.goals = this.pos;
            const resultado = this.rules.find(pj => pj.team === this.dataInfo.team && pj.events === this.dataInfo.events);
            if (resultado) {
                this.duplicate();
            } else {
                this.modalCtrl.dismiss(this.dataInfo);
            }
        }

    }
    async duplicate() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            subHeader: 'Regla Duplicada',
            message: '¡Parece que ya hiciste una regla con estas mismas condiciones!',
            buttons: ['OK']
        });

        await alert.present();
    }
    getTeams() {
        this.api.get("competitions/2001/teams?season=2019&stage=GROUP_STAGE").subscribe(
            jwt => {
                this.teams = jwt.teams
            },
            err => {
                console.log('tracking-error ' + err)
            }
        );
    }
}
import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    ModalController
} from '@ionic/angular';
import {
    ApiService
} from '../services/api.service';
@Component({
    selector: 'app-simulate',
    templateUrl: './simulate.page.html',
    styleUrls: ['./simulate.page.scss'],
})
export class SimulatePage implements OnInit {
    @Input() goals;
    @Input() rules;
    data: any;
    matches: any;
    partidosJugadosArrays = [];
    partidosGanadosArrays = [];
    golesTotalArrays = [];
    savingsTotal = 0;
    disabledButton = false;
    constructor(public modalCtrl: ModalController, private api: ApiService) {}
    ngOnInit() {}
    cerrar() {
        this.modalCtrl.dismiss();
    }

    procesar() {
        this.disabledButton = true;
        this.rules.forEach((item) => {
                this.api.get("/teams/" + item.team + "/matches?dateFrom=2019-06-25&dateTo=2020-08-23").subscribe(
                    jwt => {
                        this.data = jwt
                        this.matches = this.data.matches;
                        var partidosJugados = this.matches.filter(pj => pj.stage != 'REGULAR_SEASON');
                        if (item.events == 0) { // Cuantas veces jugo.
                            var arraysTemp = partidosJugados.map((fg) => {
                                let contricante = fg.homeTeam.id != item.team ? fg.homeTeam.name : fg.awayTeam.name;
                                let dat = {
                                    'ahorrado': item.amount,
                                    'contrario': contricante,
                                    'fecha': fg.utcDate
                                };
                                this.savingsTotal += dat.ahorrado;
                                this.partidosJugadosArrays.push(dat);
                            });
                        }
                        if (item.events == 1) { // Gano.
                            var partidosGanados = partidosJugados.filter((pg) => {
                                let homeTeam = pg.homeTeam.id == item.team ? true : false;
                                if (homeTeam && pg.score.winner == "HOME_TEAM") {
                                    return pg;
                                }
                                if (!homeTeam && pg.score.winner == "AWAY_TEAM") {
                                    return pg;
                                }
                            });
                            let arraysTemp = partidosGanados.map((fg) => {
                                let contricante = fg.homeTeam.id != item.team ? fg.homeTeam.name : fg.awayTeam.name;
                                let dat = {
                                    'ahorrado': item.amount,
                                    'contrario': contricante,
                                    'fecha': fg.utcDate
                                };
                                this.savingsTotal += dat.ahorrado;
                                this.partidosGanadosArrays.push(dat);
                            });
                        }
                        if (item.events == 2) { // Cantidad de Goles.
                            var findGoals = partidosJugados.map((fg) => {
                                let homeTeam = fg.homeTeam.id == item.team ? true : false;
                                let contricante = fg.homeTeam.id != item.team ? fg.homeTeam.name : fg.awayTeam.name;
                                var gol = 0;
                                if (homeTeam) {
                                    gol = fg.score.fullTime.homeTeam;
                                } else {
                                    gol = fg.score.fullTime.awayTeam;
                                }
                                let dat = {
                                    'ahorrado': item.amount * gol,
                                    'gol': gol,
                                    'contrario': contricante,
                                    'fecha': fg.utcDate
                                };
                                this.savingsTotal += dat.ahorrado;
                                this.golesTotalArrays.push(dat);
                            });
                        }
                    });
            },
            err => {
                console.log('tracking-error ' + err)
            }
        );

    }
}
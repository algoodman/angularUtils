import { Injectable } from '@angular/core';
import { Utils } from '../utils';
import * as _ from "lodash";

@Injectable()
export class LocalStorageService {
    userName: string;
    userData: any; // UserPreferenceData class
    constructor() {
    }

	// getUserPreferences(): UserPreferenceData {
	// 	if (!Utils.hasLocalStorage()) {
	// 		return null;
	// 	} else {
	// 		this.userName = localStorage.getItem(LocalStorageNames.username);
	// 		this.userData = JSON.parse(localStorage.getItem(this.userName + LocalStorageNames.preferences));
	// 		if (this.userData == null) {
	// 			this.userData = new UserPreferenceData();
	// 			this.userData.customersPanel = true;
	// 			this.userData.contactInfoPanel = true;
	// 			this.userData.debtsPanel = true;
	// 			this.userData.logsPanel = true;
	// 			this.userData.milestonePanel = true;
	// 			this.userData.paymentsHistoryPanel = true;
	// 			this.userData.personalInfoPanel = true;
	// 			this.userData.myQueueViewType = MyQueueViewType.DEFAULT.valueOf();
	// 			localStorage.setItem(this.userName + LocalStorageNames.preferences, JSON.stringify(this.userData));
	// 			return this.userData;
	// 		} else {
	// 			return this.userData;
	// 		}
	// 	}
	// }


	// savePanelState(panelName: string, isExpanded: boolean): void {
    //     this.userData = JSON.parse(localStorage.getItem(this.userName + LocalStorageNames.preferences));
    //     if (!this.userData) {
    //         this.userData = new UserPreferenceData();
    //     }
	 //
    //     if ( this.userData != null) {
    //         if (panelName == "customer") {
    //             this.userData.customersPanel = isExpanded;
    //         } else if (panelName == "debts") {
    //             this.userData.debtsPanel = isExpanded;
    //         } else if (panelName == "milestone") {
    //             this.userData.milestonePanel = isExpanded;
    //         } else if (panelName == "payment") {
    //             this.userData.paymentsHistoryPanel = isExpanded;
    //         } else if (panelName == "logs") {
    //             this.userData.logsPanel = isExpanded;
    //         } else if (panelName == "personalInfo") {
    //             this.userData.personalInfoPanel = isExpanded;
    //         } else if (panelName == "contactInfo") {
    //             this.userData.contactInfoPanel = isExpanded;
    //         }
    //         localStorage.setItem(this.userName + LocalStorageNames.preferences, JSON.stringify(this.userData));
    //     }
    // }

    // saveMyQueueViewType(viewType:number): void {
    //     this.userData = JSON.parse(localStorage.getItem(this.userName + LocalStorageNames.preferences));
    //     if (!this.userData) {
    //         this.userData = new UserPreferenceData();
    //     }
	 //
    //     if (this.userData != null) {
    //         this.userData.myQueueViewType = viewType;
    //         localStorage.setItem(this.userName + LocalStorageNames.preferences, JSON.stringify(this.userData));
    //     }
    // }

    //method to save the preference setting of a user in work log on main screen and in log history popup
    // saveUserLogPreference( maxLogsMain: number, pageSizeLogsMain: number, maxLogsHistory: number, pageSizeLogsHistory: number): void {
    //     this.logPreferenceSettings = JSON.parse(localStorage.getItem(this.userName + LocalStorageNames.logPreferenceSettings));
    //     if (!this.logPreferenceSettings) {
    //         this.logPreferenceSettings = new UserWorkLogPreference();
    //     }
    //     if (this.logPreferenceSettings != null) {
    //         if(maxLogsMain)
    //             this.logPreferenceSettings.maxCountonMainLog = +maxLogsMain;
    //         if(pageSizeLogsMain)
    //             this.logPreferenceSettings.pageSizeonMainLog = +pageSizeLogsMain;
    //         if( maxLogsHistory)
    //             this.logPreferenceSettings.maxCountonHistoryLog = +maxLogsHistory;
    //         if( pageSizeLogsHistory)
    //             this.logPreferenceSettings.pageSizeonHistoryLog = +pageSizeLogsHistory;
    //         localStorage.setItem(this.userName + LocalStorageNames.logPreferenceSettings, JSON.stringify(this.logPreferenceSettings));
    //     }
    // }




}

export class DepartmentStatsDTO {
    numberOfUsers!: number;
    numberOfDocuments!: number;

    constructor(numberOfUsers: number, numberOfDocuments: number){
        this.numberOfUsers = numberOfUsers;
        this.numberOfDocuments = numberOfDocuments;
    }
}

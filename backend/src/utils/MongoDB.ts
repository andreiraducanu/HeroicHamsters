class MongoDB {
    private static readonly username = 'vlad-bulhac';
    private static readonly password = 'parola98';

    public static getConnectionURL(): string {
        return `mongodb+srv://${this.username}:${this.password}@smartoffice-7e8sg.azure.mongodb.net/test`;
    }
}

export default MongoDB;

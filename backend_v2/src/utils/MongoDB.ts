class MongoDB {
    private static readonly username = 'username';
    private static readonly password = 'password';

    public static getConnectionURL(): string {
        return `mongodb+srv://${this.username}:${this.password}@smartoffice-7e8sg.azure.mongodb.net/test`;
    }
}

export default MongoDB;

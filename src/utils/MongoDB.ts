class MongoDB {
    private static readonly username = process.env.MONGO_USERNAME;
    private static readonly password = process.env.MONGO_PASSWORD;

    public static getConnectionURL(): string {
        return `mongodb+srv://${this.username}:${this.password}@smartoffice-7e8sg.azure.mongodb.net/main`;
    }
}

export default MongoDB;

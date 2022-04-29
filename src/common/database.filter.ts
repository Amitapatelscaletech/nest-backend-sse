export class DatabaseFilter {
    public page: number;
    public count: number;
    public whereConditions: {
        'show_id': string,
        'user_id': string,
    };
}
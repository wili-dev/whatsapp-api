export interface IWhatsAppRepository {

    sendMessage(data: object): Promise<void>;
}
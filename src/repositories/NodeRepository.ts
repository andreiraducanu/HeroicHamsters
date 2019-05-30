import {
    MessageNode,
    ElementNode,
    StationNode,
    LocationNode,
    StockItemNode,
    QuantityHistoryNode,
} from '../utils/NodeTypes';
import { InstanceType } from 'typegoose';
import { ElementType } from '../utils/Enums';

import { LocationModel, Location } from '../models/Location.model';
import { StationModel, Station } from '../models/Station.model';
import { ElementModel, Element } from '../models/Element.model';
import { MessageModel, Message } from '../models/Message.model';
import { StockItemModel, StockItem } from '../models/StockItem.model';
import QuantityHistoryModel, { QuantityHistory } from '../models/QuantityHistory.model';
import moment from 'moment';

class NodeRepository {
    private static instance: NodeRepository;

    private constructor() {}

    public static getInstance(): NodeRepository {
        if (!this.instance) NodeRepository.instance = new NodeRepository();

        return NodeRepository.instance;
    }

    public async getLocationNode(locationId: string): Promise<LocationNode> {
        const location = await LocationModel.findById(locationId).exec();
        let locationNode: LocationNode = await this.createLocationNode(location);

        return locationNode;
    }

    public async getStationNode(stationId: string): Promise<StationNode> {
        const station = await StationModel.findById(stationId).exec();
        let stationNode: StationNode = await this.createStationNode(station, false);

        return stationNode;
    }

    public async getQuantityHistoryNodes(): Promise<QuantityHistoryNode[]> {
        let nodes: QuantityHistoryNode[] = [];

        const quantityHistory = await QuantityHistoryModel.find().exec();

        for (let i = 0; i < quantityHistory.length; i++) {
            nodes.push(this.createQuantityHistoryNode(quantityHistory[i]));
        }

        return nodes;
    }

    private async createLocationNode(location: InstanceType<Location>): Promise<LocationNode> {
        let locationNode: LocationNode = {
            id: location._id,
            name: location.name,
            stations: [],
        };

        let stations: any = location.stations;
        for (let i = 0; i < stations.length; i++) {
            let stationNode = await this.createStationNode(stations[i], true);
            locationNode.stations.push(stationNode);
        }

        return locationNode;
    }

    private async createStationNode(station: InstanceType<Station>, getStock: boolean): Promise<StationNode> {
        let stationNode: StationNode = {
            id: station._id,
            floor: station.floor,
            name: station.name,
            description: station.description,
            image: station.image,
            elements: [],
        };

        let elements = await ElementModel.find({ _id: { $in: station.elements } }).exec();
        let messages = await MessageModel.find({ stationId: station._id }).exec();

        let stockItems: InstanceType<StockItem>[] = null;
        if (getStock == true) stockItems = await StockItemModel.find({ stationId: station._id }).exec();

        for (let i = 0; i < elements.length; i++) {
            let elementNode = this.createElementNode(elements[i], null, messages, stockItems);
            stationNode.elements.push(elementNode);
        }

        return stationNode;
    }

    private createElementNode(
        element: InstanceType<Element>,
        parentId: string,
        messages: InstanceType<Message>[],
        stockItems: InstanceType<StockItem>[],
    ): ElementNode {
        let elementNode: ElementNode = {
            id: element._id,
            name: element.name,
            image: element.image,
            type: element.type,
            parentId: parentId,
            elements: [],
            messages: [],
            quantity: 0,
            stock: [],
        };

        if (elementNode.type == ElementType.CATEGORY) {
            let elements: any = element.elements;
            for (let i = 0; i < elements.length; i++) {
                let childNode = this.createElementNode(elements[i], element._id, messages, stockItems);
                elementNode.elements.push(childNode);
            }
            elementNode.messages = undefined;
        } else {
            elementNode.elements = undefined;

            for (let i = 0; i < messages.length; i++) {
                if (messages[i].elementId.toString() == element._id.toString()) {
                    let message = this.createMessageNode(messages[i]);
                    elementNode.messages.push(message);
                }
            }

            if (stockItems != null) {
                for (let i = 0; i < stockItems.length; i++) {
                    if (stockItems[i].elementId.toString() == element._id.toString()) {
                        let stockItem = this.createStockItemNode(stockItems[i]);
                        elementNode.stock.push(stockItem);
                        elementNode.quantity += stockItem.quantity;
                    }
                }
            } else {
                elementNode.stock = undefined;
                elementNode.quantity = undefined;
            }
        }

        return elementNode;
    }

    private createMessageNode(message: InstanceType<Message>): MessageNode {
        let messageNode: MessageNode = {
            id: message._id,
            type: message.type,
            content: message.content,
            createdAt: message.createdAt,
        };

        return messageNode;
    }

    private createStockItemNode(stockItem: InstanceType<StockItem>): StockItemNode {
        let stockItemNode: StockItemNode = {
            id: stockItem._id,
            quantity: stockItem.quantity,
            expirationDate: stockItem.expirationDate,
        };

        return stockItemNode;
    }

    private createQuantityHistoryNode(quantityHistory: InstanceType<QuantityHistory>): QuantityHistoryNode {
        let historyNode: QuantityHistoryNode = {
            elementId: quantityHistory.elementId.toString(),
            quantity: quantityHistory.quantity,
            date: moment(quantityHistory.date).format('YYYY-MM-DD'),
        };

        return historyNode;
    }
}

export default NodeRepository;

import { MessageNode, ElementNode, StationNode, LocationNode } from '../utils/NodeTypes';
import { InstanceType } from 'typegoose';
import { ElementType } from '../utils/Enums';

import { LocationModel, Location } from '../models/Location.model';
import { StationModel, Station } from '../models/Station.model';
import { ElementModel, Element } from '../models/Element.model';
import { MessageModel, Message } from '../models/Message.model';

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
        let stationNode: StationNode = await this.createStationNode(station);

        return stationNode;
    }

    private async createLocationNode(location: InstanceType<Location>): Promise<LocationNode> {
        let locationNode: LocationNode = {
            id: location._id,
            name: location.name,
            stations: [],
        };

        let stations: any = location.stations;
        for (let i = 0; i < stations.length; i++) {
            let stationNode = await this.createStationNode(stations[i]);
            locationNode.stations.push(stationNode);
        }

        return locationNode;
    }

    private async createStationNode(station: InstanceType<Station>): Promise<StationNode> {
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

        for (let i = 0; i < elements.length; i++) {
            let elementNode = this.createElementNode(elements[i], null, messages);
            stationNode.elements.push(elementNode);
        }

        return stationNode;
    }

    private createElementNode(
        element: InstanceType<Element>,
        parentId: string,
        messages: InstanceType<Message>[],
    ): ElementNode {
        let elementNode: ElementNode = {
            id: element._id,
            name: element.name,
            image: element.image,
            type: element.type,
            parentId: parentId,
            elements: [],
            messages: [],
        };

        if (elementNode.type == ElementType.CATEGORY) {
            let elements: any = element.elements;
            for (let i = 0; i < elements.length; i++) {
                let childNode = this.createElementNode(elements[i], element._id, messages);
                elementNode.elements.push(childNode);
            }
            elementNode.messages = undefined;
        } else {
            elementNode.elements = undefined;
            elementNode.messages = messages
                .filter(message => message.elementId == element._id)
                .map(message => this.createMessageNode(message));
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
}

export default NodeRepository;

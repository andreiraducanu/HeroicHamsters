import { ElementType, MessageType } from './Enums';

export interface QuantityHistoryNode {
    elementId: string;
    name: string;
    quantity: number;
    date: string;
}

export interface StockItemNode {
    id: string;
    quantity: number;
    expirationDate: Date;
}

export interface MessageNode {
    id: string;
    type: MessageType;
    content: string;
    createdAt: Date;
}

export interface ElementNode {
    id: string;
    name: string;
    image: string;
    type: ElementType;
    parentId: string;
    elements: ElementNode[];
    messages: MessageNode[];
    quantity: number;
    stock: StockItemNode[];
}

export interface StationNode {
    id: string;
    floor: number;
    name: string;
    description: string;
    image: string;
    elements: ElementNode[];
}

export interface LocationNode {
    id: string;
    name: string;
    stations: StationNode[];
}

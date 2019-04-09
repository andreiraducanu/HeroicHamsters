import { Container } from "typescript-ioc";
import { FoodRepository } from "../controllers/FoodRepository";
import { RoomRepository } from "../controllers/RoomRepository";
import { IControllerRepository } from "../Controllers/IControllerRepository";


export class IocContainerConfig {

    static configure() {
        Container.bind(IControllerRepository).to(FoodRepository);
        Container.bind(IControllerRepository).to(RoomRepository);
    }
}
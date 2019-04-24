import Item from './ItemType';

class CategoryType {
    public name: string;
    public subCategories: CategoryType[];
    public items: Item[];
}

export default CategoryType;

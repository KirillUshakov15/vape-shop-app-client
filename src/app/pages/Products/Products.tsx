import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Product} from "../../components/Products/Product";
import style from './Products.module.scss'
import {Divider, Input} from "../../ui";
import useSearch from "../../hooks/useSearch";
import {ProductInfoModal} from "../../components";
import {IProduct} from "../../models/IProduct";
import {PRODUCT_INFO_MODAL} from "../../constants/modal-names";

export const Products: FC = observer(() => {
    const [value, setValue] = useState<string>('')
    const searchValue = useSearch<string>(value)

    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null)

    const {productStore, popupStore} = useContext(Context)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const selectProduct = (product: IProduct) => {
        setCurrentProduct(product)
        popupStore.open(PRODUCT_INFO_MODAL)
    }

    useEffect(() => {
        productStore.getAll(searchValue);

        return () => popupStore.close()
    }, [searchValue])

    return (
        <div className={style.wrapper}>
            {popupStore.isOpen && <ProductInfoModal product={currentProduct}/>}
            <div className={style.header}>
                <h1>Линейка товаров</h1>
                <Divider/>
                <p>
                    Жидкость для электронных сигарет Drip Drop - это линейка насыщенных вкусов и необычных сочетаний, которые
                    подходят как для любителей классики, так и для тех, кто хочет попробовать что-то новое. Мы подобрали вкусы
                    для разных сезонов, которые помогут вам охладиться жарким летом и обогреться морозной зимой. Для своего
                    продукта у нас используются премиальные компоненты, но несмотря на это мы занимаем средний ценовой диапазон,
                    что несомненно радует потребителей.
                </p>
                <Input
                    placeholder="Поиск по названию..."
                    value={value}
                    onChange={handleChange}
                />
                <Divider className={style.divider}/>
            </div>

            {(searchValue && !productStore.isLoading) && <h3>{`Результаты поиска "${searchValue}":`}</h3>}
            {(productStore.products.length <= 0 && !productStore.isLoading) && <h2>По Вашему запросу ничего не найдено</h2>}
            {productStore.isLoading && <h2>Идет загрузка содержимого...</h2>}

            <div className={style.productsContainer}>
                {productStore.products.length > 0 && productStore.products.map(product =>
                    <Product key={product.title} product={product} onMore={selectProduct}/>
                )}
            </div>
        </div>
    );
});
import React, {useEffect, useState} from 'react';
import '../styles/mainPage.scss'
import Card from "../components/Card";
import fetchWrapper from "../helpers/fetchWrapper";
import Header from "../components/Header"
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Tag from "../components/Tag";
import Loader from "../components/Loader";
import {searchTags} from "../constants/constants";
import Slider from "../components/Slider";
import {TData, TTag} from "../interfaces/interfaces";
import {useDebounce} from "../helpers/debounce";

export const MainPage = () => {
    const [data, setData] = useState<TData[]>([])
    const [isMore, setIsMore] = useState<boolean>(true)
    const [count, setCount] = useState<number>(8)
    const [search, setSearch] = useState<string>('')
    const [resultTags, setResultTags] = useState<string[]>(['Beauty'])
    const [tags, setTags] = useState<TTag[]>(searchTags)
    const [loading, setLoading] = useState<boolean>(true)
    const searchStart = useDebounce(search, 300);

    const getData = (): void => {
        fetchWrapper.get(
            `data/?count=${count}&search=${search}&resultTags=${resultTags}`
        ).then((data: {filterData: TData[], isMore: boolean}) => {
            setData(data.filterData);
            setIsMore(data.isMore);
            setLoading(false)
        })
    }

    const handleClick = (): void => {
        setCount(count + 8)
    }

    const inputHandler = (value: string): void => {
        setSearch(value);
        setCount(8)
    }

    const tagHandler = (value: TTag): void => {
        const result = tags;

        const tmp = result.find((item: TTag) => item.name === value.name)
        tmp.active = !tmp.active

        const search = result.filter((elem: TTag) => elem.active).map((elem: TTag) => elem.name);

        setTags(result);
        setResultTags(search);
        setCount(8)
    }

    useEffect(() => {
        getData();
    }, [searchStart, resultTags, count])


    return (
        <>
            <Header />
            <main className="main-container">
                <Slider/>
                <section className="articles">
                    <h3>Interesting articles</h3>
                    <SearchBar onChange={inputHandler}/>
                    <nav className="tags">
                        {
                            tags.map((tag: TTag) => <Tag onClick={tagHandler} tag={tag} key={tag.name}/>)
                        }
                    </nav>
                    {loading ? <Loader/> :
                        <>
                            <div className="cards-container">
                                {   data.length ?
                                    data.map((card: TData) =>
                                        <Card
                                            id={card.id}
                                            image={card.img}
                                            title={card.title}
                                            subtitle={card.subtitle[0].article[1]}
                                            key={card.id}
                                        />
                                    ) : <p className="no-articles">No articles!</p>
                                }
                            </div>
                            {isMore && <button onClick={handleClick} className="load-more">Load more</button>}
                        </>
                    }
                </section>
            </main>
            <Footer/>
        </>
    )
}
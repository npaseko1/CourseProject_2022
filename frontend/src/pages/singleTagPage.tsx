import React, {useEffect, useState} from "react";
import '../styles/singleTagPage.scss'
import fetchWrapper from "../helpers/fetchWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import {TData} from "../interfaces/interfaces";
import {useDebounce} from "../helpers/debounce";

interface IProps {
    match: any
}

const SingleTagPage = (props: IProps) => {
    const [data, setData] = useState<TData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>('')
    const tag = props.match.params.id;
    const searchStart = useDebounce(search, 300)


    const inputHandler = (value: string): void => {
        setSearch(value)
    }

    const getData = (): void => {
        fetchWrapper.get(`single-tag/?mainTag=${tag}&search=${search}`)
            .then((data: {data: TData[]}) => {
                setData(data.data);
                setLoading(false)
            })
    }

    useEffect(() => {
        getData()
    }, [searchStart])

    return (
        <>
            <Header />
            <main className="page-with-tag-main">
                <div className="page-with-tag-container">
                    <h1 className="main-tag">Searching by tag : {tag}</h1>
                    <SearchBar onChange={inputHandler}/>
                    {loading ? <Loader/> :
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
                    }
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default SingleTagPage
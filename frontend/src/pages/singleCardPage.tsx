import React, {useEffect, useState} from "react";
import '../styles/singleCard.scss'
import fetchWrapper from "../helpers/fetchWrapper";
import {getMonthByNumber} from "../constants/constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import {TData, TSubtitle} from "../interfaces/interfaces";

interface IProps {
    match: any
}

const SingleCardPage = (props: IProps) => {
    const [card, setCard] = useState<TData>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const getCard = (i: string): void => {
        let index = +i;
        fetchWrapper.post<{index: number}>('single-card', {index: index})
            .then((data: {card: TData}) => {
                setCard(data.card);
                setLoading(false);
            })
    }

    const generateDate = (date: Date): string => {
        date = new Date(date)
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return `${getMonthByNumber[month]} ${day}, ${year}`;
    }

    useEffect(() => {
        let index = props.match.params.id;
        getCard(index);
    }, [])

    return (
        <>
            <Header />
            <main className="card-main">
                <div className="single-card-container">
                    {loading ? <Loader/> :
                        <>
                            <img className="single-card-img" alt={'image'} src={card.img}/>
                            <h3 className="single-card-title">{card.title}</h3>
                            {card.subtitle?.map((item: TSubtitle, index: number) =>
                                <div className="single-card-info" key={index}>
                                    <h5 className="single-card-subtitle">{item.article[0]}</h5>
                                    {item.article.slice(1).map((option: string, index: number) =>
                                        <p className="single-card-text" key={index}>{option}</p>
                                    )}
                                </div>
                            )}
                            <div className="underline"/>
                            <div className="info-author-date">
                                <p className="author">{card.author}</p>
                                <p className="date">{generateDate(card.date)}</p>
                            </div>
                            <div className="single-tags">
                                {card.tags?.map((item: string) =>
                                    <Link to={`/tag/${item}`} className="tag tag-margin-right" key={item}>
                                        <p>{item}</p>
                                    </Link>
                                )}
                            </div>
                        </>
                    }
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default SingleCardPage
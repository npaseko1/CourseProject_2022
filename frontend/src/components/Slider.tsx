import React, {useEffect, useState} from "react";
import '../styles/mainPage.scss'
import SliderImage from "../assets/svg/slider1.svg";
import Prev from "../assets/svg/prev.svg"
import Next from '../assets/svg/next.svg'

const Slider = () => {
    const [slider, setSlider] = useState<number>(0);
    let timer: NodeJS.Timer;

    const nextSlide = (): void => {
        slider === 1 ? setSlider(0) : setSlider(1)
    }

    const prevSlide = (): void => {
        slider === 0 ? setSlider(1) : setSlider(0)
    }

    const dotHandler = (indexDot: number): void => {
        setSlider(indexDot)
    }

    useEffect(() => {
        clearInterval(timer)
        timer = setInterval(() => {
            slider === 0 ? setSlider(1) : setSlider(0)
        }, 3000);
        return () => {
            clearInterval(timer);
        }
    }, [slider])

    return (
        <>
            <section className="slider">
                    <div className={slider === 0 ? "slider-first slide active" : "slider-first slide"}>
                        <div className="slider-block">
                            <div className="slider-info">
                                <h2>Blog by</h2>
                                <h1>NADIA PASEKO</h1>
                                <p>Welcome! My name is Nadia and this is my blog about the most useful things in my opinion. Here you will find a lot of useful information! Happy viewing.</p>
                                <div className="button-buy-now-wrapper">
                                    <button className="button-buy-now">Start Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="slider-block">
                            <img className="slider-img" src={SliderImage} alt="picture"/>
                        </div>
                    </div>
                    <div className={slider === 1 ? "slider-second slide active" : "slider-second slide"}>
                        <div className="slider-block">
                            <div className="slider-info">
                                <h2>Blog by</h2>
                                <h1>NADIA PASEKO</h1>
                                <p>Hello everyone and welcome to this blog! My name is Nadia and this is my blog about the most useful things in my opinion. Here you will find a lot of useful information! Happy viewing.</p>
                                <div className="button-buy-now-wrapper">
                                    <button className="button-buy-now">Start Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <img onClick={prevSlide} className="slider-arrow slider-arrow-prev" src={Prev} alt="arrow"/>
                <img onClick={nextSlide} className="slider-arrow slider-arrow-next" src={Next} alt="arrow"/>
            </section>
            <div className="dots-wrapper">
                <span onClick={() => dotHandler(0)} className={slider === 0 ? "dot active" : "dot"}/>
                <span onClick={() => dotHandler(1)} className={slider === 1 ? "dot active" : "dot"}/>
            </div>
        </>
    )
}

export default Slider
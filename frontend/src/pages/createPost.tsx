import React, {ChangeEvent, useEffect, useState} from "react";
import '../styles/createPost.scss'
import fetchWrapper from "../helpers/fetchWrapper";
import {searchTags} from "../constants/constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tag from "../components/Tag";
import Minus from "../assets/svg/minus.svg"
import {Redirect} from "react-router-dom";
import {TData, TTag} from "../interfaces/interfaces";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const CreatePost = () => {
    const [data, setData] = useState<TData[]>(null)
    const [title, setTitle] = useState<string>('')
    const [subtitle, setSubtitle] = useState<{ article : { text: string, error: boolean }[]}[]>([
        {article: [{text: ' ', error: false }, {text: ' ', error: false}] }
    ])
    const [img, setImg] = useState<string>('')
    const [resultTags, setResultTags] = useState<string[]>([])

    const [titleError, setTitleError] = useState<boolean>(false)
    const [resultTagsError, setResultTagsError] = useState<boolean>(false)
    const [imgError, setImgError] = useState<boolean>(false)
    const [imgSrc, setImgSrc] = useState<string>('')

    const user = useSelector((state: RootState) => state.user.user)

    const toSetSubtitle = (index: number, type: string, value: string): void => {
        let newArray = subtitle.map((item: { article : { text: string, error: boolean }[]}, i: number) => {
            if (i === index) {
                if (type === 'subtitle') {
                    item.article[0].text = value;
                } else {
                    item.article[1].text = value;
                }
            }
            return item;
        })

        setSubtitle(newArray)
    }


    const addTag = (value: TTag): void => {
        let newArray = resultTags;
        if (!newArray.includes(value.name)) {
            newArray.push(value.name);
        }
        setResultTags([...newArray])
    }

    const deleteTag = (value: string): void => {
        let newArray = resultTags;
        newArray = newArray.filter(item => item !== value)
        setResultTags(newArray)
    }

    const addBlock = (): void => {
        let newArray = subtitle
        newArray.push({article: [{text: '', error: false}, {text: '', error: false}]})
        setSubtitle([...newArray])
    }

    const deleteBlock = (index: number): void => {
        let newArray = subtitle
        newArray = newArray.filter((item: { article : { text: string, error: boolean }[]}, i: number) => i!== index)
        setSubtitle(newArray)
    }

    const generateKey = (index: number): string => {
        return index + 'article'
    }

    const addCard = (): void => {
        let newCard = {
            title: title,
            subtitle: subtitle.map(item => {
                return {article: [item.article[0].text, item.article[1].text]}
            }),
            author: user.name,
            date: new Date(),
            img: img,
            tags: resultTags,
        }

        fetchWrapper.post<TData>("add", newCard)
            .then((data: {newData: TData[]}) => {
                setData(data.newData)
            })
    }

    const isValid = (): boolean => {
        setImgError( false)
        setTitleError(false)
        setResultTagsError(false)


        let result = true;
        if (!img) {
            setImgError( true)
            result = false
        }

        if (!title.trim()) {
            setTitleError(true)
            result = false
        }

        const newArray = subtitle.map((item: { article : { text: string, error: boolean }[]}) => {
            item.article.map((elem: { text: string, error: boolean }) => {
                elem.error = !elem.text?.trim();
                if (elem.error) result = false
                return elem;
            })
            return item;
        })
        setSubtitle( newArray)

        if (resultTags.length < 2){
            setResultTagsError(true)
            result = false
        }
        return result;
    }

    const postHandler = (): void => {
        if (isValid()) {
            addCard();
        }
    }

    const convertBase64 = (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error: ProgressEvent<FileReader>) => {
                reject(error);
            }
        })
    }

    const downloadPic = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target && e.target.files[0]) {
            setImgSrc(URL.createObjectURL(e.target.files[0]))

            convertBase64(e.target.files[0]).then(data => {
                if (typeof data === 'string') {
                    setImg(data)
                }
            })
        }
    }

    return (
        <>
            <Header create />
            <main className="add-card-main">
                <div className={imgSrc ? "add-card-container background" : "add-card-container"}>
                    {imgSrc ?
                        <img
                            className="selected-img"
                            src={imgSrc}
                            alt=''/>
                        :
                        <div className= {imgError ? "add-img red" : "add-img"}>
                            <input
                                className="input-file"
                                type="file"
                                accept="image/*"
                                onChange={downloadPic}
                            />
                            <label className="add-img-text">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect x="5" y="11.3999" width="14.4" height="1.6" rx="0.8" fill="#2F80ED"/>
                                    <rect x="11.4004" y="19.3999" width="14.4" height="1.6" rx="0.8"
                                          transform="rotate(-90 11.4004 19.3999)" fill="#2F80ED"/>
                                </svg>
                                <p>Add Cover</p>
                            </label>
                        </div>}
                    <h2>Enter the title of your article</h2>
                    <input
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement> ) => setTitle(e.target.value)}
                        className={titleError ? "enter-input enter-title red" : "enter-input enter-title"}
                        type="text"
                        placeholder="Enter Title"
                    />
                    <div className="new-blocks">
                        {subtitle.map((item: { article : { text: string, error: boolean }[]}, index: number) => {
                            return (
                                <div className="new-block" key={generateKey(index)}>
                                    <h2>Enter the subtitle of your article</h2>
                                    <input
                                        value={item.article[0].text}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            toSetSubtitle(index, 'subtitle', e.target.value)}
                                        className={item.article[0].error ? 'enter-input enter-subtitle red' : 'enter-input enter-subtitle'}
                                        placeholder="Enter Subtitle"
                                        type="text"
                                    />
                                    <h2>Tell your story...</h2>
                                    <textarea
                                        value={item.article[1].text}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                            toSetSubtitle(index, 'story', e.target.value)}
                                        className={item.article[1].error ? "enter-input add-card-textarea red" : "enter-input add-card-textarea"}
                                    />
                                    {index !== 0 &&
                                    <div onClick={() => deleteBlock(index)} className="remove-block">
                                        <img alt="remove" src={Minus}/>
                                        <p>Remove block</p>
                                    </div>
                                    }
                                </div>
                            )}
                        )}
                    </div>
                    <div onClick={addBlock} className="add-new-block">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect x="4.1665" y="9.49992" width="12" height="1.33333" rx="0.666667" fill="#2F80ED"/>
                            <rect x="9.50049" y="16.1666" width="12" height="1.33333" rx="0.666667"
                                  transform="rotate(-90 9.50049 16.1666)" fill="#2F80ED"/>
                        </svg>
                        <p>Add new block</p>
                    </div>
                    <div className="tag-information">
                        <h2>Add tag information</h2>
                        <div className="tag-information-tags">
                            {
                                searchTags.map((tag: TTag) =>
                                    <Tag
                                        create
                                        onClick={() => addTag(tag)}
                                        tag={tag}
                                        key={tag.name}
                                    />)
                            }
                        </div>
                    </div>
                    <div className="input-for-example-wrapper">
                        <div className={resultTagsError ? "input-for-example red" : "input-for-example"}>
                            {resultTags.length ?
                               <div className="tags-wrapper">
                                    {
                                        resultTags.map((tag: string, i: number) =>
                                            <Tag
                                                active
                                                onClick={() => deleteTag(tag)}
                                                tagName={tag} key={generateKey(i)}
                                            />
                                        )
                                    }
                                </div> :
                                <p className="example-text">For example Beauty</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Footer create onClick={postHandler}/>
            {data && <Redirect to={`/card/${data.length}`}/>}
        </>
    )

}

export default CreatePost
import React from "react";
import '../styles/mainPage.scss'
import CheckMark from '../assets/svg/checkMark.svg'
import PlusIcon from '../assets/svg/plusIcon.svg'
import {TTag} from "../interfaces/interfaces";
import PropTypes from 'prop-types';

interface IProps {
    tag?: TTag,
    onClick: (value: TTag) => void,
    create?: boolean,
    active?: boolean,
    tagName?: string
}

const Tag = (props: IProps) => {
    return (
        <>
            {props.create ?
                <div
                    onClick={() => props.onClick(props.tag)}
                    className={"tag add-card-add-tag"}
                >
                    <img alt="plus" src={PlusIcon}/>
                    <p>{props.tag.name}</p>
                </div> :
                <div
                    onClick={() => props.onClick(props.tag)}
                    className={props.active ? "tag active" : props.tag.active ? "tag active" : "tag"}
                >
                    <img
                        className={props.active ? "check-mark active" :
                            props.tag.active ? "check-mark active" : "check-mark"}
                        alt={'check-mark'}
                        src={CheckMark}
                    />
                    <p>{props.active ? props.tagName : props.tag.name}</p>
                </div>
            }
        </>
    )
}

Tag.propTypes = {
    tag: PropTypes.shape({
        name: PropTypes.string,
        active: PropTypes.bool,
        id: PropTypes.string
    }),
    onClick: PropTypes.func.isRequired,
    create: PropTypes.bool,
    active: PropTypes.bool,
    tagName: PropTypes.string
}


export default Tag
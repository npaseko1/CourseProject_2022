import {TData} from "../interfaces/interfaces";
import {TTag} from "../interfaces/interfaces";

export const searchTags: TTag[] = [
    {
        name: 'Beauty',
        active: true,
        id: 'beauty'
    },
    {
        name: 'Food',
        active: false,
        id: 'food',
    },
    {
        name: 'Study',
        active: false,
        id: 'study',
    },
    {
        name: 'Friends',
        active: false,
        id: 'friends',
    },
    {
        name: 'Style',
        active: false,
        id: 'style',
    },
    {
        name: 'Fashion',
        active: false,
        id: 'fashion',
    },
    {
        name: 'Love',
        active: false,
        id: 'love',
    },
    {
        name: 'Family',
        active: false,
        id: 'family',
    },
    {
        name: 'Vacation',
        active: false,
        id: 'vacation',
    },
    {
        name: 'University',
        active: false,
        id: 'university',
    }
]

export const newCard: TData = {
    title: '',
    subtitle: [
        {article: ['', '']},
    ],
    tags: [],
    date: new Date(),
    img: '',
    author: '',
}

export const  getMonthByNumber: string[] = ["January", "February",  "March", "April", "May", "June",
    "July","August", "September", "October", "November", "December"];
import { LightningElement, wire } from "lwc";
import banner from "@salesforce/resourceUrl/banner";
import { NavigationMixin } from 'lightning/navigation';

import getAccounts from '@salesforce/apex/courseController.getCourses';
import { getListInfoByName } from 'lightning/uiListsApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';


export default class Courses extends NavigationMixin(LightningElement) {

    bannerUrl = banner;
    courses = [
        {
            id: 1,
            title: 'Introduction to Programming',
            description: 'Learn the basics of programming using popular languages like Python and Java.',
            duration: '8 weeks',
            level: 'Beginner'
        },
        {
            id: 2,
            title: 'Web Development Bootcamp',
            description: 'Master the essentials of web development, including HTML, CSS, and JavaScript.',
            duration: '12 weeks',
            level: 'Intermediate'
        },
        {
            id: 3,
            title: 'Data Science Fundamentals',
            description: 'Explore the world of data science and gain insights into data analysis and visualization.',
            duration: '10 weeks',
            level: 'Intermediate'
        },
        {
            id: 4,
            title: 'Mobile App Development',
            description: 'Build mobile applications for iOS and Android platforms.',
            duration: '14 weeks',
            level: 'Advanced'
        },
        {
            id: 5,
            title: 'Machine Learning in Practice',
            description: 'Apply machine learning algorithms to real-world problems.',
            duration: '12 weeks',
            level: 'Advanced'
        },
        {
            id: 6,
            title: 'Cybersecurity Essentials',
            description: 'Learn the fundamental concepts of cybersecurity and protect systems from threats.',
            duration: '10 weeks',
            level: 'Intermediate'
        },
        {
            id: 7,
            title: 'Cloud Computing Fundamentals',
            description: 'Understand cloud technologies and their applications in modern computing.',
            duration: '8 weeks',
            level: 'Intermediate'
        },
        {
            id: 8,
            title: 'UI/UX Design Workshop',
            description: 'Design user-friendly and visually appealing interfaces for digital products.',
            duration: '6 weeks',
            level: 'Beginner'
        },
        {
            id: 9,
            title: 'Agile Project Management',
            description: 'Implement agile methodologies for efficient project management.',
            duration: '10 weeks',
            level: 'Intermediate'
        },
        {
            id: 10,
            title: 'Blockchain Basics',
            description: 'Explore the fundamentals of blockchain technology and its applications.',
            duration: '8 weeks',
            level: 'Intermediate'
        },
        // Add more courses as needed
    ];

    handleCardClick(event) {

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: "a635e000000Tuz3AAC",
                actionName: 'view'
            }
        });
    }


}
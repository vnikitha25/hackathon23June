const getLecturesData = function(){

    return [...Array(20)].map((_, index) => {
        return {
            name: `Lecture ${index}`,
            description: 'This lecture topics include : ',
            code: `video${index}`,
            date: new Date(
                Date.now() - 86400000 * Math.ceil(Math.random() * 20)
            ),
            summary: '',
            assignment:'',
            transcript : ''
        };
    });
}

export {getLecturesData}
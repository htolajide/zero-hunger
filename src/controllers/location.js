import axios from 'axios';
const url = `http://api.ipstack.com/check?access_key=c934a4c422466d14bb4cdcd82fa49547`;

export default {
    getLocation: (req, res) => {
        axios.get(url)
        .then(result => { 
            res.status(200).json(result.data);
        })
        .catch(error => res.status(400).json(error.message));
    },
    url: url
}

const openModal = () => {
    document.getElementById('modal').style.display = "flex"
}
const closeModal = () => {
    document.getElementById('modal').style.display = "none"
}
const instanceAxios = axios.create({
    timeout: 8000
        // headers: { 'Authorization': 'Bearer ' + token }
});

const reqListener = (method, url, data) => {
    return new Promise((resolve, reject) => {
        instanceAxios({
            method: method,
            url: url,
            data: data
        }).then((res) => {
            // console.log(res.data);
            resolve({
                success: res.data
            })
        }).catch((err) => {
            // console.log(err.response.data);
            resolve({
                err: err.response.data
            })
        })
    })
}

const template = document.getElementById('hobby-temp').innerHTML
document.getElementById('add-form').addEventListener('submit', async(e) => {
    e.preventDefault()
    const hobbyName = e.target.i1.value
    const data = {
        hobbyName
    }
    const { success, err } = await reqListener('post', '/api/addHobby', data)
    closeModal()
    console.log(success, err);
    if (success) {
        insertHobbyCard(hobbyName)
    } else {
        alert('Hobby Already Exists')
    }

})

const insertHobbyCard = (val) => {
    const content = Mustache.render(template, {
        hobby: val
    })
    document.getElementById('card-container').insertAdjacentHTML('beforeend', content)
}
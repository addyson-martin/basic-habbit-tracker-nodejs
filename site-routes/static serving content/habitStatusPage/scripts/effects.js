let FocusDate
    //managing state is optimised in react which can be used at the time of frontend optimisation
let userStateDailyTaskStatus = []

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

const openModal = () => {
    document.getElementById('modal').style.display = "flex"
}

const closeModal = () => {
    document.getElementById('modal').style.display = "none"
}
const activateToggling = () => {
    const dates = document.querySelectorAll('.date-picker')
    dates.forEach((date) => {
        date.addEventListener('click', (e) => {
            FocusDate = date
            openModal()
        })
    })
}

const captureResStatus = (e) => {
    const option = e.target.innerText.trim()
    FocusDate.setAttribute("data-habit-status", option)
    const identifier = FocusDate.getAttribute('data-unq-identifier')
    const dataToPush = {
        option,
        identifier
    }
    let img = FocusDate.children[1]
    if (option == "Done") {
        img.src = "./assets/check.svg"
    }
    if (option == "Not Done") {
        img.src = "./assets/cross.svg"

    }
    if (option == "None") {
        img.src = "./assets/plus-white.svg"

    }
    if (userStateDailyTaskStatus.length == 0) {
        userStateDailyTaskStatus.push(dataToPush)

    } else {
        let flagDup = false
        userStateDailyTaskStatus.forEach((ele, index) => {
            if (ele.identifier == identifier) {
                flagDup = true
                userStateDailyTaskStatus[index] = dataToPush
            }
        })
        if (!flagDup) {
            userStateDailyTaskStatus.push(dataToPush)
        }
    }
    console.log(userStateDailyTaskStatus);

    closeModal()
    saveChanges()
}
const retriveState = (arrInput) => {
    console.log(arrInput);
    const dates = document.querySelectorAll('.date-picker')
    dates.forEach((date) => {
        const id = date.getAttribute('data-unq-identifier')
        arrInput.forEach((ele) => {
            if (ele.identifier == id) {
                const option = ele.option
                const img = date.children[1]
                if (option == "Done") {
                    img.src = "./assets/check.svg"
                }
                if (option == "Not Done") {
                    img.src = "./assets/cross.svg"

                }
                if (option == "None") {
                    img.src = "./assets/plus-white.svg"

                }
            }
        })

    })
}

const loadData = () => {
    let data = document.getElementById('data-hobby').getAttribute('data-info')
    data = JSON.parse(data)
    userStateDailyTaskStatus = data
}

const saveChanges = async() => {
    let data = {}
    const hobby = document.getElementsByTagName('body')[0].getAttribute('data-hobby')
    data[hobby] = userStateDailyTaskStatus
    const { success, err } = await reqListener('post', '/api/saveUserData', data)
    console.log(success);

}




loadData()

activateToggling()

retriveState(userStateDailyTaskStatus)
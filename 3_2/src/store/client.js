class client {

    constructor() {
        this.url = "http://localhost:8080/"
    }

    async sendGetRequest(path, f) {
        await fetch(`${this.url}${path}`,{method:"GET"})
            .then(result => {
                if (result.ok)
                    return result
                else
                    return Promise.reject(result.statusText)
            })
            .then(result => result.json())
            .then(measurements => f(measurements))
    }

    async sendPostRequest(path, body){
        let response = await fetch(`${this.url}${path}`, {method: "POST", body: JSON.stringify(body)})
        if(!response.ok) window.alert("Error msg:"+response.statusText)
    }
}
export default client
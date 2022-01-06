import firebase from "firebase"

export const getFeed = () => new Promise((resolve, reject) => {
    console.log('attempt to connect')
    firebase
        .firestore()
        .collection('Videos')
        .get()
        //get res as usable object
        .then((res)=>{
                //map info to object we can use
                const post = res.docs.map((value) =>{
                    const id = value.id;
                    const data = value.data();
                    //should return all the id with their objects
                    return {id, ...data}

                })
                resolve(post)
                console.log('got data')
            },
        )
    console.log("should be rendering data")
})

const {createClient} = require("@urql/core")
const fetch = require('cross-fetch');

// const getUrl = async()=>{
//     return await fetch("https://hub.snapshot.org/graphql/")

// }
const APIURL = "https://hub.snapshot.org/"
const client = createClient({
    url: APIURL,
})

const QUERY =`
    query spaceById {
        space(id: "aave.eth") {
        id
        name
        about
        network
        symbol
        members
        }
    }
`

async function fetchSpace(){
    try{
        const response = await  client.query(QUERY).toPromise();
        console.log({response})
    }catch(err){
        console.log(err)
    }   
}

fetchSpace()
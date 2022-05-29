// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var queryShort = `
query ($id: Int) { # Define which variables will be used in the query (id)
Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
    romaji
    english
    native
    }
    coverImage{
    large
    }
}
}
`

var queryLong = `
query ($id: Int) { # Define which variables will be used in the query (id)
Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
    romaji
    english
    native
    }
    coverImage{
    large
    }
    description
    season
    seasonYear
    bannerImage
    genres
    tags{
    category
    }
}
}
`


function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleError(error) {
    console.error(error);
}
/*
// Define our query variables and values that will be used in the query request
var variables = {
    id: animeID
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
};

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
.then(data => {
    //console.log(data);
    return data;
})
.catch(handleError);
*/
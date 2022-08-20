var queryShort = `
query ($id: Int) {
Media (id: $id) {
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
query ($id: Int) {
Media (id: $id) { 
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
    episodes
    chapters
    volumes
}
}
`

var querySearch = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $isAdult: Boolean) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search, isAdult: $isAdult) {
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
}
`

var querySearchANIME = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $isAdult: Boolean) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search, type:ANIME, isAdult: $isAdult) {
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
}
`

var querySearchMANGA = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $isAdult: Boolean) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search, type:MANGA, isAdult: $isAdult) {
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
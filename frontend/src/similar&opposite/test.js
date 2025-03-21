    <div>
    <div class="split left">
  {/* <div class="synonym_part"> */}
       <h1>SYNONYMS</h1><br></br><br></br>

   <div className="search">
     <form onSubmit={handleSearch}>
     <input
      id="search"
      type="search"
      className="search-input"
      placeholder="Enter a word"
      onChange={(e) => {
        setWord(e.target.value);
      }}
    />
    <button className="go" type="button" onClick={handleSearch} >
      Go
    </button>
    </form>
  </div>

  {synonyms.length > 0 && (
        <div className="container-sy">
          <h2>Synonyms for "{word}":</h2><br></br>
          <ul>
            {synonyms.map((synonym) => (
              <li className="sy-li" key={synonym._id}>{synonym.synonym}</li>
            ))}
          </ul>
        </div>
      )}
  
</div>

<div class="split right">
  <div class="centered">
  <img className="d-block w-100" src="./images/syn.png" alt="Second slide" />
  </div>
  {/* buttons */}
<div className="btn-group" role="group" aria-label="Basic mixed styles example">
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger" >
          <Link to="/addSynonyms">
            <i class="bi bi-plus-circle-fill"></i>
            <svg style={{color: '#00563f'}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </Link>
        </button>
        <button type="button" class="btn btn-danger">
          <Link to="/updateSynonyms">
            <i class="bi bi-pencil-square"></i>
            <svg style={{color: '#00563f'}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </Link>
        </button>
      </div>

      </div>
</div>

</div>
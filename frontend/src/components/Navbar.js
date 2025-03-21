const Navbar = () => {
    return (
        <nav class="navbar fixed-top navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark"  style={{height : 80}}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">SINHALA - ENGLISH TRANSLATOR</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/extract-keywords">Extract Keywords</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Find Synonyms & Antonyms</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">Notepad</a>
              </li>
            </ul>
          </div>
          <button type="button" class="btn btn-secondary btn-sm">Login / SignUp</button>
        </div>
      </nav>
    )
  }
  
  export default Navbar
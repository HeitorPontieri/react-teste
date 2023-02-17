
import './style.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-post'
import { Posts } from '../../Posts';
import { Button } from '../../components/Button';

class App extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })

  }

  // componentDidUpdate(){
  // }
  // componentWillUnmount (){
  // }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })

  }

  render() {
    const { posts, page, pagePerPage, allPosts, searchValue } = this.state

    const noMorePosts = page + pagePerPage >= allPosts.length

    const filteredPostes = !!searchValue ? 
    posts.filter(post => {
      return post.title.toLowerCase()
      .includes(searchValue.toLowerCase()
      )
    })
    :posts

    return (
      <section className='container'>

        {!!searchValue && (
          <>
            <h1>Search Value : {searchValue}</h1>
          </>
        )}

        <input
          onChange={this.handleChange}
          value={searchValue}
          type="search" />

        {filteredPostes.length > 0 && (
          <Posts posts={filteredPostes} />
        )}

        {filteredPostes.length === 0 && (
         <p>Não encontrados resultados com {searchValue}</p>
        )}
        

        <div className="button-container">
          {!searchValue && (
            <Button
              text='Load more'
              // o onclick é passado aqui como atributo pro props
              onClick={this.loadMorePosts}
              disabled={noMorePosts} />
          )}

        </div>
      </section>
    );
  }
}

export default App;

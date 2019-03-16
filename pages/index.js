import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = props => (
  <li>
    <Link as={props.as} href={props.href}>
      <a>{props.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

const Index = props => (
  <Layout>
    <h1>My Blogs</h1>
    <ul>
      <PostLink as="/p/hello-nextjs" href='/post?title=Hello Next.js' title='Hello Next.js' />
      <PostLink as="/p/learn-nextjs" href='/post?title=Learn Next.js is awesome' title='Hello Next.js' />
      <PostLink as="/p/deploy-nextjs" href='/post?title=Deploy apps with Zeit' title='Deploy apps with Zeit' />
    </ul>

    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <PostLink as={`/b/${show.id}`} href={`/batman?id=${show.id}`} title={show.name} />
      ))}
    </ul>
    <style jsx>{`
      * {
        font-family: 'Arial';
      }

      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(data)

  return {
    shows: data
  }
}

export default Index;
function Article({ post }) {
  return (
    <article>
      <h2>{post.titulo}</h2>

      <time>{post.data}</time>

      <p>{post.conteudo1}</p>
      <p>{post.conteudo2}</p>

      <figure>
        <img src={post.imagem} alt={post.legenda} />
        <figcaption>{post.legenda}</figcaption>
      </figure>
    </article>
  );
}

export default Article;
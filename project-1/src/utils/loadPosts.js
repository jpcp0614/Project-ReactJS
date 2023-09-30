const loadPosts = async (urlPosts, urlPhotos) => {
  const postsResponse = fetch(urlPosts);
  const photosResponse = fetch(urlPhotos);

  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postsAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url };
  });

  return postsAndPhotos;
};

export default loadPosts;

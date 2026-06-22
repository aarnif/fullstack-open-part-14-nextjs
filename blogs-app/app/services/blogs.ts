const blogs = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: 3,
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    id: 4,
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: 5,
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

let nextId = blogs.length + 1;

export const getBlogs = () => blogs;

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number,
) => blogs.push({ id: nextId++, title, author, url, likes });

export const getBlogById = (id: number) => blogs.find((blog) => blog.id === id);

export const addLikeToBlog = (id: number) => {
  const blog = getBlogById(id);
  if (blog) {
    blog.likes++;
  }
};
